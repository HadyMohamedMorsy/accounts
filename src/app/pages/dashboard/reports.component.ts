import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { LangPropPipe, RangePipe } from '@shared';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { tap } from 'rxjs';
import { CardContentComponent } from './card-content/card-content.component';
import {
  DashboardItem,
  DashboardService,
} from './card-content/service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CardContentComponent,
    SkeletonModule,
    LangPropPipe,
    ButtonModule,
    TranslateModule,
    RangePipe,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class dashboardComponent {
  #dashboardService = inject(DashboardService);
  statistics = signal<DashboardItem[]>([]);

  dashboardData$ = this.#dashboardService.getDashboardData$.pipe(
    tap((data) => {
      this.statistics.set(data);
    }),
  );

  dashboardData = toSignal(this.dashboardData$, { initialValue: null });
}
