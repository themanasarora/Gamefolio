import React from 'react';
import { useGameStore } from '../store';
import { ShopItem } from '../types';
import { Lock, Unlock, User, Briefcase, Cpu, FileText, Zap, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const SHOP_ITEMS: ShopItem[] = [
  { id: 'BIO', type: 'SECTION', target: 'BIO', title: 'Character Bio', description: 'Unlock the developer\'s background. (Free at Lvl 2)', cost: 50, icon: 'User', levelReq: 2 },
  { id: 'TECH', type: 'SECTION', target: 'TECH', title: 'Tech Stack', description: 'Reveal the arsenal of tools. (Free at Lvl 3)', cost: 100, icon: 'Cpu', levelReq: 3 },
  { id: 'PROJECTS', type: 'SECTION', target: 'PROJECTS', title: 'Quest Log', description: 'Access the list of missions. (Free at Lvl 4)', cost: 250, icon: 'Briefcase', levelReq: 4 },
  { id: 'AUTO_CODER', type: 'UPGRADE', title: 'Auto Coder Bot', description: 'Passive XP/Coins. Auto-unlocks Bio & Tech.', cost: 400, icon: 'Bot', levelReq: 3 },
  { id: 'RESUME', type: 'SECTION', target: 'RESUME', title: 'Full Resume', description: 'Download official data sheet. (Free at Lvl 5)', cost: 500, icon: 'FileText', levelReq: 5 },
];

const getIcon = (name: string) => {
    switch(name) {
        case 'User': return <User size={24} />;
        case 'Cpu': return <Cpu size={24} />;
        case 'Briefcase': return <Briefcase size={24} />;
        case 'FileText': return <FileText size={24} />;
        case 'Bot': return <Bot size={24} />;
        default: return <User size={24} />;
    }
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export const Shop: React.FC = () => {
  const { coins, unlockedSections, purchaseSection, purchaseAutoCoder, powerups, isRecruiterMode, level } = useGameStore();

  const handleBuy = (item: ShopItem) => {
    if (item.type === 'SECTION' && item.target) {
        const success = purchaseSection(item.target, item.cost);
        if (!success) alert("Not enough coins!");
    } else if (item.id === 'AUTO_CODER') {
        const success = purchaseAutoCoder();
        if (!success) alert("Not enough coins! Cost: 400");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 pb-20">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl font-bold text-white mb-2 pixel-font">Item Shop</h2>
        <p className="text-slate-400 mb-8">Buy early access or upgrades. Sections unlock free at specific levels.</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {SHOP_ITEMS.map((item) => {
          let isUnlocked = false;
          
          if (item.type === 'SECTION' && item.target) {
              isUnlocked = unlockedSections[item.target] || isRecruiterMode;
          } else if (item.id === 'AUTO_CODER') {
              isUnlocked = powerups.hasAutoCoder;
          }

          const canAfford = coins >= item.cost;
          const isLevelRequirementMet = item.levelReq ? level >= item.levelReq : true;

          // For sections, level requirement essentially "unlocks" them (free).
          // For upgrades, level requirement enables the ability to purchase.
          
          const showOwned = isUnlocked || (item.type === 'SECTION' && isLevelRequirementMet);
          const isPurchasable = item.type === 'SECTION' || isLevelRequirementMet;

          return (
            <motion.div 
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`relative p-6 rounded-xl border-2 transition-all overflow-hidden ${
                    showOwned 
                    ? 'bg-emerald-900/20 border-emerald-500/50' 
                    : !isPurchasable
                        ? 'bg-slate-900 border-slate-800 opacity-60' 
                        : 'bg-slate-800 border-slate-700'
                }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${showOwned ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    {getIcon(item.icon)}
                </div>
                <div className="flex flex-col items-end gap-1">
                    {showOwned ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold text-xs uppercase border border-emerald-500/30 px-2 py-1 rounded">
                            <Unlock size={12} /> Owned
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-yellow-400 font-bold pixel-font">
                           {item.cost} Coins
                        </span>
                    )}
                    
                    {item.type === 'SECTION' && item.levelReq && !showOwned && (
                         <span className="text-[10px] text-slate-500 font-mono">
                            Free at Lvl {item.levelReq}
                         </span>
                    )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">{item.description}</p>

              <button
                disabled={showOwned || (!isPurchasable)}
                onClick={() => handleBuy(item)}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                    showOwned
                    ? 'bg-transparent text-emerald-500 cursor-default'
                    : !isPurchasable
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : canAfford
                            ? 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/20'
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                {showOwned ? (
                    'UNLOCKED'
                ) : !isPurchasable ? (
                    <>LVL {item.levelReq} REQ <Lock size={16} /></>
                ) : (
                    <>
                        {canAfford ? 'PURCHASE' : 'LOCKED'} 
                        {!canAfford && <Lock size={16} />}
                    </>
                )}
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};