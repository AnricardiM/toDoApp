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
  selector: 'app-edit-list',
  standalone: true,
  imports: [TaskComponent, CommonModule, FormsModule, TranslateModule],
  templateUrl: './edit-list.component.html',
  styleUrl: './edit-list.component.css'
})
export class EditListComponent {
@Input() listId: number = 0;

newTaskTitle = '';
mensaje="";
public list: List = new List(); 
wantEdit: boolean = false;


  constructor(private mensajeService: MessageService,
    private listService: ListService
  ) {
    this.mensajeService.mensaje$.subscribe(msg => {
      this.mensaje = msg;
    });
  }

ngOnInit(){ 
  const respuesta =  this.listService.getListByIdOnce(this.listId);
  if (respuesta)
    this.list= respuesta;

  this.newTaskTitle = this.list?.title ?? '';
 }

  edit() { 

     if(this.wantEdit)
     this.list.title = this.newTaskTitle;

     this.wantEdit =false;
     this.listService.editList(this.list);

    this.mensajeService.mostrarMensaje('Editado éxito');
     
  }

  editing() {
    this.wantEdit= true;
  }

  listTaskChanged(listTask: Task[]){
    this.list.listTask = listTask;
  }  

}
