export function getMessageForMinute(minute: number, task: string): string {
  const messages: Record<number, string> = {
    1: `Llevas 1 minuto concentrado en "${task}". Respira hondo.`,
    2: `Minuto 2. Vas bien. Sigue así, no mires el móvil.`,
    3: `¡Mitad del camino! "${task}" te necesita.`,
    4: `Último minuto. Termina fuerte`,
    5: `¡Finalizando! Cierra con broche de oro`,
  };
  return (
    messages[minute] || `Sigue enfocada en ${task}, lo estás haciendo bien.`
  );
}
