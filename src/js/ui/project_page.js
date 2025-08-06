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
        <div class="tasks">
            <div class="task-card">
                <div class="upper-row">
                    <input type="checkbox" id="task-checkbox" class="task-card-checkbox" style="accent-color: ${highPriorityColor}">
                    <img class="task-hashtag-icon" src="${redHashtagIcon}">
                    <div class="task-title">
                        Brainstorm the features the app will have
                    </div>
                </div>
                <div class="lower-row">
                    <img class="task-alarm-icon" src="${redAlarmIcon}">
                    <div class="task-due-date">07:30 PM - 04/08/2025</div>
                </div>
            </div>
        </div>
        <div class="add-task-item">
            <img class="blue-add-icon" src="${blueAddIcon}">
            Add Task
        </div>
    `;

    console.log("Project Page created for ID : ", projectID);
}