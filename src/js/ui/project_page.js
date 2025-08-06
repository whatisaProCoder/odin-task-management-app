import TaskManager from "../core/taskManager";
import menuIcon from "../../icons/menu_icon.svg";

export default function createProjectPage(projectID) {
    const taskManager = new TaskManager();
    const projects = taskManager.getAllProjects();
    const project = projects.find((project) => project.projectID == projectID);

    const contentElement = document.querySelector(".content");
    contentElement.classList.add("project-page");
    contentElement.innerHTML = /* html */ `
        <div class="project-page-header">
            <div class="project-name">${project.projectName}</div>
            <img class="project-menu" src="${menuIcon}">
        </div>
        <div class="tasks">

        </div>
        <div class="add-task-item">
        Add Task
        </div>
    `;

    console.log("Project Page created for ID : ", projectID);
}