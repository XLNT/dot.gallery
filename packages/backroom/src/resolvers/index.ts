import { mergeResolvers } from "merge-graphql-schemas";

import entity from "./entity.resolver";

export default mergeResolvers([entity]);
