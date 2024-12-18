import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LangService } from '@shared';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
})
export default class AuthLayoutComponent {
  currentLang = inject(LangService).currentLanguage;
  get getDate() {
    return new Date().getFullYear();
  }
}
