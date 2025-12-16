import React from 'react';
import { useGameStore } from '../store';
import { Gamepad2, Coins, Zap, Coffee, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HUD: React.FC<{ onOpenHelp?: () => void }> = ({ onOpenHelp }) => {
  const { xp, coins, level, isRecruiterMode, toggleRecruiterMode, resetGame, powerups } = useGameStore();

  // XP needed for next level formula inverse: ((Level) / 0.1)^2
  // But strictly speaking, we just want a progress bar.
  // Current Level Base XP = ((Level - 1) / 0.1)^2
  // Next Level Base XP = ((Level) / 0.1)^2
  const currentLevelBaseXP = Math.pow((level - 1) / 0.1, 2);
  const nextLevelBaseXP = Math.pow(level / 0.1, 2);
  const levelSpan = nextLevelBaseXP - currentLevelBaseXP;
  const currentProgress = xp - currentLevelBaseXP;
  
  // Safety check for div by zero or initial state
  const percentage = levelSpan > 0 ? (currentProgress / levelSpan) * 100 : 0;
  const safePercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <header className="fixed top-0 left-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-700 z-40 p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo / Identity */}
        <div className="flex items-center gap-2">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="bg-indigo-600 p-2 rounded-lg"
          >
             <Gamepad2 className="text-white w-6 h-6" />
          </motion.div>
          <div>
            <h1 className="font-bold text-xl text-white tracking-tight pixel-font text-sm md:text-base">DEV.QUEST</h1>
            <p className="text-xs text-slate-400">Gamified Portfolio v1.0</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-6 bg-slate-800 p-2 px-6 rounded-full border border-slate-700 relative">
            
            {/* Active Buffs */}
            <AnimatePresence>
                {powerups.caffeineMultiplier > 1 && (
                    <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg shadow-orange-500/50"
                    >
                        <Coffee size={10} /> 2X XP ACTIVE
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Level */}
            <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase text-slate-400 font-bold">Lvl</span>
                <motion.span 
                    key={level}
                    initial={{ scale: 1.5, color: "#818cf8" }}
                    animate={{ scale: 1, color: "#fff" }}
                    className="text-xl font-bold text-white pixel-font"
                >
                    {level}
                </motion.span>
            </div>

            {/* XP Bar */}
            <div className="w-32 md:w-48">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-indigo-400 font-bold flex items-center gap-1"><Zap size={12}/> XP</span>
                    <span className="text-slate-400">{Math.floor(currentProgress)} / {Math.floor(levelSpan)}</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                        className={`h-full bg-gradient-to-r ${powerups.caffeineMultiplier > 1 ? 'from-orange-500 to-red-500' : 'from-indigo-500 to-purple-500'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${safePercentage}%` }}
                        transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    />
                </div>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-2 border-l border-slate-600 pl-6">
                <Coins className="text-yellow-400 w-5 h-5" />
                <motion.span 
                    key={coins}
                    initial={{ scale: 1.5, color: "#fef08a" }}
                    animate={{ scale: 1, color: "#facc15" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="font-bold text-yellow-400 text-lg pixel-font"
                >
                    {coins}
                </motion.span>
            </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
             <button 
                onClick={toggleRecruiterMode}
                className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${
                    isRecruiterMode 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500' 
                    : 'bg-slate-800 text-slate-400 border-slate-600 hover:text-white'
                }`}
            >
                {isRecruiterMode ? 'ADMIN ACTIVE' : 'RECRUITER MODE'}
            </button>
            <button 
                onClick={() => { if(confirm('Reset game progress?')) resetGame() }}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                title="Reset Game"
            >
                <span className="text-xs">RESET</span>
            </button>
            <button
                onClick={() => onOpenHelp && onOpenHelp()}
                className="p-2 text-slate-500 hover:text-white transition-colors"
                title="Help"
            >
                <HelpCircle className="w-5 h-5" />
            </button>
        </div>
      </div>
    </header>
  );
};