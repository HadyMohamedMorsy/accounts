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
import { CostModel } from './services/service-type';

@Component({
  selector: 'app-cost-dialog',
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
export class CostDialogComponent extends BaseCreateUpdateComponent<CostModel> {
  #fieldBuilder = inject(FieldBuilderService);

  ngOnInit() {
    this.dialogMeta = {
      ...this.dialogMeta,
      endpoints: {
        store: 'cost/store',
        update: 'cost/update',
      },
    };

    if (this.editData) {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Update cost')),
        submitButtonLabel: this.translate.instant(_('Update cost')),
      };
      this.model = new CostModel(this.editData);
    } else {
      this.dialogMeta = {
        ...this.dialogMeta,
        dialogTitle: this.translate.instant(_('Create cost')),
        submitButtonLabel: this.translate.instant(_('Create cost')),
      };
      this.model = new CostModel();
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
          key: `transportation`,
          type: 'floated-input-field',
          props: {
            label: _(`transportation`),
            placeholder: _(`transportation`),
          },
        },
        {
          key: `packaging`,
          type: 'floated-input-field',
          props: {
            label: _(`packaging`),
            placeholder: _(`packaging`),
          },
        },
        {
          key: `advertising_markting`,
          type: 'floated-input-field',
          props: {
            label: _(`advertising markting price`),
            placeholder: _(`advertising markting price`),
          },
        },
      ]),
      this.#fieldBuilder.fieldBuilder([
        {
          key: `damaged`,
          type: 'floated-input-field',
          className: 'col-12 md:col-4',
          props: {
            label: _(`damaged`),
            placeholder: _(`damaged`),
          },
        },
        {
          key: `salaries`,
          type: 'floated-input-field',
          className: 'col-12 md:col-4',
          props: {
            label: _(`salaries`),
            placeholder: _(`salaries`),
          },
        },
      ]),
    ];
  }
}
