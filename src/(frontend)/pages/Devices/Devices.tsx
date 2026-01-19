import React, { useState } from 'react';
import { Device, Location, DeviceStatus, DeviceType } from '../../../../types';
import { Tablet, QrCode, Monitor, Wifi, WifiOff, AlertTriangle, X, Send } from 'lucide-react';

interface DevicesProps {
  devices: Device[];
  locations: Location[];
}

const Devices: React.FC<DevicesProps> = ({ devices, locations }) => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [issueMessage, setIssueMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const getLocationName = (id: string) => locations.find(l => l.location_id === id)?.location_name || 'Unknown';

  const getIcon = (type: DeviceType) => {
    switch (type) {
      case DeviceType.QR: return QrCode;
      case DeviceType.KIOSK: return Monitor;
      case DeviceType.TABLET: return Tablet;
      default: return Tablet;
    }
  };

  const handleReportClick = (device: Device) => {
    setSelectedDevice(device);
    setIssueMessage('');
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
        console.log(`Report submitted for device ${selectedDevice?.device_id}: ${issueMessage}`);
        setIsSubmitting(false);
        setSelectedDevice(null);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Devices</h2>
        <p className="text-zinc-400">Monitor the status of your connected terminals.</p>
      </div>

      <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-950 text-zinc-400 font-medium border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4">Device Type</th>
                <th className="px-6 py-4">Device ID</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {devices.map(device => {
                const Icon = getIcon(device.device_type);
                return (
                  <tr key={device.device_id} className="hover:bg-zinc-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-zinc-800 rounded text-zinc-400">
                          <Icon size={18} />
                        </div>
                        <span className="font-medium text-white">{device.device_type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">{device.device_id}</td>
                    <td className="px-6 py-4 text-zinc-400">{getLocationName(device.location_id)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {device.status === DeviceStatus.ACTIVE ? (
                          <Wifi size={14} className="text-green-500" />
                        ) : (
                          <WifiOff size={14} className="text-zinc-500" />
                        )}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                          ${device.status === DeviceStatus.ACTIVE ? 'bg-green-900/20 text-green-400 border-green-900/50' : 
                            device.status === DeviceStatus.OFFLINE ? 'bg-red-900/20 text-red-400 border-red-900/50' : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                          }`}>
                          {device.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                        <button 
                            onClick={() => handleReportClick(device)}
                            className="text-xs font-medium text-red-400 hover:text-red-300 hover:underline flex items-center gap-1 transition-colors"
                        >
                            <AlertTriangle size={14} />
                            Report Issue
                        </button>
                    </td>
                  </tr>
                );
              })}
              {devices.length === 0 && (
                 <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">No devices registered.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Issue Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-zinc-900 rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-in zoom-in duration-200 border border-zinc-800">
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <AlertTriangle size={18} className="text-red-500" />
                        Report Device Issue
                    </h3>
                    <button onClick={() => setSelectedDevice(null)} className="text-zinc-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmitReport}>
                    <div className="p-6 space-y-4">
                        <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 text-sm space-y-2">
                             <div className="flex justify-between">
                                <span className="text-zinc-500">Device:</span>
                                <span className="text-white font-medium">{selectedDevice.device_type} <span className="text-zinc-600">({selectedDevice.device_id})</span></span>
                             </div>
                             <div className="flex justify-between">
                                <span className="text-zinc-500">Location:</span>
                                <span className="text-white font-medium">{getLocationName(selectedDevice.location_id)}</span>
                             </div>
                             <div className="flex justify-between">
                                <span className="text-zinc-500">Status:</span>
                                <span className={`${selectedDevice.status === DeviceStatus.ACTIVE ? 'text-green-400' : 'text-red-400'} font-medium`}>{selectedDevice.status}</span>
                             </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Describe the issue</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-700 text-white focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all placeholder-zinc-600 resize-none"
                                placeholder="Please describe the problem you are experiencing with this device..."
                                value={issueMessage}
                                onChange={(e) => setIssueMessage(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex justify-end gap-3">
                        <button 
                            type="button"
                            onClick={() => setSelectedDevice(null)}
                            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-bold bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/10"
                        >
                            {isSubmitting ? 'Sending...' : (
                                <>
                                    <Send size={14} />
                                    Submit Ticket
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Devices;