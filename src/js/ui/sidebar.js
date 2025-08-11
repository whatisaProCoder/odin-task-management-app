import sidebarIcon from "../../icons/sidebar_icon.svg";
import globalsidebarIcon from "../../icons/global_menu_icon.svg";
import addIcon from "../../icons/add_icon.svg";
import todayIcon from "../../icons/today_icon.svg";
import upcomingIcon from "../../icons/upcoming_icon.svg";
import completedIcon from "../../icons/completed_icon.svg";
import redHashtagIcon from "../../icons/red_hashtag_icon.svg";
import blueHashtagIcon from "../../icons/blue_hashtag_icon.svg";
import greenHashtagIcon from "../../icons/green_hashtag_icon.svg";
import projectAddButton from "../../icons/project_add_button.svg";
import blackHashtagIcon from "../../icons/black_hashtag_icon.svg";
import TaskManager from "../core/taskManager";
import createProjectPage from "./project_page";
import menuCloseIcon from "../../icons/menu_close_icon.svg";
import { handleAddTaskDialogBox } from "./add_task_dialog";
import createFilteredPage from "./filtered_page";

const taskManager = new TaskManager();

export default function initialiseSidebar() {
  const sidebarElement = document.querySelector(".sidebar");
  sidebarElement.innerHTML = /* html */ `
        <div class="sidebar-heading">
            <div class="brand-name">Polymath</div>
            <img class="sidebar-icon" src="${sidebarIcon}" alt="Toggle Sidebar">
        </div>
        <div class="add-task-button">
            <img class="add-icon" src="${addIcon}">
            Add Task
        </div>
        <div class="sidebar-item" id="todays-tasks-item">
            <img class="sidebar-item-icon" src="${todayIcon}">
            Today
        </div>
        <div class="sidebar-item" id="upcoming-tasks-item">
            <img class="sidebar-item-icon" src="${upcomingIcon}">
            Upcoming
        </div>
        <div class="sidebar-item" id="completed-tasks-item">
            <img class="sidebar-item-icon" src="${completedIcon}">
            Completed
        </div>
        <div class="sidebar-section-name">Priority</div>
        <div class="sidebar-item" id="high-priority-tasks-item">
            <img class="sidebar-item-icon" src="${redHashtagIcon}">
            High
        </div>
        <div class="sidebar-item" id="medium-priority-tasks-item">
            <img class="sidebar-item-icon" src="${blueHashtagIcon}">
            Medium
        </div>
        <div class="sidebar-item" id="low-priority-tasks-item">
            <img class="sidebar-item-icon" src="${greenHashtagIcon}">
            Low
        </div>
        <div class="sidebar-section-name project-section">
            Projects
            <img class="project-section-add-button" src="${projectAddButton}" alt="Add Projects">
        </div>
        <div class="sidebar-projects"></div>
    `;

  const addProjectDialogBox = document.createElement("div");
  addProjectDialogBox.innerHTML = /* html */ `
        <dialog class="add-project-dialog-box" closeby="any">
            <div class="container">
                <div class="dialog-header">
                    Add Project
                    <img class="menu-close-button" src="${menuCloseIcon}" alt="Project Menu">
                </div>
                <input type="text" class="project-name-input" placeholder="Project Name">
                <div class="button-group">
                    <div class="submit-button">Save</div> 
                </div>
            </div>
        </dialog>
    `;

  document.body.append(addProjectDialogBox);

  const globalSidebarToggle = document.createElement("div");
  globalSidebarToggle.classList.add("global-sidebar-toggle");
  globalSidebarToggle.innerHTML = /* html */ `
        <img src="${globalsidebarIcon}" alt="Toggle Sidebar">
    `;
  document.body.append(globalSidebarToggle);

  handleSidebarOpeningClosing();

  handleFilteredSection();

  populateProjectSection();

  handleSidebarItemStates();

  handleProjectAddButton();

  handleAddTaskDialogBox(".add-task-button", null);
}

function handleSidebarOpeningClosing() {
  const sidebarElement = document.querySelector(".sidebar");
  const sidebarButton = document.querySelector(".sidebar-icon");
  const globalSidebarToggle = document.querySelector(".global-sidebar-toggle");

  sidebarButton.addEventListener("click", (event) => {
    console.log(event.target);
    globalSidebarToggle.style.display = "block";
    sidebarElement.classList.add("sidebar-closing");
  });
  globalSidebarToggle.addEventListener("click", (event) => {
    console.log(event.target);
    globalSidebarToggle.style.display = "none";
    sidebarElement.classList.remove("sidebar-closing");
  });
}

function closeSidebarifMobile() {
  const globalSidebarToggle = document.querySelector(".global-sidebar-toggle");
  const sidebarElement = document.querySelector(".sidebar");
  if (window.innerWidth < 750) {
    globalSidebarToggle.style.display = "block";
    sidebarElement.classList.add("sidebar-closing");
  }
}

function handleFilteredSection() {
  const sidebarElement = document.querySelector(".sidebar");
  const todaysTasksItem = sidebarElement.querySelector("#todays-tasks-item");
  const upcomingTasksItem = sidebarElement.querySelector(
    "#upcoming-tasks-item",
  );
  const completedTasksItem = sidebarElement.querySelector(
    "#completed-tasks-item",
  );
  const highPriorityTasksItem = sidebarElement.querySelector(
    "#high-priority-tasks-item",
  );
  const mediumPriorityTasksItem = sidebarElement.querySelector(
    "#medium-priority-tasks-item",
  );
  const lowPriorityTasksItem = sidebarElement.querySelector(
    "#low-priority-tasks-item",
  );

  todaysTasksItem.addEventListener("click", (event) => {
    console.log(event.target);
    closeSidebarifMobile();
    createFilteredPage("Today's Tasks");
  });

  upcomingTasksItem.addEventListener("click", (event) => {
    console.log(event.target);
    closeSidebarifMobile();
    createFilteredPage("Upcoming Tasks");
  });

  completedTasksItem.addEventListener("click", (event) => {
    console.log(event.target);
    closeSidebarifMobile();
    createFilteredPage("Completed Tasks");
  });

  highPriorityTasksItem.addEventListener("click", (event) => {
    console.log(event.target);
    closeSidebarifMobile();
    createFilteredPage("High Priority Tasks");
  });

  mediumPriorityTasksItem.addEventListener("click", (event) => {
    console.log(event.target);
    closeSidebarifMobile();
    createFilteredPage("Medium Priority Tasks");
  });

  lowPriorityTasksItem.addEventListener("click", (event) => {
    console.log(event.target);
    closeSidebarifMobile();
    createFilteredPage("Low Priority Tasks");
  });
}

function handleSidebarItemStates() {
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      console.log(event.target);
      sidebarItems.forEach((item) => {
        item.classList.remove("sidebar-item-active");
      });
      item.classList.add("sidebar-item-active");
    });
  });
}

export function populateProjectSection() {
  const sidebarProjectsSection = document.querySelector(".sidebar-projects");
  sidebarProjectsSection.innerHTML = ``;

  for (const project of taskManager.getAllProjects()) {
    const sidebarProjectElement = document.createElement("div");
    sidebarProjectElement.innerHTML = /* html */ `
            <div class="sidebar-item">
                <img class="sidebar-item-icon" src="${blackHashtagIcon}">
                ${project.projectName}
            </div>
        `;
    sidebarProjectElement.addEventListener("click", (event) => {
      console.log(event.target);
      closeSidebarifMobile();
      createProjectPage(project.projectID);
    });
    document.querySelector(".sidebar-projects").append(sidebarProjectElement);
  }

  handleSidebarItemStates();
}

function handleProjectAddButton() {
  const projectAddButton = document.querySelector(
    ".project-section-add-button",
  );
  const addProjectDialogBox = document.querySelector(".add-project-dialog-box");
  const projectNameInput = addProjectDialogBox.querySelector(
    ".project-name-input",
  );
  const submitButton = addProjectDialogBox.querySelector(".submit-button");

  projectAddButton.addEventListener("click", (event) => {
    console.log(event.target);
    addProjectDialogBox.showModal();
  });

  const menuCloseButton =
    addProjectDialogBox.querySelector(".menu-close-button");
  menuCloseButton.addEventListener("click", (event) => {
    console.log(event.target);
    addProjectDialogBox.close();
    projectNameInput.value = "";
  });

  submitButton.addEventListener("click", (event) => {
    console.log(event.target);
    if (projectNameInput.value != "") {
      taskManager.addProject(projectNameInput.value);
      addProjectDialogBox.close();
      projectNameInput.value = "";
      populateProjectSection();
    }
  });
}
