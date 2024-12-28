import { Product } from '@pages/products/services/service-type';

export interface Order {
  id: number;
  order_items: orderItem[];
  customer: string | null;
  customer_id: number | null;
  products: number | null;
  status: string | null;
  selected_type_customer: string | null;
}

export class orderModel {
  id: number | null;
  order_items: orderItem[] | null;
  customer: string | null;
  customer_id: number | null;
  products: Product[] | null;
  selected_type_customer: string | null;
  constructor(editData?: orderModel) {
    this.id = editData?.id || null;
    this.order_items = editData?.order_items || null;
    this.customer = editData?.customer || null;
    this.customer_id = editData?.customer_id || null;
    this.products = editData?.products || null;
    this.selected_type_customer = editData?.selected_type_customer || null;
  }
}

export interface orderItem {
  product: Product;
  quantity: number;
}
