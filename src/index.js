import localStorageManager from "./LocalStorageManager";
import TodoManager from "./TodoManager";

localStorageManager.clear();

const tdm = new TodoManager();

tdm.addTodo("do dishes", "", "", "high");
tdm.addTodo("do hw", "", "", "high");
tdm.addTodo("read book", "", "", "low");

tdm.addProject("gym");
tdm.addTodo("get big arms", "", "", "mid");
tdm.addTodo("get big legs", "", "", "mid");

tdm.addTodoToTheProject(3, "gym");
tdm.addTodoToTheProject(3, "gym");
tdm.addTodoToTheProject(4, "gym");

tdm.addProject("moving");
tdm.deleteProject("moving");

tdm.toggleTodoStatus(3);

tdm.removeDuplicatesFromProject();

// tdm.deleteProject("gym", true);

console.log(tdm.getTodos());
console.log(tdm.getProjects());
