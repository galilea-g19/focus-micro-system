#!/usr/bin/env node

import { startTimer } from "./timer";
import * as readline from "readline";
import { program } from "commander";
import chalk from "chalk";
import * as process from "process";

program
  .version("1.0.2")
  .description("Focus Micro-System - 5 minutos de enfoque antes de trabajar")
  .option("-m, --minutes <number>", "Duración en minutos", "5")
  .option(
    "-t, --task <string>",
    "Puedes agregar la tarea en la que enfocarás al finalizar",
  )
  .option("-q, --quiet", "Modo silencio (sin mensajes motivaciones)", false)
  .option("--no-progress", "Ocultar barra de progreso", false)
  .option(
    "-c, --color <color>",
    "Color de mensajes: pink, mint, orange, lavende",
    "pink",
  )
  .helpOption("-h, --help");

program.parse(process.argv);
const options = program.opts();

// Fuction to request the task if it's not received througth the CLI
async function askTask(): Promise<string> {
  if (options.task) return options.task;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(chalk.yellow(`¿En qué te vas a enfocar hoy? `), (answer) => {
      rl.close();
      resolve(answer.trim() || "Mis metas");
    });
  });
}

async function main() {
  const durationMinutes = parseInt(options.minutes, 10);
  const task = await askTask();

  console.log(
    chalk.green(
      `\nEnfócate en: "${task}" durante ${durationMinutes} minutos. `,
    ),
  );
  console.log(chalk.gray(`Presiona cualquier tecla para cancelar.. \n`));

  const success = await startTimer(durationMinutes * 60, {
    task: task,
    quiet: options.quiet || false,
    showProgress: options.progress !== false,
    color: options.color,
  });

  if (success) {
    console.log(
      chalk.green(
        `\n ¡Bien! Has completado ${durationMinutes} minutos en "${task}".`,
      ),
    );
    // Aquí puedes guardar la sesión (opcional)
  } else {
    console.log(chalk.red("\n⏹ Sesión cancelada. Vuelve a intentarlo."));
    process.exit(1);
  }
}
main().catch(console.error);
