import * as path from "path";
import { fileLoader, mergeResolvers } from "merge-graphql-schemas";

export default mergeResolvers(fileLoader(path.join(__dirname, "."), { recursive: true }));
