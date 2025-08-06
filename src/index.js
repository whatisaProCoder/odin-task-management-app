import TaskManager from "./js/core/taskManager";
import setupScrollbars from "./js/ui/scrollbar";
import initialiseSidebar from "./js/ui/sidebar";
import Task from "./js/core/taskClass";
import "./styles.css";

console.log("Application initialised!");

const taskManager = new TaskManager();
// taskManager.addTask("1fa42101-d7b4-4c79-8052-9768121fd2aa", new Task(
//     "Second Task",
//     "Decription of second task",
//     "11:00PM - 22/8/2025",
//     "Medium",
//     "No notes.",
//     false
// ));
// taskManager.addTask("1fa42101-d7b4-4c79-8052-9768121fd2aa", new Task(
//     "Third Task",
//     "Decription of third task",
//     "11:50PM - 27/8/2025",
//     "Low",
//     "No notes.",
//     false
// ));

initialiseSidebar();

setupScrollbars();
