export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.toLocaleDateString('pt-BR')} - ${d.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}
