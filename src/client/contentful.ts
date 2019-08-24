import { createClient } from "contentful";

const ACCESS_TOKEN = "j3iP-OndD0_svrJitpbQ2P91xj52xdVuqu7lAcGulo0";
const SPACE_ID = "5ieii38bftgi";

export default createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});
