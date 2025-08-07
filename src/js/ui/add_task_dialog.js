import accentAlarmIcon from "../../icons/accent_alarm_icon.svg";
import notesIcon from "../../icons/notes_icon.svg";
import priorityIcon from "../../icons/priority_icon.svg";
import menuCloseIcon from "../../icons/menu_close_icon.svg";
import TaskManager from "../core/taskManager";
import Task from "../core/taskClass";
import createProjectPage from "./project_page";
import { compareAsc, format } from "date-fns";

const taskManager = new TaskManager();

export default function initialiseAddTaskDialogBox() {
    const addTaskDialogBox = document.createElement("div");
    addTaskDialogBox.innerHTML = /* html */ `
                    <dialog class="add-task-dialog-box" closeby="any">
                <div class="container">
                    <div class="dialog-header">
                        Add Task
                        <img class="menu-close-button" src="${menuCloseIcon}" alt="Project Menu">
                    </div>
                    <div class="input-field-label" id="select-project-label">Project</div>
                    <select type="text" id="select-project" class="input-field">
                    </select>
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
                        <option value="High" selected>High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <div class="icon-label-container">
                        <img src="${notesIcon}">
                        <div class="input-field-label">Notes</div>
                    </div>
                    <textarea id="notes-field" class="input-field"></textarea>
                    <div class="button-group">
                        <div class="submit-button">Save</div> 
                    </div>
                </div>
            </dialog>
    `;

    document.body.append(addTaskDialogBox);
}

export function handleAddTaskDialogBox(triggerElementClass, projectID) {
    const addTaskDialogBox = document.querySelector(".add-task-dialog-box");
    const trigger = document.querySelector(triggerElementClass);
    const selectProjectInputField = addTaskDialogBox.querySelector("#select-project");

    trigger.addEventListener("click", (event) => {
        console.log(event.target);
        renderProjectField();
        addTaskDialogBox.showModal();
    })

    const closeButton = addTaskDialogBox.querySelector(".menu-close-button");
    const cloneCloseButton = closeButton.cloneNode(true);
    closeButton.replaceWith(cloneCloseButton);
    cloneCloseButton.addEventListener("click", (event) => {
        console.log(event.target);
        addTaskDialogBox.close();
        clearAllInputFields();
    })

    function renderProjectField() {
        if (projectID != null) {
            selectProjectInputField.value = taskManager.getProject(projectID).projectName;
        }

        const getProjectOptions = () => {
            const container = document.createElement("div");
            const projects = taskManager.getAllProjects();
            for (const project of projects) {
                const option = document.createElement("option");
                option.value = project.projectID;
                option.textContent = project.projectName;
                if (projectID === project.projectID) {
                    option.selected = true;
                }
                container.append(option);
            }
            return container;
        }

        selectProjectInputField.innerHTML = /* html */ `
            <option value="" disabled ${projectID === null ? "selected" : ""} hidden>Select Project</option>
        `;
        selectProjectInputField.append(getProjectOptions());
    };

    handleSaveAction(addTaskDialogBox, projectID);
}

function handleSaveAction(dialogBoxReference, projectID) {
    const selectProjectInputField = dialogBoxReference.querySelector("#select-project");
    const titleInputField = dialogBoxReference.querySelector("#title-field");
    const descriptionField = dialogBoxReference.querySelector("#description-field");
    const dueDateField = dialogBoxReference.querySelector("#due-date-field");
    const priorityField = dialogBoxReference.querySelector("#select-priority");
    const notesField = dialogBoxReference.querySelector("#notes-field");

    const handleSubmit = (event) => {
        console.log(event.target);

        if (titleInputField.value == "") {
            alert("Enter title of the task!");
            return;
        }

        if (dueDateField.value == "") {
            alert("Please select date and time of deadline.")
            return;
        }

        if (projectID == null) {
            projectID = selectProjectInputField.value;
        }

        taskManager.addTask(projectID, new Task(
            titleInputField.value,
            descriptionField.value,
            dueDateField.value,
            priorityField.value,
            notesField.value,
            false
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

function clearAllInputFields() {
    const allInputFields = document.querySelectorAll(".input-field");
    allInputFields.forEach(inputField => {
        inputField.value = "";
    });
}