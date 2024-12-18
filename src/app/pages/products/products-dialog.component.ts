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
import { ProductModel } from './services/service-type';

@Component({
  selector: 'app-product-dialog',
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
export class ProductDialogComponent extends BaseCreateUpdateComponent<ProductModel> {
  #fieldBuilder = inject(FieldBuilderService);

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      endpoints: {
        store: 'product/index',
        update: 'product/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update product')),
        submitButtonLabel: this.translate.instant(_('Update product')),
      };
      this.model = new ProductModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create product')),
        submitButtonLabel: this.translate.instant(_('Create product')),
      };
      this.model = new ProductModel();
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
          key: `name`,
          type: 'floated-input-field',
          props: {
            label: _(`name`),
            required: true,
            placeholder: _(`name`),
          },
        },
        {
          key: `price`,
          type: 'floated-input-field',
          props: {
            label: _(`price`),
            required: true,
            placeholder: _(`price`),
          },
        },
      ]),
      this.#fieldBuilder.fieldBuilder([
        {
          key: `sku`,
          type: 'floated-input-field',
          props: {
            label: _(`sku`),
            required: true,
            placeholder: _(`sku`),
          },
        },
        {
          key: `cost`,
          type: 'floated-input-field',
          props: {
            type: 'number',
            label: _(`cost`),
            required: true,
            placeholder: _(`name`),
          },
        },
      ]),
    ];
  }
}
