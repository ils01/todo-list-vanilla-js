import createHTMLElement from "../createHTMLElement";
import { tdm } from "../../logic/TodoManager";
import { updateTasks } from "../task/taskContainer";

export default function createAllBtnContainer() {
	const allBtnContainer = createHTMLElement("div", ["all-btn-cont"]);

	const allBtn = createHTMLElement("button", ["button", "all-btn"], { type: "button" }, "all tasks");

	const deleteDoneBtn = createHTMLElement("button", ["button", "button--delete", "delete-done-btn"], { type: "button" }, "delete <span class='strikethrough'>done tasks</span>");

	deleteDoneBtn.addEventListener("click", () => {
		tdm.deleteAllDoneTodos(tdm.currentProject);
		updateTasks(tdm.currentProject);
	});

	allBtn.addEventListener("click", () => {
		tdm.currentProject = "";
		updateTasks(tdm.currentProject);
	});

	allBtnContainer.append(allBtn, deleteDoneBtn);

	return allBtnContainer;
}
