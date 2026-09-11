/**
 * Mascara o CPF para manter a "Privacidade por Design".
 * Exemplo: "12345678901" -> "***.456.789-**"
 */
export function maskCpf(cpf: string): string {
  const cleanCpf = cpf.replace(/\D/g, "");
  if (cleanCpf.length !== 11) return "***.***.***-**";
  
  return `***.${cleanCpf.slice(3, 6)}.${cleanCpf.slice(6, 9)}-**`;
}

/**
 * Formata strings de data ISO para o padrão legível PT-BR.
 * Exemplo: "1995-05-15T00:00:00.000Z" -> "15/05/1995"
 */
export function formatDate(dateString: Date | string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Data inválida";

  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date);
}