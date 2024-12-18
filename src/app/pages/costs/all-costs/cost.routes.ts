import { Routes } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

export const costsRoutes: Routes = [
  {
    path: 'costs',
    loadComponent: () => import('./all-cost.component'),
    title: _('costs'),
    data: {
      breadcrumbs: [{ label: _('costs') }],
    },
    children: [
      
    ]
  },
];
