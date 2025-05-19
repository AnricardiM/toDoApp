import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {


 constructor(private translate: TranslateService) {
        // Set the default language
        this.translate.setDefaultLang('en');
        // Use English as the initial language
        this.translate.use('en');
    }

    switchLanguage(lang: string) {
        this.translate.use(lang);
    }
}
