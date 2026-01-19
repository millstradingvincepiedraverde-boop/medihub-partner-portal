import React from 'react';
import { Location } from '../../../../types';
import { MapPin, Building } from 'lucide-react';

interface LocationsProps {
  locations: Location[];
}

const Locations: React.FC<LocationsProps> = ({ locations }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Locations</h2>
        <p className="text-zinc-400">Manage your registered operating locations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map(loc => (
          <div key={loc.location_id} className="bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-800 hover:border-zinc-600 transition-colors group">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-zinc-800 text-white rounded-lg group-hover:bg-zinc-700 transition-colors">
                <MapPin size={24} />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">{loc.location_name}</h3>
            <div className="mt-4 space-y-2">
               <div className="flex items-center text-sm text-zinc-500">
                 <Building size={14} className="mr-2" />
                 <span>ID: {loc.location_id}</span>
               </div>
               <div className="flex items-center text-sm text-zinc-500">
                 <span className="px-2 py-1 bg-zinc-800 rounded text-xs font-mono text-zinc-300">Ext: {loc.attio_location_id}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;