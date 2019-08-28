const kSlugLength = 6; // e00s00

const pad = (s: number) => `00${s}`.slice(-2);

export const parse = (s: string) => {
  if (!s || s.length !== kSlugLength) {
    return [];
  }

  try {
    const parts = s
      .slice(1)
      .toLowerCase()
      .split("s");

    return parts.map(sn => parseInt(sn, 10));
  } catch {
    return [];
  }
};

export const format = (e: number, s?: number): string => {
  return `E${pad(e)}${s !== undefined ? `S${pad(s)}` : ""}`;
};
