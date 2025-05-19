import { Component, signal, computed,Injector, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsComponent } from "../components/buttons/buttons.component";
import { TaskService } from "../../service/task.service";
import { TaskSyncService } from "../../service/taskSync.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, ButtonsComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    injector = inject(Injector);
    taskService = inject(TaskService);
    taskSyncService = inject(TaskSyncService);
   
//#region Variables
tasks = this.taskService.tasks;

taskControl = new FormControl('', 
    {
      nonNullable:true, 
      validators:[
        Validators.required
      ]
    });
//#endregion  

  ngOnInit(){
     const storedTasks = this.taskService.ChargeTask();
    this.tasks.set(storedTasks);
    this.taskSyncService.syncTasksToLocalStorage(this.tasks);
  }

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

//#region Method
 HaveCompleted(): number {
    return this.tasks().filter(x => x.completed).length;
  }

  ClearCompleted() {
    this.tasks.update((tasks) => tasks.filter((task) => !task.completed));
  }

  ChangeFilter(value: string) {
    this.filter.set(value);
  }

ChangeInput(){
   const response:boolean = this.taskService.Validation(this.taskControl);
   
   if(response){
    this.AddNewTask(this.taskControl.value);
    this.taskControl.setValue('');
   }
  }

AddNewTask(value: string ){
  return this.taskService.AddNewTask(value);
}

EditingTask(index:number){
  return this.taskService.EditingTask(index);
}

UpdateTask(index:number){
  return this.taskService.UpdateTask(index);
}

DeleteTask(index:number){
  return this.taskService.DeleteTask(index);
}

SaveEditedTask(index:number, event: Event){
  return this.taskService.SaveEditedTask(index, event);
}

//#endregion

}
