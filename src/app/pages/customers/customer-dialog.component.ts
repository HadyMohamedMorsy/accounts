import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  BaseCreateUpdateComponent,
  FieldBuilderService,
  FormComponent,
  SpinnerComponent,
} from '@shared';
import { ButtonModule } from 'primeng/button';
import { CustomerModel } from './services/service-type';

@Component({
  selector: 'app-customer-dialog',
  standalone: true,
  templateUrl:
    '/src/app/shared/components/basic-crud/base-create-update/base-create-update.component.html',
  imports: [
    AsyncPipe,
    TranslateModule,
    RouterLink,
    ButtonModule,
    SpinnerComponent,
    FormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDialogComponent extends BaseCreateUpdateComponent<CustomerModel> {
  #fieldBuilder = inject(FieldBuilderService);

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      endpoints: {
        store: 'customer/store',
        update: 'customer/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update customer')),
        submitButtonLabel: this.translate.instant(_('Update customer')),
      };
      this.model = new CustomerModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create customer')),
        submitButtonLabel: this.translate.instant(_('Create customer')),
      };
      this.model = new CustomerModel();
    }
    this.#updateFields();
  }

  #updateFields() {
    this.fields = this.configureFields();
  }

  configureFields(): FormlyFieldConfig[] {
    return [
      this.#fieldBuilder.fieldBuilder([
        {
          key: `email`,
          type: 'floated-input-field',
          props: {
            label: _(`email`),
            required: true,
            placeholder: _(`email`),
          },
        },
        {
          key: `fullName`,
          type: 'floated-input-field',
          props: {
            label: _(`full name`),
            required: true,
            placeholder: _(`full name`),
          },
        },
      ]),
      this.#fieldBuilder.fieldBuilder([
        {
          key: `phone`,
          type: 'floated-input-field',
          props: {
            type: 'number',
            label: _(`phone`),
            required: true,
            placeholder: _(`phone`),
          },
        },
        {
          key: `floorNumber`,
          type: 'floated-input-field',
          props: {
            label: _(`floor number`),
            required: true,
            placeholder: _(`floor number`),
          },
        },
      ]),
      this.#fieldBuilder.fieldBuilder([
        {
          key: `address`,
          type: 'textarea-field',
          props: {
            label: _(`address`),
            required: true,
            placeholder: _(`address`),
          },
        },
      ]),
    ];
  }
}
