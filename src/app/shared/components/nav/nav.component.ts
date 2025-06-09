import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
 imports: [TranslateModule, RouterLinkActive, RouterLinkWithHref, CommonModule, RouterOutlet],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
 @Input() hiddenBack: boolean = false;
 currentLang: string = "es";

 constructor(private translate: TranslateService) {
        this.translate.setDefaultLang('es');
        this.translate.use('es');
    }

    switchLanguage(lang: string) {
        this.translate.use(lang);
        this.currentLang = lang;
    }
}
