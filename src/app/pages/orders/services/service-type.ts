export interface Order {
  id: number;
  recipient_name: string;
  recipient_number: string;
  total: number;
}

export class ProductModel {
  id: number | null;
  recipient_name: string | null;
  recipient_number: string | null;
  floor: number | null;
  order_items: orderItems[] | null;
  constructor(editData?: ProductModel) {
    this.id = editData?.id || null;
    this.recipient_name = editData?.recipient_name || null;
    this.recipient_number = editData?.recipient_number || null;
    this.floor = editData?.floor || null;
    this.order_items = editData?.order_items || null;
  }
}

export interface orderItems {
  product_name: string;
  quantity: number;
  total: number;
}
