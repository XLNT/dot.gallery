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
  Mutation: {
    loginAs: inputRule(yup =>
      yup.object({
        privateKey: yup
          .string()
          .length(66)
          .matches(/^0x[0-9a-fA-F]{64}/)
          .required(),
      }),
    ),
  },
});
