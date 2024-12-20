import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import {
  BaseIndexComponent,
  LangService,
  TableWrapperComponent,
} from '@shared';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ProductDialogComponent } from './products-dialog.component';
import { Product } from './services/service-type';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TranslateModule,
    TableWrapperComponent,
    TooltipModule,
    RouterLink,
    ButtonModule,
  ],
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductComponent extends BaseIndexComponent<
  Product,
  ComponentType<ProductDialogComponent>
> {
  currentLang = inject(LangService).currentLanguage;
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

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
