import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import {
  BaseIndexComponent,
  LangService,
  TableWrapperComponent,
} from '@shared';
import { CostDialogComponent } from './cost-dialog.component';
import { Cost } from './services/service-type';

@Component({
  selector: 'app-costs',
  standalone: true,
  imports: [TranslateModule, TableWrapperComponent],
  templateUrl:
    '/src/app/shared/components/basic-crud/base-index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CostsComponent extends BaseIndexComponent<
  Cost,
  ComponentType<CostDialogComponent>
> {
  currentLang = inject(LangService).currentLanguage;
  ngOnInit() {
    this.dialogComponent = CostDialogComponent;
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'cost/index',
        delete: 'cost/delete',
      },
      indexTitle: this.translate.instant(_('Costs')),
      createBtnLabel: this.translate.instant(_('Create costs')),
      indexIcon: 'fa-brands fa-product-hunt',
      indexTableKey: 'COSTS_KEY',
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
