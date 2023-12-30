export default class Todo {
	constructor(
		title = "",
		description = "",
		dueDate = "",
		priority = "",
		project = "",
		done = false,
		id = -1
	) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.project = project;
		this.done = done;
		this.id = id;
		this.displayed = true;
	}
}
