import LocalStorageManager from "./LocalStorageManager";
import Todo from "./Todo";

// SINGLETON
export default class TodoManager {
  static #instance = null;

  #todoCounter = 0;

  constructor() {
    if (TodoManager.#instance) {
      return TodoManager.#instance;
    }
    TodoManager.#instance = this;
    this.todos = LocalStorageManager.getObject("todos", "[]");
    this.projects = LocalStorageManager.getObject("projects", "{}");
  }

  getTodos(projectName) {
    if (!projectName) {
      return this.todos.filter((todo) => todo.displayed === true);
    }

    return this.todos.filter(
      (todo) => todo.displayed === true && todo.project === projectName
    );
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
    LocalStorageManager.updateObject("todos", this.todos);
    this.#todoCounter += 1;
    if (project !== "") {
      this.addTodoToTheProject(todo.id, project);
    }
  }

  toggleTodoStatus(id) {
    this.todos[id].done = !this.todos[id].done;
    LocalStorageManager.updateObject("todos", this.todos);
  }

  deleteTodo(id) {
    if (!id || id < 0 || id >= this.todos.length) {
      return;
    }
    this.todos[id].displayed = false;
    if (this.todos[id].project !== "") {
      this.projects[this.todos[id].project].splice(
        this.projects[this.todos[id].project.indexOf(id)],
        1
      );
    }

    LocalStorageManager.updateObject("todos", this.todos);
    LocalStorageManager.updateObject("projects", this.projects);
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
        }
      }
    }
    delete this.projects[projectName];
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
}
