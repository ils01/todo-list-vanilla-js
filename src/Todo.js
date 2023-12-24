export default class Todo {
    constructor(
        title = "",
        desc = "",
        dueDate = "",
        priority = "",
        project = "",
        done = false,
        id = -1
    ) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.done = done;
        this.id = id;
        this.displayed = true;
    }
}
