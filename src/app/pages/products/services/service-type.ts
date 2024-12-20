export interface Product {
  id: number;
  name: string;
  price: number;
  sku: string;
}

export class ProductModel {
  id: number | null;
  name: string | null;
  code: string | null;
  selling_price: number | null;
  purchase_price: number | null;
  store: number | null;

  constructor(editData?: ProductModel) {
    this.id = editData?.id || null;
    this.name = editData?.name || null;
    this.code = editData?.code || null;
    this.purchase_price = editData?.purchase_price || null;
    this.selling_price = editData?.selling_price || null;
    this.store = editData?.store || null;
  }
}
