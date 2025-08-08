import "./styles.css";
import setupScrollbars from "./js/ui/scrollbar";
import initialiseSidebar from "./js/ui/sidebar";
import createWelcomePage from "./js/ui/welcome_page";
import initialiseAddTaskDialogBox from "./js/ui/add_task_dialog";
import initialiseEditTaskDialogBox from "./js/ui/edit_task_dialog";



initialiseAddTaskDialogBox();
initialiseEditTaskDialogBox();

initialiseSidebar();

createWelcomePage();

setupScrollbars();

console.log("Application successfully initialised!");

// electron-app custom-title-bar
if (typeof window !== 'undefined' && window.process?.versions?.electron) {
    require('./electron-ui.js');
}

