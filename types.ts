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
  partner_id: string;
  partner_name: string;
  attio_company_id: string;
  email: string; 
}

export interface Location {
  location_id: string;
  partner_id: string;
  location_name: string;
  attio_location_id: string;
}

export interface Order {
  order_id: string;
  order_date: string; // ISO Date string
  partner_id: string;
  location_id: string;
  total_ex_gst: number;
  commission_amount: number;
  status: OrderStatus;
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