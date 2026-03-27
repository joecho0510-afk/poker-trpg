
import { Card, Player, Street } from "./types";

const SUITS = ["S", "H", "D", "C"] as const;
const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      const label =
        rank === 14
          ? "A"
          : rank === 13
          ? "K"
          : rank === 12
          ? "Q"
          : rank === 11
          ? "J"
          : String(rank);

      deck.push({
        suit,
        rank,
        code: `${label}${suit}`,
      });
    }
  }

  return shuffle(deck);
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function dealOne(deck: Card[]): { card: Card; deck: Card[] } {
  const [card, ...rest] = deck;
  return { card, deck: rest };
}

export function visibleCards(player: Player, street: Street): Card[] {
  if (street === "third") return player.hand.slice(2, 3);
  if (street === "fourth") return player.hand.slice(2, 4);
  if (street === "fifth") return player.hand.slice(2, 5);
  if (street === "sixth") return player.hand.slice(2, 6);

  if (
    street === "seventh" ||
    street === "showdown" ||
    street === "finished"
  ) {
    return player.hand.slice(2, 6);
  }

  return [];
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

function rankFive(cards: Card[]): number[] {
  const sorted = [...cards].sort((a, b) => b.rank - a.rank);
  const ranks = sorted.map((c) => c.rank);
  const suits = sorted.map((c) => c.suit);

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
  if (counts[0][1] === 3 && counts[1][1] === 2) {
    return [6, counts[0][0], counts[1][0]];
  }
  if (flush) return [5, ...ranks];
  if (straight) return [4, straightHigh];
  if (counts[0][1] === 3) {
    return [3, counts[0][0], ...counts.slice(1).map(([r]) => r)];
  }
  if (counts[0][1] === 2 && counts[1][1] === 2) {
    const pairs = [counts[0][0], counts[1][0]].sort((a, b) => b - a);
    const kicker = counts[2][0];
    return [2, ...pairs, kicker];
  }
  if (counts[0][1] === 2) {
    return [1, counts[0][0], ...counts.slice(1).map(([r]) => r)];
  }

  return [0, ...ranks];
}

function compareRankArrays(a: number[], b: number[]) {
  const len = Math.max(a.length, b.length);

  for (let i = 0; i < len; i++) {
    const av = a[i] ?? -1;
    const bv = b[i] ?? -1;

    if (av > bv) return 1;
    if (av < bv) return -1;
  }

  return 0;
}

export function bestFiveOfSeven(cards: Card[]) {
  const fives = combinations(cards, 5);
  let best = fives[0];
  let bestRank = rankFive(best);

  for (const combo of fives.slice(1)) {
    const current = rankFive(combo);
    if (compareRankArrays(current, bestRank) > 0) {
      best = combo;
      bestRank = current;
    }
  }

  return { bestCards: best, score: bestRank };
}

export function scoreLabel(score: number[]) {
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

export function comparePlayers(a: Player, b: Player) {
  const aBest = bestFiveOfSeven(a.hand);
  const bBest = bestFiveOfSeven(b.hand);
  return compareRankArrays(aBest.score, bBest.score);
}

export function nextStreet(street: Street): Street {
  if (street === "ante") return "third";
  if (street === "third") return "fourth";
  if (street === "fourth") return "fifth";
  if (street === "fifth") return "sixth";
  if (street === "sixth") return "seventh";
  if (street === "seventh") return "showdown";
  if (street === "showdown") return "finished";
  return street;
}