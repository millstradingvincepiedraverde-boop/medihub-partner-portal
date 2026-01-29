export enum DeviceStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  OFFLINE = 'Offline'
}

export enum DeviceType {
  QR = 'QR',
  TABLET = 'Tablet',
  KIOSK = 'Kiosk'
}

export enum OrderStatus {
  PAID = 'Paid',
  FULFILLED = 'Fulfilled',
  RETURNED = 'Returned',
  PENDING = 'Pending'
}

export interface Partner {
  id: number;                 // user id
  company_id: string;         // company UUID
  email: string;
  role: string;
  name?: string;
}

export interface Location {
  _id: string;
  location_id: string;
  partner_id: string;
  location_name: string;
  attio_location_id: string;
}

export interface OrderItem {
  product_id: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  order_id: string;
  order_date: string;
  partner_id: string;
  location_id: string;
  total_ex_gst: number;
  commission_amount: number;
  status: OrderStatus;

  items?: OrderItem[]; // ✅ ADD THIS
}



export interface Device {
  device_id: string;
  location_id: string;
  partner_id: string;
  device_type: DeviceType;
  status: DeviceStatus;
}

export interface SupportIssue {
  issue_id: string;
  partner_id: string;
  location_id: string;
  device_id?: string;
  title: string;
  description: string;
  created_at: string;
  status: 'Open' | 'Resolved';
}

export interface Feedback {
  feedback_id: string;
  partner_id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// Helper types for UI
export interface UserSession {
  partner: Partner;
  isAuthenticated: boolean;
}
