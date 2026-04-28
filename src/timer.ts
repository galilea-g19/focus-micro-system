import * as cliProgress from "cli-progress";
const { SingleBar } = cliProgress;

import chalk from "chalk";
import { getMessageForMinute } from "./messages.js";

// Formatea segundos a mm:ss
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

    // Barra de progreso (solo si se pide y no está en modo quiet)
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
      const elapsed = seconds - remaining; // tiempo transcurrido
      const minute = Math.floor(elapsed / 60);

      // Actualizar barra
      if (bar) bar.update(elapsed);

      // Mostrar mensaje motivacional cada minuto (excepto minuto 0)
      if (
        !options.quiet &&
        minute > currentMinute &&
        minute > 0 &&
        minute <= 5
      ) {
        currentMinute = minute;
        const msg = getMessageForMinute(minute, options.task);
        // Salto de línea limpio sin romper la barra
        console.log(`\n ${pink(msg)}`);
        // No es necesario reescribir la barra; 'cli-progress' la mantiene en la línea anterior
      }

      // Mostrar tiempo restante (opcional, útil si no hay barra o en modo quiet)
      if (!options.showProgress || options.quiet) {
        const remainingFormatted = formatTime(remaining);
        process.stdout.write(`\r⏱ Tiempo restante: ${remainingFormatted}   `);
      }

      // Finalización
      if (remaining === 0) {
        clearInterval(interval);
        if (bar) bar.stop();
        if (!options.quiet) {
          console.log(chalk.green("\n¡Tiempo completado!"));
          process.stdout.write("\x07"); // Beep (solo si terminal lo soporta)
        }
        resolve(true);
      }
    }, 1000);

    // Capturar tecla para cancelar (solo en terminal interactiva)
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
