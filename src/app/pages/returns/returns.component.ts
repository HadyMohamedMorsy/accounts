import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import {
  BaseIndexComponent,
  LangService,
  TableWrapperComponent,
} from '@shared';
import { Returen } from './services/service-type';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [TableWrapperComponent],
  templateUrl:
    '/src/app/shared/components/basic-crud/base-index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReturnsComponent extends BaseIndexComponent<Returen> {
  currentLang = inject(LangService).currentLanguage;
  ngOnInit() {
    this.indexMeta = {
      ...this.indexMeta,
      endpoints: {
        index: 'returns/index',
        delete: 'returns/delete',
      },
      withAction: false,
      displayCreateButton: false,
      indexTitle: this.translate.instant(_('returns')),
      indexIcon: 'fa-brands fa-product-hunt',
      indexTableKey: 'RETURN_KEY',
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
      ],
    };
  }

  #translate(text: string) {
    return this.translate.instant(text);
  }
}
