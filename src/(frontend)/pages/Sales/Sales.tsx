import React, { useMemo, useState } from "react";
import { DollarSign, Calendar, Users, ShoppingBag } from "lucide-react";

type Period = "daily" | "weekly" | "monthly" | "annually";

interface ProductStat {
  title: string;
  quantity: number;
  revenue: number;
}

interface SalesProps {
  orders: any[];
  locations: any[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-zinc-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
      <Icon className="w-8 h-8 text-zinc-600" />
    </div>
  </div>
);

const Sales: React.FC<SalesProps> = ({ orders, locations }) => {
  const [period, setPeriod] = useState<Period>("monthly");

  // Calculate stats from orders
  const revenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.revenue || 0), 0);
  }, [orders]);

  const referralFees = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.referralFee || 0), 0);
  }, [orders]);

  const customers = useMemo(() => {
    const uniqueCustomers = new Set(orders.map(order => order.customerId || order.customer_id));
    return uniqueCustomers.size;
  }, [orders]);

  const unitsSold = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.quantity || 0), 0);
  }, [orders]);

  // Aggregate products from orders
  const products = useMemo(() => {
    const productMap = new Map<string, ProductStat>();

    orders.forEach(order => {
      const title = order.productTitle || order.product_title || 'Unknown Product';
      const quantity = order.quantity || 0;
      const revenue = order.revenue || 0;

      if (productMap.has(title)) {
        const existing = productMap.get(title)!;
        existing.quantity += quantity;
        existing.revenue += revenue;
      } else {
        productMap.set(title, { title, quantity, revenue });
      }
    });

    return Array.from(productMap.values());
  }, [orders]);

  const productsByQuantity = useMemo(
    () => [...products].sort((a, b) => b.quantity - a.quantity),
    [products]
  );

  const productsByRevenue = useMemo(
    () => [...products].sort((a, b) => b.revenue - a.revenue),
    [products]
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Sales Analytics</h2>
        <p className="text-zinc-400">Revenue & performance breakdown.</p>
      </div>

      {/* Period Selector */}
      <div className="bg-zinc-950 p-1 rounded-lg border border-zinc-800 w-fit">
        {(["daily", "weekly", "monthly", "annually"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 text-xs rounded-md ${period === p
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white"
              }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Revenue"
          value={formatCurrency(revenue)}
          icon={DollarSign}
        />
        <StatCard
          title="Referral Fees"
          value={formatCurrency(referralFees)}
          icon={Calendar}
        />
        <StatCard
          title="Customers"
          value={customers.toLocaleString()}
          icon={Users}
        />
        <StatCard
          title="Units Sold"
          value={unitsSold.toLocaleString()}
          icon={ShoppingBag}
        />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products by Quantity */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-4">
            Products Sold by Quantity
          </h3>

          <table className="w-full text-sm">
            <thead className="text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="text-left py-2">Product</th>
                <th className="text-right py-2">Units</th>
              </tr>
            </thead>
            <tbody>
              {productsByQuantity.map((p) => (
                <tr
                  key={p.title}
                  className="border-b border-zinc-800 last:border-none"
                >
                  <td className="py-2 text-white">{p.title}</td>
                  <td className="py-2 text-right text-white">{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Products by Revenue */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-4">
            Products Sold by Revenue
          </h3>

          <table className="w-full text-sm">
            <thead className="text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="text-left py-2">Product</th>
                <th className="text-right py-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {productsByRevenue.map((p) => (
                <tr
                  key={p.title}
                  className="border-b border-zinc-800 last:border-none"
                >
                  <td className="py-2 text-white">{p.title}</td>
                  <td className="py-2 text-right text-white">
                    {formatCurrency(p.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Graph placeholder */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <h3 className="text-lg font-semibold text-white mb-2">
          Sales Trend ({period})
        </h3>
        <p className="text-zinc-400 text-sm">
          GraphQL / chart integration goes here.
        </p>
      </div>
    </div>
  );
};

// Demo with sample data
export default function App() {
  const sampleProducts: ProductStat[] = [
    { title: "Premium Widget", quantity: 145, revenue: 14500 },
    { title: "Standard Widget", quantity: 230, revenue: 11500 },
    { title: "Deluxe Package", quantity: 89, revenue: 17800 },
    { title: "Starter Kit", quantity: 312, revenue: 9360 },
    { title: "Pro Bundle", quantity: 67, revenue: 13400 },
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      <Sales
        revenue={66560}
        referralFees={3328}
        customers={843}
        unitsSold={843}
        products={sampleProducts}
      />
    </div>
  );
}