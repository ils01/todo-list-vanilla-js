import TodoManager from "./TodoManager";
import createHTMLElement from "./createHTMLElement";

const tdm = new TodoManager();

const content = document.getElementById("content");

function updateTodos(taskList, projectName) {
	taskList.innerHTML = "";
	const todos = tdm.getTodos(projectName);

	if (Object.keys(todos).length < 1) {
		taskList.innerHTML = "no todos :(";
	}
	for (const todo of todos) {
		const todoElt = document.createElement("div");
		todoElt.textContent = `${todo.title}1`;
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
	updateTodos(taskList);
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
	const projects = tdm.getProjects();
	for (let i = 0; i < Object.keys(projects).length; i += 1) {
		projectInput.appendChild(
			createHTMLElement("option", [], {}, `${Object.keys(projects)[i]}`)
		);
	}
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

	for (const project in projects) {
		const li = createHTMLElement("li", ["projects__project"]);
		const projectBtn = createHTMLElement(
			"button",
			["project-btn"],
			{
				type: "button",
			},
			`${project}`
		);
		projectBtn.addEventListener("click", () => {
			updateTodos(
				taskContainer.querySelector(".task-list"),
				`${project}`
			);
		});
		li.appendChild(projectBtn);
		projectsList.appendChild(li);
	}
}

function createProjectsContainer() {
	const projectsCont = createHTMLElement("div", ["projects-cont"]);
	const projectsList = createHTMLElement("ul", ["projects-list"]);
	const addProjectInput = createProjectInput();
	projectsCont.append(addProjectInput, projectsList);
	updateProjectsList(projectsList);
	return projectsCont;
}

function createNewTaskContainer() {
	const newTaskCont = document.createElement("div", ["new-task-cont"]);
	newTaskCont.appendChild(createTodoInput());
	return newTaskCont;
}

const taskContainer = createTaskContainer();
const allBtnContainer = createAllBtnContainer();
const newTaskContainer = createNewTaskContainer();
const projectsContainer = createProjectsContainer();

content.append(
	taskContainer,
	allBtnContainer,
	newTaskContainer,
	projectsContainer
);
