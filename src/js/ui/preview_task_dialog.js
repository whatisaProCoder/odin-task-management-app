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
                    <select type="text" id="select-project" class="input-field" disabled>
                    </select>
                    <div class="input-field-label">Title</div>
                    <input type="text" id="title-field" class="input-field" disabled>
                    <div class="input-field-label">Description</div>
                    <textarea id="description-field" class="input-field" disabled></textarea>
                    <div class="icon-label-container">
                        <img src="${accentAlarmIcon}">
                        <div class="input-field-label">Add due date and time</div>
                    </div>
                    <input type="datetime-local" id="due-date-field" class="input-field" disabled style="padding-right: 0.375rem;">
                    <div class="icon-label-container">
                        <img src="${priorityIcon}">
                        <div class="input-field-label">Priority</div>
                    </div>
                    <select type="text" id="select-priority" class="input-field" disabled>
                        <option value="" selected disabled hidden>Select Level</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <div class="icon-label-container">
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
    const editTaskDialogBox = document.querySelector(".preview-task-dialog-box");
    const titleInputField = editTaskDialogBox.querySelector("#title-field");
    const descriptionField = editTaskDialogBox.querySelector("#description-field");
    const dueDateField = editTaskDialogBox.querySelector("#due-date-field");
    const priorityField = editTaskDialogBox.querySelector("#select-priority");
    const notesField = editTaskDialogBox.querySelector("#notes-field");

    const task = taskManager.getTask(projectID, taskID);

    titleInputField.value = task.title;
    descriptionField.value = task.description;
    dueDateField.value = task.dueDate;
    priorityField.value = task.priority;
    notesField.value = task.notes;

    const closeButton = editTaskDialogBox.querySelector(".menu-close-button");
    const cloneCloseButton = closeButton.cloneNode(true);
    closeButton.replaceWith(cloneCloseButton);
    cloneCloseButton.addEventListener("click", (event) => {
        console.log(event.target);
        editTaskDialogBox.close();
        clearAllInputFields();
    });

    editTaskDialogBox.showModal();
}

function clearAllInputFields() {
    const allInputFields = document.querySelectorAll(".input-field");
    allInputFields.forEach(inputField => {
        inputField.value = "";
    });
}