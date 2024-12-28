export interface Customer {
  id: number;
  email: string;
  fullName: string;
  phone: number;
  floorNumber: number;
  address: string;
}

export class CustomerModel {
  id: number | null;
  email: string | null;
  fullName: string | null;
  phone: number | null;
  floorNumber: number | null;
  address: string | null;

  constructor(editData?: CustomerModel) {
    this.id = editData?.id || null;
    this.email = editData?.email || null;
    this.fullName = editData?.fullName || null;
    this.phone = editData?.phone || null;
    this.floorNumber = editData?.floorNumber || null;
    this.address = editData?.address || null;
  }
}
