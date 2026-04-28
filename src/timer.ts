function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;

  const minText = String(minutes).padStart(2, "0");
  const segText = String(restSeconds).padStart(2, "0");

  return `${minText}:${segText}`;
}

export function startTimer(seconds: number) {
  let remaining = seconds;

  const interval = setInterval(() => {
    remaining--;
    let format_time = formatTime(remaining);
    console.log(`⏱️ Tiempo restante: ${format_time} segundos`);

    if (remaining === 0) {
      clearInterval(interval);
      console.log("¡Tiempo completado!");
    }
  }, 1000);
}
