export type View = 'DASHBOARD' | 'SHOP' | 'CHALLENGES' | 'BIO' | 'PROJECTS' | 'TECH' | 'RESUME';

export interface GameState {
  xp: number;
  level: number;
  coins: number;
  isRecruiterMode: boolean;
  
  // Unlock Status
  unlockedSections: {
    BIO: boolean;
    PROJECTS: boolean;
    TECH: boolean;
    RESUME: boolean;
  };
  
  // Power Ups & Buffs
  powerups: {
    hasAutoCoder: boolean;
    caffeineMultiplier: number; // 1 or 2
    caffeineEndsAt: number; // Timestamp
    caffeineCooldownUntil: number; // Timestamp
  };

  completedChallenges: string[];
  
  // Actions
  addXp: (amount: number) => void;
  addCoins: (amount: number) => void;
  purchaseSection: (section: keyof GameState['unlockedSections'], cost: number) => boolean;
  completeChallenge: (id: string, rewardXp: number, rewardCoins: number) => void;
  
  // Power Up Actions
  activateCaffeine: () => { success: boolean; message: string };
  purchaseAutoCoder: () => boolean;
  checkBuffs: () => void; // Run on tick to clear expired buffs
  
  toggleRecruiterMode: () => void;
  resetGame: () => void;
}

export interface ShopItem {
  id: string; // Changed from keyof unlockedSections to string to support items like Auto Coder
  type: 'SECTION' | 'UPGRADE';
  target?: keyof GameState['unlockedSections'];
  title: string;
  description: string;
  cost: number;
  icon: string;
  levelReq?: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  rewardCoins: number;
  rewardXp: number;
  actionLabel: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image: string;
}