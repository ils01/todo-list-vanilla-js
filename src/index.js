import TodoManager from "./TodoManager";
import createHTMLElement from "./createHTMLElement";

const tdm = new TodoManager();

const content = document.getElementById("content");

function createTodo(todo) {
	if (!todo) {
		return "error!";
	}
	const todoElt = createHTMLElement("li", ["todo-item"]);
	const timeLeft = createHTMLElement(
		"div",
		["todo__time-left"],
		{},
		"time left:"
	);
	const title = createHTMLElement(
		"div",
		["todo__title"],
		{},
		`${todo.title}`
	);
	const priority = createHTMLElement(
		"div",
		[`todo__priority--${todo.priority}`],
		{},
		`${todo.priority}`
	);
	const options = createHTMLElement("div", ["todo__options"], {}, "1 2 3");
	const doneCheckbox = createHTMLElement("input", ["todo__done"], {
		type: "checkbox",
		id: `checkbox-${todo.id}`,
		checked: todo.done,
	});
	doneCheckbox.addEventListener("click", () => {
		tdm.toggleTodoStatus(todo.id);
	});
	const deleteTodoBtn = createHTMLElement(
		"button",
		["todo__dlt-btn"],
		{ type: "button" },
		"X"
	);
	deleteTodoBtn.addEventListener("click", (e) => {
		tdm.deleteTodo(todo.id);
		updateTodos(taskContainer.querySelector(".task-list"));
	});

	options.append(doneCheckbox, deleteTodoBtn);
	todoElt.append(timeLeft, title, priority, options);
	todoElt.style.display = "flex";
	todoElt.style.gap = "1rem";
	return todoElt;
}
function updateTodos(taskList, projectName) {
	taskList.innerHTML = "";
	const todos = tdm.getTodos(projectName);

	if (Object.keys(todos).length < 1) {
		taskList.innerHTML =
			"no todos" +
			(projectName ? ` in ${projectName} ` : " at all") +
			" :(";
	}
	for (const todo of todos) {
		const todoElt = createTodo(todo);
		taskList.appendChild(todoElt);
	}
}

function createAllBtnContainer() {
	const allBtnContainer = createHTMLElement("div", ["all-btn-cont"]);
	const allBtn = createHTMLElement(
		"button",
		["all-btn"],
		{ type: "button" },
		"all"
	);
	allBtn.addEventListener("click", () =>
		updateTodos(taskContainer.querySelector(".task-list"))
	);
	allBtnContainer.appendChild(allBtn);
	return allBtnContainer;
}

function createTaskContainer() {
	const taskContainer = createHTMLElement("div", ["task-cont"]);
	const taskList = createHTMLElement("ul", ["task-list"]);
	taskContainer.appendChild(taskList);
	return taskContainer;
}

function createTodoInput() {
	const modal = createHTMLElement("div"["create-todo-modal"]);
	const form = createHTMLElement("form", ["create-todo-form"], {
		id: "addTask",
	});
	const titleLabel = createHTMLElement(
		"label",
		[],
		{
			for: "title",
		},
		"title"
	);
	const titleInput = createHTMLElement("input", [], {
		type: "text",
		id: "title",
		name: "title",
	});
	const descriptionLabel = createHTMLElement(
		"label",
		[],
		{
			for: "description",
		},
		"description"
	);
	const descriptionInput = createHTMLElement("textarea", [], {
		id: "decription",
		name: "decription",
	});
	const dueDateLabel = createHTMLElement(
		"label",
		[],
		{
			for: "dueDate",
		},
		"due date"
	);
	const dueDateInput = createHTMLElement("input", [], {
		type: "text",
		id: "dueDate",
		name: "dueDate",
	});
	const priorityLabel = createHTMLElement(
		"label",
		[],
		{
			for: "priority",
		},
		"priority"
	);
	const priorityInput = createHTMLElement("select", [], {
		id: "priority",
		name: "priority",
	});
	["low", "mid", "high"].forEach((priorityName) => {
		const option = createHTMLElement(
			"option",
			[`priority--${priorityName}`],
			{},
			`${priorityName}`
		);
		priorityInput.appendChild(option);
	});
	const projectLabel = createHTMLElement(
		"label",
		[],
		{
			for: "project",
		},
		"project"
	);
	const projectInput = createHTMLElement("select", [], {
		id: "project",
		name: "project",
	});
	projectInput.innerHTML = "<option></option>";
	const submitBtn = createHTMLElement(
		"button",
		["addProject"],
		{ type: "submit" },
		"add task"
	);

	form.append(
		titleLabel,
		titleInput,
		descriptionLabel,
		descriptionInput,
		dueDateLabel,
		dueDateInput,
		priorityLabel,
		priorityInput,
		projectLabel,
		projectInput,
		submitBtn
	);

	submitBtn.addEventListener("click", (e) => {
		e.preventDefault();
		tdm.addTodo(
			titleInput.value,
			descriptionInput.value,
			dueDateInput.value,
			priorityInput.value,
			projectInput.value
		);
		updateTodos(taskContainer.querySelector(".task-list"));
	});
	modal.appendChild(form);
	return modal;
}

function createProjectInput() {
	const form = createHTMLElement("form", ["addProject"]);

	const projectLabel = createHTMLElement("label", [], {
		for: "newProject",
	});
	const projectInput = createHTMLElement("input", [], {
		id: "newProject",
		name: "newProject",
	});
	const addProjectBtn = createHTMLElement(
		"button",
		["addProject"],
		{
			type: "submit",
		},
		"add project"
	);
	addProjectBtn.addEventListener("click", (e) => {
		e.preventDefault();
		tdm.addProject(projectInput.value);
		updateProjectsList(projectsContainer.querySelector(".projects-list"));
	});
	form.append(projectLabel, projectInput, addProjectBtn);
	return form;
}

function updateProjectsList(projectsList) {
	const projects = tdm.getProjects();

	projectsList.innerHTML = "";
	const todoInputProjectDropdown = document.getElementById("project");

	for (const project in projects) {
		todoInputProjectDropdown.appendChild(
			createHTMLElement("option", [], {}, `${project}`)
		);
		const li = createHTMLElement("li", ["projects__project"]);
		const projectBtn = createHTMLElement(
			"button",
			["project-btn"],
			{
				type: "button",
			},
			`${project}`
		);
		const deleteProjectBtn = createHTMLElement(
			"button",
			["project__dlt-btn"],
			{ type: "button" },
			"X"
		);
		projectBtn.addEventListener("click", () => {
			updateTodos(
				taskContainer.querySelector(".task-list"),
				`${project}`
			);
		});
		deleteProjectBtn.addEventListener("click", () => {
			tdm.deleteProject(`${project}`);
			updateProjectsList(projectsList);
		});
		li.append(projectBtn, deleteProjectBtn);
		projectsList.appendChild(li);
	}
}

function createProjectsContainer() {
	const projectsCont = createHTMLElement("div", ["projects-cont"]);
	const projectsList = createHTMLElement("ul", ["projects-list"]);
	const addProjectInput = createProjectInput();
	projectsCont.append(addProjectInput, projectsList);
	return projectsCont;
}

function createNewTaskContainer() {
	const newTaskCont = document.createElement("div", ["new-task-cont"]);
	newTaskCont.appendChild(createTodoInput());
	return newTaskCont;
}

const newTaskContainer = createNewTaskContainer();
const taskContainer = createTaskContainer();
const allBtnContainer = createAllBtnContainer();
const projectsContainer = createProjectsContainer();

content.append(
	newTaskContainer,
	taskContainer,
	allBtnContainer,
	projectsContainer
);
const taskList = taskContainer.querySelector(".task-list");
const projectsList = projectsContainer.querySelector(".projects-list");

updateTodos(taskList);
updateProjectsList(projectsList);
