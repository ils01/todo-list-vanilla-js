import Todo from "./todo";

// SINGLETON
export default class TodoManager {
    static #instance = null;

    #todoCounter = 0;

    constructor() {
        if (TodoManager.#instance) {
            return TodoManager.#instance;
        }
        TodoManager.#instance = this;
        this.todos = [];
        this.projects = new Map();
    }

    getTodos(projectName) {
        let okTodos = [];
        if (!projectName) {
            okTodos = this.todos.filter(
                (todo) => todo.dispayed === true && todo.project === projectName
            );
        } else {
            okTodos = this.todos.filter((todo) => todo.dispayed === true);
        }
        return okTodos;
    }

    addTodo(
        title = "",
        desc = "",
        dueDate = "",
        priority = "",
        project = "",
        done = false
    ) {
        const todo = new Todo(
            title,
            desc,
            dueDate,
            priority,
            project,
            done,
            this.#todoCounter
        );
        this.todos.push(todo);
        this.#todoCounter += 1;
    }

    addTodoToTheProject(id, projectName) {
        if (id >= 0 && id < this.todos.length) {
            this.projects[projectName].add(id);
            this.todos[id].project = projectName;
        }
    }

    deleteTodo(id) {
        if (!id || id < 0 || id >= this.todos.length) {
            return;
        }
        this.todos[id].displayed = false;
        for (const projectName in this.projects) {
            if (this.projects[projectName].has(id)) {
                this.projects[projectName].delete(id);
            }
        }
    }

    toggleTodoStatus(id) {
        this.todos[id].done = !this.todos[id].done;
    }

    getProjects() {
        return this.projects;
    }

    addProject(projectName) {
        this.projects[projectName] = new Set();
    }

    deleteProject(projectName, deleteWithTodos = false) {
        delete this.projects[projectName];
        if (deleteWithTodos) {
            for (let i = 0; i < this.todos.length; i += 1) {
                if (this.todos[i].project === projectName) {
                    this.deleteTodo(this.todos[i].id);
                }
            }
        }
    }
}
