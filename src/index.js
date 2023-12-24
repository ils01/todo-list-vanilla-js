import { render } from "sass";
import TodoManager from "./TodoManager";
import createHTMLElement from "./createHTMLElement";

const tdm = new TodoManager();

const content = document.getElementById("content");

const taskContainer = document.createElement("div");
taskContainer.classList.add("task-container");
taskContainer.style.border = "1px solid black";

function renderTodos(projectName) {
  taskContainer.innerHTML = "";
  const todos = tdm.getTodos(projectName);

  for (const todo of todos) {
    const todoElt = document.createElement("div");
    todoElt.textContent = todo.title;
    taskContainer.append(todoElt);
  }
}

function renderTodoInput() {
  const form = createHTMLElement("form", [], { id: "addTask" });
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
    renderTodos();
  });

  return form;
}

function renderProjects() {
  const projectsContainer = createHTMLElement("div", ["projects-cont"]);
  const form = createHTMLElement("form", ["addProject"]);

  const projectLabel = createHTMLElement("label", [], { for: "newProject" });
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

  const projectsList = createHTMLElement("ul", ["projects-list"]);
  const projects = tdm.getProjects();

  function renderProjectList() {
    const addTodoDropdownProject = document.getElementById("project");
    projectsList.innerHTML = "";
    addTodoDropdownProject.innerHTML = "";

    const nullOption = createHTMLElement("option");
    addTodoDropdownProject.appendChild(nullOption);
    for (const project in projects) {
      const li = createHTMLElement(
        "li",
        ["projects__project"],
        {},
        `${project}`
      );
      const option = createHTMLElement("option", [], {}, `${project}`);
      addTodoDropdownProject.appendChild(option);
      projectsList.appendChild(li);
    }
  }
  form.append(projectLabel, projectInput, addProjectBtn);
  projectsContainer.append(form, projectsList);
  renderProjectList();

  addProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    tdm.addProject(projectInput.value);
    renderProjectList();
  });

  return projectsContainer;
}

content.append(renderTodoInput());
content.append(taskContainer, renderProjects());

renderTodos();
