import { Routes } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export const customerRoutes: Routes = [
  {
    path: 'customer',
    loadComponent: () => import('@pages/customers/customers.component'),
    title: _('customer'),
    data: {
      breadcrumbs: [{ label: _('customer') }],
    },
  },
];
