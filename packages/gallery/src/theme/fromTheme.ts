import { get } from "lodash-es";

export default (prop: string) => ({ theme }) => get(theme, prop);
