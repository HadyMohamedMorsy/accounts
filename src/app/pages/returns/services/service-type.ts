export interface Returen {
  id: number;
  recipient_name: string;
  recipient_number: string;
  floor: number;
  order_items: orderItems[];
}

export interface orderItems {
  product_name: string;
  quantity: number;
  total: number;
}
