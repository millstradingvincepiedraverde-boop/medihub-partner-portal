import React, { useMemo, useState } from "react";
import { Order } from "../../../../types";
import { formatCurrency } from "../../../backend/services/dataService";
import StatCard from "../../../(frontend)/components/StatCard";
import {
  DollarSign,
  ShoppingBag,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DashboardProps {
  orders: Order[];
  lifetimeRevenue: number;
  lifetimeReferralFees: number;
}

type ChartPeriod = "weekly" | "monthly" | "all-time";

const Dashboard: React.FC<DashboardProps> = ({
  orders,
  lifetimeRevenue,
  lifetimeReferralFees,
}) => {
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("monthly");

  console.log('📊 Dashboard Data:', {
    ordersCount: orders.length,
    lifetimeRevenue,
    lifetimeReferralFees
  });

  // rest of your code...
  /**
   * =====================
   * Lifetime Stats
   * =====================
   * Backend owns money.
   * Frontend owns quantities & visuals.
   */
  const stats = useMemo(() => {
    let lifetimeQuantity = 0;

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        lifetimeQuantity += item.quantity;
      });
    });

    const totalOrders = orders.length;
    const lifetimeAOV =
      totalOrders > 0 ? lifetimeRevenue / totalOrders : 0;

    return {
      lifetimeRevenue,
      lifetimeReferralFees,
      lifetimeQuantity,
      lifetimeAOV,
    };
  }, [orders, lifetimeRevenue, lifetimeReferralFees]);

  /**
   * =====================
   * Chart Data
   * =====================
   */
  const chartData = useMemo(() => {
    const data: Record<
      string,
      { sales: number; sortDate: number }
    > = {};

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (chartPeriod === "weekly") {
      // Last 8 weeks
      for (let i = 7; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i * 7);

        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        const weekStart = new Date(d.setDate(diff));

        const key = `${weekStart.getDate()}/${weekStart.getMonth() + 1}`;
        data[key] = { sales: 0, sortDate: weekStart.getTime() };
      }

      orders.forEach((order) => {
        const d = new Date(order.order_date);
        const diffDays =
          (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);

        if (diffDays <= 60) {
          const day = d.getDay();
          const diff = d.getDate() - day + (day === 0 ? -6 : 1);
          const weekStart = new Date(d);
          weekStart.setDate(diff);
          weekStart.setHours(0, 0, 0, 0);

          const key = `${weekStart.getDate()}/${weekStart.getMonth() + 1}`;
          if (data[key]) {
            data[key].sales += order.total_ex_gst;
          }
        }
      });
    } else if (chartPeriod === "monthly") {
      // Last 6 months
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = d.toLocaleDateString("en-AU", { month: "short" });
        data[key] = { sales: 0, sortDate: d.getTime() };
      }

      orders.forEach((order) => {
        const d = new Date(order.order_date);
        const monthsDiff =
          (now.getFullYear() - d.getFullYear()) * 12 +
          (now.getMonth() - d.getMonth());

        if (monthsDiff >= 0 && monthsDiff <= 6) {
          const key = d.toLocaleDateString("en-AU", { month: "short" });
          if (data[key]) {
            data[key].sales += order.total_ex_gst;
          }
        }
      });
    } else {
      // All time
      orders.forEach((order) => {
        const d = new Date(order.order_date);
        const key = d.toLocaleDateString("en-AU", {
          month: "short",
          year: "2-digit",
        });
        const sortDate = new Date(
          d.getFullYear(),
          d.getMonth(),
          1
        ).getTime();

        if (!data[key]) {
          data[key] = { sales: 0, sortDate };
        }

        data[key].sales += order.total_ex_gst;
      });
    }

    return Object.entries(data)
      .map(([name, val]) => ({
        name,
        sales: val.sales,
        sortDate: val.sortDate,
      }))
      .sort((a, b) => a.sortDate - b.sortDate);
  }, [orders, chartPeriod]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-zinc-400">
          Overview of your performance.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Lifetime Revenue"
          value={formatCurrency(stats.lifetimeRevenue)}
          icon={DollarSign}
        />
        <StatCard
          title="Lifetime Referral Fees"
          value={formatCurrency(stats.lifetimeReferralFees)}
          icon={Calendar}
        />
        <StatCard
          title="Lifetime Quantities Sold"
          value={stats.lifetimeQuantity.toLocaleString()}
          icon={ShoppingBag}
        />
        <StatCard
          title="Lifetime AOV"
          value={formatCurrency(stats.lifetimeAOV)}
          subtitle="Average Order Value"
          icon={TrendingUp}
        />
      </div>

      {/* Chart */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <div className="flex justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            Sales Trend
          </h3>

          <div className="bg-zinc-950 p-1 rounded-lg border border-zinc-800">
            {(["all-time", "monthly", "weekly"] as ChartPeriod[]).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className={`px-3 py-1.5 text-xs rounded-md ${chartPeriod === p
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-white"
                    }`}
                >
                  {p.replace("-", " ")}
                </button>
              )
            )}
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="colorSales"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopOpacity={0.1} />
                  <stop offset="95%" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#27272a"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717a", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717a", fontSize: 12 }}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                formatter={(v: number) => [
                  `$${v.toFixed(2)}`,
                  "Sales",
                ]}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#ffffff"
                strokeWidth={2}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
