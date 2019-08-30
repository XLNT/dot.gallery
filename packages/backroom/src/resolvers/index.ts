import { mergeResolvers } from "merge-graphql-schemas";

import entity from "./entity.resolver";
import placeAsset from "./placeAsset.resolver";

export default mergeResolvers([entity, placeAsset]);
