const kSlugLength = 6; // e00s00

const pad = (s: number) => `000${s}`.slice(-3);

export const parseSlug = (s: string) => {
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

export const formatSlug = (e: number, s?: number): string => {
  return `E${pad(e + 1)}${s !== undefined ? `S${pad(s)}` : ""}`;
};
