import { mergeResolvers } from "merge-graphql-schemas";

import entity from "./entity.resolver";
import exhibition from "./exhibition.resolver";
import mod from "./mod.resolvers";
import placement from "./placement.resolver";
import ticket from "./ticket.resolver";

export default mergeResolvers([entity, placement, exhibition, mod, ticket]);
