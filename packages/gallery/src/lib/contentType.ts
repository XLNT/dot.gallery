export const contentTypeIsImage = (contentType: string) =>
  contentType && contentType.startsWith("image");

export const contentTypeIsVideo = (contentType: string) =>
  contentType && contentType.startsWith("video");
