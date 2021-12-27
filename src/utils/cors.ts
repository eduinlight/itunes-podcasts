export function avoidCors(url: string) {
  return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
}
