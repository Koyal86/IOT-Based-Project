import React from 'react';
import { motion } from 'framer-motion';

const SensorCard = ({ icon: Icon, name, value, unit, status = 'normal' }) => {
  const statusColors = {
    normal: 'border-cyan-500/30 shadow-cyan-500/20',
    warning: 'border-yellow-500/50 shadow-yellow-500/30',
    critical: 'border-red-500/50 shadow-red-500/30'
  };

  const statusDots = {
    normal: 'bg-cyan-400',
    warning: 'bg-yellow-400',
    critical: 'bg-red-400'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`glass-neon-card p-6 rounded-xl border ${statusColors[status]} relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl -mr-16 -mt-16" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <div className={`w-3 h-3 rounded-full ${statusDots[status]} animate-pulse`} />
        </div>
        
        <h3 className="text-gray-300 text-sm font-medium mb-2">{name}</h3>
        
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-gray-400 text-sm">{unit}</span>
        </div>
        
        <div className="mt-3 text-xs">
          <span className={`
            px-2 py-1 rounded-full
            ${status === 'normal' ? 'bg-cyan-500/20 text-cyan-400' : ''}
            ${status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : ''}
            ${status === 'critical' ? 'bg-red-500/20 text-red-400' : ''}
          `}>
            {status === 'normal' ? 'Normal' : status === 'warning' ? 'Warning' : 'Critical'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SensorCard;