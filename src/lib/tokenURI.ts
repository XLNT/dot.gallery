export const buildTokenUri = (path: string) =>
  `${document.location.protocol}//${document.location.hostname}:${document.location.port}${path}`;
