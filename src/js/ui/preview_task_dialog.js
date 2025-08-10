import accentAlarmIcon from "../../icons/accent_alarm_icon.svg";
import notesIcon from "../../icons/notes_icon.svg";
import priorityIcon from "../../icons/priority_icon.svg";
import menuCloseIcon from "../../icons/menu_close_icon.svg";
import TaskManager from "../core/taskManager";
import Task from "../core/taskClass";
import createProjectPage from "./project_page";
import { compareAsc, format } from "date-fns";
import { showAlert } from "./custom_popups";

const taskManager = new TaskManager();

export default function initialisePreviewTaskDialogBox() {
    const previewTaskDialogBox = document.createElement("div");
    previewTaskDialogBox.innerHTML = /* html */ `
                    <dialog class="preview-task-dialog-box" closeby="any">
                <div class="container">
                    <div class="dialog-header">
                        Task
                        <img class="menu-close-button" src="${menuCloseIcon}" alt="Project Menu">
                    </div>
                    <div class="input-field-label" id="select-project-label">Project</div>
                    <input type="text" id="select-project" class="input-field" disabled>
                    <div class="input-field-label">Title</div>
                    <textarea type="text" id="title-field" class="input-field" disabled></textarea>
                    <div class="input-field-label" id="preview-dialog-description-label">Description</div>
                    <textarea id="description-field" class="input-field" disabled></textarea>
                    <div class="icon-label-container">
                        <img src="${accentAlarmIcon}">
                        <div class="input-field-label">Due date and time</div>
                    </div>
                    <input type="datetime-local" id="due-date-field" class="input-field" disabled style="padding-right: 0.375rem;">
                    <div class="icon-label-container">
                        <img src="${priorityIcon}">
                        <div class="input-field-label">Priority</div>
                    </div>
                    <input type="text" id="select-priority" class="input-field" disabled>
                    <div class="icon-label-container" id="preview-dialog-notes-label">
                        <img src="${notesIcon}">
                        <div class="input-field-label">Notes</div>
                    </div>
                    <textarea id="notes-field" class="input-field" disabled></textarea>
                </div>
            </dialog>
    `;

    document.body.append(previewTaskDialogBox);
}

export function openPreviewTaskDialogBox(projectID, taskID) {
    const previewTaskDialogBox = document.querySelector(".preview-task-dialog-box");
    const projectInputField = previewTaskDialogBox.querySelector("#select-project");
    const titleInputField = previewTaskDialogBox.querySelector("#title-field");
    const descriptionField = previewTaskDialogBox.querySelector("#description-field");
    const descriptionFieldLabel = previewTaskDialogBox.querySelector("#preview-dialog-description-label");
    const dueDateField = previewTaskDialogBox.querySelector("#due-date-field");
    const priorityField = previewTaskDialogBox.querySelector("#select-priority");
    const notesField = previewTaskDialogBox.querySelector("#notes-field");
    const notesFieldLabel = previewTaskDialogBox.querySelector("#preview-dialog-notes-label")

    const project = taskManager.getProject(projectID);
    const task = taskManager.getTask(projectID, taskID);

    projectInputField.value = project.projectName;
    titleInputField.value = task.title;
    descriptionField.value = task.description;
    dueDateField.value = task.dueDate;
    priorityField.value = task.priority;
    notesField.value = task.notes;

    if (task.description === "") {
        descriptionField.style.display = "none";
        descriptionFieldLabel.style.display = "none";
    } else {
        descriptionField.style.display = "block";
        descriptionFieldLabel.style.display = "block";
    }

    if (task.notes === "") {
        notesField.style.display = "none";
        notesFieldLabel.style.display = "none";
    } else {
        notesField.style.display = "block";
        notesFieldLabel.style.display = "flex";
    }

    const closeButton = previewTaskDialogBox.querySelector(".menu-close-button");
    const cloneCloseButton = closeButton.cloneNode(true);
    closeButton.replaceWith(cloneCloseButton);
    cloneCloseButton.addEventListener("click", (event) => {
        console.log(event.target);
        previewTaskDialogBox.close();
        clearAllInputFields();
    });

    previewTaskDialogBox.showModal();
}

function clearAllInputFields() {
    const allInputFields = document.querySelectorAll(".input-field");
    allInputFields.forEach(inputField => {
        inputField.value = "";
    });
}