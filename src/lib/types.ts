export type Suit = "S" | "H" | "D" | "C";

export type Card = {
  suit: Suit;
  rank: number;
  code: string;
};

export type Street =
  | "waiting"
  | "ante"
  | "third"
  | "fourth"
  | "fifth"
  | "sixth"
  | "seventh"
  | "showdown"
  | "finished";

export type Player = {
  id: string;
  name: string;
  chips: number;
  folded: boolean;
  allIn: boolean;
  bet: number;
  totalCommitted: number;
  hand: Card[];
  seat: number;
  joinedAt: number;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: number;
  system?: boolean;
};

export type GameState = {
  status: "idle" | "playing";
  street: Street;
  deck: Card[];
  pot: number;
  currentBet: number;
  currentTurn: string | null;
  dealerIndex: number;
  bringIn: number;
  baseBet: number;
  ante: number;
  actionCount: number;
  actedPlayerIds: string[];
  winnerIds: string[];
  log: string[];
};

export type RoomDoc = {
  id: string;
  title: string;
  createdAt: number;
  hostId: string;
  players: Player[];
  game: GameState;
};