import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Task } from '../../../core/model/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule,FormsModule,TranslateModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input() listTask: Task[] = [];
  @Output() listTaskChange = new EventEmitter<any>();

  public newTaskTitle: string ='';
  public filterListTask: Task[] = [];
    ngOnInit() {
     //Crear copia para los filters 
     this.filterListTask = [... this.listTask];
    }

    add() {  
      
     let newId = 1;

      if(this.filterListTask){
      newId = (this.filterListTask.length) + newId;   
      }    
        
      const newTask: Task= {id: newId, title: this.newTaskTitle,completed: false};
      this.filterListTask ? this.filterListTask.push(newTask) : this.filterListTask = [newTask];

      this.newTaskTitle="";
      this.listTask = [... this.filterListTask];
    
      this.listTaskChange.emit(this.filterListTask);
    }

    toggle(id: number){
      this.filterListTask.forEach( x => {
        if(x.id == id){
         x.completed = !x.completed;
        }
      }
        
      );
      this.listTask = [... this.filterListTask];
      this.listTaskChange.emit(this.filterListTask);
    }

    editing(id: number) {
      this.filterListTask.forEach( x => {
        if(x.id == id){
         x.editing = true;
        }
      });
     this.listTask = [... this.filterListTask];
    }

    edit(id: number){
    this.filterListTask.forEach( x => {
        if(x.id == id){
         x.editing = false;
        }
      }
        
      );
      this.listTask = [... this.filterListTask];
      this.listTaskChange.emit(this.filterListTask);
    }

    remove(id: number){
      this.filterListTask = this.filterListTask.filter(x => x.id!=id);
      this.listTask = [... this.filterListTask];
      this.listTaskChange.emit( this.filterListTask);
    }

    filter(filter: string){

      switch(filter){
        case "all":
         this.filterListTask = [... this.listTask];
          break;
        case "pending":
           this.filterListTask = [... this.listTask.filter(x => !x.completed)];
          break;
        case "completed":
            this.filterListTask = [... this.listTask.filter(x => x.completed)];
          break;
        case "clear":
            this.filterListTask= [... this.listTask.filter(x => !x.completed)];
             this.listTask = [... this.filterListTask];
             this.listTaskChange.emit(this.filterListTask);
          break;
      }
     
    }

}
