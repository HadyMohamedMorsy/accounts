import { Routes } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export const facilitydistanceRoutes: Routes = [
  {
    path: 'product',
    loadComponent: () => import('@pages/products/products.component'),
    title: _('product'),
    data: {
      breadcrumbs: [{ label: _('product') }],
    },
  },
];
