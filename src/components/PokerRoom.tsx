"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

type ChatMessage = {
  id: string;
  sender: string;
  text: string;
  createdAt: number;
};

type Player = {
  id: string;
  name: string;
  joinedAt: number;
};

type PlayerState = {
  chips: number;
  bet: number;
  folded: boolean;
};

type GameState = {
  deck: string[];
  hands: Record<string, string[]>;
  pot: number;
  turn: string | null;
  stage: "idle" | "betting" | "showdown" | "finished";
  currentBet: number;
  raiseAmount: number;
  playerStates: Record<string, PlayerState>;
  turnOrder: string[];
  acted: string[];
  winnerIds: string[];
} | null;

const SUITS = ["♠", "♥", "♦", "♣"] as const;
const RANKS = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"] as const;

function createDeck() {
  const deck: string[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push(`${rank}${suit}`);
    }
  }
  return deck.sort(() => Math.random() - 0.5);
}

function getPlayerId() {
  const key = "trpg_player_id";
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const created = crypto.randomUUID();
  localStorage.setItem(key, created);
  return created;
}

function parseCard(card: string) {
  const suit = card.slice(-1);
  const rankLabel = card.slice(0, -1);

  const rankMap: Record<string, number> = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    "10": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
  };

  return {
    raw: card,
    suit,
    rank: rankMap[rankLabel],
  };
}

function combinations<T>(arr: T[], k: number): T[][] {
  const result: T[][] = [];

  function helper(start: number, path: T[]) {
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      helper(i + 1, path);
      path.pop();
    }
  }

  helper(0, []);
  return result;
}

function compareScoreArrays(a: number[], b: number[]) {
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const av = a[i] ?? -1;
    const bv = b[i] ?? -1;
    if (av > bv) return 1;
    if (av < bv) return -1;
  }
  return 0;
}

function scoreFive(cards: string[]) {
  const parsed = cards.map(parseCard).sort((a, b) => b.rank - a.rank);
  const ranks = parsed.map((c) => c.rank);
  const suits = parsed.map((c) => c.suit);

  const countMap = new Map<number, number>();
  for (const rank of ranks) {
    countMap.set(rank, (countMap.get(rank) ?? 0) + 1);
  }

  const counts = [...countMap.entries()].sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return b[0] - a[0];
  });

  const flush = suits.every((s) => s === suits[0]);

  const uniqueRanks = [...new Set(ranks)].sort((a, b) => b - a);
  let straight = false;
  let straightHigh = uniqueRanks[0];

  if (uniqueRanks.length === 5) {
    if (uniqueRanks[0] - uniqueRanks[4] === 4) {
      straight = true;
      straightHigh = uniqueRanks[0];
    }

    if (JSON.stringify(uniqueRanks) === JSON.stringify([14, 5, 4, 3, 2])) {
      straight = true;
      straightHigh = 5;
    }
  }

  if (straight && flush) return [8, straightHigh];
  if (counts[0][1] === 4) return [7, counts[0][0], counts[1][0]];
  if (counts[0][1] === 3 && counts[1][1] === 2) return [6, counts[0][0], counts[1][0]];
  if (flush) return [5, ...ranks];
  if (straight) return [4, straightHigh];
  if (counts[0][1] === 3) return [3, counts[0][0], ...counts.slice(1).map(([r]) => r)];
  if (counts[0][1] === 2 && counts[1][1] === 2) {
    const pairRanks = [counts[0][0], counts[1][0]].sort((a, b) => b - a);
    return [2, ...pairRanks, counts[2][0]];
  }
  if (counts[0][1] === 2) return [1, counts[0][0], ...counts.slice(1).map(([r]) => r)];
  return [0, ...ranks];
}

function bestFiveOfSeven(cards: string[]) {
  const all = combinations(cards, 5);
  let best = all[0];
  let bestScore = scoreFive(best);

  for (const combo of all.slice(1)) {
    const currentScore = scoreFive(combo);
    if (compareScoreArrays(currentScore, bestScore) > 0) {
      best = combo;
      bestScore = currentScore;
    }
  }

  return { best, score: bestScore };
}

function scoreLabel(score: number[]) {
  switch (score[0]) {
    case 8:
      return "스트레이트 플러시";
    case 7:
      return "포카드";
    case 6:
      return "풀하우스";
    case 5:
      return "플러시";
    case 4:
      return "스트레이트";
    case 3:
      return "트리플";
    case 2:
      return "투페어";
    case 1:
      return "원페어";
    default:
      return "하이카드";
  }
}

function getAlivePlayers(turnOrder: string[], playerStates: Record<string, PlayerState>) {
  return turnOrder.filter((id) => playerStates[id] && !playerStates[id].folded);
}

function getNextTurn(
  turnOrder: string[],
  currentTurn: string | null,
  playerStates: Record<string, PlayerState>
) {
  if (!turnOrder.length) return null;
  if (!currentTurn) return turnOrder[0] ?? null;

  const currentIndex = turnOrder.indexOf(currentTurn);
  for (let i = 1; i <= turnOrder.length; i++) {
    const nextId = turnOrder[(currentIndex + i) % turnOrder.length];
    const state = playerStates[nextId];
    if (state && !state.folded) {
      return nextId;
    }
  }
  return null;
}

function everyoneMatched(game: GameState) {
  if (!game) return false;

  const alive = getAlivePlayers(game.turnOrder, game.playerStates);
  if (alive.length <= 1) return true;

  const allMatched = alive.every(
    (id) => game.playerStates[id].bet === game.currentBet
  );
  const allActed = alive.every((id) => (game.acted ?? []).includes(id));

  return allMatched && allActed;
}

function maskOpponentCards(cards: string[], stage: string) {
  if (stage === "showdown" || stage === "finished") return cards;

  return cards.map((card, index) => {
    const hidden = index === 0 || index === 1 || index === 6;
    return hidden ? "🂠" : card;
  });
}

export default function PokerRoom({
  roomId,
  initialName,
}: {
  roomId: string;
  initialName: string;
}) {
  const [name, setName] = useState(initialName || "플레이어");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [game, setGame] = useState<GameState>(null);
  const [raiseInput, setRaiseInput] = useState(20);

  const playerId = useMemo(() => {
    if (typeof window === "undefined") return "";
    return getPlayerId();
  }, []);

  const isMyTurn = game?.turn === playerId;
  const myState = game?.playerStates?.[playerId];
  const myCards = game?.hands?.[playerId] ?? [];

  useEffect(() => {
    if (!playerId) return;

    const playerRef = doc(db, "rooms", roomId, "players", playerId);

    setDoc(
      playerRef,
      {
        id: playerId,
        name: name || "플레이어",
        joinedAt: Date.now(),
      },
      { merge: true }
    );
  }, [roomId, playerId, name]);

  useEffect(() => {
    const q = query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const next = snapshot.docs.map((d) => d.data() as ChatMessage);
      setMessages(next);
    });

    return () => unsub();
  }, [roomId]);

  useEffect(() => {
    const q = query(collection(db, "rooms", roomId, "players"));

    const unsub = onSnapshot(q, (snapshot) => {
      const next = snapshot.docs.map((d) => d.data() as Player);
      setPlayers(next);
    });

    return () => unsub();
  }, [roomId]);

  useEffect(() => {
    const gameRef = doc(db, "rooms", roomId, "game", "state");

    const unsub = onSnapshot(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        setGame(snapshot.data() as GameState);
      } else {
        setGame(null);
      }
    });

    return () => unsub();
  }, [roomId]);

  const sendMessage = async () => {
    const text = chatInput.trim();
    if (!text) return;

    await addDoc(collection(db, "rooms", roomId, "messages"), {
      id: crypto.randomUUID(),
      sender: name || "플레이어",
      text,
      createdAt: Date.now(),
      createdServerAt: serverTimestamp(),
    });

    setChatInput("");
  };

  const logSystem = async (text: string) => {
    await addDoc(collection(db, "rooms", roomId, "messages"), {
      id: crypto.randomUUID(),
      sender: "시스템",
      text,
      createdAt: Date.now(),
      createdServerAt: serverTimestamp(),
    });
  };

  const startGame = async () => {
    const deck = createDeck();
    const playersSnapshot = await getDocs(collection(db, "rooms", roomId, "players"));

    const hands: Record<string, string[]> = {};
    const playerStates: Record<string, PlayerState> = {};
    const turnOrder = playersSnapshot.docs.map((playerDoc) => playerDoc.id);

    playersSnapshot.docs.forEach((playerDoc, i) => {
      hands[playerDoc.id] = deck.slice(i * 7, i * 7 + 7);
      playerStates[playerDoc.id] = {
        chips: 980,
        bet: 20,
        folded: false,
      };
    });

    const firstPlayerId = turnOrder[0] ?? null;
    const antePot = playersSnapshot.docs.length * 20;

    await setDoc(doc(db, "rooms", roomId, "game", "state"), {
      deck,
      hands,
      pot: antePot,
      turn: firstPlayerId,
      stage: "betting",
      currentBet: 20,
      raiseAmount: 20,
      playerStates,
      turnOrder,
      acted: [],
      winnerIds: [],
    });

    await logSystem("새 게임이 시작되었습니다.");
  };

  const finalizeGameIfNeeded = async (nextGame: GameState) => {
    if (!nextGame) return false;

    const alive = getAlivePlayers(nextGame.turnOrder, nextGame.playerStates);

    if (alive.length === 1) {
      const winnerId = alive[0];
      const nextPlayerStates = {
        ...nextGame.playerStates,
        [winnerId]: {
          ...nextGame.playerStates[winnerId],
          chips: nextGame.playerStates[winnerId].chips + nextGame.pot,
        },
      };

      await updateDoc(doc(db, "rooms", roomId, "game", "state"), {
        stage: "finished",
        turn: null,
        winnerIds: [winnerId],
        playerStates: nextPlayerStates,
      });

      const winnerName =
        players.find((p) => p.id === winnerId)?.name ?? "승자";
      await logSystem(`${winnerName} 승리. 팟 ${nextGame.pot} 획득`);
      return true;
    }

    if (everyoneMatched(nextGame)) {
      const aliveIds = getAlivePlayers(nextGame.turnOrder, nextGame.playerStates);

      let winners = [aliveIds[0]];
      let bestScore = bestFiveOfSeven(nextGame.hands[aliveIds[0]]).score;

      for (const id of aliveIds.slice(1)) {
        const score = bestFiveOfSeven(nextGame.hands[id]).score;
        const cmp = compareScoreArrays(score, bestScore);

        if (cmp > 0) {
          winners = [id];
          bestScore = score;
        } else if (cmp === 0) {
          winners.push(id);
        }
      }

      const share = Math.floor(nextGame.pot / winners.length);
      const nextPlayerStates = { ...nextGame.playerStates };

      for (const winnerId of winners) {
        nextPlayerStates[winnerId] = {
          ...nextPlayerStates[winnerId],
          chips: nextPlayerStates[winnerId].chips + share,
        };
      }

      await updateDoc(doc(db, "rooms", roomId, "game", "state"), {
        stage: "finished",
        turn: null,
        winnerIds: winners,
        playerStates: nextPlayerStates,
      });

      const labels = winners.map((winnerId) => {
        const playerName =
          players.find((p) => p.id === winnerId)?.name ?? "승자";
        const label = scoreLabel(bestFiveOfSeven(nextGame.hands[winnerId]).score);
        return `${playerName}(${label})`;
      });

      await logSystem(`쇼다운 결과: ${labels.join(", ")} 승리`);
      return true;
    }

    return false;
  };

  const handleCheck = async () => {
    if (!game || !isMyTurn || !myState) return;
    if (myState.bet !== game.currentBet) return;

    const nextGame: GameState = {
      ...game,
      acted: [...new Set([...(game.acted ?? []), playerId])],
    };

    const ended = await finalizeGameIfNeeded(nextGame);
    if (ended) return;

    const nextTurn = getNextTurn(nextGame.turnOrder, playerId, nextGame.playerStates);

    await updateDoc(doc(db, "rooms", roomId, "game", "state"), {
      acted: nextGame.acted,
      turn: nextTurn,
    });

    await logSystem(`${name} 체크`);
  };

  const handleCall = async () => {
    if (!game || !isMyTurn || !myState) return;

    const need = Math.max(0, game.currentBet - myState.bet);
    if (need === 0) {
      await handleCheck();
      return;
    }
    if (myState.chips < need) return;

    const nextGame: GameState = {
      ...game,
      pot: game.pot + need,
      playerStates: {
        ...game.playerStates,
        [playerId]: {
          ...myState,
          chips: myState.chips - need,
          bet: myState.bet + need,
          folded: false,
        },
      },
      acted: [...new Set([...(game.acted ?? []), playerId])],
    };

    const ended = await finalizeGameIfNeeded(nextGame);
    if (ended) return;

    const nextTurn = getNextTurn(nextGame.turnOrder, playerId, nextGame.playerStates);

    await updateDoc(doc(db, "rooms", roomId, "game", "state"), {
      pot: nextGame.pot,
      playerStates: nextGame.playerStates,
      acted: nextGame.acted,
      turn: nextTurn,
    });

    await logSystem(`${name} 콜 ${need}`);
  };

  const handleRaise = async () => {
    if (!game || !isMyTurn || !myState) return;

    const raiseBy = Math.max(1, raiseInput);
    const targetBet = game.currentBet + raiseBy;
    const need = targetBet - myState.bet;

    if (myState.chips < need) return;

    const nextGame: GameState = {
      ...game,
      pot: game.pot + need,
      currentBet: targetBet,
      playerStates: {
        ...game.playerStates,
        [playerId]: {
          ...myState,
          chips: myState.chips - need,
          bet: targetBet,
          folded: false,
        },
      },
      acted: [playerId],
    };

    const nextTurn = getNextTurn(nextGame.turnOrder, playerId, nextGame.playerStates);

    await updateDoc(doc(db, "rooms", roomId, "game", "state"), {
      pot: nextGame.pot,
      currentBet: nextGame.currentBet,
      playerStates: nextGame.playerStates,
      acted: nextGame.acted,
      turn: nextTurn,
    });

    await logSystem(`${name} 레이즈 +${raiseBy}`);
  };

  const handleFold = async () => {
    if (!game || !isMyTurn || !myState) return;

    const nextGame: GameState = {
      ...game,
      playerStates: {
        ...game.playerStates,
        [playerId]: {
          ...myState,
          folded: true,
        },
      },
      acted: [...new Set([...(game.acted ?? []), playerId])],
    };

    const ended = await finalizeGameIfNeeded(nextGame);
    if (ended) return;

    const nextTurn = getNextTurn(nextGame.turnOrder, playerId, nextGame.playerStates);

    await updateDoc(doc(db, "rooms", roomId, "game", "state"), {
      playerStates: nextGame.playerStates,
      acted: nextGame.acted,
      turn: nextTurn,
    });

    await logSystem(`${name} 폴드`);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "center",
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: 32 }}>Seven Poker Room</h1>
            <p style={{ marginTop: 8, color: "#94a3b8" }}>roomId: {roomId}</p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={startGame} style={buttonStyle("white", "black")}>
              새 게임 시작
            </button>

            <Link
              href="/"
              style={{
                textDecoration: "none",
                background: "#334155",
                color: "white",
                padding: "10px 14px",
                borderRadius: 12,
                fontWeight: 700,
              }}
            >
              로비로
            </Link>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 20,
          }}
        >
          <section
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 20,
              padding: 20,
            }}
          >
            <h2 style={{ marginTop: 0 }}>플레이어</h2>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 8 }}>내 이름</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  height: 42,
                  borderRadius: 12,
                  border: "1px solid #475569",
                  background: "#0f172a",
                  color: "white",
                  padding: "0 12px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
              {players.map((player) => {
                const state = game?.playerStates?.[player.id];
                const isTurn = game?.turn === player.id;
                const isWinner = game?.winnerIds?.includes(player.id);

                return (
                  <div
                    key={player.id}
                    style={{
                      background: "#0f172a",
                      border: isWinner
                        ? "2px solid #facc15"
                        : isTurn
                        ? "2px solid #22c55e"
                        : "1px solid #334155",
                      borderRadius: 14,
                      padding: 12,
                    }}
                  >
                    <div style={{ fontWeight: 700 }}>{player.name}</div>
                    <div style={{ color: "#94a3b8", marginTop: 4 }}>
                      {player.id === playerId ? "나" : "참가자"}
                    </div>
                    <div style={{ color: "#94a3b8", marginTop: 4 }}>
                      칩: {state?.chips ?? "-"}
                    </div>
                    <div style={{ color: "#94a3b8", marginTop: 4 }}>
                      베팅: {state?.bet ?? "-"}
                    </div>
                    <div style={{ color: "#94a3b8", marginTop: 4 }}>
                      상태: {state?.folded ? "폴드" : isWinner ? "승리" : isTurn ? "턴" : "대기"}
                    </div>

                    {game?.hands?.[player.id] && (
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                        {(player.id === playerId
                          ? game.hands[player.id]
                          : maskOpponentCards(game.hands[player.id], game.stage)
                        ).map((card, index) => (
                          <span
                            key={`${player.id}-${card}-${index}`}
                            style={{
                              background: card === "🂠" ? "#334155" : "white",
                              color: card === "🂠" ? "white" : "black",
                              padding: "6px 8px",
                              borderRadius: 8,
                              fontWeight: 700,
                            }}
                          >
                            {card}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                background: "#14532d",
                borderRadius: 20,
                padding: 16,
                border: "2px solid #166534",
              }}
            >
              <h3 style={{ marginTop: 0 }}>게임 상태</h3>
              <div style={{ color: "#dcfce7", marginBottom: 8 }}>
                단계: {game?.stage ?? "-"}
              </div>
              <div style={{ color: "#dcfce7", marginBottom: 8 }}>
                팟: {game?.pot ?? 0}
              </div>
              <div style={{ color: "#dcfce7", marginBottom: 8 }}>
                현재 베팅: {game?.currentBet ?? 0}
              </div>
              <div style={{ color: "#dcfce7", marginBottom: 8 }}>
                액션 완료 수: {game?.acted?.length ?? 0}
              </div>
              <div style={{ color: "#dcfce7", marginBottom: 14 }}>
                현재 턴: {players.find((p) => p.id === game?.turn)?.name ?? "-"}
              </div>

              {game && myCards.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <h3 style={{ marginTop: 0 }}>내 카드</h3>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {myCards.map((card, index) => (
                      <span
                        key={`${card}-${index}`}
                        style={{
                          background: "white",
                          color: "black",
                          padding: "8px 10px",
                          borderRadius: 10,
                          fontWeight: 700,
                        }}
                      >
                        {card}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  onClick={handleCheck}
                  disabled={!isMyTurn || !game || game.stage !== "betting"}
                  style={buttonStyle("#e2e8f0", "black", !isMyTurn || game?.stage !== "betting")}
                >
                  체크
                </button>

                <button
                  onClick={handleCall}
                  disabled={!isMyTurn || !game || game.stage !== "betting"}
                  style={buttonStyle("#e2e8f0", "black", !isMyTurn || game?.stage !== "betting")}
                >
                  콜
                </button>

                <button
                  onClick={handleFold}
                  disabled={!isMyTurn || !game || game.stage !== "betting"}
                  style={buttonStyle("#fecaca", "black", !isMyTurn || game?.stage !== "betting")}
                >
                  폴드
                </button>

                <input
                  type="number"
                  value={raiseInput}
                  onChange={(e) => setRaiseInput(Number(e.target.value || 0))}
                  style={{
                    width: 100,
                    height: 42,
                    borderRadius: 12,
                    border: "1px solid #94a3b8",
                    padding: "0 10px",
                  }}
                />

                <button
                  onClick={handleRaise}
                  disabled={!isMyTurn || !game || game.stage !== "betting"}
                  style={buttonStyle("white", "black", !isMyTurn || game?.stage !== "betting")}
                >
                  레이즈
                </button>
              </div>
            </div>
          </section>

          <aside
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 20,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              minHeight: 720,
            }}
          >
            <h2 style={{ marginTop: 0 }}>실시간 채팅 / 로그</h2>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: 16,
                padding: 12,
                marginBottom: 12,
              }}
            >
              {messages.length === 0 ? (
                <div style={{ color: "#94a3b8" }}>아직 메시지가 없습니다.</div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      padding: 10,
                      borderRadius: 12,
                      background: msg.sender === "시스템" ? "#1f2937" : "#111827",
                      marginBottom: 8,
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{msg.sender}</div>
                    <div style={{ color: "#d1d5db" }}>{msg.text}</div>
                  </div>
                ))
              )}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="메시지를 입력하세요"
                style={{
                  flex: 1,
                  height: 44,
                  borderRadius: 12,
                  border: "1px solid #475569",
                  background: "#0f172a",
                  color: "white",
                  padding: "0 12px",
                }}
              />
              <button
                onClick={sendMessage}
                style={buttonStyle("white", "black")}
              >
                전송
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function buttonStyle(background: string, color: string, disabled = false) {
  return {
    height: 42,
    padding: "0 16px",
    borderRadius: 12,
    border: "none",
    background: disabled ? "#94a3b8" : background,
    color,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
  } as const;
}