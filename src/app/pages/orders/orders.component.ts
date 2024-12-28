import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import {
  BaseIndexComponent,
  LangService,
  TableWrapperComponent,
} from '@shared';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { Order } from './services/service-type';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    DropdownModule,
    TableWrapperComponent,
  ],
  templateUrl: './orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrdersComponent extends BaseIndexComponent<Order> {
  currentLang = inject(LangService).currentLanguage;
  status = viewChild.required<TemplateRef<any>>('status');

  statusTypes = [
    {
      label: this.translate.instant(_('Pending')),
      value: 'pending',
    },
    {
      label: this.translate.instant(_('Deliveried')),
      value: 'deliveried',
    },
    {
      label: this.translate.instant(_('Returns')),
      value: 'returns',
    },
  ];

  ngOnInit() {
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'orders/index',
        delete: 'orders/delete',
      },
      indexTitle: this.translate.instant(_('Orders')),
      indexIcon: 'fa-brands fa-product-hunt',
      displayDeleteButton: false,
      displayUpdateButton: false,
      displayCreateButton: false,
      withAction: false,
      indexTableKey: 'ORDER_KEY',
      columns: [
        {
          name: 'id',
          title: this.#translate(_('#ID')),
          searchable: false,
          orderable: false,
        },
        {
          name: 'total_order',
          title: this.#translate(_('total order')),
          searchable: false,
          orderable: false,
        },
        {
          name: 'status',
          title: this.#translate(_('status')),
          searchable: false,
          orderable: false,
          render: this.status(),
        },
      ],
    };
  }

  changeStatus(id: number, event: DropdownChangeEvent) {
    this.api
      .request('put', 'orders/update-status', {
        status: event.value,
        id,
      })
      .subscribe();
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
