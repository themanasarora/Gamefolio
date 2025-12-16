import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store';
import { Code2, Terminal, Coffee, MousePointer2, Zap } from 'lucide-react';
import { FloatingText } from './FloatingText';

export const Dashboard: React.FC = () => {
  const { addCoins, addXp, activateCaffeine, powerups, level } = useGameStore();
  const [clicks, setClicks] = useState<{id: number, x: number, y: number, text: string, color?: string}[]>([]);
  const [now, setNow] = useState(Date.now());

  // Update timer for UI
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWork = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // Game Logic
    const coinReward = Math.floor(Math.random() * 3) + 1; // 1-3 coins
    const baseXp = 5;
    
    // We don't multiply manually here because addXp handles the multiplier in the store
    // But we want to show the correct visual
    const xpGained = baseXp * powerups.caffeineMultiplier;
    
    addCoins(coinReward);
    addXp(baseXp);

    // Visuals
    const rect = e.currentTarget.getBoundingClientRect();
    
    const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        text: `+${coinReward} Gold`,
        color: 'text-yellow-400'
    };
    
    const xpClick = {
        id: Date.now() + 1,
        x: e.clientX + 20,
        y: e.clientY - 20,
        text: `+${xpGained} XP`,
        color: powerups.caffeineMultiplier > 1 ? 'text-blue-400' : 'text-indigo-400'
    };
    
    setClicks(prev => [...prev, newClick, xpClick]);
  }, [addCoins, addXp, powerups.caffeineMultiplier]);

  const handleCaffeine = () => {
      const result = activateCaffeine();
      if (result.success) {
          // Visual feedback
          setClicks(prev => [...prev, {
              id: Date.now(),
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
              text: "2x XP BOOST!",
              color: "text-orange-500"
          }]);
      }
  };

  const isCaffeineActive = now < powerups.caffeineEndsAt;
  const isCaffeineCooldown = now < powerups.caffeineCooldownUntil;
  
  // Calculate cooldown progress
  let cooldownProgress = 0;
  if (isCaffeineCooldown) {
      const totalCooldown = 5 * 60 * 1000;
      const remaining = powerups.caffeineCooldownUntil - now;
      cooldownProgress = (remaining / totalCooldown) * 100;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 py-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-3xl font-bold text-white">The Grind Station</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Write code to earn currency. Use power-ups to maximize efficiency.
        </p>
      </motion.div>

      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWork}
          className={`group relative w-64 h-64 rounded-full border-4 shadow-[0_0_50px_rgba(99,102,241,0.3)] flex flex-col items-center justify-center overflow-hidden transition-colors ${
              isCaffeineActive 
              ? 'bg-slate-800 border-orange-500 shadow-[0_0_80px_rgba(249,115,22,0.4)]'
              : 'bg-slate-800 border-indigo-500 hover:border-indigo-400 hover:bg-slate-700'
          }`}
        >
          <div className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ${isCaffeineActive ? 'bg-orange-500/10' : 'bg-indigo-500/10'}`} />
          <Terminal size={64} className={`mb-4 transition-colors ${isCaffeineActive ? 'text-orange-400' : 'text-indigo-400'}`} />
          <span className="text-xl font-bold text-white pixel-font">WRITE CODE</span>
          <span className={`text-xs mt-2 font-bold ${isCaffeineActive ? 'text-orange-400 animate-pulse' : 'text-indigo-300'}`}>
              {isCaffeineActive ? '2X XP ACTIVE!' : '+XP & +COINS'}
          </span>
        </motion.button>

        {/* Global Floating Text container */}
        <AnimatePresence>
            {clicks.map(click => (
                <FloatingText 
                    key={click.id} 
                    x={click.x} 
                    y={click.y} 
                    text={click.text} 
                    color={click.color}
                    onComplete={() => setClicks(prev => prev.filter(c => c.id !== click.id))}
                />
            ))}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mt-8"
      >
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg"><MousePointer2 size={20} className="text-blue-400"/></div>
            <div>
                <div className="text-sm font-bold text-white">Manual Grind</div>
                <div className="text-xs text-slate-500">Base click power</div>
            </div>
        </div>

        {/* Auto Coder Status */}
        <div className={`p-4 rounded-lg border flex items-center gap-3 transition-colors ${
            powerups.hasAutoCoder 
            ? 'bg-purple-900/20 border-purple-500/50' 
            : 'bg-slate-800 border-slate-700 opacity-50'
        }`}>
            <div className="p-2 bg-purple-500/20 rounded-lg">
                <Code2 size={20} className={powerups.hasAutoCoder ? "text-purple-400 animate-pulse" : "text-slate-400"}/>
            </div>
            <div>
                <div className="text-sm font-bold text-white">Auto-Coder</div>
                <div className="text-xs text-slate-500">
                    {powerups.hasAutoCoder ? 'Passive Income Active' : 'Purchase in Shop'}
                </div>
            </div>
        </div>

        {/* Caffeine Boost Button */}
        <button 
            onClick={handleCaffeine}
            disabled={isCaffeineActive || isCaffeineCooldown}
            className={`relative overflow-hidden p-4 rounded-lg border flex items-center gap-3 transition-all text-left ${
                isCaffeineActive 
                ? 'bg-orange-900/20 border-orange-500' 
                : isCaffeineCooldown
                    ? 'bg-slate-800 border-slate-700 cursor-not-allowed'
                    : 'bg-slate-800 border-slate-700 hover:border-orange-400 hover:bg-slate-750'
            }`}
        >
            {/* Cooldown Overlay */}
            {isCaffeineCooldown && (
                 <div 
                    className="absolute bottom-0 left-0 h-1 bg-slate-500 transition-all duration-1000"
                    style={{ width: `${cooldownProgress}%` }}
                 />
            )}
            
            <div className={`p-2 rounded-lg ${isCaffeineActive ? 'bg-orange-500/20' : 'bg-orange-500/10'}`}>
                <Coffee size={20} className={isCaffeineActive ? "text-orange-400" : "text-orange-300"}/>
            </div>
            <div className="z-10">
                <div className="text-sm font-bold text-white">Caffeine Boost</div>
                <div className="text-xs text-slate-500">
                    {isCaffeineActive 
                        ? '2x XP Active!' 
                        : isCaffeineCooldown 
                            ? `Cooldown ${Math.ceil((powerups.caffeineCooldownUntil - now)/1000)}s` 
                            : 'Activate (5m CD)'
                    }
                </div>
            </div>
        </button>
      </motion.div>
    </div>
  );
};