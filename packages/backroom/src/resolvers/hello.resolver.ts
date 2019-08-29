export default {
  Query: {
    hello: (root, { name }) => `Goodbye ${name || "World"}`,
  },
};
