import { Injectable, inject } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class StaticDataService {
  #translate = inject(TranslateService);

  public languages = [
    {
      value: 'en',
      label: this.#translate.instant(_('English')),
    },
    {
      value: 'ar',
      label: this.#translate.instant(_('Arabic')),
    },
  ];

  public typesSetting = [
    { value: 'icon', label: this.#translate.instant(_('icon')) },
    { value: 'image', label: this.#translate.instant(_('image')) },
    { value: 'title', label: this.#translate.instant(_('title')) },
    { value: 'description', label: this.#translate.instant(_('description')) },
  ];

  public typeCareer = [
    { value: 'Part Time', label: this.#translate.instant(_('Part Time')) },
    { value: 'Full Time', label: this.#translate.instant(_('Full Time')) },
  ];

  public status = [
    { value: 'pending', label: this.#translate.instant(_('Pending')) },
    { value: 'approved', label: this.#translate.instant(_('Approved')) },
    { value: 'rejected', label: this.#translate.instant(_('Rejected')) },
  ];
}
