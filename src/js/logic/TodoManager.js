import { format } from "date-fns";
import LocalStorageManager from "./LocalStorageManager";
import Todo from "./Todo";

// SINGLETON
class TodoManager {
	static #instance = null;

	constructor() {
		if (TodoManager.#instance) {
			return TodoManager.#instance;
		}
		TodoManager.#instance = this;
		this.todos = LocalStorageManager.getObject("todos", "[]");
		this.projects = LocalStorageManager.getObject("projects", "{}");
		this.todoCounter = LocalStorageManager.getObject("todoCounter", this.todos.length);
		this.priorities = ["low", "mid", "high"];
		this.currentProject = "";
	}

	getTodos(projectName) {
		if (!projectName) {
			return this.todos.filter((todo) => todo.displayed === true);
		}

		return this.todos.filter((todo) => todo.displayed === true && todo.project === projectName);
	}

	addTodo(title = "", description = "", dueDate = "", priority = "", project = "", done = false) {
		if (!dueDate) {
			dueDate = format(new Date(), "yyyy-MM-dd");
		}
		const todo = new Todo(title, description, dueDate, priority, project, done, this.todoCounter);
		this.todos.push(todo);
		LocalStorageManager.updateObject("todos", this.todos);
		this.todoCounter += 1;
		LocalStorageManager.updateObject("todoCounter", this.todoCounter);
		if (project !== "") {
			this.addTodoToTheProject(todo.id, project);
		}
	}
	updateTodo(id, formData) {
		const data = [...formData];
		for (let i = 0; i < data.length; i += 1) {
			this.todos[id][data[i][0]] = data[i][1];
		}
		LocalStorageManager.updateObject("todos", this.todos);
	}

	toggleTodoStatus(id) {
		this.todos[id].done = !this.todos[id].done;
		LocalStorageManager.updateObject("todos", this.todos);
	}

	deleteTodo(id) {
		if (id === null || id === undefined || id < 0 || id >= this.todos.length) {
			return;
		}
		this.todos[id].displayed = false;
		if (this.todos[id].project !== "") {
			this.projects[this.todos[id].project].splice(this.projects[this.todos[id].project.indexOf(id)], 1);
		}

		LocalStorageManager.updateObject("todos", this.todos);
		LocalStorageManager.updateObject("projects", this.projects);
	}

	deleteAllDoneTodos(currProject) {
		if (currProject) {
			for (let i = 0; i < this.todos.length; i += 1) {
				if (this.todos[i].done === true && this.todos[i].project === currProject) {
					this.deleteTodo(this.todos[i].id);
				}
			}
		} else {
			for (let i = 0; i < this.todos.length; i += 1) {
				if (this.todos[i].done === true) {
					this.deleteTodo(this.todos[i].id);
				}
			}
		}
	}

	getProjects() {
		return this.projects;
	}

	addProject(projectName) {
		if (!projectName) {
			return;
		}
		this.projects[projectName] = [];
		LocalStorageManager.updateObject("projects", this.projects);
	}

	addTodoToTheProject(id, projectName) {
		if (id >= 0 && id < this.todos.length && this.projects[projectName]) {
			if (!this.projects[projectName].includes(id)) {
				this.projects[projectName].push(id);
				this.todos[id].project = projectName;
				LocalStorageManager.updateObject("todos", this.todos);
				LocalStorageManager.updateObject("projects", this.projects);
			}
		}
	}

	deleteProject(projectName, deleteWithTodos = false) {
		if (deleteWithTodos) {
			for (let i = 0; i < this.todos.length; i += 1) {
				if (this.todos[i].project === projectName) {
					this.deleteTodo(this.todos[i].id);
				}
			}
		} else {
			for (let i = 0; i < this.todos.length; i += 1) {
				if (this.todos[i].project === projectName) {
					this.todos[i].project = "";
					console.log(this.todos[i].project);
				}
			}
		}
		delete this.projects[projectName];
		LocalStorageManager.updateObject("todos", this.todos);
		LocalStorageManager.updateObject("projects", this.projects);
	}

	removeDuplicatesFromProject(projectName) {
		if (!projectName) {
			for (const projectN in Object.keys(this.projects)) {
				if (Object.hasOwn(this.projects, projectN)) {
					this.projects[projectN] = [...new Set(this.projects[projectN])];
				}
			}
		} else {
			this.projects[projectName] = [...new Set(this.projects[projectName])];
		}
		LocalStorageManager.updateObject("projects", this.projects);
	}

	updatePriority(id) {
		const currPriorityIndex = this.priorities.indexOf(this.todos[id].priority);
		const newPriorityIndex = (currPriorityIndex + 1) % this.priorities.length;
		this.todos[id].priority = this.priorities[newPriorityIndex];
		LocalStorageManager.updateObject("todos", this.todos);
		return this.todos[id].priority;
	}
}

const tdm = new TodoManager();
if (tdm.todos.length === 0 && Object.keys(tdm.projects).length === 0) {
	tdm.addProject("gym");
	tdm.addProject("gardening");
	tdm.addTodo("bench 100kg", "", "", "mid", "gym");
	tdm.addTodo("withdraw all my money", "", "", "high");
	tdm.addTodo("clean the garden", "", "2024-03-03", "low", "gardening");
	tdm.toggleTodoStatus(1);
	tdm.addProject("cooking");
	tdm.addProject("reading");
	tdm.addTodo("bake a cake", "", "", "mid", "cooking");
	tdm.addTodo("read 'War and Peace'", "", "", "high", "reading");
	tdm.addTodo("prepare a salad", "", "2024-03-10", "low", "cooking");
	tdm.addTodo("read 'The Great Gatsby'", "", "2024-03-15", "mid", "reading");
	tdm.addTodo("make a sandwich", "", "", "high", "cooking");
	tdm.addTodo("read 'To Kill a Mockingbird'", "", "", "low", "reading");
	tdm.addTodo("bake cookies", "", "2024-03-20", "mid", "cooking");
	tdm.addTodo("read '1984'", "", "2024-03-25", "high", "reading");
	tdm.addTodo("prepare a smoothie", "", "", "low", "cooking");
	tdm.addTodo("read 'Pride and Prejudice'", "", "", "mid", "reading");
}
export { tdm };
