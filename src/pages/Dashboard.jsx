import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLocalAuth } from '@/context/LocalAuthContext';
import { 
  Thermometer, Wind, Droplets, Activity, Volume2, 
  Flame, AlertTriangle, Fan, Navigation, MapPin 
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useLocalAuth();
  
  // State
  const [systemOn, setSystemOn] = useState(true);
  const [alarmOn, setAlarmOn] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  
  const [data, setData] = useState({
    temp: 28,
    humidity: 65,
    methane: 2.3,
    co: 15,
    hydrogen: 5,
    alcohol: 0.8,
    dust: 120,
    smoke: 45,
    sound: 72,
    flame: true,
    motion: true
  });

  // Simulation effect
  useEffect(() => {
    if (!systemOn) return;
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        temp: +(prev.temp + (Math.random() - 0.5)).toFixed(1),
        humidity: Math.min(100, Math.max(0, +(prev.humidity + (Math.random() - 0.5) * 2).toFixed(0))),
        co: Math.max(0, +(prev.co + (Math.random() - 0.5)).toFixed(0)),
        dust: Math.max(0, +(prev.dust + (Math.random() - 0.5) * 5).toFixed(0)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [systemOn]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - IoT Monitor</title>
      </Helmet>

      <div className="cyberpunk-bg p-4 sm:p-6 min-h-screen text-white font-sans">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="cyber-header-box py-3 px-6 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-wider">
  {currentUser?.companyName || "Company Name"}
</h1>
            <button onClick={handleLogout} className="text-xs text-neon-blue hover:text-white uppercase tracking-widest border border-neon-blue/30 px-3 py-1 rounded hover:bg-neon-blue/20 transition">
              Logout
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Sensors) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* System Status Bar */}
            <div className="cyber-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-semibold text-lg">System Status</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-400">System:</span>
                <div className="cyber-toggle">
                  <button 
                    onClick={() => setSystemOn(true)}
                    className={`cyber-toggle-btn ${systemOn ? 'active' : 'inactive'}`}
                  >
                    ON
                  </button>
                  <button 
                    onClick={() => setSystemOn(false)}
                    className={`cyber-toggle-btn ${!systemOn ? 'active' : 'inactive'}`}
                  >
                    OFF
                  </button>
                </div>
              </div>
            </div>

            {/* Large Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Temperature */}
              <div className="cyber-card p-5 flex flex-col justify-between min-h-[160px]">
                <div className="flex items-center gap-3 cyber-card-header">
                  <Thermometer className="text-neon-blue w-6 h-6" />
                  <span className="font-semibold text-lg">Temperature</span>
                </div>
                <div className="flex items-center justify-center flex-grow relative">
                  <div className="text-6xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    {data.temp}°c
                  </div>
                  {/* Decorative graph bg simulation */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-t from-neon-blue/20 to-transparent clip-path-polygon" />
                </div>
              </div>

              {/* Gas Levels */}
              <div className="cyber-card p-5 min-h-[160px]">
                <div className="flex items-center gap-3 cyber-card-header mb-4">
                  <div className="bg-blue-500/20 p-1 rounded">
                    <Wind className="text-blue-400 w-5 h-5" />
                  </div>
                  <span className="font-semibold text-lg">Gas Levels</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" /> Methane:
                    </span>
                    <span className="font-bold">{data.methane}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full" /> CO:
                    </span>
                    <span className="font-bold">{data.co} ppm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full" /> Hydrogen:
                    </span>
                    <span className="font-bold">{data.hydrogen} ppm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full" /> Alcohol:
                    </span>
                    <span className="font-bold">{data.alcohol}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Metrics Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Humidity */}
              <div className="cyber-card p-4">
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-2 border-b border-gray-700 pb-1">
                  <Droplets className="w-4 h-4 text-cyan-400" /> Humidity
                </div>
                <div className="text-3xl font-bold text-center py-2">{data.humidity}%</div>
                <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full" style={{ width: `${data.humidity}%` }} />
                </div>
              </div>

              {/* Dust */}
              <div className="cyber-card p-4">
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-2 border-b border-gray-700 pb-1">
                  <Activity className="w-4 h-4 text-purple-400" /> Dust Particle
                </div>
                <div className="text-2xl font-bold text-center py-2">{data.dust} <span className="text-sm text-gray-400">µg/m³</span></div>
              </div>

              {/* Smoke */}
              <div className="cyber-card p-4">
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-2 border-b border-gray-700 pb-1">
                  <Wind className="w-4 h-4 text-gray-400" /> Smoke
                </div>
                <div className="text-2xl font-bold text-center py-2">{data.smoke} <span className="text-sm text-gray-400">PPM</span></div>
              </div>

              {/* Sound Level */}
              <div className="cyber-card p-4">
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-2 border-b border-gray-700 pb-1">
                  <Volume2 className="w-4 h-4 text-green-400" /> Sound Level
                </div>
                <div className="text-2xl font-bold text-center py-1">{data.sound} dB</div>
                <div className="flex justify-center mt-2">
                  <button onClick={() => setSoundOn(!soundOn)} className={`p-1 rounded ${soundOn ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Small Metrics Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Flame */}
              <div className="cyber-card p-4 border-red-500/30">
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-2 border-b border-red-500/20 pb-1">
                  <Flame className="w-4 h-4 text-orange-500" /> Flame Detected
                </div>
                <div className="text-3xl font-bold text-center py-2 text-orange-400">
                  {data.flame ? 'Yes' : 'No'}
                </div>
              </div>

              {/* Alarm Control */}
              <div className="cyber-card p-4">
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-2 border-b border-gray-700 pb-1">
                  <AlertTriangle className="w-4 h-4 text-red-400" /> Alarm
                </div>
                <div className="flex justify-center py-3">
                  <div className="cyber-toggle">
                    <button onClick={() => setAlarmOn(true)} className={`cyber-toggle-btn ${alarmOn ? 'active' : 'inactive'}`}>ON</button>
                    <button onClick={() => setAlarmOn(false)} className={`cyber-toggle-btn ${!alarmOn ? 'active' : 'inactive'}`}>OFF</button>
                  </div>
                </div>
              </div>

              {/* Fan Control */}
              <div className="cyber-card p-4">
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-2 border-b border-gray-700 pb-1">
                  <Fan className="w-4 h-4 text-cyan-300" /> Fan Control
                </div>
                <div className="flex justify-center py-3">
                  <div className="cyber-toggle">
                    <button onClick={() => setFanOn(true)} className={`cyber-toggle-btn ${fanOn ? 'active' : 'inactive'}`}>ON</button>
                    <button onClick={() => setFanOn(false)} className={`cyber-toggle-btn ${!fanOn ? 'active' : 'inactive'}`}>OFF</button>
                  </div>
                </div>
              </div>

              {/* Motion Detect */}
              <div className="cyber-card p-4">
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-2 border-b border-gray-700 pb-1">
                  <Navigation className="w-4 h-4 text-purple-400" /> Motion Detect
                </div>
                <div className="flex flex-col items-center justify-center py-1">
                  <Navigation className={`w-8 h-8 ${data.motion ? 'text-blue-400 animate-pulse' : 'text-gray-600'}`} />
                  <span className="text-xl font-bold mt-1">{data.motion ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column (Map) */}
          <div className="space-y-6">
            <div className="cyber-card h-full min-h-[300px] flex flex-col">
              <div className="p-3 cyber-card-header">
                <span className="font-semibold text-lg flex items-center gap-2">
                  <MapPin className="text-neon-accent" /> Location Map
                </span>
              </div>
              <div className="flex-grow bg-gray-900 relative m-2 rounded overflow-hidden border border-gray-700 group">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
                
                {/* Map Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="relative">
                     <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute" />
                     <MapPin className="text-red-500 w-8 h-8 relative z-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                   </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur p-2 rounded border border-gray-700 flex items-center gap-2">
                   <MapPin className="w-4 h-4 text-blue-400" />
                   <span className="text-sm font-mono text-gray-300">GPS Location Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Alert Section */}
        <div className="max-w-7xl mx-auto mt-6">
          <div className="cyber-card p-0 overflow-hidden border-yellow-500/50">
            <div className="bg-gradient-to-r from-yellow-900/40 to-transparent p-2 border-b border-yellow-500/30 flex items-center gap-2 px-4">
               <AlertTriangle className="text-yellow-500 w-5 h-5" />
               <span className="font-bold text-yellow-100">Alert Message</span>
            </div>
            <div className="p-4 bg-yellow-500/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                <AlertTriangle className="text-black w-8 h-8" />
              </div>
              <div>
                 <h3 className="text-yellow-400 font-bold text-lg">Warning: High Carbon Monoxide Levels Detected!</h3>
                 <p className="text-gray-400 text-sm">Please check the ventilation systems immediately.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;