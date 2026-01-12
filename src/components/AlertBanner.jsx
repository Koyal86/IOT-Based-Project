import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Flame, Wind, Droplets, Activity, Navigation, X } from 'lucide-react';

const AlertBanner = ({ alerts, onDismiss }) => {
  const alertIcons = {
    fire: Flame,
    gas: Wind,
    co: Droplets,
    motion: Activity,
    distance: Navigation
  };

  const alertColors = {
    fire: 'from-red-500 to-orange-500',
    gas: 'from-yellow-500 to-orange-500',
    co: 'from-orange-500 to-red-500',
    motion: 'from-blue-500 to-cyan-500',
    distance: 'from-purple-500 to-pink-500'
  };

  return (
    <AnimatePresence>
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-4 right-4 z-50 flex flex-col gap-2 max-w-2xl mx-auto"
        >
          {alerts.map((alert, index) => {
            const Icon = alertIcons[alert.type] || AlertTriangle;
            const gradient = alertColors[alert.type] || 'from-red-500 to-orange-500';
            
            return (
              <motion.div
                key={`${alert.type}-${index}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  glass-neon-card p-4 rounded-lg border-2 border-red-500/50
                  bg-gradient-to-r ${gradient} bg-opacity-10
                  backdrop-blur-xl
                `}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                      className="p-2 rounded-lg bg-white/20"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{alert.title}</h4>
                      <p className="text-white/90 text-sm">{alert.message}</p>
                    </div>
                  </div>
                  
                  {onDismiss && (
                    <button
                      onClick={() => onDismiss(alert.type)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertBanner;