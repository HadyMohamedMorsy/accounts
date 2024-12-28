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
  formValue = signal({});

  productMap: Map<number, any> = new Map();

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
    this.productCart.update((products) => {
      return products.map((pro) => {
        return {
          product: { ...pro.product, store: pro.product.store - pro.quantity },
          quantity: pro.quantity,
        };
      });
    });
    this.dialogRef = this.dialogService.open(OrderDialogComponent, {
      ...dialogConfigOptions,
      data: this.productCart(),
    });
    this.dialogRef.onClose
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (!data) return;
        this.productCart.set([]);
      });
  }

  addOrder(product: Product) {
    if (!this.productMap.has(product.id)) {
      this.productMap.set(product.id, product);
    }

    this.productCart.update((products) => {
      const existingProductIndex = products.findIndex(
        (item) => item.product.id === product.id,
      );

      if (existingProductIndex >= 0) {
        this.message(
          'This product has been added before. The number of this product has been increased',
        );
        products[existingProductIndex].quantity += 1;
      } else {
        this.message('this product is added on cart item');
        products = [{ product, quantity: 1 }, ...products];
      }

      return products;
    });

    this.storeQty(product, 'minus');
  }

  removeOrder(product: Product) {
    this.storeQty(product, 'plus');
    const findRecord = this.records().find((item) => item.id === product.id);
    if (this.productMap.get(product.id).store === findRecord?.store) {
      this.productCart.update((products) => {
        return products.filter((item) => item.product.id !== product.id);
      });
    }
  }

  isHidden(id: number) {
    return !!this.productCart().find((pro) => pro.product.id === id);
  }

  storeQty(product: Product, type: 'plus' | 'minus') {
    this.records.update((records) => {
      return records.map((item) => {
        if (item.id === product.id) {
          const updatedStore =
            type === 'plus' ? item.store + 1 : item.store - 1;
          return { ...item, store: Math.max(0, updatedStore) };
        }
        return item;
      });
    });
  }

  message(message: string, status = 'success') {
    this.alertService.setMessage({
      severity: status,
      detail: this.#translate(_(message)),
    });
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
