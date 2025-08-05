import Worker from "./js/workerModule";
import Task from "./js/taskClass";
import "./styles.css";
import JSONViewer from 'json-viewer-js';

console.log("Application initialised!");

const worker = new Worker();

worker.


    import { prettyPrintJson } from 'pretty-print-json';

const formatted = prettyPrintJson.toHtml(worker.getAllData());
document.body.append(document.createElement("pre"));
document.querySelector('pre').innerHTML = formatted;


