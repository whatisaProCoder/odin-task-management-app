import sidebarIcon from "../../icons/sidebar_icon.svg";
import addIcon from "../../icons/add_icon.svg";
import todayIcon from "../../icons/today_icon.svg";
import upcomingIcon from "../../icons/upcoming_icon.svg";
import completedIcon from "../../icons/completed_icon.svg";
import redHashtagIcon from "../../icons/red_hashtag_icon.svg";
import blueHashtagIcon from "../../icons/blue_hashtag_icon.svg";
import greenHashtagIcon from "../../icons/green_hashtag_icon.svg";
import projectAddButton from "../../icons/project_add_button.svg";
import blackHashtagIcon from "../../icons/black_hashtag_icon.svg";
import TaskManager from "../core/taskManager"
import createProjectPage from "./project_page";
import menuCloseIcon from "../../icons/menu_close_icon.svg";
import { handleAddTaskDialogBox } from "./add_task_dialog";

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
        <div class="sidebar-item">
            <img class="sidebar-item-icon" src="${todayIcon}">
            Today
        </div>
        <div class="sidebar-item">
            <img class="sidebar-item-icon" src="${upcomingIcon}">
            Upcoming
        </div>
        <div class="sidebar-item">
            <img class="sidebar-item-icon" src="${completedIcon}">
            Completed
        </div>
        <div class="sidebar-section-name">Priority</div>
        <div class="sidebar-item">
            <img class="sidebar-item-icon" src="${redHashtagIcon}">
            High
        </div>
        <div class="sidebar-item">
            <img class="sidebar-item-icon" src="${blueHashtagIcon}">
            Medium
        </div>
        <div class="sidebar-item">
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

    populateProjectSection();

    handleSidebarItemStates();

    handleProjectAddButton();

    handleAddTaskDialogBox(".add-task-button", null);
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
            createProjectPage(project.projectID);
        })
        document.querySelector(".sidebar-projects").append(sidebarProjectElement);
    }

    handleSidebarItemStates();
}

function handleProjectAddButton() {
    const projectAddButton = document.querySelector(".project-section-add-button");
    const addProjectDialogBox = document.querySelector(".add-project-dialog-box");
    const projectNameInput = addProjectDialogBox.querySelector(".project-name-input");
    const submitButton = addProjectDialogBox.querySelector(".submit-button");

    projectAddButton.addEventListener("click", (event) => {
        console.log(event.target);
        addProjectDialogBox.showModal();
    });

    const menuCloseButton = addProjectDialogBox.querySelector(".menu-close-button");
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
    })
}
