export function getUserAvatar(seed: number | string): string {
  return `https://picsum.photos/seed/at-work-${seed}/600/600`;
}

export function getHeaderAvatar(): string {
  return getUserAvatar('header');
}
