import { createContainer } from "unstated-next";
import { identity } from "lodash-es";

export default createContainer<string | null, string | null>(identity);
