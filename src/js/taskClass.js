export default class Task {
    constructor(title, description, dueDate, priority, notes) {
        this.UUID = generateUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
}