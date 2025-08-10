import "./styles.css";
import setupScrollbars from "./js/ui/scrollbar";
import initialiseSidebar from "./js/ui/sidebar";
import createWelcomePage from "./js/ui/welcome_page";
import initialiseAddTaskDialogBox from "./js/ui/add_task_dialog";
import initialiseEditTaskDialogBox from "./js/ui/edit_task_dialog";
import createTitleBar from "./js/ui/electron_custom_title_bar";
import initialisePreviewTaskDialogBox from "./js/ui/preview_task_dialog";

initialiseAddTaskDialogBox();
initialiseEditTaskDialogBox();
initialisePreviewTaskDialogBox();

initialiseSidebar();

createWelcomePage();

setupScrollbars();

console.log("Application successfully initialised!");

// if building electron app
const buildingElectronApp = true;
if (buildingElectronApp) {
    document.body.style.paddingTop = "30px";
    document.body.style.borderRadius = "0.5rem";
    createTitleBar();
}




