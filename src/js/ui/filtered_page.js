import { ExistingTask } from "../core/taskClass";
import TaskManager from "../core/taskManager";
import redHashtagIcon from "../../icons/red_hashtag_icon.svg";
import blueHashtagIcon from "../../icons/blue_hashtag_icon.svg";
import greenHashtagIcon from "../../icons/green_hashtag_icon.svg";
import redAlarmIcon from "../../icons/red_alarm_icon.svg";
import blueAlarmIcon from "../../icons/blue_alarm_icon.svg";
import greenAlarmIcon from "../../icons/green_alarm_icon.svg";
import { format } from "date-fns";
import { openEditTaskDialogBox } from "./edit_task_dialog";
import editIcon from "../../icons/edit_icon.svg";
import { openPreviewTaskDialogBox } from "./preview_task_dialog";

const taskManager = new TaskManager();

const highPriorityColor = "#FF5353";
const mediumPriorityColor = "#5C53FF";
const lowPriorityColor = "#259031ff";

export default function createFilteredPage(pageName) {
  let filteredTasks = [];

  const projects = taskManager.getAllProjects();
  for (const project of projects) {
    let tasksInProject;
    if (pageName === "High Priority Tasks") {
      tasksInProject = project.tasks.filter((task) => task.priority == "High");
    } else if (pageName === "Medium Priority Tasks") {
      tasksInProject = project.tasks.filter(
        (task) => task.priority == "Medium",
      );
    } else if (pageName === "Low Priority Tasks") {
      tasksInProject = project.tasks.filter((task) => task.priority == "Low");
    } else if (pageName === "Completed Tasks") {
      tasksInProject = project.tasks.filter((task) => task.complete);
    } else if (pageName === "Today's Tasks") {
      tasksInProject = project.tasks.filter((task) => {
        const todaysDate = new Date();
        const taskDate = new Date(task.dueDate);

        if (
          todaysDate.getDate() == taskDate.getDate() &&
          todaysDate.getMonth() == taskDate.getMonth() &&
          todaysDate.getFullYear() == taskDate.getFullYear()
        ) {
          return true;
        } else {
          return false;
        }
      });
    } else if (pageName === "Upcoming Tasks") {
      tasksInProject = project.tasks.filter((task) => {
        const todaysDate = new Date();
        const taskDate = new Date(task.dueDate);

        if (
          todaysDate.getDate() < taskDate.getDate() &&
          todaysDate.getDate() - taskDate.getDate() < 14 &&
          todaysDate.getDate() != taskDate.getDate() &&
          todaysDate.getMonth() == taskDate.getMonth() &&
          todaysDate.getFullYear() == taskDate.getFullYear()
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    filteredTasks.push({
      projectID: project.projectID,
      projectName: project.projectName,
      tasks: tasksInProject,
    });
  }

  const contentElement = document.querySelector(".content");
  contentElement.classList.remove("project-page");
  contentElement.classList.add("filtered-page");

  contentElement.innerHTML = /* html */ `
        <div class="filtered-page-header">
            <div class="page-name">${pageName}</div>
        </div>
        <div class="filtered-tasks"></div>
    `;

  populateFilteredTasks(filteredTasks);
}

function getRequiredColorAssets(priority) {
  let returnObject = {};
  if (priority === "High") {
    returnObject = {
      priorityColor: highPriorityColor,
      hashtagIcon: redHashtagIcon,
      alarmIcon: redAlarmIcon,
    };
  } else if (priority === "Medium") {
    returnObject = {
      priorityColor: mediumPriorityColor,
      hashtagIcon: blueHashtagIcon,
      alarmIcon: blueAlarmIcon,
    };
  } else if (priority === "Low") {
    returnObject = {
      priorityColor: lowPriorityColor,
      hashtagIcon: greenHashtagIcon,
      alarmIcon: greenAlarmIcon,
    };
  }
  return returnObject;
}

function createTaskCard(projectID, taskObject) {
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
            <div class="task-due-date">${format(new Date(taskObject.dueDate), "hh:mm aa - dd/MM/yyyy")}</div>
        </div>
        <img src=${editIcon} class="edit-button">
    `;

  const checkboxElement = taskCard.querySelector(`.task-card-checkbox`);
  checkboxElement.addEventListener("click", (event) => {
    console.log(event.target);
    taskManager.updateTask(
      taskObject.taskID,
      new ExistingTask(
        taskObject.taskID,
        taskObject.title,
        taskObject.description,
        taskObject.dueDate,
        taskObject.priority,
        taskObject.notes,
        checkboxElement.checked,
      ),
    );
  });

  const editButton = taskCard.querySelector(".edit-button");
  editButton.addEventListener("click", (event) => {
    console.log(event.target);
    openEditTaskDialogBox(projectID, taskObject.taskID);
  });

  const previewTrigger1 = taskCard.querySelector(".task-hashtag-icon");
  const previewTrigger2 = taskCard.querySelector(".task-title");
  const previewTrigger3 = taskCard.querySelector(".lower-row");

  [previewTrigger1, previewTrigger2, previewTrigger3].forEach(
    (triggerElement) => {
      triggerElement.addEventListener("click", (event) => {
        console.log(event.target);
        openPreviewTaskDialogBox(projectID, taskObject.taskID);
      });
    },
  );

  return taskCard;
}

function populateFilteredTasks(filteredTasks) {
  const filteredTasksContainer = document.querySelector(".filtered-tasks");
  filteredTasksContainer.innerHTML = ``;

  for (const filteredTask of filteredTasks) {
    const projectNameLabel = document.createElement("div");
    projectNameLabel.textContent = filteredTask.projectName;
    projectNameLabel.classList.add("project-name-label");
    if (filteredTask.tasks.length != 0)
      filteredTasksContainer.append(projectNameLabel);
    for (const taskObject of filteredTask.tasks) {
      filteredTasksContainer.append(
        createTaskCard(filteredTask.projectID, taskObject),
      );
    }
  }
}
