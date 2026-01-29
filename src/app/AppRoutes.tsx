import React from "react";
import Dashboard from "../(frontend)/pages/Dashboard/Dashboard";
import Sales from "../(frontend)/pages/Sales/Sales";
import Locations from "../(frontend)/pages/Locations/Locations";
import Devices from "../(frontend)/pages/Devices/Devices";
import Feedback from "../(frontend)/pages/Feedback/Feedback";
import { Partner, Location, Order } from "../../types";

type Page =
  | "dashboard"
  | "sales"
  | "locations"
  | "devices"
  | "report"
  | "feedback";

type Props = {
  activePage: Page;

  orders: Order[];
  lifetimeRevenue: number;
  lifetimeReferralFees: number;

  locations: Location[];
  locationsLoading: boolean;
  selectedLocation: Location | null;

  currentUser: Partner;

  onSelectLocation: (location: Location) => void;
  onBackToLocations: () => void;
};

const AppRoutes: React.FC<Props> = ({
  activePage,
  orders,
  lifetimeRevenue,
  lifetimeReferralFees,
  locations,
  locationsLoading,
  selectedLocation,
  currentUser,
  onSelectLocation,
  onBackToLocations,
}) => {
  switch (activePage) {
    case "dashboard":
      return (
        <Dashboard
          orders={orders}
          lifetimeRevenue={lifetimeRevenue}
          lifetimeReferralFees={lifetimeReferralFees}
        />
      );

    case "sales":
      return <Sales orders={orders} locations={locations} />;

    case "locations":
      return (
        <Locations
          locations={locations}
          loading={locationsLoading}
          onSelectLocation={onSelectLocation}
        />
      );

    case "devices":
      return selectedLocation ? (
        <Devices
          locationId={selectedLocation._id}
          locationName={selectedLocation.location_name}
          onBack={onBackToLocations}
        />
      ) : null;

    case "feedback":
      return <Feedback partner={currentUser} />;

    default:
      return null;
  }
};

export default AppRoutes;
