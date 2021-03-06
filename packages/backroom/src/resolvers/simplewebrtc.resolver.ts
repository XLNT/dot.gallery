import { QueryResolvers } from "../resolvers-types";
import { sign } from "jsonwebtoken";

const userDataToken: QueryResolvers["userDataToken"] = async (
  root,
  args,
  { currentEntity },
) =>
  sign(
    {
      id: currentEntity.id,
      handle: currentEntity.handle,
    },
    process.env.SIMPLEWEBRTC_API_SECRET,
    { expiresIn: "7d" },
  );

export default {
  Query: {
    userDataToken,
  },
};
