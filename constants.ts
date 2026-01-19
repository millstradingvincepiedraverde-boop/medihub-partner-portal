import { Partner, Location, Order, Device, OrderStatus, DeviceType, DeviceStatus } from './types';

export const PARTNERS: Partner[] = [
  {
    partner_id: 'p_001',
    partner_name: 'City Central Pharmacy',
    attio_company_id: 'att_c_01',
    email: 'admin@citypharma.com'
  },
  {
    partner_id: 'p_002',
    partner_name: 'Westside Allied Health',
    attio_company_id: 'att_c_02',
    email: 'contact@westsidehealth.com'
  }
];

export const LOCATIONS: Location[] = [
  // Partner 1 Locations
  { location_id: 'l_001', partner_id: 'p_001', location_name: 'Downtown Branch', attio_location_id: 'att_l_01' },
  { location_id: 'l_002', partner_id: 'p_001', location_name: 'Northside Clinic', attio_location_id: 'att_l_02' },
  // Partner 2 Locations
  { location_id: 'l_003', partner_id: 'p_002', location_name: 'Westside Main', attio_location_id: 'att_l_03' },
];

export const DEVICES: Device[] = [
  { device_id: 'd_001', location_id: 'l_001', partner_id: 'p_001', device_type: DeviceType.KIOSK, status: DeviceStatus.ACTIVE },
  { device_id: 'd_002', location_id: 'l_001', partner_id: 'p_001', device_type: DeviceType.QR, status: DeviceStatus.ACTIVE },
  { device_id: 'd_003', location_id: 'l_002', partner_id: 'p_001', device_type: DeviceType.TABLET, status: DeviceStatus.OFFLINE },
  { device_id: 'd_004', location_id: 'l_003', partner_id: 'p_002', device_type: DeviceType.KIOSK, status: DeviceStatus.ACTIVE },
];

// Helper to generate random orders
const generateOrders = (): Order[] => {
  const orders: Order[] = [];
  const statuses = Object.values(OrderStatus);
  
  // Generate last 30 days of data + some older
  for (let i = 0; i < 150; i++) {
    const isRecent = i < 50;
    const daysAgo = isRecent ? Math.floor(Math.random() * 30) : Math.floor(Math.random() * 365);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const total = Math.floor(Math.random() * 200) + 50;
    
    orders.push({
      order_id: `ord_${1000 + i}`,
      order_date: date.toISOString(),
      partner_id: location.partner_id,
      location_id: location.location_id,
      total_ex_gst: total,
      commission_amount: parseFloat((total * 0.1).toFixed(2)), // 10% commission
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  return orders.sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime());
};

export const MOCK_ORDERS = generateOrders();