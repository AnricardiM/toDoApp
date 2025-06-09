import { Routes } from '@angular/router';
import { AddListComponent } from './features/todo/add-list/add-list.component';
import { EditListComponent } from './features/todo/edit-list/edit-list.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { ShowListComponent } from './features/todo/show-list/show-list.component';


export const routes: Routes = [
    {
    path:"", 
    component:NavComponent,
    children: [
    {path:"", component:ShowListComponent},
    {path:'Add', component:AddListComponent},
    {path:'Edit/:listId', component:EditListComponent},
    {path:'Edit', component:EditListComponent},
     ]
    },
   

];
