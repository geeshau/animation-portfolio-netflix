import { HISTORY_KEY, WatchHistory } from "./config";

export function getHistory(): WatchHistory | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as WatchHistory;
  } catch {
    return null;
  }
}

export function saveHistory(history: WatchHistory) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {}
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {}
}
