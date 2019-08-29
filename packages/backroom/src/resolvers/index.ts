import { mergeResolvers } from "merge-graphql-schemas";

import hello from './hello.resolver'

export default mergeResolvers([hello]);
