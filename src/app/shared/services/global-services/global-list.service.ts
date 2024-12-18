import { inject, Injectable } from '@angular/core';
import { CachedListService } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class GlobalListService {
  #cacheList = inject(CachedListService);

  getGlobalList(slug: string) {
    const cacheKey = `global-list-${slug}`;
    return this.#cacheList.getListData(
      `helpers/global-list`,
      'POST',
      {
        module_name: slug,
      },
      cacheKey,
    );
  }
}
