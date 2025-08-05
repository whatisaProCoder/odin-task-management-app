import Task from "./js/taskClass";
import "./styles.css";
import displayJSON from "./js/displayJSON";
import TaskManager from "./js/taskManager";

console.log("Application initialised!");

const taskManager = new TaskManager();

const task = new Task("Model Training", "Learn PyTorch", "10:30AM - 11/2/2025", "High", "Its really complex, must give a lot of time.");
taskManager.removeTask("4b0f224a-040c-404d-904e-88430f1badef", "4234e254-23cd-4ca8-92ba-5b58b9fb03f6", task);
taskManager.renameProject("4b0f224a-040c-404d-904e-88430f1badef", "Artificial Intelligence");

displayJSON(taskManager.getAllData());
