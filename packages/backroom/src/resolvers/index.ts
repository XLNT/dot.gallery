import { mergeResolvers } from "merge-graphql-schemas";

import entity from "./entity.resolver";
import exhibition from "./exhibition.resolver";
import mod from "./mod.resolvers";
import placeAsset from "./placeAsset.resolver";
import ticket from "./ticket.resolver";

export default mergeResolvers([entity, placeAsset, exhibition, mod, ticket]);
