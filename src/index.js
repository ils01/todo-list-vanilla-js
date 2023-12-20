import TodoManager from "./todoManager";

const tdm = new TodoManager();

tdm.addTodo();
tdm.addTodo();
tdm.addTodo();
tdm.addProject("home");
tdm.addProject("megaproject");
tdm.addTodoToTheProject(2, "home");

console.log(tdm.todos, tdm.projects);

tdm.deleteTodo(2);
// tdm.deleteProject("home");
console.log(tdm.todos, tdm.projects);
