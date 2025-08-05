import StorageManager from "./storageModule";

export default class Worker {
    constructor() {
        this.storageManager = new StorageManager();
        this.projects = this.storageManager.getData("projects");
        if (this.projects == null) {
            this.projects = [{
                projectID: this.#generateID(),
                projectName: "Example Project",
                tasks: [
                    {
                        taskID: this.#generateID(),
                        title: "Your Task Title",
                        description: "A small description about this task, how you'll go about doing the task, etc.",
                        dueDate: "10:30PM - 7/8/2025",
                        priority: "High",
                        notes: "Some notes you might want to add about this task, and so on."
                    }
                ]
            }];
            this.updateStorage();
        }
        console.log("TaskManager successfully initialised...");
    }

    updateStorage() {
        this.storageManager.setData("projects", this.projects);
    }

    #generateID() {
        return crypto.randomUUID();
    }

    addProject(projectName) {
        const projectObject = {
            projectID: this.#generateID(),
            projectName: projectName,
            tasks: []
        }
        this.projects.push(projectObject);
        this.updateStorage();
    }

    addTask(projectID, taskObject) {
        for (const project in this.projects) {
            if (project.projectID == projectID) {
                project.push(taskObject);
                this.updateStorage();
                break;
            }
            else {
                throw new Error("Tried to add taskObject to invalid projectID : ", projectID);
            }
        }
    }

    updateTask(projectID, taskID, updatedTaskObject) {
        for (const project of projects) {
            if (project.projectID == projectID) {
                for (const task of project.tasks) {
                    if (task.taskID == taskID) {
                        Object.assign(task, updatedTaskObject);
                        this.updateStorage();
                        break;
                    }
                }
                break;
            }
        }
    }

    removeTask(projectID, taskID) {
        for (const project of projects) {
            if (project.projectID == projectID) {
                project.tasks = project.tasks.filter(task => task.taskID != taskID);
                this.updateStorage();
                break;
            }
        }
    }

    removeAllTasksInProject(projectID) {
        for (const project of projects) {
            if (project.projectID == projectID) {
                project.tasks = [];
                this.updateStorage();
                break;
            }
        }
    }

    getAllData() {
        const projectsCopy = structuredClone(this.projects);
        return projectsCopy;
    }

    clearAllData() {
        StorageManager.clearAllData();
    }
}





