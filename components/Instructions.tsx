import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';

export const Instructions: React.FC<{
  show: boolean;
  onClose: (dontShowAgain: boolean) => void;
}> = ({ show, onClose }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 max-w-2xl w-full bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-md">
                  <HelpCircle className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">How to play & unlock features</h3>
                  <p className="text-sm text-slate-400 mt-1">A quick walkthrough for first-time visitors.</p>
                </div>
              </div>

              <button
                className="text-slate-400 hover:text-white"
                onClick={() => onClose(dontShowAgain)}
                aria-label="Close"
              >
                <X />
              </button>
            </div>

            <div className="mt-6 grid gap-4 text-sm text-slate-300">
              <div>
                <strong className="text-white">1. Start Grinding</strong>
                <p className="text-slate-400 mt-1">On the <em>Write Code</em> button, click to earn <strong>XP</strong> and <strong>Coins</strong>. XP levels you up; coins let you buy power-ups.</p>
              </div>

              <div>
                <strong className="text-white">2. Buy Power-ups</strong>
                <p className="text-slate-400 mt-1">Open the <em>Item Shop</em> to purchase items like <em>Auto-Coder</em> (passive income) and <em>Caffeine</em> (2x XP boost).</p>
              </div>

              <div>
                <strong className="text-white">3. Complete Bounties</strong>
                <p className="text-slate-400 mt-1">Complete Bounties in the <em>Bounties</em> tab to earn rewards and unlock portfolio sections (Character Bio, Skill Tree, Quest Log, Data Sheet).</p>
              </div>

              <div>
                <strong className="text-white">Tip</strong>
                <p className="text-slate-400 mt-1">Use the <em>RECRUITER MODE</em> toggle in the header to instantly view locked portfolio sections if you are just browsing.</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="accent-indigo-500 w-4 h-4"
                />
                <span className="text-sm">Don't show again</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onClose(dontShowAgain)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
                >
                  Got it
                </button>
                <button
                  onClick={() => onClose(false)}
                  className="px-3 py-2 text-slate-400 rounded-lg border border-slate-800 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Instructions;
