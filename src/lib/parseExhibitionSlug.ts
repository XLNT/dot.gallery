const kSlugLength = 6; // e00s00

export default (s: string) => {
  if (!s || s.length !== kSlugLength) {
    return [];
  }

  try {
    const parts = s.slice(1).split("s");

    return parts.map(sn => parseInt(sn, 10));
  } catch {
    return [];
  }
};
