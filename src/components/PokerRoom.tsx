"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
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
  lastSeen?: number;
  isOnline?: boolean;
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

function renderCardChip(card: string, index: number) {
  const isHidden = card === "🂠";
  const suit = isHidden ? "" : card.slice(-1);
  const isRed = suit === "♥" || suit === "♦";

  return (
    <div
      key={`${card}-${index}`}
      style={{
        width: 52,
        height: 76,
        borderRadius: 12,
        background: isHidden ? "#334155" : "white",
        color: isHidden ? "white" : isRed ? "#dc2626" : "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        border: isHidden ? "1px solid #475569" : "1px solid #cbd5e1",
        boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
      }}
    >
      {card}
    </div>
  );
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
  const [activePlayers, setActivePlayers] = useState<Player[]>([]);
  const [game, setGame] = useState<GameState>(null);
  const [raiseInput, setRaiseInput] = useState(20);

  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const isLeavingRef = useRef(false);
  const heartbeatRef = useRef<number | null>(null);
  const STALE_MS = 30000;

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
        lastSeen: Date.now(),
        isOnline: true,
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

      const now = Date.now();
      setActivePlayers(
        next.filter(
          (p) => (p.lastSeen ?? 0) > now - STALE_MS && p.isOnline !== false
        )
      );
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

  useEffect(() => {
    if (!chatScrollRef.current) return;
    chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!playerId) return;

    const playerRef = doc(db, "rooms", roomId, "players", playerId);

    const sendHeartbeat = () => {
      setDoc(
        playerRef,
        {
          id: playerId,
          name: name || "플레이어",
          lastSeen: Date.now(),
          isOnline: true,
        },
        { merge: true }
      ).catch(() => {});
    };

    sendHeartbeat();
    heartbeatRef.current = window.setInterval(sendHeartbeat, 10000);

    const markOffline = () => {
      updateDoc(playerRef, {
        lastSeen: Date.now(),
        isOnline: false,
      }).catch(() => {});
    };

    window.addEventListener("pagehide", markOffline);
    window.addEventListener("beforeunload", markOffline);

    return () => {
      if (heartbeatRef.current) {
        window.clearInterval(heartbeatRef.current);
      }
      window.removeEventListener("pagehide", markOffline);
      window.removeEventListener("beforeunload", markOffline);
      markOffline();
    };
  }, [roomId, playerId, name]);

  useEffect(() => {
    const cleanup = window.setInterval(async () => {
      const snapshot = await getDocs(collection(db, "rooms", roomId, "players"));
      const now = Date.now();

      for (const staleDoc of snapshot.docs) {
        const data = staleDoc.data() as Player;
        const lastSeen = data.lastSeen ?? 0;

        if (lastSeen < now - STALE_MS || data.isOnline === false) {
          await deleteDoc(staleDoc.ref).catch(() => {});

          if (game?.hands?.[staleDoc.id] || game?.playerStates?.[staleDoc.id]) {
            await removePlayerFromGameState(staleDoc.id).catch(() => {});
          }
        }
      }
    }, 15000);

    return () => window.clearInterval(cleanup);
  }, [roomId, game]);

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

  const removePlayerFromGameState = async (leavingPlayerId: string) => {
    const gameRef = doc(db, "rooms", roomId, "game", "state");
    const gameSnapshot = await getDocs(query(collection(db, "rooms", roomId, "players")));
    void gameSnapshot;

    if (!game) return;

    const nextHands = { ...game.hands };
    delete nextHands[leavingPlayerId];

    const nextPlayerStates = { ...game.playerStates };
    delete nextPlayerStates[leavingPlayerId];

    const nextTurnOrder = game.turnOrder.filter((id) => id !== leavingPlayerId);
    const nextActed = (game.acted ?? []).filter((id) => id !== leavingPlayerId);
    const nextWinnerIds = (game.winnerIds ?? []).filter((id) => id !== leavingPlayerId);

    const nextTurn =
      game.turn === leavingPlayerId
        ? getNextTurn(nextTurnOrder, leavingPlayerId, nextPlayerStates)
        : game.turn;

    await updateDoc(gameRef, {
      hands: nextHands,
      playerStates: nextPlayerStates,
      turnOrder: nextTurnOrder,
      acted: nextActed,
      winnerIds: nextWinnerIds,
      turn: nextTurn ?? null,
    });
  };

  const leaveRoom = async () => {
    if (!playerId) return;
    if (isLeavingRef.current) return;
    isLeavingRef.current = true;

    try {
      await deleteDoc(doc(db, "rooms", roomId, "players", playerId));

      if (game?.hands?.[playerId] || game?.playerStates?.[playerId]) {
        await removePlayerFromGameState(playerId);
      }

      await logSystem(`${name || "플레이어"} 님이 방을 나갔습니다.`);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      isLeavingRef.current = false;
    }
  };

  const clearChat = async () => {
    const snapshot = await getDocs(collection(db, "rooms", roomId, "messages"));
    const batch = writeBatch(db);

    snapshot.docs.forEach((messageDoc) => {
      batch.delete(messageDoc.ref);
    });

    await batch.commit();
    await logSystem("채팅 기록이 삭제되었습니다.");
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
        (activePlayers.find((p) => p.id === winnerId) || players.find((p) => p.id === winnerId))?.name ?? "승자";
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

  const opponentPlayers = activePlayers.filter((p) => p.id !== playerId);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #204134 0%, #0f172a 45%, #0b1120 100%)",
        color: "white",
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "center",
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800 }}>
              Seven Poker Room
            </h1>
            <p style={{ marginTop: 8, color: "#cbd5e1" }}>roomId: {roomId}</p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={startGame} style={buttonStyle("white", "black")}>
              새 게임 시작
            </button>
            <button onClick={clearChat} style={buttonStyle("#e2e8f0", "black")}>
              채팅 비우기
            </button>
            <button onClick={leaveRoom} style={buttonStyle("#fecaca", "black")}>
              방 나가기
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
            gridTemplateColumns: "1fr 380px",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          <section
            style={{
              minHeight: 820,
              background: "rgba(15, 23, 42, 0.72)",
              border: "1px solid rgba(148, 163, 184, 0.16)",
              borderRadius: 28,
              padding: 20,
              boxShadow: "0 12px 36px rgba(0,0,0,0.28)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                position: "relative",
                flex: 1,
                minHeight: 760,
                borderRadius: 32,
                background:
                  "radial-gradient(circle at center, #1d8f53 0%, #166534 45%, #14532d 75%, #0f3d24 100%)",
                border: "10px solid #3f2b1d",
                boxShadow:
                  "inset 0 0 0 2px rgba(255,255,255,0.05), inset 0 30px 60px rgba(255,255,255,0.04)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "6% 10%",
                  border: "2px solid rgba(255,255,255,0.14)",
                  borderRadius: "999px",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  gap: 24,
                  padding: "0 24px",
                  flexWrap: "wrap",
                }}
              >
                {opponentPlayers.map((player) => {
                  const state = game?.playerStates?.[player.id];
                  const isTurn = game?.turn === player.id;
                  const isWinner = game?.winnerIds?.includes(player.id);
                  const cards = game?.hands?.[player.id]
                    ? maskOpponentCards(game.hands[player.id], game.stage)
                    : [];

                  return (
                    <div
                      key={player.id}
                      style={{
                        minWidth: 210,
                        maxWidth: 260,
                        background: "rgba(10, 15, 25, 0.78)",
                        border: isWinner
                          ? "2px solid #facc15"
                          : isTurn
                          ? "2px solid #22c55e"
                          : "1px solid rgba(148,163,184,0.18)",
                        borderRadius: 18,
                        padding: 12,
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
                      }}
                    >
                      <div style={{ fontWeight: 800 }}>{player.name}</div>
                      <div style={{ color: "#94a3b8", marginTop: 4 }}>
                        칩: {state?.chips ?? "-"} · 베팅: {state?.bet ?? "-"}
                      </div>
                      <div style={{ color: "#94a3b8", marginTop: 4 }}>
                        {state?.folded ? "폴드" : isWinner ? "승리" : isTurn ? "턴" : "대기"}
                      </div>

                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                        {cards.map((card, index) => renderCardChip(card, index))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 280,
                  background: "rgba(10, 15, 25, 0.78)",
                  border: "1px solid rgba(148,163,184,0.18)",
                  borderRadius: 22,
                  padding: 18,
                  textAlign: "center",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
                }}
              >
                <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 8 }}>TABLE STATUS</div>
                <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
                  팟 {game?.pot ?? 0}
                </div>
                <div style={{ color: "#cbd5e1", marginBottom: 6 }}>
                  현재 베팅: {game?.currentBet ?? 0}
                </div>
                <div style={{ color: "#cbd5e1", marginBottom: 6 }}>
                  단계: {game?.stage ?? "-"}
                </div>
                <div style={{ color: "#cbd5e1" }}>
                  현재 턴: {(activePlayers.find((p) => p.id === game?.turn) || players.find((p) => p.id === game?.turn))?.name ?? "-"}
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  left: 24,
                  right: 24,
                  bottom: 20,
                }}
              >
                <div
                  style={{
                    background: "rgba(10, 15, 25, 0.82)",
                    border: "2px solid rgba(59,130,246,0.42)",
                    borderRadius: 22,
                    padding: 16,
                    boxShadow: "0 10px 28px rgba(0,0,0,0.24)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 14,
                      flexWrap: "wrap",
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 900 }}>
                        {name}
                      </div>
                      <div style={{ color: "#94a3b8", marginTop: 4 }}>
                        나 · 칩 {myState?.chips ?? "-"} · 베팅 {myState?.bet ?? "-"}
                      </div>
                      <div style={{ color: "#94a3b8", marginTop: 4 }}>
                        상태: {myState?.folded ? "폴드" : isMyTurn ? "턴" : "대기"}
                      </div>
                    </div>

                    <div style={{ color: "#cbd5e1" }}>
                      액션 완료 수: {game?.acted?.length ?? 0}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                    {myCards.map((card, index) => renderCardChip(card, index))}
                  </div>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
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
                      style={{ ...inputStyle, width: 110 }}
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
              </div>
            </div>
          </section>

          <aside
            style={{
              background: "rgba(15, 23, 42, 0.88)",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              borderRadius: 24,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              height: 820,
              minHeight: 820,
              maxHeight: 820,
              overflow: "hidden",
              boxShadow: "0 12px 36px rgba(0,0,0,0.28)",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 14, flexShrink: 0 }}>
              채팅 / 로그
            </h2>

            <div
              ref={chatScrollRef}
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                background: "#0b1220",
                border: "1px solid #243244",
                borderRadius: 18,
                padding: 12,
                marginBottom: 12,
              }}
            >
              {messages.length === 0 ? (
                <div style={{ color: "#94a3b8" }}>아직 메시지가 없습니다.</div>
              ) : (
                messages.map((msg) => {
                  const isSystem = msg.sender === "시스템";

                  return (
                    <div
                      key={msg.id}
                      style={{
                        padding: 12,
                        borderRadius: 14,
                        background: isSystem ? "#1f2937" : "#111827",
                        marginBottom: 10,
                        border: isSystem
                          ? "1px solid rgba(250, 204, 21, 0.18)"
                          : "1px solid rgba(148, 163, 184, 0.08)",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          marginBottom: 6,
                          color: isSystem ? "#fde68a" : "#f8fafc",
                        }}
                      >
                        {msg.sender}
                      </div>
                      <div
                        style={{
                          color: "#d1d5db",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          lineHeight: 1.5,
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="메시지를 입력하세요"
                style={{ ...inputStyle, flex: 1 }}
              />
              <button onClick={sendMessage} style={buttonStyle("white", "black")}>
                전송
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  height: 42,
  borderRadius: 12,
  border: "1px solid #475569",
  background: "#0f172a",
  color: "white",
  padding: "0 12px",
  boxSizing: "border-box",
};

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
    boxShadow: disabled ? "none" : "0 4px 12px rgba(0,0,0,0.18)",
  } as const;
}
