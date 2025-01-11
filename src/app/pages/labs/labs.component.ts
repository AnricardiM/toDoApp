import { Component, signal } from '@angular/core';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = "New title";
  tasks =['Tarea 1', 'Tarea 2', 'Tarea 3'];
  tasks2 =signal(['Tarea 1', 'Tarea 2', 'Tarea 3']);
  name = signal('Mari');

 colorCtrl = new FormControl();
 widthCtrl = new FormControl(50,{ validators: Validators.nullValidator});
 nameCtrl = new FormControl('',
  { validators: [Validators.required, Validators.minLength(3)]});

  changeValue(event: Event){
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
  }
}
