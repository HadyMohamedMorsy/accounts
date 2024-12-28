import { Injectable, inject } from '@angular/core';
import { ApiService, CachedListService } from '@shared';
import { map } from 'rxjs';

export interface DashboardItem {
  title: string;
  value: any;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  #api = inject(ApiService);

  getDashboardData$ = this.#api
    .request('get', 'dashboard/analytics')
    .pipe(map(({ data }) => data));
}
