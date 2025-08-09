import accentAlarmIcon from "../../icons/accent_alarm_icon.svg";
import notesIcon from "../../icons/notes_icon.svg";
import priorityIcon from "../../icons/priority_icon.svg";
import menuCloseIcon from "../../icons/menu_close_icon.svg";
import TaskManager from "../core/taskManager";
import Task, { ExistingTask } from "../core/taskClass";
import createProjectPage from "./project_page";
import { compareAsc, format } from "date-fns";
import { showConfirm } from "./custom_popups";
import { populateProjectSection } from "./sidebar";

const taskManager = new TaskManager();

export default function initialiseEditTaskDialogBox() {
    const editTaskDialogBox = document.createElement("div");
    editTaskDialogBox.innerHTML = /* html */ `
                    <dialog class="edit-task-dialog-box" closeby="any">
                <div class="container">
                    <div class="dialog-header">
                        Edit Task
                        <img class="menu-close-button" src="${menuCloseIcon}" alt="Project Menu">
                    </div>
                    <div class="input-field-label">Title</div>
                    <input type="text" id="title-field" class="input-field">
                    <div class="input-field-label">Description</div>
                    <textarea id="description-field" class="input-field"></textarea>
                    <div class="icon-label-container">
                        <img src="${accentAlarmIcon}">
                        <div class="input-field-label">Add due date and time</div>
                    </div>
                    <input type="datetime-local" id="due-date-field" class="input-field" style="padding-right: 0.375rem;">
                    <div class="icon-label-container">
                        <img src="${priorityIcon}">
                        <div class="input-field-label">Priority</div>
                    </div>
                    <select type="text" id="select-priority" class="input-field">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <div class="icon-label-container">
                        <img src="${notesIcon}">
                        <div class="input-field-label">Notes</div>
                    </div>
                    <textarea id="notes-field" class="input-field"></textarea>
                    <div class="button-group">
                        <div class="delete-button">Delete</div> 
                        <div class="submit-button">Save</div> 
                    </div>
                </div>
            </dialog>
    `;

    document.body.append(editTaskDialogBox);
}

export function openEditTaskDialogBox(projectID, taskID) {
    const editTaskDialogBox = document.querySelector(".edit-task-dialog-box");
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

    handleSaveAction(editTaskDialogBox, projectID, taskID, task.complete);
    handleDeleteAction(editTaskDialogBox, projectID, taskID);
}

function handleSaveAction(dialogBoxReference, projectID, taskID, complete) {
    const titleInputField = dialogBoxReference.querySelector("#title-field");
    const descriptionField = dialogBoxReference.querySelector("#description-field");
    const dueDateField = dialogBoxReference.querySelector("#due-date-field");
    const priorityField = dialogBoxReference.querySelector("#select-priority");
    const notesField = dialogBoxReference.querySelector("#notes-field");

    const handleSubmit = (event) => {
        console.log(event.target);

        if (titleInputField.value == "") {
            showAlert(dialogBoxReference, "Enter title of the task!");
            return;
        }

        if (dueDateField.value == "") {
            showAlert(dialogBoxReference, "Please select date and time of deadline.")
            return;
        }

        if (projectID == null) {
            projectID = selectProjectInputField.value;
        }

        taskManager.updateTask(taskID, new ExistingTask(
            taskID,
            titleInputField.value,
            descriptionField.value,
            dueDateField.value,
            priorityField.value,
            notesField.value,
            complete
        ));
        createProjectPage(projectID);
        clearAllInputFields();


        dialogBoxReference.close();
    };

    const submitButton = dialogBoxReference.querySelector(".submit-button");
    const cloneSubmitButton = submitButton.cloneNode(true);
    submitButton.replaceWith(cloneSubmitButton);

    cloneSubmitButton.addEventListener("click", handleSubmit);
}

function handleDeleteAction(dialogBoxReference, projectID, taskID) {
    async function handleDelete(event) {
        console.log(event.target);
        const userConfirmation = await showConfirm(dialogBoxReference, "Do you want to delete this task?");
        if (userConfirmation) {
            taskManager.removeTask(projectID, taskID);
            createProjectPage(projectID);

            clearAllInputFields();
            dialogBoxReference.close();
        }
    };

    const deleteButton = dialogBoxReference.querySelector(".delete-button");
    const cloneDeleteButton = deleteButton.cloneNode(true);
    deleteButton.replaceWith(cloneDeleteButton);

    cloneDeleteButton.addEventListener("click", handleDelete);
}

function clearAllInputFields() {
    const allInputFields = document.querySelectorAll(".input-field");
    allInputFields.forEach(inputField => {
        inputField.value = "";
    });
}