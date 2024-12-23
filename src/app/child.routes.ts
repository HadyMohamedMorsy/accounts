import { Route } from '@angular/router';
import { costRoutes } from '@pages/costs/cost.routes';
import { orderRoutes } from '@pages/orders/order.routes';
import { productRoutes } from '@pages/products/products.routes';
import { returnsRoutes } from '@pages/returns/returns.routes';
export default [
  ...returnsRoutes,
  ...productRoutes,
  ...costRoutes,
  ...orderRoutes,
] as Route[];
