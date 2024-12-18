import { Route } from '@angular/router';
import { settingsRoutes } from '@pages/settings/all-settings/settings.routes';
import { currencyRoutes } from '@pages/settings/currencies/currency.routes';
import { facilitydistanceRoutes } from '@pages/settings/facility-distance/facility-distance.routes';
import { faqsRoutes } from '@pages/settings/faqs/faqs.routes';
import { usersRoutes } from '@pages/settings/users/users.routes';
export default [
  ...currencyRoutes,
  ...usersRoutes,
  ...settingsRoutes,
  ...faqsRoutes,
  ...facilitydistanceRoutes,
] as Route[];
