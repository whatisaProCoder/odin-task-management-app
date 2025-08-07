import accentAlarmIcon from "../../icons/accent_alarm_icon.svg";
import notesIcon from "../../icons/notes_icon.svg";
import priorityIcon from "../../icons/priority_icon.svg";
import menuCloseIcon from "../../icons/menu_close_icon.svg";
import TaskManager from "../core/taskManager";

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
                    <div class="input-field-label">Project</div>
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
                        <option value="" disabled selected hidden>Select Level</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
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

export function handleAddTaskDialogBox(triggerElementClass) {
    const addTaskDialogBox = document.querySelector(".add-task-dialog-box");
    const trigger = document.querySelector(triggerElementClass);

    trigger.addEventListener("click", (event) => {
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

    return addTaskDialogBox;
}