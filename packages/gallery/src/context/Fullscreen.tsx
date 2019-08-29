import { useFullscreen as _useFullscreen } from "@straw-hat/react-fullscreen";
import { createContainer } from "unstated-next";

export default createContainer(() => _useFullscreen(window.document.body));
