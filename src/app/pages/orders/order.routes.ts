import { Routes } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export const costRoutes: Routes = [
  {
    path: 'orders',
    loadComponent: () => import('@pages/orders/orders.component'),
    title: _('orders'),
    data: {
      breadcrumbs: [{ label: _('orders') }],
    },
  },
];
