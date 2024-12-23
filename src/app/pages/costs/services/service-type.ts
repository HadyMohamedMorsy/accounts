export interface Cost {
  id: number;
  transportation: number;
  packaging: number;
  advertising_markting: number;
  damaged: number;
}

export class CostModel {
  id: number | null;
  transportation: number | null;
  packaging: number | null;
  advertising_markting: number | null;
  damaged: number | null;
  salaries: number | null;

  constructor(editData?: CostModel) {
    this.id = editData?.id || null;
    this.transportation = editData?.transportation ?? 0;
    this.packaging = editData?.packaging ?? 0;
    this.advertising_markting = editData?.advertising_markting ?? 0;
    this.salaries = editData?.salaries ?? 0;
    this.damaged = editData?.damaged ?? 0;
  }
}
