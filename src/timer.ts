export function startTimer(seconds: number) {
  let remaining = seconds;

  const interval = setInterval(() => {
    remaining--;
    console.log(`⏱️ Tiempo restante: ${remaining} segundos`);

    if (remaining === 0) {
      clearInterval(interval);
      console.log("✅ ¡Tiempo completado!");
    }
  }, 1000);
}
