import { Routes } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export const returnsRoutes: Routes = [
  {
    path: 'returns',
    loadComponent: () => import('@pages/returns/returns.component'),
    title: _('returns'),
    data: {
      breadcrumbs: [{ label: _('returns') }],
    },
  },
];
