import { Component } from '@angular/core';
import { ListComponent } from "../../../shared/components/list/list.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [ListComponent,TranslateModule],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.css'
})
export class ShowListComponent {

}
