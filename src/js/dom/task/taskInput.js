import { format } from "date-fns";
import createHTMLElement from "../createHTMLElement";
import { tdm } from "../../logic/TodoManager";
import { updateTasks } from "./taskContainer";
import { closeModal } from "../modal/modal";

export default function createTaskInput(todo) {
	const container = createHTMLElement("div", ["input-todo-cont"]);
	const form = createHTMLElement("form", ["update-todo-form"], {
		id: "update",
	});
	const titleLabel = createHTMLElement(
		"label",
		[],
		{
			for: "title",
		},
		"title*"
	);
	const titleInput = createHTMLElement("input", [], {
		type: "text",
		id: "title",
		name: "title",
		value: `${todo?.title || ""}`,
		required: true,
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
		id: "description",
		name: "description",
		value: `${todo?.description || ""}`,
	});
	const dueDateLabel = createHTMLElement(
		"label",
		[],
		{
			for: "dueDate",
		},
		"due date"
	);
	const today = format(new Date(), "yyyy-MM-dd");
	const dueDateInput = createHTMLElement("input", [], {
		type: "date",
		id: "dueDate",
		name: "dueDate",
		value: `${todo?.dueDate || today}`,
		min: today,
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
	tdm.priorities.forEach((priorityName) => {
		const option = createHTMLElement("option", [`priority--${priorityName}`], {}, `${priorityName}`);
		if (todo && priorityName === todo.priority) {
			option.selected = "selected";
		}
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
	const projectInput = createHTMLElement(
		"select",
		[],
		{
			id: "project",
			name: "project",
		},
		"<option></option>"
	);
	const projects = tdm.getProjects();
	for (const project in projects) {
		if (Object.hasOwn(projects, project)) {
			const option = createHTMLElement("option", [], {}, `${project}`);
			if (todo && project === todo.project) {
				option.selected = "selected";
			}
			projectInput.appendChild(option);
		}
	}

	const submitBtn = createHTMLElement("button", ["button", "button--add", "save-task"], { type: "button" }, "save task");

	form.append(titleLabel, titleInput, descriptionLabel, descriptionInput, dueDateLabel, dueDateInput, priorityLabel, priorityInput, projectLabel, projectInput, submitBtn);

	submitBtn.addEventListener("click", (e) => {
		if (!titleInput.value) {
			alert("name required");
			return;
		}
		dueDateInput.value = dueDateInput.value || today;
		const formData = new FormData(form);
		if (todo) {
			tdm.updateTodo(todo.id, formData);
		} else {
			tdm.addTodo(titleInput.value, descriptionInput.value, dueDateInput.value || today, priorityInput.value, projectInput.value);
		}
		updateTasks(tdm.currentProject);
		closeModal();
	});
	container.appendChild(form);
	return container;
}
