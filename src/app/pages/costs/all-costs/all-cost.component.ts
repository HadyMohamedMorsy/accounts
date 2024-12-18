import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-all-cost',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './all-cost.component.html',
  styleUrl: './all-cost.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AllCostComponent {
  #translate = inject(TranslateService);
  costsLinks = signal<MenuItem[]>([]);

  ngOnInit() {
    this.costsLinks.set([
      {
        label: this.#translate.instant(_('Purchases')),
        icon: 'fa-solid fa-cart-shopping',
        routerLink: '/purchases',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: this.#translate.instant(_('Transportation')),
        icon: 'fa-solid fa-car',
        routerLink: '/Transportation',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: this.#translate.instant(_('Packaging')),
        icon: 'fa-solid fa-truck-fast',
        routerLink: '/Packaging',
        routerLinkActiveOptions: { exact: true },
      },
    ]);
  }
}
