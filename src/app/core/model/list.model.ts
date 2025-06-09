import { Task } from "./task.model";

export class List{
    id: number = 0;
    title:string = "";
    completed: boolean = false;
    editing?: boolean;
    listTask: Task[] = [];
}
