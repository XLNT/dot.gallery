export const preloadImage = async (uri: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = event =>
      reject(new Error(`Unable to load ${uri}: ${JSON.stringify(event)}`));
    img.src = uri;
  });
};

export const preloadVideo = async (uri: string): Promise<void> => {
  await fetch(uri, {
    headers: { range: "bytes=0-567139" },
    mode: "cors",
  });
};
