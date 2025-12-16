import React, { useState, useEffect } from 'react';
import { HUD } from './components/HUD';
import { Dashboard } from './components/Dashboard';
import { Shop } from './components/Shop';
import { Challenges } from './components/Challenges';
import { ContentArea } from './components/ContentArea';
import { View } from './types';
import { LayoutDashboard, ShoppingCart, Trophy, User, Code2, FolderGit2, FileText, Menu, X } from 'lucide-react';
import { useGameStore } from './store';
import { AnimatePresence, motion } from 'framer-motion';
import Instructions from './components/Instructions';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('DASHBOARD');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Instructions modal visibility (first-time help)
  const [showInstructions, setShowInstructions] = useState(false);
  
  const { isRecruiterMode, unlockedSections, powerups, addXp, addCoins, checkBuffs } = useGameStore();

  // GAME LOOP
  useEffect(() => {
      const interval = setInterval(() => {
          // 1. Check if buffs expired
          checkBuffs();

          // 2. Handle Auto Coder
          if (powerups.hasAutoCoder && !isRecruiterMode) {
              // 1 XP and 1 Coin per second (tick)
              addXp(1);
              addCoins(1);
          }
      }, 1000);

      return () => clearInterval(interval);
  }, [powerups.hasAutoCoder, isRecruiterMode, checkBuffs, addXp, addCoins]);

  // Show instructions automatically when a user first visits the dashboard
  useEffect(() => {
    try {
      const seen = localStorage.getItem('devquest_seen_instructions');
      if (!seen && currentView === 'DASHBOARD') {
        setShowInstructions(true);
      }
    } catch (e) {
      // localStorage may be unavailable in some environments
    }
  }, [currentView]);

  const handleNav = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  const handleCloseInstructions = (dontShowAgain: boolean) => {
    if (dontShowAgain) {
      try { localStorage.setItem('devquest_seen_instructions', '1'); } catch (e) {}
    }
    setShowInstructions(false);
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => {
    const isActive = currentView === view;
    // Check lock status for content tabs
    const isContentTab = ['BIO', 'PROJECTS', 'TECH', 'RESUME'].includes(view);
    const isLocked = isContentTab && !unlockedSections[view as keyof typeof unlockedSections] && !isRecruiterMode;

    return (
      <button
        onClick={() => handleNav(view)}
        className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200 group relative overflow-hidden ${
          isActive 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
      >
        <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
        <span className="font-bold tracking-wide text-sm">{label}</span>
        {isLocked && <div className="absolute right-4 text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-500">LOCKED</div>}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      <HUD onOpenHelp={() => setShowInstructions(true)} />
      <Instructions show={showInstructions} onClose={handleCloseInstructions} />

      <main className="pt-24 pb-8 px-4 h-full min-h-screen flex gap-6 max-w-7xl mx-auto h-[calc(100vh-6rem)]">
        
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-slate-900/50 rounded-2xl border border-slate-800 h-full sticky top-24 backdrop-blur-sm p-4">
            <div className="space-y-2 mb-8">
                <div className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Game Menu</div>
                <NavItem view="DASHBOARD" icon={LayoutDashboard} label="Dashboard" />
                <NavItem view="SHOP" icon={ShoppingCart} label="Item Shop" />
                <NavItem view="CHALLENGES" icon={Trophy} label="Bounties" />
            </div>

            <div className="space-y-2">
                <div className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Portfolio Data</div>
                <NavItem view="BIO" icon={User} label="Character Bio" />
                <NavItem view="TECH" icon={Code2} label="Skill Tree" />
                <NavItem view="PROJECTS" icon={FolderGit2} label="Quest Log" />
                <NavItem view="RESUME" icon={FileText} label="Data Sheet" />
            </div>
            
            <div className="mt-auto px-4 pt-4 border-t border-slate-800">
                <p className="text-[10px] text-slate-600 text-center">
                    &copy; {new Date().getFullYear()} DevQuest.<br/>Press 'Recruiter Mode' to skip.
                </p>
            </div>
        </aside>

        {/* Mobile Menu Toggle */}
        <button 
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-xl shadow-indigo-500/40"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
            {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
             <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 space-y-4 lg:hidden animate-in fade-in duration-200">
                <NavItem view="DASHBOARD" icon={LayoutDashboard} label="Dashboard" />
                <NavItem view="SHOP" icon={ShoppingCart} label="Item Shop" />
                <NavItem view="CHALLENGES" icon={Trophy} label="Bounties" />
                <div className="w-full h-px bg-slate-800 my-4"></div>
                <NavItem view="BIO" icon={User} label="Character Bio" />
                <NavItem view="TECH" icon={Code2} label="Skill Tree" />
                <NavItem view="PROJECTS" icon={FolderGit2} label="Quest Log" />
                <NavItem view="RESUME" icon={FileText} label="Data Sheet" />
             </div>
        )}

        {/* Main Content Area */}
        <section className="flex-grow bg-slate-900/50 rounded-2xl border border-slate-800 h-full backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="relative z-10 p-6 md:p-10 h-full overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentView}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="min-h-full pb-10"
                    >
                        {currentView === 'DASHBOARD' && <Dashboard />}
                        {currentView === 'SHOP' && <Shop />}
                        {currentView === 'CHALLENGES' && <Challenges />}
                        
                        {['BIO', 'TECH', 'PROJECTS', 'RESUME'].includes(currentView) && (
                            <ContentArea view={currentView} onChangeView={handleNav} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>

      </main>
    </div>
  );
};

export default App;