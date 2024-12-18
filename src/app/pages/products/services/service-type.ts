export interface Product {
  id: number;
  name: string;
  price: number;
  sku: string;
}

export class ProductModel {
  id: number | null;
  name: string | null;
  price: number | null;
  cost: number | null;
  sku: string | null;

  constructor(editData?: ProductModel) {
    this.id = editData?.id || null;
    this.name = editData?.name || null;
    this.price = editData?.price || null;
    this.cost = editData?.cost || null;
    this.sku = editData?.sku || null;
  }
}
