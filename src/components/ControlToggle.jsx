import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ControlToggle = ({ label, icon: Icon, isOn, onToggle, loading = false }) => {
  const handleClick = async () => {
    if (loading) return;
    await onToggle(!isOn);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-neon-card p-6 rounded-xl border border-cyan-500/30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{label}</h3>
            <p className="text-sm text-gray-400">
              {isOn ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>

        <button
          onClick={handleClick}
          disabled={loading}
          className={`
            relative w-16 h-8 rounded-full transition-all duration-300
            ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${isOn ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-700'}
          `}
        >
          <motion.div
            animate={{ x: isOn ? 32 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`
              absolute top-1 left-1 w-6 h-6 rounded-full bg-white
              ${isOn ? 'shadow-[0_0_15px_rgba(0,217,255,0.5)]' : ''}
            `}
          />
        </button>
      </div>
    </motion.div>
  );
};

export default ControlToggle;