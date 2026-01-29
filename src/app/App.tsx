import React, { useState, useEffect } from "react";
import Sidebar from "../(frontend)/components/Sidebar";
import { Loader2 } from "lucide-react";
import Logo from "../(frontend)/components/Logo";
import { Partner, Location } from "../../types";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../(frontend)/firebase/firebase.client";
import AppRoutes from "./AppRoutes";

const API_URL = "http://localhost:3001";

/* ========================= PAGE TYPE ========================= */
export type Page =
  | "dashboard"
  | "sales"
  | "locations"
  | "devices"
  | "report"
  | "feedback";

const App: React.FC = () => {
  /* ========================= AUTH ========================= */
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<Partner | null>(null);

  /* ========================= NAV ========================= */
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* ========================= DASHBOARD ========================= */
  const [orders, setOrders] = useState<any[]>([]);
  const [lifetimeRevenue, setLifetimeRevenue] = useState(0);
  const [lifetimeReferralFees, setLifetimeReferralFees] = useState(0);

  /* ========================= LOCATIONS ========================= */
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<Location | null>(null);

  /* ========================= UI ========================= */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ========================= LOGIN FORM ========================= */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  /* ========================= RESTORE SESSION ========================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser?.email) {
        setCurrentUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/api/companies/by-email?email=${firebaseUser.email}`
        );
        const json = await res.json();
        setCurrentUser(json?.data || null);
      } catch (err) {
        console.error("Auth restore failed", err);
        setCurrentUser(null);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /* ========================= DASHBOARD DATA ========================= */
  useEffect(() => {
    if (!currentUser?.company_id) return;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_URL}/api/dashboard?companyId=${currentUser.company_id}`
        );
        const json = await res.json();
        setOrders(json.orders || []);
        setLifetimeRevenue(json.lifetimeRevenue || 0);
        setLifetimeReferralFees(json.lifetimeReferralFees || 0);
      } catch {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
    setActivePage("dashboard");
  }, [currentUser]);

  /* ========================= LOCATIONS ========================= */
  useEffect(() => {
    if (!currentUser?.company_id) return;

    const fetchLocations = async () => {
      try {
        setLocationsLoading(true);
        const res = await fetch(
          `${API_URL}/api/locations?companyId=${currentUser.company_id}`
        );
        const json = await res.json();
        setLocations(json.data || []);
      } finally {
        setLocationsLoading(false);
      }
    };

    fetchLocations();
  }, [currentUser]);

  /* ========================= NAV HANDLERS ========================= */
  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    setActivePage("devices");
  };

  const handleBackToLocations = () => {
    setSelectedLocation(null);
    setActivePage("locations");
  };

  /* ========================= AUTH LOADING GUARD (CRITICAL FIX) ========================= */
  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <Loader2 className="w-10 h-10 animate-spin text-zinc-400" />
      </div>
    );
  }

  /* ========================= LOGIN ========================= */
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
          <Logo className="h-12 mx-auto mb-6" />

          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setAuthError(null);

              try {
                const cred = await signInWithEmailAndPassword(
                  auth,
                  email,
                  password
                );

                const res = await fetch(
                  `${API_URL}/api/companies/by-email?email=${cred.user.email}`
                );
                const json = await res.json();

                if (!json.data) {
                  throw new Error("No company linked to this account");
                }

                setCurrentUser(json.data);
              } catch (err: any) {
                setAuthError(err.message || "Login failed");
              }
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded bg-zinc-950 border border-zinc-800 text-white"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded bg-zinc-950 border border-zinc-800 text-white"
              required
            />

            {authError && (
              <div className="text-red-400 text-sm">{authError}</div>
            )}

            <button className="w-full p-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ========================= APP ========================= */
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100">
      <Sidebar
        activePage={activePage}
        onNavigate={(page: Page) => {
          if (page !== "devices") setSelectedLocation(null);
          setActivePage(page);
        }}
        onLogout={() => {
          auth.signOut();
          setCurrentUser(null);
        }}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
        partnerName={currentUser.name}
      />

      <div className="flex-1 overflow-y-auto p-6">
        {error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <AppRoutes
            activePage={activePage}
            orders={orders}
            lifetimeRevenue={lifetimeRevenue}
            lifetimeReferralFees={lifetimeReferralFees}
            locations={locations}
            locationsLoading={locationsLoading}
            selectedLocation={selectedLocation}
            currentUser={currentUser}
            onSelectLocation={handleSelectLocation}
            onBackToLocations={handleBackToLocations}
          />
        )}
      </div>
    </div>
  );
};

export default App;
