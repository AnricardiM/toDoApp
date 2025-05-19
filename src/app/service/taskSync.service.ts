import { Injectable, effect, Injector, Signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskSyncService {
  constructor(private injector: Injector) {}

  syncTasksToLocalStorage(taskSignal: Signal<Task[]>) {
    effect(() => {
      const tasks = taskSignal();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector: this.injector });
  }
}
