import { Routes } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export const costRoutes: Routes = [
  {
    path: 'cost',
    loadComponent: () => import('@pages/costs/costs.component'),
    title: _('cost'),
    data: {
      breadcrumbs: [{ label: _('cost') }],
    },
  },
];
