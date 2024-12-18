import { DOCUMENT, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { environment } from '@env';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointService, LangService } from '@shared';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { tap } from 'rxjs';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.scss',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    TooltipModule,
    ButtonModule,
    SkeletonModule,
    TranslateModule,
    PanelMenuModule,
    SidebarModule,
    StyleClassModule,
    RippleModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuSidebarComponent {
  #document = inject(DOCUMENT);
  showSidebar = model(false);
  logout = input(false);
  #breakpoint = inject(BreakpointService);
  currentLang = inject(LangService).currentLanguage;

  domain = environment.DOMAIN_URL_FRONT;

  menuItems = computed(() => [
    {
      title: 'Dashboard',
      icon: 'fas fa-home',
      tooltip: 'Dashboard',
      link: '/dashboard',
    },
    {
      title: 'projects',
      icon: 'fas fa-city',
      tooltip: 'Projects',
      link: '/inventory/projects',
      hidden: this.isLgScreen(),
    },
    {
      title: 'units',
      icon: 'fa-solid fa-building-un',
      tooltip: 'units',
      link: '/inventory/units',
      hidden: this.isLgScreen(),
    },
    {
      title: 'blogs',
      icon: 'fa-solid fa-newspaper',
      tooltip: 'Blogs',
      link: '/blogs',
      hidden: this.isLgScreen(),
    },
    {
      title: 'Careers',
      icon: 'fa-solid fa-user-tie',
      tooltip: 'Careers',
      link: 'careers',
      hidden: this.isLgScreen(),
    },
    {
      title: 'Events',
      icon: 'fa-solid fa-calendar-days',
      tooltip: 'Events',
      link: 'events',
      hidden: this.isLgScreen(),
    },
    {
      title: 'Contacts',
      icon: 'fa-solid fa-envelopes-bulk',
      tooltip: 'Contacts',
      link: '/contacts',
    },
    {
      title: 'testimonials',
      icon: 'fa-solid fa-comment',
      tooltip: 'Testimonials',
      link: '/testimonial',
    },
    {
      title: 'organization',
      icon: 'fa-solid fa-sitemap',
      tooltip: 'Organization',
      link: '/organization',
    },
    {
      title: 'packages',
      icon: 'fa-solid fa-box',
      tooltip: 'Packages',
      link: '/packages',
    },
    {
      title: 'settings',
      icon: 'fa-solid fa-gear',
      tooltip: 'Settings',
      styleClass: 'mt-auto',
      link: '/settings',
    },
  ]);

  isSmScreen = this.#breakpoint.isSmScreen;
  isMdScreen = this.#breakpoint.isMdScreen;
  isLgScreen = this.#breakpoint.isLgScreen;
  isXlScreen = this.#breakpoint.isXlScreen;

  logout$ = toObservable(this.logout).pipe(
    tap((log) => {
      if (log) {
        this.showSidebar.set(false);
        this.#document.documentElement.style.setProperty(
          '--sidebar-width',
          '4rem',
        );
      }
    }),
  );

  log = toSignal(this.logout$, { initialValue: false });

  toggleSidebar() {
    this.showSidebar.set(!this.showSidebar());
    this.#document.documentElement.style.setProperty(
      '--sidebar-width',
      this.showSidebar() ? '250px' : '4rem',
    );
  }
}