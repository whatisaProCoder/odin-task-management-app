import StorageManager from "./storageModule";
import generateID from "./cryptography";
import { format, compareAsc } from "date-fns";

export default class TaskManager {
    constructor() {
        this.storageManager = new StorageManager();
        this.projects = this.storageManager.getData("projects");
        if (this.projects == null) {
            this.projects = this.getDummyData();
            this.updateStorage();
        }
        console.log("TaskManager module object created...");
    }

    updateStorage() {
        this.storageManager.setData("projects", this.projects);
    }

    retriveLatest() {
        this.projects = this.storageManager.getData("projects");
    }


    addProject(projectName) {
        const projectObject = {
            projectID: generateID(),
            projectName: projectName,
            tasks: []
        }
        this.projects.push(projectObject);
        this.updateStorage();
    }

    renameProject(projectID, newName) {
        for (const project of this.projects) {
            if (project.projectID == projectID) {
                project.projectName = newName;
                this.updateStorage();
            }
        }
    }

    removeProject(projectID) {
        this.projects = this.projects.filter(project => project.projectID != projectID);
        if (this.projects.length == 0) {
            this.projects = this.getDummyData();
        }

        this.updateStorage();
    }

    addTask(projectID, taskObject) {
        this.retriveLatest();
        let flag = 0;
        for (const project of this.projects) {
            if (project.projectID == projectID) {
                project.tasks.push(taskObject);
                this.updateStorage();
                flag = 1;
                break;
            }
        }
        if (flag == 0) {
            throw new Error("Tried to add taskObject to invalid project");
        }
    }

    getTask(projectID, taskID) {
        this.retriveLatest();
        for (const project of this.projects) {
            if (project.projectID == projectID) {
                for (const task of project.tasks) {
                    if (task.taskID == taskID) {
                        return task;
                    }
                }
            }
        }
        throw new Error("No such task exist...");
    }

    updateTask(taskID, updatedTaskObject) {
        let flag = 0;
        for (const project of this.projects) {
            for (const task of project.tasks) {
                if (task.taskID == taskID) {
                    Object.assign(task, updatedTaskObject);
                    this.updateStorage();
                    flag = 1;
                    break;
                }
            }
            if (flag == 1)
                break;
        }
    }

    removeTask(projectID, taskID) {
        this.retriveLatest();
        for (const project of this.projects) {
            if (project.projectID == projectID) {
                project.tasks = project.tasks.filter(task => task.taskID !== taskID);
                this.updateStorage();
                break;
            }
        }
    }

    removeAllTasksInProject(projectID) {
        for (const project of this.projects) {
            if (project.projectID == projectID) {
                project.tasks = [];
                this.updateStorage();
                break;
            }
        }
    }

    getProject(projectID) {
        this.retriveLatest();
        const project = this.projects.filter((project) => project.projectID == projectID);
        return project;
    }

    getAllProjects() {
        this.retriveLatest();
        const projectsCopy = structuredClone(this.projects);
        return projectsCopy;
    }

    clearAllData() {
        this.storageManager.setData("projects", null);
        this.storageManager.clearAllStorage();

        this.projects = this.getDummyData();
        this.updateStorage();
    }

    getAnyProjectID() {
        this.retriveLatest();
        for (const project of this.projects) {
            return project.projectID;
        }
    }

    getDummyData() {
        return [{
            projectID: generateID(),
            projectName: "Starter Project",
            tasks: [
                {
                    taskID: generateID(),
                    title: "Your Task Title",
                    description: "A small description about this task, how you'll go about doing the task, etc.",
                    dueDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
                    priority: "High",
                    notes: "Some notes you might want to add about this task, and so on.",
                    complete: true
                }
            ]
        }];
    }
}


