import React, { useEffect, useState } from "react";
import Dashboard from "../(frontend)/pages/Dashboard/Dashboard";
import Sidebar from "../(frontend)/components/Sidebar";
import { PARTNERS } from "../../constants";
import { Partner } from "../../types";
import { Menu, Loader2 } from "lucide-react";
import Logo from "../(frontend)/components/Logo";

const API_URL = "http://localhost:3001";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<Partner | null>(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [data, setData] = useState({
    orders: [],
    lifetimeRevenue: 0,
    lifetimeReferralFees: 0,
    lifetimeQuantitiesSold: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/dashboard`);
        if (!response.ok) throw new Error("Failed to fetch dashboard");

        const dashboardData = await response.json();

        const lifetimeQuantitiesSold = dashboardData.orders.reduce(
          (sum: number, order: any) =>
            sum +
            order.items.reduce(
              (itemSum: number, item: any) => itemSum + item.quantity,
              0
            ),
          0
        );

        setData({
          orders: dashboardData.orders,
          lifetimeRevenue: dashboardData.lifetimeRevenue,
          lifetimeReferralFees: dashboardData.lifetimeReferralFees,
          lifetimeQuantitiesSold,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800">
          <Logo className="h-10 mx-auto mb-4" />
          {PARTNERS.map((p) => (
            <button
              key={p.partner_id}
              onClick={() => setCurrentUser(p)}
              className="block w-full p-3 mt-2 bg-zinc-800 rounded text-white"
            >
              {p.partner_name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950">
        <Loader2 className="animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={() => setCurrentUser(null)}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
        partnerName={currentUser.partner_name}
      />

      <main className="flex-1 p-6 overflow-y-auto">
        {error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <Dashboard
            orders={data.orders}
            lifetimeRevenue={data.lifetimeRevenue}
            lifetimeReferralFees={data.lifetimeReferralFees}
          />
        )}
      </main>

      <button
        className="lg:hidden fixed top-4 right-4"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu />
      </button>
    </div>
  );
};

export default App;
