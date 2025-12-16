import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState } from './types';

// Non-linear level curve: Level = floor(0.1 * sqrt(XP)) + 1
// XP needed for Level L: ((L-1) / 0.1)^2
// Examples: Lvl 2 = 100xp, Lvl 3 = 400xp, Lvl 4 = 900xp, Lvl 5 = 1600xp
const calculateLevel = (xp: number) => {
  return Math.floor(0.1 * Math.sqrt(xp)) + 1;
};

// Check for level-based unlocks
const checkLevelUnlocks = (level: number, currentUnlocks: GameState['unlockedSections']) => {
  const updates: Partial<GameState['unlockedSections']> = {};
  
  // Shifted unlocks to require effort:
  // Lvl 1: Nothing (Start)
  // Lvl 2: Bio
  // Lvl 3: Tech
  // Lvl 4: Projects
  // Lvl 5: Resume
  if (level >= 2 && !currentUnlocks.BIO) updates.BIO = true;
  if (level >= 3 && !currentUnlocks.TECH) updates.TECH = true;
  if (level >= 4 && !currentUnlocks.PROJECTS) updates.PROJECTS = true;
  if (level >= 5 && !currentUnlocks.RESUME) updates.RESUME = true;
  
  return updates;
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      coins: 0,
      isRecruiterMode: false,
      unlockedSections: {
        BIO: false,
        PROJECTS: false,
        TECH: false,
        RESUME: false,
      },
      powerups: {
        hasAutoCoder: false,
        caffeineMultiplier: 1,
        caffeineEndsAt: 0,
        caffeineCooldownUntil: 0,
      },
      completedChallenges: [],

      addXp: (amount) => {
        const { xp, powerups, unlockedSections } = get();
        
        // Apply Multiplier
        const finalAmount = Math.floor(amount * powerups.caffeineMultiplier);
        const newXp = xp + finalAmount;
        const newLevel = calculateLevel(newXp);
        
        // Check for level unlocks
        const newUnlocks = checkLevelUnlocks(newLevel, unlockedSections);
        
        set((state) => ({ 
            xp: newXp, 
            level: newLevel,
            unlockedSections: { ...state.unlockedSections, ...newUnlocks }
        }));
      },

      addCoins: (amount) => {
        set((state) => ({ coins: state.coins + amount }));
      },

      purchaseSection: (section, cost) => {
        const { coins, unlockedSections } = get();
        if (unlockedSections[section]) return true;
        
        if (coins >= cost) {
          set({
            coins: coins - cost,
            unlockedSections: {
              ...unlockedSections,
              [section]: true,
            },
          });
          return true;
        }
        return false;
      },

      purchaseAutoCoder: () => {
        const { coins, powerups, unlockedSections } = get();
        if (powerups.hasAutoCoder) return true;
        const COST = 400;

        if (coins >= COST) {
            set({
                coins: coins - COST,
                powerups: { ...powerups, hasAutoCoder: true },
                unlockedSections: {
                    ...unlockedSections,
                    BIO: true, // Auto unlock as per prompt
                    TECH: true // Auto unlock as per prompt
                }
            });
            return true;
        }
        return false;
      },

      activateCaffeine: () => {
        const { powerups } = get();
        const now = Date.now();
        
        if (now < powerups.caffeineCooldownUntil) {
            return { success: false, message: "On Cooldown" };
        }

        const DURATION = 45 * 1000; // 45 seconds
        const COOLDOWN = 5 * 60 * 1000; // 5 minutes

        set({
            powerups: {
                ...powerups,
                caffeineMultiplier: 2,
                caffeineEndsAt: now + DURATION,
                caffeineCooldownUntil: now + COOLDOWN
            }
        });
        return { success: true, message: "Caffeine Boost Activated! 2x XP" };
      },

      checkBuffs: () => {
        const { powerups } = get();
        const now = Date.now();
        
        // If buff is active but time is up, reset multiplier
        if (powerups.caffeineMultiplier > 1 && now > powerups.caffeineEndsAt) {
            set({
                powerups: {
                    ...powerups,
                    caffeineMultiplier: 1
                }
            });
        }
      },

      completeChallenge: (id, rewardXp, rewardCoins) => {
        const { completedChallenges } = get();
        if (completedChallenges.includes(id)) return;

        // Note: We use the actions so leveling logic triggers
        get().addXp(rewardXp);
        get().addCoins(rewardCoins);

        set((state) => ({
          completedChallenges: [...state.completedChallenges, id],
        }));
      },

      toggleRecruiterMode: () => {
        set((state) => ({ isRecruiterMode: !state.isRecruiterMode }));
      },

      resetGame: () => {
        set({
          xp: 0,
          level: 1,
          coins: 0,
          unlockedSections: {
            BIO: false,
            PROJECTS: false,
            TECH: false,
            RESUME: false,
          },
          powerups: {
            hasAutoCoder: false,
            caffeineMultiplier: 1,
            caffeineEndsAt: 0,
            caffeineCooldownUntil: 0,
          },
          completedChallenges: [],
        });
      },
    }),
    {
      name: 'devquest-storage',
    }
  )
);