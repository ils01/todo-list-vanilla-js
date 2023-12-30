import createHTMLElement from "../createHTMLElement";
import { tdm } from "../../logic/TodoManager";
import { updateTasks } from "../task/taskContainer";
import { closeModal, displayModal } from "../modal/modal";

function createProjectInput() {
	const form = createHTMLElement("form", ["addProject"]);

	const projectLabel = createHTMLElement(
		"label",
		[],
		{
			for: "newProject",
		},
		"new project?"
	);
	const projectInput = createHTMLElement("input", [], {
		id: "newProject",
		name: "newProject",
		placeholder: "gardening",
		required: true,
	});
	const addProjectBtn = createHTMLElement(
		"button",
		["button", "button--add", "addProject"],
		{
			type: "submit",
		},
		"add project"
	);
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		tdm.addProject(projectInput.value);
		updateProjectsList();
		form.reset();
	});
	form.append(projectLabel, projectInput, addProjectBtn);
	return form;
}

function updateProjectsList() {
	const projects = tdm.getProjects();

	projectsList.innerHTML = "";

	for (const project in projects) {
		if (Object.hasOwn(projects, project)) {
			const li = createHTMLElement("li", ["projects__project"]);
			const projectBtn = createHTMLElement(
				"button",
				["project-btn"],
				{
					type: "button",
				},
				`${project}`
			);
			const deleteProjectBtn = createHTMLElement("button", ["project__delete", "button", "button--delete"], { type: "button" }, "X");
			projectBtn.addEventListener("click", () => {
				tdm.currentProject = `${project}`;
				updateTasks(`${project}`);
			});
			const modal = createDeleteWithTodosModal(project);
			deleteProjectBtn.addEventListener("click", () => {
				displayModal(modal);
			});

			li.append(projectBtn, deleteProjectBtn);
			projectsList.appendChild(li);
		}
	}
}

function createDeleteWithTodosModal(project) {
	const modal = createHTMLElement("div", ["dlt-with-todos-modal"]);

	const question = createHTMLElement("p", ["modal__question"], {}, "delete with todos? <p class='secondary-text-small'>(all todos associated with this project will be also deleted)</p>");

	const deleteWithTodosCheckbox = createHTMLElement("input", [], {
		type: "checkbox",
	});

	const submitBtn = createHTMLElement("button", ["project__delete", "button", "button--delete"], { type: "button" }, "delete");

	submitBtn.addEventListener("click", () => {
		if (deleteWithTodosCheckbox.checked) {
			tdm.deleteProject(`${project}`, true);
		} else {
			tdm.deleteProject(`${project}`, false);
		}
		updateTasks();
		updateProjectsList();
		closeModal();
	});

	modal.append(question, deleteWithTodosCheckbox, submitBtn);
	return modal;
}

function createProjectsContainer() {
	updateProjectsList();
	return projectsCont;
}

const projectsCont = createHTMLElement("div", ["projects-cont"]);
const projectsList = createHTMLElement("ul", ["projects-list"]);
const addProjectInput = createProjectInput();
projectsCont.append(addProjectInput, projectsList);

export { createProjectsContainer };
