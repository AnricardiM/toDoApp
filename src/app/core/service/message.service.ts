import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private mensajeSource = new BehaviorSubject<string>('');
  mensaje$ = this.mensajeSource.asObservable();

  mostrarMensaje(msg: string, duracionMs = 3000) {
    this.mensajeSource.next(msg);

    setTimeout(() => {
      this.mensajeSource.next('');
    }, duracionMs);
  }
}
