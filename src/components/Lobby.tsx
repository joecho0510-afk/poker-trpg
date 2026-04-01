"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function getPlayerId() {
  const key = "trpg_player_id";
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const created = crypto.randomUUID();
  localStorage.setItem(key, created);
  return created;
}

export default function Lobby() {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  const [roomType, setRoomType] = useState<"poker" | "roleplay">("poker");

  useEffect(() => {
    getPlayerId();
  }, []);

  const targetRoom = roomCode.trim() || "test-room";
  const encodedName = encodeURIComponent(name.trim() || "플레이어");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 620,
          background: "#1f2937",
          border: "1px solid #374151",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <h1 style={{ fontSize: 32, margin: 0, marginBottom: 8 }}>
          TRPG Room Lobby
        </h1>
        <p style={{ color: "#9ca3af", marginTop: 0 }}>
          포커 방 / 역극 방 선택
        </p>

        <div style={{ marginTop: 20 }}>
          <label style={{ display: "block", marginBottom: 8 }}>닉네임</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="닉네임 입력"
            style={inputStyle}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <label style={{ display: "block", marginBottom: 8 }}>방 코드</label>
          <input
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="예: tavern-01"
            style={inputStyle}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <label style={{ display: "block", marginBottom: 8 }}>방 종류</label>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setRoomType("poker")}
              style={{
                ...choiceButtonStyle,
                background: roomType === "poker" ? "white" : "#374151",
                color: roomType === "poker" ? "black" : "white",
              }}
            >
              포커 방
            </button>
            <button
              onClick={() => setRoomType("roleplay")}
              style={{
                ...choiceButtonStyle,
                background: roomType === "roleplay" ? "white" : "#374151",
                color: roomType === "roleplay" ? "black" : "white",
              }}
            >
              역극 방
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <Link
            href={`/room/${roomType}/${targetRoom}?name=${encodedName}`}
            style={{
              textDecoration: "none",
              background: "white",
              color: "black",
              padding: "12px 16px",
              borderRadius: 12,
              fontWeight: 700,
            }}
          >
            입장
          </Link>
        </div>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 44,
  borderRadius: 12,
  border: "1px solid #4b5563",
  background: "#111827",
  color: "white",
  padding: "0 12px",
  boxSizing: "border-box",
};

const choiceButtonStyle: React.CSSProperties = {
  border: "none",
  padding: "10px 14px",
  borderRadius: 12,
  fontWeight: 700,
  cursor: "pointer",
};