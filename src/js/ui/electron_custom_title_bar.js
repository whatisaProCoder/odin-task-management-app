import closeIcon from "../../icons/titlebar_close_icon.svg";
import maximizeIcon from "../../icons/titlebar_maximize_icon.svg";
import minimizeIcon from "../../icons/titlebar_minimize_icon.svg";
import favicon from "../../icons/favicon.svg";

export default function createTitleBar() {
  const titleBar = document.createElement("div");
  titleBar.classList.add("title-bar");
  titleBar.innerHTML = /* html */ `
        <div class="draggable">
            <img src="${favicon}">
        </div>  
        <div class="icon-group">
            <img id="minimize" src="${minimizeIcon}">
            <img id="maximize" src="${maximizeIcon}">
            <img id="close" src="${closeIcon}">
        </div>
   `;

  document.body.append(titleBar);

  titleBar.querySelector("#minimize").addEventListener("click", (event) => {
    console.log(event.target);
    window.electronAPI.minimize();
  });

  titleBar.querySelector("#maximize").addEventListener("click", (event) => {
    console.log(event.target);
    window.electronAPI.maximize();
  });

  titleBar.querySelector("#close").addEventListener("click", (event) => {
    console.log(event.target);
    window.electronAPI.close();
  });
}
