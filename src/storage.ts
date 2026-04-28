import * as fs from "fs";
import path from "path";

const HISTORY_FILE = path.join(
  process.env.HOME || process.env.USERPROFILE || "",
  ".focus_history.json",
);

export function saveSession(
  task: string,
  durationMinutes: number,
  completed: boolean,
) {
  const history = loadHistory();
  history.push({
    date: new Date().toISOString(),
    task,
    durationMinutes,
    completed,
  });
  // Guardar solo las últimas 50 sesiones
  const trimmed = history.slice(-50);
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(trimmed, null, 2));
}

function loadHistory() {
  try {
    return JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
  } catch {
    return [];
  }
}
