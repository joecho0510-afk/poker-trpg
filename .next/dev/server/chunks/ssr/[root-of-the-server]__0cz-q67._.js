module.exports = [
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/src/lib/firebase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__b4__as__getFirestore$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-abbd8850.node.mjs [app-ssr] (ecmascript) <export b4 as getFirestore>");
;
;
const firebaseConfig = {
    apiKey: "AIzaSyBi_Eev_DMzfgD7hUTX8b-oCt2o4gIUfby",
    authDomain: "trpg-poker-room.firebaseapp.com",
    projectId: "trpg-poker-room",
    storageBucket: "trpg-poker-room.firebasestorage.app",
    messagingSenderId: "579713331817",
    appId: "1:579713331817:web:c456e6b817660351e6e8f8"
};
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(firebaseConfig);
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__b4__as__getFirestore$3e$__["getFirestore"])(app);
}),
"[project]/src/components/PokerRoom.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PokerRoom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__aX__as__collection$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-abbd8850.node.mjs [app-ssr] (ecmascript) <export aX as collection>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a7__as__doc$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-abbd8850.node.mjs [app-ssr] (ecmascript) <export a7 as doc>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__b8__as__serverTimestamp$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-abbd8850.node.mjs [app-ssr] (ecmascript) <export b8 as serverTimestamp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const SUITS = [
    "♠",
    "♥",
    "♦",
    "♣"
];
const RANKS = [
    "A",
    "K",
    "Q",
    "J",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2"
];
function createDeck() {
    const deck = [];
    for (const suit of SUITS){
        for (const rank of RANKS){
            deck.push(`${rank}${suit}`);
        }
    }
    return deck.sort(()=>Math.random() - 0.5);
}
function getPlayerId() {
    const key = "trpg_player_id";
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const created = crypto.randomUUID();
    localStorage.setItem(key, created);
    return created;
}
function parseCard(card) {
    const suit = card.slice(-1);
    const rankLabel = card.slice(0, -1);
    const rankMap = {
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
        "2": 2
    };
    return {
        raw: card,
        suit,
        rank: rankMap[rankLabel]
    };
}
function combinations(arr, k) {
    const result = [];
    function helper(start, path) {
        if (path.length === k) {
            result.push([
                ...path
            ]);
            return;
        }
        for(let i = start; i < arr.length; i++){
            path.push(arr[i]);
            helper(i + 1, path);
            path.pop();
        }
    }
    helper(0, []);
    return result;
}
function compareScoreArrays(a, b) {
    const len = Math.max(a.length, b.length);
    for(let i = 0; i < len; i++){
        const av = a[i] ?? -1;
        const bv = b[i] ?? -1;
        if (av > bv) return 1;
        if (av < bv) return -1;
    }
    return 0;
}
function scoreFive(cards) {
    const parsed = cards.map(parseCard).sort((a, b)=>b.rank - a.rank);
    const ranks = parsed.map((c)=>c.rank);
    const suits = parsed.map((c)=>c.suit);
    const countMap = new Map();
    for (const rank of ranks){
        countMap.set(rank, (countMap.get(rank) ?? 0) + 1);
    }
    const counts = [
        ...countMap.entries()
    ].sort((a, b)=>{
        if (b[1] !== a[1]) return b[1] - a[1];
        return b[0] - a[0];
    });
    const flush = suits.every((s)=>s === suits[0]);
    const uniqueRanks = [
        ...new Set(ranks)
    ].sort((a, b)=>b - a);
    let straight = false;
    let straightHigh = uniqueRanks[0];
    if (uniqueRanks.length === 5) {
        if (uniqueRanks[0] - uniqueRanks[4] === 4) {
            straight = true;
            straightHigh = uniqueRanks[0];
        }
        if (JSON.stringify(uniqueRanks) === JSON.stringify([
            14,
            5,
            4,
            3,
            2
        ])) {
            straight = true;
            straightHigh = 5;
        }
    }
    if (straight && flush) return [
        8,
        straightHigh
    ];
    if (counts[0][1] === 4) return [
        7,
        counts[0][0],
        counts[1][0]
    ];
    if (counts[0][1] === 3 && counts[1][1] === 2) return [
        6,
        counts[0][0],
        counts[1][0]
    ];
    if (flush) return [
        5,
        ...ranks
    ];
    if (straight) return [
        4,
        straightHigh
    ];
    if (counts[0][1] === 3) return [
        3,
        counts[0][0],
        ...counts.slice(1).map(([r])=>r)
    ];
    if (counts[0][1] === 2 && counts[1][1] === 2) {
        const pairRanks = [
            counts[0][0],
            counts[1][0]
        ].sort((a, b)=>b - a);
        return [
            2,
            ...pairRanks,
            counts[2][0]
        ];
    }
    if (counts[0][1] === 2) return [
        1,
        counts[0][0],
        ...counts.slice(1).map(([r])=>r)
    ];
    return [
        0,
        ...ranks
    ];
}
function bestFiveOfSeven(cards) {
    const all = combinations(cards, 5);
    let best = all[0];
    let bestScore = scoreFive(best);
    for (const combo of all.slice(1)){
        const currentScore = scoreFive(combo);
        if (compareScoreArrays(currentScore, bestScore) > 0) {
            best = combo;
            bestScore = currentScore;
        }
    }
    return {
        best,
        score: bestScore
    };
}
function scoreLabel(score) {
    switch(score[0]){
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
function getAlivePlayers(turnOrder, playerStates) {
    return turnOrder.filter((id)=>playerStates[id] && !playerStates[id].folded);
}
function getNextTurn(turnOrder, currentTurn, playerStates) {
    if (!turnOrder.length) return null;
    if (!currentTurn) return turnOrder[0] ?? null;
    const currentIndex = turnOrder.indexOf(currentTurn);
    for(let i = 1; i <= turnOrder.length; i++){
        const nextId = turnOrder[(currentIndex + i) % turnOrder.length];
        const state = playerStates[nextId];
        if (state && !state.folded) {
            return nextId;
        }
    }
    return null;
}
function everyoneMatched(game) {
    if (!game) return false;
    const alive = getAlivePlayers(game.turnOrder, game.playerStates);
    if (alive.length <= 1) return true;
    const allMatched = alive.every((id)=>game.playerStates[id].bet === game.currentBet);
    const allActed = alive.every((id)=>(game.acted ?? []).includes(id));
    return allMatched && allActed;
}
function maskOpponentCards(cards, stage) {
    if (stage === "showdown" || stage === "finished") return cards;
    return cards.map((card, index)=>{
        const hidden = index === 0 || index === 1 || index === 6;
        return hidden ? "🂠" : card;
    });
}
function PokerRoom({ roomId, initialName }) {
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialName || "플레이어");
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [players, setPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [game, setGame] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [raiseInput, setRaiseInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(20);
    const playerId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return "";
        //TURBOPACK unreachable
        ;
    }, []);
    const isMyTurn = game?.turn === playerId;
    const myState = game?.playerStates?.[playerId];
    const myCards = game?.hands?.[playerId] ?? [];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!playerId) return;
        const playerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a7__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "players", playerId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])(playerRef, {
            id: playerId,
            name: name || "플레이어",
            joinedAt: Date.now()
        }, {
            merge: true
        });
    }, [
        roomId,
        playerId,
        name
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__aX__as__collection$3e$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "messages"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["orderBy"])("createdAt", "asc"));
        const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["onSnapshot"])(q, (snapshot)=>{
            const next = snapshot.docs.map((d)=>d.data());
            setMessages(next);
        });
        return ()=>unsub();
    }, [
        roomId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__aX__as__collection$3e$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "players"));
        const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["onSnapshot"])(q, (snapshot)=>{
            const next = snapshot.docs.map((d)=>d.data());
            setPlayers(next);
        });
        return ()=>unsub();
    }, [
        roomId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const gameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a7__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "game", "state");
        const unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["onSnapshot"])(gameRef, (snapshot)=>{
            if (snapshot.exists()) {
                setGame(snapshot.data());
            } else {
                setGame(null);
            }
        });
        return ()=>unsub();
    }, [
        roomId
    ]);
    const sendMessage = async ()=>{
        const text = chatInput.trim();
        if (!text) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__aX__as__collection$3e$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "messages"), {
            id: crypto.randomUUID(),
            sender: name || "플레이어",
            text,
            createdAt: Date.now(),
            createdServerAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__b8__as__serverTimestamp$3e$__["serverTimestamp"])()
        });
        setChatInput("");
    };
    const logSystem = async (text)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__aX__as__collection$3e$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "messages"), {
            id: crypto.randomUUID(),
            sender: "시스템",
            text,
            createdAt: Date.now(),
            createdServerAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__b8__as__serverTimestamp$3e$__["serverTimestamp"])()
        });
    };
    const startGame = async ()=>{
        const deck = createDeck();
        const playersSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__aX__as__collection$3e$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "players"));
        const hands = {};
        const playerStates = {};
        const turnOrder = playersSnapshot.docs.map((playerDoc)=>playerDoc.id);
        playersSnapshot.docs.forEach((playerDoc, i)=>{
            hands[playerDoc.id] = deck.slice(i * 7, i * 7 + 7);
            playerStates[playerDoc.id] = {
                chips: 980,
                bet: 20,
                folded: false
            };
        });
        const firstPlayerId = turnOrder[0] ?? null;
        const antePot = playersSnapshot.docs.length * 20;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a7__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "game", "state"), {
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
            winnerIds: []
        });
        await logSystem("새 게임이 시작되었습니다.");
    };
    const finalizeGameIfNeeded = async (nextGame)=>{
        if (!nextGame) return false;
        const alive = getAlivePlayers(nextGame.turnOrder, nextGame.playerStates);
        if (alive.length === 1) {
            const winnerId = alive[0];
            const nextPlayerStates = {
                ...nextGame.playerStates,
                [winnerId]: {
                    ...nextGame.playerStates[winnerId],
                    chips: nextGame.playerStates[winnerId].chips + nextGame.pot
                }
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a7__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "game", "state"), {
                stage: "finished",
                turn: null,
                winnerIds: [
                    winnerId
                ],
                playerStates: nextPlayerStates
            });
            const winnerName = players.find((p)=>p.id === winnerId)?.name ?? "승자";
            await logSystem(`${winnerName} 승리. 팟 ${nextGame.pot} 획득`);
            return true;
        }
        if (everyoneMatched(nextGame)) {
            const aliveIds = getAlivePlayers(nextGame.turnOrder, nextGame.playerStates);
            let winners = [
                aliveIds[0]
            ];
            let bestScore = bestFiveOfSeven(nextGame.hands[aliveIds[0]]).score;
            for (const id of aliveIds.slice(1)){
                const score = bestFiveOfSeven(nextGame.hands[id]).score;
                const cmp = compareScoreArrays(score, bestScore);
                if (cmp > 0) {
                    winners = [
                        id
                    ];
                    bestScore = score;
                } else if (cmp === 0) {
                    winners.push(id);
                }
            }
            const share = Math.floor(nextGame.pot / winners.length);
            const nextPlayerStates = {
                ...nextGame.playerStates
            };
            for (const winnerId of winners){
                nextPlayerStates[winnerId] = {
                    ...nextPlayerStates[winnerId],
                    chips: nextPlayerStates[winnerId].chips + share
                };
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a7__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "game", "state"), {
                stage: "finished",
                turn: null,
                winnerIds: winners,
                playerStates: nextPlayerStates
            });
            const labels = winners.map((winnerId)=>{
                const playerName = players.find((p)=>p.id === winnerId)?.name ?? "승자";
                const label = scoreLabel(bestFiveOfSeven(nextGame.hands[winnerId]).score);
                return `${playerName}(${label})`;
            });
            await logSystem(`쇼다운 결과: ${labels.join(", ")} 승리`);
            return true;
        }
        return false;
    };
    const handleCheck = async ()=>{
        if (!game || !isMyTurn || !myState) return;
        if (myState.bet !== game.currentBet) return;
        const nextGame = {
            ...game,
            acted: [
                ...new Set([
                    ...game.acted ?? [],
                    playerId
                ])
            ]
        };
        const ended = await finalizeGameIfNeeded(nextGame);
        if (ended) return;
        const nextTurn = getNextTurn(nextGame.turnOrder, playerId, nextGame.playerStates);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a7__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "game", "state"), {
            acted: nextGame.acted,
            turn: nextTurn
        });
        await logSystem(`${name} 체크`);
    };
    const handleCall = async ()=>{
        if (!game || !isMyTurn || !myState) return;
        const need = Math.max(0, game.currentBet - myState.bet);
        if (need === 0) {
            await handleCheck();
            return;
        }
        if (myState.chips < need) return;
        const nextGame = {
            ...game,
            pot: game.pot + need,
            playerStates: {
                ...game.playerStates,
                [playerId]: {
                    ...myState,
                    chips: myState.chips - need,
                    bet: myState.bet + need,
                    folded: false
                }
            },
            acted: [
                ...new Set([
                    ...game.acted ?? [],
                    playerId
                ])
            ]
        };
        const ended = await finalizeGameIfNeeded(nextGame);
        if (ended) return;
        const nextTurn = getNextTurn(nextGame.turnOrder, playerId, nextGame.playerStates);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a7__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "game", "state"), {
            pot: nextGame.pot,
            playerStates: nextGame.playerStates,
            acted: nextGame.acted,
            turn: nextTurn
        });
        await logSystem(`${name} 콜 ${need}`);
    };
    const handleRaise = async ()=>{
        if (!game || !isMyTurn || !myState) return;
        const raiseBy = Math.max(1, raiseInput);
        const targetBet = game.currentBet + raiseBy;
        const need = targetBet - myState.bet;
        if (myState.chips < need) return;
        const nextGame = {
            ...game,
            pot: game.pot + need,
            currentBet: targetBet,
            playerStates: {
                ...game.playerStates,
                [playerId]: {
                    ...myState,
                    chips: myState.chips - need,
                    bet: targetBet,
                    folded: false
                }
            },
            acted: [
                playerId
            ]
        };
        const nextTurn = getNextTurn(nextGame.turnOrder, playerId, nextGame.playerStates);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a7__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "game", "state"), {
            pot: nextGame.pot,
            currentBet: nextGame.currentBet,
            playerStates: nextGame.playerStates,
            acted: nextGame.acted,
            turn: nextTurn
        });
        await logSystem(`${name} 레이즈 +${raiseBy}`);
    };
    const handleFold = async ()=>{
        if (!game || !isMyTurn || !myState) return;
        const nextGame = {
            ...game,
            playerStates: {
                ...game.playerStates,
                [playerId]: {
                    ...myState,
                    folded: true
                }
            },
            acted: [
                ...new Set([
                    ...game.acted ?? [],
                    playerId
                ])
            ]
        };
        const ended = await finalizeGameIfNeeded(nextGame);
        if (ended) return;
        const nextTurn = getNextTurn(nextGame.turnOrder, playerId, nextGame.playerStates);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$abbd8850$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__a7__as__doc$3e$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "rooms", roomId, "game", "state"), {
            playerStates: nextGame.playerStates,
            acted: nextGame.acted,
            turn: nextTurn
        });
        await logSystem(`${name} 폴드`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            minHeight: "100vh",
            background: "#0f172a",
            color: "white",
            padding: 24
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: 1280,
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 16,
                        alignItems: "center",
                        marginBottom: 24,
                        flexWrap: "wrap"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        margin: 0,
                                        fontSize: 32
                                    },
                                    children: "Seven Poker Room"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                    lineNumber: 632,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        marginTop: 8,
                                        color: "#94a3b8"
                                    },
                                    children: [
                                        "roomId: ",
                                        roomId
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                    lineNumber: 633,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/PokerRoom.tsx",
                            lineNumber: 631,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: startGame,
                                    style: buttonStyle("white", "black"),
                                    children: "새 게임 시작"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                    lineNumber: 637,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    style: {
                                        textDecoration: "none",
                                        background: "#334155",
                                        color: "white",
                                        padding: "10px 14px",
                                        borderRadius: 12,
                                        fontWeight: 700
                                    },
                                    children: "로비로"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                    lineNumber: 641,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/PokerRoom.tsx",
                            lineNumber: 636,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/PokerRoom.tsx",
                    lineNumber: 621,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "1.15fr 0.85fr",
                        gap: 20
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            style: {
                                background: "#1e293b",
                                border: "1px solid #334155",
                                borderRadius: 20,
                                padding: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        marginTop: 0
                                    },
                                    children: "플레이어"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                    lineNumber: 672,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: "block",
                                                marginBottom: 8
                                            },
                                            children: "내 이름"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 675,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: name,
                                            onChange: (e)=>setName(e.target.value),
                                            style: {
                                                width: "100%",
                                                height: 42,
                                                borderRadius: 12,
                                                border: "1px solid #475569",
                                                background: "#0f172a",
                                                color: "white",
                                                padding: "0 12px",
                                                boxSizing: "border-box"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 676,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                    lineNumber: 674,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gap: 12,
                                        marginBottom: 20
                                    },
                                    children: players.map((player)=>{
                                        const state = game?.playerStates?.[player.id];
                                        const isTurn = game?.turn === player.id;
                                        const isWinner = game?.winnerIds?.includes(player.id);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: "#0f172a",
                                                border: isWinner ? "2px solid #facc15" : isTurn ? "2px solid #22c55e" : "1px solid #334155",
                                                borderRadius: 14,
                                                padding: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontWeight: 700
                                                    },
                                                    children: player.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 712,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: "#94a3b8",
                                                        marginTop: 4
                                                    },
                                                    children: player.id === playerId ? "나" : "참가자"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 713,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: "#94a3b8",
                                                        marginTop: 4
                                                    },
                                                    children: [
                                                        "칩: ",
                                                        state?.chips ?? "-"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 716,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: "#94a3b8",
                                                        marginTop: 4
                                                    },
                                                    children: [
                                                        "베팅: ",
                                                        state?.bet ?? "-"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 719,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: "#94a3b8",
                                                        marginTop: 4
                                                    },
                                                    children: [
                                                        "상태: ",
                                                        state?.folded ? "폴드" : isWinner ? "승리" : isTurn ? "턴" : "대기"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 21
                                                }, this),
                                                game?.hands?.[player.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: 6,
                                                        flexWrap: "wrap",
                                                        marginTop: 10
                                                    },
                                                    children: (player.id === playerId ? game.hands[player.id] : maskOpponentCards(game.hands[player.id], game.stage)).map((card, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                background: card === "🂠" ? "#334155" : "white",
                                                                color: card === "🂠" ? "white" : "black",
                                                                padding: "6px 8px",
                                                                borderRadius: 8,
                                                                fontWeight: 700
                                                            },
                                                            children: card
                                                        }, `${player.id}-${card}-${index}`, false, {
                                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                                            lineNumber: 732,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 727,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, player.id, true, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 699,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                    lineNumber: 692,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: "#14532d",
                                        borderRadius: 20,
                                        padding: 16,
                                        border: "2px solid #166534"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                marginTop: 0
                                            },
                                            children: "게임 상태"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 760,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: "#dcfce7",
                                                marginBottom: 8
                                            },
                                            children: [
                                                "단계: ",
                                                game?.stage ?? "-"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 761,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: "#dcfce7",
                                                marginBottom: 8
                                            },
                                            children: [
                                                "팟: ",
                                                game?.pot ?? 0
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 764,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: "#dcfce7",
                                                marginBottom: 8
                                            },
                                            children: [
                                                "현재 베팅: ",
                                                game?.currentBet ?? 0
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 767,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: "#dcfce7",
                                                marginBottom: 8
                                            },
                                            children: [
                                                "액션 완료 수: ",
                                                game?.acted?.length ?? 0
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 770,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: "#dcfce7",
                                                marginBottom: 14
                                            },
                                            children: [
                                                "현재 턴: ",
                                                players.find((p)=>p.id === game?.turn)?.name ?? "-"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 773,
                                            columnNumber: 15
                                        }, this),
                                        game && myCards.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: 16
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        marginTop: 0
                                                    },
                                                    children: "내 카드"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 779,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: 8,
                                                        flexWrap: "wrap"
                                                    },
                                                    children: myCards.map((card, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                background: "white",
                                                                color: "black",
                                                                padding: "8px 10px",
                                                                borderRadius: 10,
                                                                fontWeight: 700
                                                            },
                                                            children: card
                                                        }, `${card}-${index}`, false, {
                                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                                            lineNumber: 782,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 780,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 778,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: 8,
                                                flexWrap: "wrap"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleCheck,
                                                    disabled: !isMyTurn || !game || game.stage !== "betting",
                                                    style: buttonStyle("#e2e8f0", "black", !isMyTurn || game?.stage !== "betting"),
                                                    children: "체크"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 800,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleCall,
                                                    disabled: !isMyTurn || !game || game.stage !== "betting",
                                                    style: buttonStyle("#e2e8f0", "black", !isMyTurn || game?.stage !== "betting"),
                                                    children: "콜"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 808,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleFold,
                                                    disabled: !isMyTurn || !game || game.stage !== "betting",
                                                    style: buttonStyle("#fecaca", "black", !isMyTurn || game?.stage !== "betting"),
                                                    children: "폴드"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 816,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: raiseInput,
                                                    onChange: (e)=>setRaiseInput(Number(e.target.value || 0)),
                                                    style: {
                                                        width: 100,
                                                        height: 42,
                                                        borderRadius: 12,
                                                        border: "1px solid #94a3b8",
                                                        padding: "0 10px"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 824,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleRaise,
                                                    disabled: !isMyTurn || !game || game.stage !== "betting",
                                                    style: buttonStyle("white", "black", !isMyTurn || game?.stage !== "betting"),
                                                    children: "레이즈"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 837,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 799,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                    lineNumber: 752,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/PokerRoom.tsx",
                            lineNumber: 664,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            style: {
                                background: "#1e293b",
                                border: "1px solid #334155",
                                borderRadius: 20,
                                padding: 20,
                                display: "flex",
                                flexDirection: "column",
                                minHeight: 720
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        marginTop: 0
                                    },
                                    children: "실시간 채팅 / 로그"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                    lineNumber: 859,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        overflowY: "auto",
                                        background: "#0f172a",
                                        border: "1px solid #334155",
                                        borderRadius: 16,
                                        padding: 12,
                                        marginBottom: 12
                                    },
                                    children: messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: "#94a3b8"
                                        },
                                        children: "아직 메시지가 없습니다."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PokerRoom.tsx",
                                        lineNumber: 873,
                                        columnNumber: 17
                                    }, this) : messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: 10,
                                                borderRadius: 12,
                                                background: msg.sender === "시스템" ? "#1f2937" : "#111827",
                                                marginBottom: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontWeight: 700,
                                                        marginBottom: 4
                                                    },
                                                    children: msg.sender
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 885,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: "#d1d5db"
                                                    },
                                                    children: msg.text
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                                    lineNumber: 886,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, msg.id, true, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 876,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                    lineNumber: 861,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: chatInput,
                                            onChange: (e)=>setChatInput(e.target.value),
                                            onKeyDown: (e)=>{
                                                if (e.key === "Enter") sendMessage();
                                            },
                                            placeholder: "메시지를 입력하세요",
                                            style: {
                                                flex: 1,
                                                height: 44,
                                                borderRadius: 12,
                                                border: "1px solid #475569",
                                                background: "#0f172a",
                                                color: "white",
                                                padding: "0 12px"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 893,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: sendMessage,
                                            style: buttonStyle("white", "black"),
                                            children: "전송"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PokerRoom.tsx",
                                            lineNumber: 910,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/PokerRoom.tsx",
                                    lineNumber: 892,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/PokerRoom.tsx",
                            lineNumber: 848,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/PokerRoom.tsx",
                    lineNumber: 657,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PokerRoom.tsx",
            lineNumber: 620,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/PokerRoom.tsx",
        lineNumber: 612,
        columnNumber: 5
    }, this);
}
function buttonStyle(background, color, disabled = false) {
    return {
        height: 42,
        padding: "0 16px",
        borderRadius: 12,
        border: "none",
        background: disabled ? "#94a3b8" : background,
        color,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer"
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0cz-q67._.js.map