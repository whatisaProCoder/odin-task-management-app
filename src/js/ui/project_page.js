import TaskManager from "../core/taskManager";
import menuIcon from "../../icons/menu_icon.svg";
import blueAddIcon from "../../icons/blue_add_icon.svg";
import redHashtagIcon from "../../icons/red_hashtag_icon.svg";
import blueHashtagIcon from "../../icons/blue_hashtag_icon.svg";
import greenHashtagIcon from "../../icons/green_hashtag_icon.svg";
import redAlarmIcon from "../../icons/red_alarm_icon.svg";
import blueAlarmIcon from "../../icons/blue_alarm_icon.svg";
import greenAlarmIcon from "../../icons/green_alarm_icon.svg";

const highPriorityColor = "#FF5353";
const mediumPriorityColor = "#5C53FF";
const lowPriorityColor = "#08C81F";

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
        <div class="tasks"></div>
        <div class="add-task-item">
            <img class="blue-add-icon" src="${blueAddIcon}">
            Add Task
        </div>
    `;

    populateTasks(project.tasks);

    console.log("Project Page created for ID : ", projectID);
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
    checkboxElement.addEventListener("change", (event) => {
        console.log(event.target);
        taskObject.complete = checkboxElement.checked;
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