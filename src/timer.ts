import * as cliProgress from "cli-progress";
const { SingleBar } = cliProgress;

import chalk from "chalk";
import { getMessageForMinute } from "./messages.js";

// Format the seconds to mm:ss
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export async function startTimer(
  seconds: number,
  options: { task: string; quiet: boolean; showProgress: boolean },
): Promise<boolean> {
  return new Promise((resolve) => {
    let remaining = seconds;
    let isCancelled = false;
    let currentMinute = 0;
    let bar: cliProgress.SingleBar | null = null;

    // Progress bar (if request it and if not quiet mode)
    if (options.showProgress && !options.quiet) {
      bar = new cliProgress.SingleBar({
        format: `${chalk.green(" Progreso")} |${chalk.cyan("{bar}")}| {percentage}% | {value}/{total} s`,
        barCompleteChar: "█",
        barIncompleteChar: "░",
        hideCursor: true,
      });
      bar.start(seconds, 0);
    }

    const pink = chalk.rgb(255, 58, 183);

    const interval = setInterval(() => {
      if (isCancelled) return;

      remaining--;
      const elapsed = seconds - remaining;
      const minute = Math.floor(elapsed / 60);

      // Actualizar barra
      if (bar) bar.update(elapsed);

      // Show motivational message every minute (except minute 0)
      if (
        !options.quiet &&
        minute > currentMinute &&
        minute > 0 &&
        minute <= 5
      ) {
        currentMinute = minute;
        const msg = getMessageForMinute(minute, options.task);
        // Line break without broke bar
        console.log(`\n ${pink(msg)}`);
      }

      // Show remaining time
      if (!options.showProgress || options.quiet) {
        const remainingFormatted = formatTime(remaining);
        process.stdout.write(`\r⏱ Tiempo restante: ${remainingFormatted}   `);
      }

      // Ending
      if (remaining === 0) {
        clearInterval(interval);
        if (bar) bar.stop();
        if (!options.quiet) {
          console.log(chalk.green("\n¡Tiempo completado!"));
          process.stdout.write("\x07"); // Beep (only if terminal support it)
        }
        resolve(true);
      }
    }, 1000);

    // Capture the key to cancel ( only on interactive terminal)
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.once("data", () => {
        isCancelled = true;
        clearInterval(interval);
        if (bar) bar.stop();
        if (!options.quiet) console.log(chalk.red("\nSesión cancelada"));
        resolve(false);
        process.stdin.setRawMode(false);
        process.stdin.pause();
      });
    }
  });
}
