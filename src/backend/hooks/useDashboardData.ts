// import { useState, useEffect } from 'react';
// import { Order } from '../../../types';

// interface DashboardData {
//     orders: Order[];
//     lifetimeRevenue: number;
//     lifetimeReferralFees: number;
// }

// interface UseDashboardDataReturn {
//     data: DashboardData | null;
//     loading: boolean;
//     error: string | null;
//     refetch: () => Promise<void>;
// }

// const API_URL = 'http://localhost:3001';

// export function useDashboardData(): UseDashboardDataReturn {
//     const [data, setData] = useState<DashboardData | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             setError(null);

//             const response = await fetch(`${API_URL}/api/dashboard`);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();
//             setData(result);
//         } catch (err) {
//             const message = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
//             setError(message);
//             console.error('Error fetching dashboard data:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return {
//         data,
//         loading,
//         error,
//         refetch: fetchData,
//     };
// }