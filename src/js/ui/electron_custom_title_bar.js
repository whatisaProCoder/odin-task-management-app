import closeIcon from "../../icons/titlebar_close_icon.svg";
import maximizeIcon from "../../icons/titlebar_maximize_icon.svg";
import minimizeIcon from "../../icons/titlebar_minimize_icon.svg";

export default function createTitleBar() {
    const titleBar = document.createElement("div");
    titleBar.classList.add("title-bar");
    titleBar.innerHTML = /* html */ `
        <div class="icon-group">
            <img src="${minimizeIcon}">
            <img src="${maximizeIcon}">
            <img src="${closeIcon}">
        </div>
   `;

    document.body.append(titleBar);
}