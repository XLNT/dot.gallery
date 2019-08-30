import { ApolloError } from "apollo-server-core";

export class GalleryIsNotOpenError extends ApolloError {
  constructor(props?: Record<string, any>) {
    super("the dot.gallery is closed", "GALLERY_IS_NOT_OPEN", props);
  }
}
