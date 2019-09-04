import { createContainer } from "unstated-next";
import useStorage from "hook/useStorage";

export default createContainer(() => useStorage("entityToken", null));
