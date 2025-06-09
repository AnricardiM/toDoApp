import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ListService } from '../../../core/service/list.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref,RouterLinkActive,TranslateModule ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
public list = this.listService.list;

  constructor(private listService: ListService) {}

  ngOnInit() {
  }
  
  toggle(id: number) {
    this.listService.toggleList(id);
  }

  remove(id: number) {
    this.listService.removeList(id);
  }

    edit(id: number) {
    this.listService.removeList(id);
  }
}

