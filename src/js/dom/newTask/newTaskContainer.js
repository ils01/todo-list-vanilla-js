import createHTMLElement from "../createHTMLElement";
import { displayModal } from "../modal/modal";
import createTaskInput from "../task/taskInput";

function createNewTaskContainer() {
	const newTaskCont = createHTMLElement("div", ["new-task-cont"]);
	const newTaskBtn = createHTMLElement(
		"button",
		["button", "button--add", "create-task-btn"],
		{
			type: "button",
		},
		"new task?"
	);
	newTaskBtn.addEventListener("click", () => {
		displayModal(createTaskInput());
	});
	newTaskCont.append(newTaskBtn);
	return newTaskCont;
}

export { createNewTaskContainer };
