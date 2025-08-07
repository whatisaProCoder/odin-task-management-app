import Task from "../core/taskClass";
import TaskManager from "../core/taskManager";
import menuIcon from "../../icons/menu_icon.svg";
import blueAddIcon from "../../icons/blue_add_icon.svg";
import redHashtagIcon from "../../icons/red_hashtag_icon.svg";
import blueHashtagIcon from "../../icons/blue_hashtag_icon.svg";
import greenHashtagIcon from "../../icons/green_hashtag_icon.svg";
import redAlarmIcon from "../../icons/red_alarm_icon.svg";
import blueAlarmIcon from "../../icons/blue_alarm_icon.svg";
import greenAlarmIcon from "../../icons/green_alarm_icon.svg";
import menuCloseIcon from "../../icons/menu_close_icon.svg";
import { populateProjectSection } from "./sidebar";
import createBlankPage from "./black_page";

const highPriorityColor = "#FF5353";
const mediumPriorityColor = "#5C53FF";
const lowPriorityColor = "#259031ff";

const taskManager = new TaskManager();

export default function createProjectPage(projectID) {
    const projects = taskManager.getAllProjects();
    const project = projects.find((project) => project.projectID == projectID);

    const contentElement = document.querySelector(".content");
    contentElement.classList.add("project-page");
    contentElement.innerHTML = /* html */ `
        <div class="project-page-header">
            <div class="project-name">${project.projectName}</div>
            <img class="project-menu" src="${menuIcon}">
        </div>
        <dialog class="menu-dialog-box" closeby="any">
            <div class="container">
                <div class="dialog-header">
                    Project Menu
                    <img class="menu-close-button" src="${menuCloseIcon}" alt="Project Menu">
                </div>
                <div class="menu-item" id="rename-project">Rename Project</div>
                <div class="menu-item" id="clear-project-tasks">Clear Tasks</div>
                <div class="menu-item" id="delete-project">Delete Project</div>
                <div class="menu-item" id="clear-all-data">Clear All Data</div>
            </div>
        </dialog>
        <dialog class="rename-project-dialog-box" closeby="any">
            <div class="container">
                <div class="dialog-header">
                    Rename Project
                    <img class="menu-close-button" src="${menuCloseIcon}" alt="Project Menu">
                </div>
                <input type="text" class="project-name-input" placeholder="New Project Name">
                <div class="button-group">
                    <div class="submit-button">Save</div> 
                </div>
            </div>
        </dialog>
        <dialog class="add-task-dialog-box scroll-container" closeby="any">
            <div class="container">
                <div class="dialog-header">
                    Add Task
                    <img class="menu-close-button" src="${menuCloseIcon}" alt="Project Menu">
                </div>
                <div class="input-field-label">Project</div>
                <select type="text" id="select-project" class="input-field">
                </select>
                <div class="input-field-label">Title</div>
                <input type="text" id="title-field" class="input-field">
                <div class="input-field-label">Description</div>
                <textarea id="description-field" class="input-field"></textarea>
                <div class="button-group">
                    <div class="submit-button">Save</div> 
                </div>
            </div>
        </dialog>
        <div class="tasks"></div>
        <div class="add-task-item">
            <img class="blue-add-icon" src="${blueAddIcon}">
            Add Task
        </div>
    `;

    handleMenuState(projectID);
    populateTasks(project.tasks);
    handleAddTaskDialogBox(projectID);

    console.log("Project Page created for ID : ", projectID);
}

function handleMenuState(projectID) {
    const menuButton = document.querySelector(".project-menu");
    const projectMenuDialogBox = document.querySelector(".menu-dialog-box");

    menuButton.addEventListener("click", (event) => {
        console.log(event.target);
        projectMenuDialogBox.showModal();
    });

    const menuCloseButton = projectMenuDialogBox.querySelector(".menu-close-button");
    menuCloseButton.addEventListener("click", (event) => {
        console.log(event);
        projectMenuDialogBox.close();
    });

    projectMenuDialogBox.querySelector("#clear-project-tasks").addEventListener("click", (event) => {
        console.log(event.target);
        taskManager.removeAllTasksInProject(projectID);
        projectMenuDialogBox.close();
        createProjectPage(projectID);
    });

    projectMenuDialogBox.querySelector("#delete-project").addEventListener("click", (event) => {
        console.log(event.target);
        taskManager.removeProject(projectID);
        projectMenuDialogBox.close();
        populateProjectSection();
        createBlankPage();
    });

    projectMenuDialogBox.querySelector("#clear-all-data").addEventListener("click", (event) => {
        console.log(event.target);
        taskManager.clearAllData();
        projectMenuDialogBox.close();
        populateProjectSection();
        createBlankPage();
    });

    projectMenuDialogBox.querySelector("#rename-project").addEventListener("click", (event) => {
        console.log(event.target);

        projectMenuDialogBox.close();

        const renameProjectDialogBox = document.querySelector(".rename-project-dialog-box");
        renameProjectDialogBox.showModal();

        const menuCloseButton = renameProjectDialogBox.querySelector(".menu-close-button");
        menuCloseButton.addEventListener("click", (event) => {
            renameProjectDialogBox.close();
        });

        const submitButton = renameProjectDialogBox.querySelector(".submit-button");
        const projectInputField = renameProjectDialogBox.querySelector(".project-name-input");
        submitButton.addEventListener("click", (event) => {
            console.log(event.target);

            if (projectInputField.value != "") {
                renameProjectDialogBox.close();
                taskManager.renameProject(projectID, projectInputField.value);
                projectMenuDialogBox.close();
                populateProjectSection();
                createProjectPage(projectID);
            }
        });
    });
}

function getRequiredColorAssets(priority) {
    let returnObject = {};
    if (priority === "High") {
        returnObject = { priorityColor: highPriorityColor, hashtagIcon: redHashtagIcon, alarmIcon: redAlarmIcon };
    } else if (priority === "Medium") {
        returnObject = { priorityColor: mediumPriorityColor, hashtagIcon: blueHashtagIcon, alarmIcon: blueAlarmIcon };
    } else if (priority === "Low") {
        returnObject = { priorityColor: lowPriorityColor, hashtagIcon: greenHashtagIcon, alarmIcon: greenAlarmIcon };
    }
    return returnObject;
}

function createTaskCard(taskObject) {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    const assets = getRequiredColorAssets(taskObject.priority);

    taskCard.innerHTML = /* html */ `
        <div class="upper-row">
            <input type="checkbox" ${taskObject.complete ? "checked" : ""}  class="task-card-checkbox" style="accent-color: ${assets.priorityColor}">
            <img class="task-hashtag-icon" src="${assets.hashtagIcon}">
            <div class="task-title">
                ${taskObject.title}
            </div>
        </div>
        <div class="lower-row">
            <img class="task-alarm-icon" src="${assets.alarmIcon}">
            <div class="task-due-date">${taskObject.dueDate}</div>
        </div>
    `;

    const checkboxElement = taskCard.querySelector(`.task-card-checkbox`);
    checkboxElement.addEventListener("click", (event) => {
        console.log(event.target);
        taskManager.updateTask(taskObject.taskID, new Task(
            taskObject.title,
            taskObject.description,
            taskObject.dueDate,
            taskObject.priority,
            taskObject.notes,
            checkboxElement.checked,
        ));
    });

    return taskCard;
}

function populateTasks(tasksArray) {
    const tasksContainer = document.querySelector(".tasks");
    tasksContainer.innerHTML = ``;

    tasksArray.forEach(taskObject => {
        tasksContainer.append(createTaskCard(taskObject));
    });
}

function handleAddTaskDialogBox(projectID) {
    const addTaskDialogBox = document.querySelector(".add-task-dialog-box");
    const addTaskItem = document.querySelector(".add-task-item");

    addTaskItem.addEventListener("click", (event) => {
        console.log(event.target);
        addTaskDialogBox.showModal();
    })

    const closeButton = addTaskDialogBox.querySelector(".menu-close-button");
    closeButton.addEventListener("click", (event) => {
        console.log(event.target);
        addTaskDialogBox.close();
    })

    const getProjectOptions = () => {
        const container = document.createElement("div");
        const projects = taskManager.getAllProjects();
        for (const project of projects) {
            const option = document.createElement("option");
            option.value = project.projectID;
            option.textContent = project.projectName;
            container.append(option);
        }
        return container.innerHTML;
    }

    const selectProjectInputField = document.querySelector("#select-project");
    selectProjectInputField.innerHTML = /* html */ `
        <option value="" disabled selected hidden>Select Project</option>
        ${getProjectOptions()}
    `;
}