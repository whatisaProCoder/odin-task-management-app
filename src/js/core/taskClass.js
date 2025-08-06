import generateID from "./cryptography";

export default class Task {
    constructor(title, description, dueDate, priority, notes, complete) {
        this.taskID = generateID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.complete = complete;
    }
}