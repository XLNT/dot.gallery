import { and, inputRule, not, or, rule, shield } from "graphql-shield";

const isEntity = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return !!ctx.entity;
  },
);

const isFormatted = inputRule(yup =>
  yup.object({ name: yup.string().required() }),
);

export default shield({
  Query: {
    // hello: and(isEntity, isFormatted),
  },
});
