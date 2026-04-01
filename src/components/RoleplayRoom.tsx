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

function getPlayerId() {
  const key = "trpg_player_id";
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const created = crypto.randomUUID();
  localStorage.setItem(key, created);
  return created;
}

export default function RoleplayRoom({
  roomId,
  initialName,
}: {
  roomId: string;
  initialName: string;
}) {
  const [name, setName] = useState(initialName || "플레이어");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activePlayers, setActivePlayers] = useState<Player[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const heartbeatRef = useRef<number | null>(null);
  const isLeavingRef = useRef(false);
  const STALE_MS = 30000;

  const playerId = useMemo(() => {
    if (typeof window === "undefined") return "";
    return getPlayerId();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!playerId) return;

    const playerRef = doc(db, "roleplayRooms", roomId, "players", playerId);

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
      collection(db, "roleplayRooms", roomId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const next = snapshot.docs.map((d) => d.data() as ChatMessage);
      setMessages(next);
    });

    return () => unsub();
  }, [roomId]);

  useEffect(() => {
    const q = query(collection(db, "roleplayRooms", roomId, "players"));

    const unsub = onSnapshot(q, (snapshot) => {
      const next = snapshot.docs.map((d) => d.data() as Player);
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
    if (!chatScrollRef.current) return;
    chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!playerId) return;

    const playerRef = doc(db, "roleplayRooms", roomId, "players", playerId);

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
      const snapshot = await getDocs(
        collection(db, "roleplayRooms", roomId, "players")
      );
      const now = Date.now();

      for (const staleDoc of snapshot.docs) {
        const data = staleDoc.data() as Player;
        const lastSeen = data.lastSeen ?? 0;

        if (lastSeen < now - STALE_MS || data.isOnline === false) {
          await deleteDoc(staleDoc.ref).catch(() => {});
        }
      }
    }, 15000);

    return () => window.clearInterval(cleanup);
  }, [roomId]);

  const sendMessage = async () => {
    const text = chatInput.trim();
    if (!text) return;

    await addDoc(collection(db, "roleplayRooms", roomId, "messages"), {
      id: crypto.randomUUID(),
      sender: name || "플레이어",
      text,
      createdAt: Date.now(),
      createdServerAt: serverTimestamp(),
    });

    setChatInput("");
  };

  const clearChat = async () => {
    const snapshot = await getDocs(
      collection(db, "roleplayRooms", roomId, "messages")
    );
    const batch = writeBatch(db);

    snapshot.docs.forEach((messageDoc) => {
      batch.delete(messageDoc.ref);
    });

    await batch.commit();

    await addDoc(collection(db, "roleplayRooms", roomId, "messages"), {
      id: crypto.randomUUID(),
      sender: "시스템",
      text: "채팅 기록이 삭제되었습니다.",
      createdAt: Date.now(),
      createdServerAt: serverTimestamp(),
    });
  };

  const leaveRoom = async () => {
    if (!playerId) return;
    if (isLeavingRef.current) return;
    isLeavingRef.current = true;

    try {
      await deleteDoc(doc(db, "roleplayRooms", roomId, "players", playerId));
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      isLeavingRef.current = false;
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #312e81 0%, #111827 45%, #0b1120 100%)",
        color: "white",
        padding: isMobile ? 12 : 20,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: isMobile ? "stretch" : "center",
            marginBottom: 16,
            flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: isMobile ? 26 : 34,
                fontWeight: 800,
              }}
            >
              Roleplay Room
            </h1>
            <p style={{ marginTop: 8, color: "#cbd5e1", fontSize: isMobile ? 14 : 16 }}>
              roomId: {roomId}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: 8,
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, auto)",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <button onClick={clearChat} style={buttonStyle("#e2e8f0", "black", false, true)}>
              채팅 비우기
            </button>
            <button onClick={leaveRoom} style={buttonStyle("#fecaca", "black", false, true)}>
              방 나가기
            </button>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                background: "#334155",
                color: "white",
                padding: "12px 14px",
                borderRadius: 12,
                fontWeight: 700,
                textAlign: "center",
                minHeight: 46,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gridColumn: isMobile ? "1 / -1" : "auto",
              }}
            >
              로비로
            </Link>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "300px 1fr",
            gap: 16,
          }}
        >
          <section
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              borderRadius: 20,
              padding: isMobile ? 16 : 20,
              boxShadow: "0 12px 36px rgba(0,0,0,0.28)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: isMobile ? 20 : 24 }}>참가자</h2>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 8, fontSize: 14 }}>
                내 이름
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div
              style={{
                display: "grid",
                gap: 10,
                gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr",
              }}
            >
              {activePlayers.map((player) => (
                <div
                  key={player.id}
                  style={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: 14,
                    padding: 12,
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: isMobile ? 14 : 16 }}>
                    {player.name}
                  </div>
                  <div style={{ color: "#94a3b8", marginTop: 4, fontSize: 13 }}>
                    {player.id === playerId ? "나" : "참가자"}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside
            style={{
              background: "rgba(15, 23, 42, 0.88)",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              borderRadius: 20,
              padding: isMobile ? 16 : 20,
              display: "flex",
              flexDirection: "column",
              height: isMobile ? "calc(100vh - 320px)" : 820,
              minHeight: isMobile ? 420 : 820,
              maxHeight: isMobile ? "calc(100vh - 320px)" : 820,
              overflow: "hidden",
              boxShadow: "0 12px 36px rgba(0,0,0,0.28)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: 14,
                flexShrink: 0,
                fontSize: isMobile ? 20 : 24,
              }}
            >
              역극 채팅
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
                          fontSize: isMobile ? 14 : 16,
                        }}
                      >
                        {msg.sender}
                      </div>
                      <div
                        style={{
                          color: "#d1d5db",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          lineHeight: 1.6,
                          fontSize: isMobile ? 14 : 15,
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
                gap: 8,
                flexShrink: 0,
              }}
            >
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="역극 메시지를 입력하세요"
                style={{ ...inputStyle, width: "100%" }}
              />
              <button onClick={sendMessage} style={buttonStyle("white", "black", false, true)}>
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
  width: "100%",
  height: 46,
  borderRadius: 12,
  border: "1px solid #475569",
  background: "#0f172a",
  color: "white",
  padding: "0 12px",
  boxSizing: "border-box",
  fontSize: 16,
};

function buttonStyle(
  background: string,
  color: string,
  disabled = false,
  fullWidth = false
) {
  return {
    height: 46,
    width: fullWidth ? "100%" : "auto",
    padding: "0 16px",
    borderRadius: 12,
    border: "none",
    background: disabled ? "#94a3b8" : background,
    color,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: disabled ? "none" : "0 4px 12px rgba(0,0,0,0.18)",
    fontSize: 15,
  } as const;
}