import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import {
  BaseIndexComponent,
  LangService,
  TableWrapperComponent,
} from '@shared';
import { ProductDialogComponent } from './products-dialog.component';
import { Product } from './services/service-type';

@Component({
  selector: 'app-facility-distance',
  standalone: true,
  imports: [TranslateModule, TableWrapperComponent],
  templateUrl:
    '/src/app/shared/components/basic-crud/base-index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FacilityDistanceComponent extends BaseIndexComponent<
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
          name: `name`,
          title: this.#translate(_('Name')),
          searchable: true,
          orderable: false,
        },
        {
          name: `price`,
          title: this.#translate(_('Price')),
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
