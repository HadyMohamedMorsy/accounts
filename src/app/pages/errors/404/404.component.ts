import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LangService } from '@shared';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  templateUrl: './404.component.html',
  styleUrl: './404.component.scss',
  standalone: true,
  imports: [ButtonModule, TranslateModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Error404Component {
  currentLanguage = inject(LangService).currentLanguage;
}
