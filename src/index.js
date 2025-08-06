import TaskManager from "./js/core/taskManager";
import setupScrollbars from "./js/ui/scrollbar";
import initialiseSidebar from "./js/ui/sidebar";
import Task from "./js/core/taskClass";
import "./styles.css";

console.log("Application initialised!");

const taskManager = new TaskManager();
taskManager.addTask("aa999725-92b8-4ce5-855c-cb23a86ac00f", new Task(
    "Second Task",
    "Decription of second task",
    "11:00PM - 22/8/2025",
    "Medium",
    "No notes.",
    false
));
taskManager.addTask("aa999725-92b8-4ce5-855c-cb23a86ac00f", new Task(
    "Third Task",
    "Decription of third task",
    "11:50PM - 22/8/2025",
    "Low",
    "No notes.",
    false
));

initialiseSidebar();

setupScrollbars();
