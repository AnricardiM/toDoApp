import { Injectable, signal, effect, computed, Signal} from '@angular/core';
import { List } from '../model/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private _list = signal<List[]>([
    { id: 1, title: 'Personal', completed: false, listTask:[{id:1, title:'Nueva tarea', completed:false}, {id:2, title:'Nueva 3 tarea', completed:false}]},
    { id: 2, title: 'Trabajo', completed: false, listTask:[]},
  ]);

  constructor() {
    const saved = localStorage.getItem('list');
    if (saved) {
      try {
        this._list.set(JSON.parse(saved));
      } catch {
        // Ignorar error parseando localStorage
      }
    }

    effect(() => {
      localStorage.setItem('list', JSON.stringify(this._list()));
    });
  }

  get list() {
    return this._list.asReadonly();
  }

  getListByIdOnce(id: number): List | undefined {
  return this._list().find(item => item.id == id);
  }

  addList(title: string) {
    if (!title.trim()) return;
    const newTask: List = { id: Date.now(), title: title.trim(), completed: false, listTask: [] };
    this._list.update(tasks => [...tasks, newTask]);
  }

  addListWihtTask(list: List) {
    
    this._list.update(tasks => [...tasks, list]);
  }

editList(list: List) {
  const currentList = this._list();

  const updatedList = currentList.map(item => {
    if (item.id === list.id) {
      return { ...item, list };
    }
    return item;
  });

  this._list.set(updatedList);
}

  toggleList(id: number) {
    this._list.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  removeList(id: number) {
    this._list.update(tasks => tasks.filter(task => task.id !== id));
  }

  validationList(list: List){
    
  }
}
