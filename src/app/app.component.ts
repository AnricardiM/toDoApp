import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    standalone: true,
     templateUrl: './app.component.html',
  styleUrl: './app.component.css',
    imports: [TranslateModule, RouterOutlet]
})
export class AppComponent {
    constructor(private translate: TranslateService) {
     /*   this.translate.setDefaultLang('es');
        this.translate.use('es');*/
    }

    switchLanguage(lang: string) {
        this.translate.use(lang);
    }
    
}