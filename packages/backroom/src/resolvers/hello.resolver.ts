export default {
  Query: {
    hello: (root, { name }) => `Hello ${name || "World"}`,
  },
};
