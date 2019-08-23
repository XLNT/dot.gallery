import { createContainer } from "unstated-next";
import { useFullscreen as _useFullscreen } from "@straw-hat/react-fullscreen";

export default createContainer(() => _useFullscreen(window.document.body));
