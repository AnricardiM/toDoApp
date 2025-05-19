import { Task } from '../models/task.model';
import { Injectable, signal,effect } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class TaskService
{
    tasks =signal<Task[]>([]);

   Validation(taskControl: FormControl) : boolean {   
    return taskControl.value.trim().length > 0 && taskControl.valid;
  }

    ChargeTask(): Task[] {
    const storage = localStorage.getItem('tasks');
    if (storage != null) {
      const parsed = JSON.parse(storage);
      this.tasks.set(parsed);
    }
    return this.tasks();
  }   
    
  AddNewTask(description: string) {
    const newTask: Task = {
      id: Date.now(),
      description: description,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  DeleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, position) => position !== index));
  }

  EditingTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, position) =>
        position === index ? { ...task, editing: true } : { ...task, editing: false }
      )
    );
  }

  SaveEditedTask(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) =>
      tasks.map((task, position) =>
        position === index ? { ...task, description: input.value, editing: false } : task
      )
    );
  }

  UpdateTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, position) =>
        position === index ? { ...task, completed: !task.completed } : task
      )
    );
  }
}