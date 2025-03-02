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
        store: 'product/store',
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
          key: `code`,
          type: 'floated-input-field',
          props: {
            label: _(`code`),
            required: true,
            placeholder: _(`code`),
          },
        },
        {
          key: `name`,
          type: 'floated-input-field',
          props: {
            label: _(`Name`),
            required: true,
            placeholder: _(`Name`),
          },
        },
        {
          key: `purchase_price`,
          type: 'floated-input-field',
          className: 'col-12 md:col-4',
          props: {
            label: _(`purchase price`),
            required: true,
            placeholder: _(`purchase price`),
          },
        },
      ]),
      this.#fieldBuilder.fieldBuilder([
        {
          key: `selling_price`,
          type: 'floated-input-field',
          props: {
            label: _(`selling price`),
            required: true,
            placeholder: _(`selling price`),
          },
          expressions: {
            'props.min': 'model.purchase_price',
          },
        },
        {
          key: `store`,
          type: 'floated-input-field',
          className: 'col-12 md:col-4',
          props: {
            type: 'number',
            label: _(`Store`),
            required: true,
            min: 0,
            placeholder: _(`Store`),
          },
        },
      ]),
    ];
  }
}
