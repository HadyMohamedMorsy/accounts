import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import {
  AlertService,
  BaseIndexComponent,
  LangService,
  TableWrapperComponent,
} from '@shared';
import { CustomerDialogComponent } from './customer-dialog.component';
import { Customer } from './services/service-type';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [TranslateModule, TableWrapperComponent],
  templateUrl:
    '/src/app/shared/components/basic-crud/base-index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomerComponent extends BaseIndexComponent<
  Customer,
  ComponentType<CustomerDialogComponent>
> {
  alertService = inject(AlertService);
  currentLang = inject(LangService).currentLanguage;

  ngOnInit() {
    this.dialogComponent = CustomerDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'customer/index',
        delete: 'customer/delete',
      },
      indexTitle: this.translate.instant(_('Customer')),
      createBtnLabel: this.translate.instant(_('Create Customer')),
      indexIcon: 'fa-solid fa-user',
      indexTableKey: 'CUSTOMER_KEY',
      columns: [
        {
          name: 'id',
          title: this.#translate(_('#ID')),
          searchable: false,
          orderable: false,
        },
        {
          name: `email`,
          title: this.#translate(_('Email')),
          searchable: true,
          orderable: false,
        },
        {
          name: `fullName`,
          title: this.#translate(_('Full Name')),
          searchable: true,
          orderable: false,
        },
        {
          name: `phone`,
          title: this.#translate(_('Phone')),
          searchable: false,
          orderable: false,
        },
        {
          name: `floorNumber`,
          title: this.#translate(_('Floor Number')),
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
