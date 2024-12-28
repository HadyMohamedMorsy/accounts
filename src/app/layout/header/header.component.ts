import { DOCUMENT, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  AuthService,
  BreakpointService,
  ConfirmService,
  LangService,
  LangSwitcherComponent,
} from '@shared';
import { MenuItem } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    NgClass,
    MenuSidebarComponent,
    TranslateModule,
    ButtonModule,
    TooltipModule,
    MenubarModule,
    SplitButtonModule,
    StyleClassModule,
    AutoCompleteModule,
    LangSwitcherComponent,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  #document = inject(DOCUMENT);
  currentUser = inject(AuthService).currentUser;
  #auth = inject(AuthService);
  #langService = inject(LangService);
  currentLang = inject(LangService).currentLanguage;
  #router = inject(Router);
  #destroyRef = inject(DestroyRef); // Current "context" (this component)
  #translate = inject(TranslateService);
  #breakpoint = inject(BreakpointService);
  #confirmService = inject(ConfirmService);

  closeSidebar = signal(false);
  showBtnDisplayMenuSidebar = signal(false);

  selectLink!: { title: string; slug: any };
  blogList = signal<{ title: string; slug: any }[]>([]);

  items!: MenuItem[] | undefined;
  headerLinks!: MenuItem[] | undefined;

  protected dialogConfig: DynamicDialogConfig = {
    showHeader: false,
    width: '800px',
    height: '100%',
    modal: true,
    focusOnShow: true,
    styleClass: 'm-0 max-h-full transform-none',
    position: this.#langService.currentLanguage() === 'en' ? 'right' : 'left',
    rtl: this.#langService.currentLanguage() !== 'en',
    closable: true,
    closeOnEscape: true,
    dismissableMask: true,
  };

  ngOnInit() {
    this.headerLinks = [
      {
        label: this.#translate.instant(_('Customers')),
        icon: 'fa-solid fa-user',
        routerLink: '/customer',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: this.#translate.instant(_('Products')),
        icon: 'fa-brands fa-product-hunt',
        routerLink: '/product',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: this.#translate.instant(_('Orders')),
        icon: 'fa-solid fa-building-un',
        routerLink: '/orders',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: this.#translate.instant(_('Costs')),
        icon: 'fa-solid fa-money-bill',
        routerLink: '/cost',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: this.#translate.instant(_('Returns')),
        icon: 'fa-solid fa-rotate-left',
        routerLink: '/returns',
        routerLinkActiveOptions: { exact: true },
      },
    ];
  }

  isSmScreen = this.#breakpoint.isSmScreen;
  isMdScreen = this.#breakpoint.isMdScreen;
  isLgScreen = this.#breakpoint.isLgScreen;
  isXlScreen = this.#breakpoint.isXlScreen;

  logout() {
    this.#confirmService.confirmDelete({
      message: this.#translate.instant(_('Please confirm to proceed')),
      acceptCallback: () =>
        this.#auth
          .logout()
          .pipe(takeUntilDestroyed(this.#destroyRef))
          .subscribe(() => {
            this.#router.navigateByUrl('auth/login');
            this.closeSidebar.set(true);
          }),
    });
  }

  showSidebar() {
    this.#document.documentElement.style.setProperty(
      '--sidebar-width',
      '15rem',
    );
    this.showBtnDisplayMenuSidebar.set(false);
  }
}
