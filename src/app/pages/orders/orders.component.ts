import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import {
  BaseIndexComponent,
  LangService,
  TableWrapperComponent,
} from '@shared';
import { Order } from './services/service-type';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TranslateModule, TableWrapperComponent],
  templateUrl:
    '/src/app/shared/components/basic-crud/base-index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrdersComponent extends BaseIndexComponent<Order> {
  currentLang = inject(LangService).currentLanguage;
  ngOnInit() {
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'order/index',
        delete: 'order/delete',
      },
      indexTitle: this.translate.instant(_('order')),
      indexIcon: 'fa-brands fa-product-hunt',
      indexTableKey: 'ORDER_KEY',
      columns: [
        {
          name: 'id',
          title: this.#translate(_('#ID')),
          searchable: false,
          orderable: false,
        },
        {
          name: `recipient_name`,
          title: this.#translate(_('recipient name')),
          searchable: true,
          orderable: false,
        },
        {
          name: `recipient_number`,
          title: this.#translate(_('recipient number')),
          searchable: true,
          orderable: false,
        },
        {
          name: `floor`,
          title: this.#translate(_('floor')),
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
