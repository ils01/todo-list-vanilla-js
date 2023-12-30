import { format } from "date-fns";

import createHTMLElement from "../createHTMLElement";
import { tdm } from "../../logic/TodoManager";
import { displayModal } from "../modal/modal";
import createTaskInput from "./taskInput";

const taskContainer = createHTMLElement("div", ["task-cont"]);
const taskList = createHTMLElement("ul", ["task-list"]);

function createTaskElement(todo) {
	if (!todo) {
		return createHTMLElement("div");
	}
	const todoElt = createHTMLElement("li", ["todo-item"]);
	const timeLeft = createHTMLElement("div", ["todo__time-left"], {}, `${format(todo.dueDate, "MMM do") || "-"}`);
	const title = createHTMLElement("div", ["todo__title"], {}, `${todo.title}`);
	if (todo.done) {
		title.classList.toggle("strikethrough");
	}
	const priority = createHTMLElement("button", ["todo__priority", `priority--${todo.priority}`], {}, `${todo.priority}`);
	priority.addEventListener("click", (e) => {
		priority.textContent = tdm.updatePriority(todo.id);
		priority.classList = `todo__priority priority--${todo.priority}`;
	});
	const project = createHTMLElement("div", ["todo__project"], {}, `${todo.project || "-"}`);
	const options = createHTMLElement("div", ["todo__options"], {});
	const doneCheckbox = createHTMLElement("input", ["todo__done"], {
		type: "checkbox",
		id: `checkbox-${todo.id}`,
		checked: todo.done,
	});
	doneCheckbox.addEventListener("click", () => {
		tdm.toggleTodoStatus(todo.id);
		title.classList.toggle("strikethrough");
	});
	const deleteTodoBtn = createHTMLElement("button", ["todo__delete", "button", "button--delete"], { type: "button" }, "X");
	deleteTodoBtn.addEventListener("click", (e) => {
		tdm.deleteTodo(todo.id);
		updateTasks(tdm.currentProject);
	});
	const detailsBtn = createHTMLElement(
		"button",
		["details", `details-${todo.id}`],
		{
			type: "button",
		},
		"details"
	);
	detailsBtn.addEventListener("click", () => {
		displayDetailsModal(todo.id);
	});

	options.append(doneCheckbox, detailsBtn, deleteTodoBtn);
	todoElt.append(timeLeft, title, priority, project, options);
	return todoElt;
}

function updateTasks(projectName) {
	if (!taskList) {
		return;
	}
	taskList.innerHTML = "";
	const todos = tdm.getTodos(projectName);

	if (Object.keys(todos).length < 1) {
		taskList.innerHTML = `no todos${projectName ? ` in ${projectName} ` : " at all"} :(`;
	}

	for (let i = todos.length - 1; i >= 0; i -= 1) {
		const todoElt = createTaskElement(todos[i]);

		taskList.appendChild(todoElt);
	}
}

function createTaskContainer() {
	taskContainer.appendChild(taskList);
	updateTasks();
	return taskContainer;
}

function displayDetailsModal(id) {
	const todo = tdm.todos[id];
	const modalBody = createTaskInput(todo);
	displayModal(modalBody);
}

export { createTaskContainer, updateTasks };
