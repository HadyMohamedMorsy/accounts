import { ComponentType } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { OrderDialogComponent } from '@pages/orders/order-dialog.component';
import {
  AlertService,
  BaseIndexComponent,
  LangService,
  TableWrapperComponent,
} from '@shared';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ProductDialogComponent } from './products-dialog.component';
import { Product } from './services/service-type';

export interface orderItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TranslateModule,
    TableWrapperComponent,
    TooltipModule,
    ButtonModule,
  ],
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductComponent extends BaseIndexComponent<
  Product,
  ComponentType<ProductDialogComponent>
> {
  alertService = inject(AlertService);
  currentLang = inject(LangService).currentLanguage;
  productCart = signal<orderItem[]>([]);
  count = computed(() => this.productCart().length);

  ngOnInit() {
    this.dialogComponent = ProductDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'product/index',
        delete: 'product/delete',
      },
      indexTitle: this.translate.instant(_('products')),
      createBtnLabel: this.translate.instant(_('Create product')),
      indexIcon: 'fa-brands fa-product-hunt',
      indexTableKey: 'PRODUCT_KEY',
      columns: [
        {
          name: 'id',
          title: this.#translate(_('#ID')),
          searchable: false,
          orderable: false,
        },
        {
          name: `code`,
          title: this.#translate(_('Code')),
          searchable: true,
          orderable: false,
        },
        {
          name: `name`,
          title: this.#translate(_('Name')),
          searchable: true,
          orderable: false,
        },
        {
          name: `selling_price`,
          title: this.#translate(_('selling price')),
          searchable: false,
          orderable: false,
        },
        {
          name: `purchase_price`,
          title: this.#translate(_('Purchase Price')),
          searchable: false,
          orderable: false,
        },
        {
          name: `store`,
          title: this.#translate(_('Store')),
          searchable: false,
          orderable: false,
        },
      ],
    };
  }

  protected openOrderDialog() {
    const dialogConfigOptions = this.dialogConfig;
    this.dialogRef = this.dialogService.open(OrderDialogComponent, {
      ...dialogConfigOptions,
      data: this.productCart(),
    });
    this.dialogRef.onClose
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  addOrder(product: Product) {
    this.productCart.update((products) => {
      const existingProductIndex = products.findIndex(
        (item) => item.product.id === product.id,
      );

      if (existingProductIndex >= 0) {
        this.alertService.setMessage({
          severity: 'success',
          detail: this.#translate(
            _(
              'This product has been added before. The number of this product has been increased',
            ),
          ),
        });
        products[existingProductIndex].quantity += 1;
      } else {
        this.alertService.setMessage({
          severity: 'success',
          detail: this.#translate(_('this product is added on cart item')),
        });
        products = [{ product, quantity: 1 }, ...products];
      }

      return products;
    });
    console.log(this.productCart());
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
