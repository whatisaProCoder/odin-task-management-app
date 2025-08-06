import StorageManager from "./storageModule";
import generateID from "./cryptography";

export default class TaskManager {
    constructor() {
        this.storageManager = new StorageManager();
        this.projects = this.storageManager.getData("projects");
        if (this.projects == null) {
            this.projects = [{
                projectID: generateID(),
                projectName: "Example Project",
                tasks: [
                    {
                        taskID: generateID(),
                        title: "Your Task Title",
                        description: "A small description about this task, how you'll go about doing the task, etc.",
                        dueDate: "10:30PM - 7/8/2025",
                        priority: "High",
                        notes: "Some notes you might want to add about this task, and so on.",
                        complete: false
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
            }
        }
    }

    removeProject(projectID) {
        this.projects = this.projects.filter(project => project.projectID != projectID);
    }

    addTask(projectID, taskObject) {
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
        for (const project of this.projects) {
            if (project.projectID == projectID) {
                project.tasks = project.tasks.filter(task => task.taskID != taskID);
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

    getAllProjects() {
        const projectsCopy = structuredClone(this.projects);
        return projectsCopy;
    }

    clearAllData() {
        this.storageManager.setData("projects", null);
        this.storageManager.clearAllStorage();
    }
}


