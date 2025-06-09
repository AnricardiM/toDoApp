import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TaskComponent } from "../../../shared/components/task/task.component";
import { ListService } from '../../../core/service/list.service';
import { MessageService } from '../../../core/service/message.service';
import { List } from '../../../core/model/list.model';
import { Task } from '../../../core/model/task.model';

@Component({
  selector: 'app-add-list',
  standalone: true,
  imports: [TaskComponent, CommonModule, FormsModule,TranslateModule],
  templateUrl: './add-list.component.html',
  styleUrl: './add-list.component.css'
})
export class AddListComponent {

newTaskTitle = '';
public list: List = new List(); 
mensaje="";
constructor(private mensajeService: MessageService,
    private listService: ListService
  ) {
    this.mensajeService.mensaje$.subscribe(msg => {
      this.mensaje = msg;
    });
  }

ngOnInit(){ 
  
 }

  save() { 

    if(this.list.listTask.length > 0){
      this.list.title = this.newTaskTitle;
     this.listService.addListWihtTask(this.list);
    }
    else
      this.listService.addList(this.newTaskTitle);  
    
    this.mensajeService.mostrarMensaje('Creado con éxito');
  }

  listTaskChanged(listTask: Task[]){
    this.list.listTask = listTask;
  } 
}
