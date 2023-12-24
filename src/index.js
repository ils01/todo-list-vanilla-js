import TodoManager from "./TodoManager";
import createHTMLElement from "./createHTMLElement";

const tdm = new TodoManager();

const content = document.getElementById("content");

const taskContainer = document.createElement("div");
taskContainer.classList.add("task-container");

function renderTodos(projectName) {
  taskContainer.innerHTML = "";
  const todos = tdm.getTodos(projectName);

  for (const todo of todos) {
    const todoElt = document.createElement("div");
    todoElt.textContent = todo.title;
    taskContainer.append(todoElt);
  }
}

function renderInput() {
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
    ["submit-btn"],
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
      priorityInput.value
    );
    renderTodos();
  });

  return form;
}

content.append(renderInput());
content.append(taskContainer);

renderTodos();
