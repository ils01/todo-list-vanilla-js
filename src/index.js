import createHTMLElement from "./js/dom/createHTMLElement";
import "./scss/main.scss";

import createAllBtnContainer from "./js/dom/allBtn/allBtnContainer";
import { createTaskContainer } from "./js/dom/task/taskContainer";
import { createNewTaskContainer } from "./js/dom/newTask/newTaskContainer";
import { createProjectsContainer } from "./js/dom/project/projectsContainer";
import { modalContainer, detailsBlurModal } from "./js/dom/modal/modal";

const content = document.getElementById("content");
const todoBody = createHTMLElement("div", ["todo-body"]);

const newTaskContainer = createNewTaskContainer();
const taskContainer = createTaskContainer();
const allBtnContainer = createAllBtnContainer();
const projectsContainer = createProjectsContainer();

content.append(todoBody);
todoBody.append(allBtnContainer, newTaskContainer, projectsContainer, taskContainer, modalContainer, detailsBlurModal);
