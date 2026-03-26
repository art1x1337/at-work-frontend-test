export const createAvatarDataUri = (seed: string) => {
  const safeSeed = seed.slice(0, 2).toUpperCase();
  const palette = ['#7c3aed', '#4f46e5', '#0f766e', '#db2777', '#2563eb', '#f97316'];
  const color = palette[seed.length % palette.length];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="32" fill="${color}" />
      <circle cx="60" cy="46" r="20" fill="rgba(255,255,255,0.18)" />
      <path d="M26 102c5-19 19-31 34-31h0c15 0 29 12 34 31" fill="rgba(255,255,255,0.22)"/>
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="30" font-family="Arial, Helvetica, sans-serif" font-weight="700">${safeSeed}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};
