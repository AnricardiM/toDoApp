import { Component, signal, computed,effect,Injector, inject } from '@angular/core';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  /*constructor(){
    effect(() =>
    {
      const tasks = this.tasks();
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    );
  }*/

  ngOnInit(){
    let storage = localStorage.getItem('tasks');
     if(storage!= null){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
     }
   this.TrackerTask();
  }

  TrackerTask(){
    effect(() =>
      {
        const tasks = this.tasks();
        localStorage.setItem('tasks',JSON.stringify(tasks));
      }, {injector: this.injector}
      );
  }

  injector = inject(Injector);

  taskControl = new FormControl('', 
    {
      nonNullable:true, 
      validators:[
        Validators.required
      ]
    });

  tasks =signal<Task[]>([]);

  filter = signal('all');

  taskByFilter = computed(() => {
    const tasks = this.tasks();
    const filter = this.filter();
    
    switch(filter){
     case 'pending': 
     return tasks.filter(x => !x.completed);
   
     case 'completed':
     return tasks.filter(x => x.completed);

     default:
      return tasks;
     
    }

  });

  HaveCompleted(): number {
   return this.tasks().filter(x => x.completed).length;
  }

  ChangeInput(){
   //const input = event.target as HTMLInputElement;
   const response:boolean = this.Validation();
   
   if(response){
    this.AddNewTask(this.taskControl.value);
    this.taskControl.setValue('');
   }
   
  //  input.value= "";
  }

  AddNewTask(description: string){
   const newTask: Task ={ 
    id: Date.now(),
    description: description,
    completed:false
   };
    this.tasks.update((tasks) => [...tasks, newTask] );
   
  }

  DeleteTask(index: number){   
    this.tasks.update((tasks) => tasks.filter((tasks, position) => position !== index));   
    
  }

  EditingTask(index:number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position)=>{
        if(position == index){
            return {
              ...task, 
              editing: true
            };
        }
        return {...task, editing:false};
      });
    });   
   }

   SaveEditedTask(index:number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) => {
      return tasks.map((task, position)=>{
        if(position == index){
            return {
              ...task, 
              description: input.value,
              editing:false
            };
        }
        return task;
      });
    });   
   }

  UpdateTask(index:number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position)=>{
        if(position == index){
            return {
              ...task, 
              completed: !task.completed
            };
        }
        return task;
      });
    });   
  }

  ClearCompleted(){   
    this.tasks
    .update((tasks) => 
      tasks.filter((tasks) => !tasks.completed));   
    
  }

  Validation() : boolean {
   
    if(this.taskControl.value.trim().length>0)
    if(this.taskControl.valid)
      { return true;}  
    return false;
  }

  ChangeFilter(value: string){
    this.filter.set(value);
  }

}


