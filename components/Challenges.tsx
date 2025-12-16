import React from 'react';
import { useGameStore } from '../store';
import { Challenge } from '../types';
import { CheckCircle2, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const CHALLENGES: Challenge[] = [
    { id: 'visit_github', title: 'Open Source Scout', description: 'Visit my GitHub profile to check out the code repositories.', rewardCoins: 100, rewardXp: 50, actionLabel: 'Visit GitHub' },
    { id: 'visit_linkedin', title: 'Networker', description: 'Connect with me on LinkedIn to expand the professional network.', rewardCoins: 100, rewardXp: 50, actionLabel: 'Visit LinkedIn' },
    { id: 'copy_email', title: 'Direct Line', description: 'Copy my email address to your clipboard.', rewardCoins: 50, rewardXp: 25, actionLabel: 'Copy Email' },
];

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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
};

export const Challenges: React.FC = () => {
    const { completeChallenge, completedChallenges } = useGameStore();

    const handleAction = (challenge: Challenge) => {
        // Perform action logic
        if (challenge.id === 'visit_github') window.open('https://github.com/themanasarora', '_blank');
        if (challenge.id === 'visit_linkedin') window.open('https://linkedin.com/in/themanasarora', '_blank');
        if (challenge.id === 'copy_email') {
            navigator.clipboard.writeText('manas80082@gmail.com');
            alert('Email manas80082@gmail.com copied to clipboard!');
        }

        // Reward
        completeChallenge(challenge.id, challenge.rewardXp, challenge.rewardCoins);
    };

    return (
        <div className="max-w-3xl mx-auto py-10">
            <motion.h2 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-6 pixel-font"
            >
                Active Bounties
            </motion.h2>
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-4"
            >
                {CHALLENGES.map((challenge) => {
                    const isCompleted = completedChallenges.includes(challenge.id);

                    return (
                        <motion.div 
                            key={challenge.id}
                            variants={itemVariants}
                            className={`p-4 rounded-lg border flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${
                                isCompleted 
                                ? 'bg-slate-900 border-emerald-900 opacity-75' 
                                : 'bg-slate-800 border-slate-600'
                            }`}
                        >
                            <div className="flex items-start gap-4 flex-1">
                                <div className={`p-3 rounded-full ${isCompleted ? 'bg-emerald-900/50 text-emerald-500' : 'bg-indigo-900/50 text-indigo-400'}`}>
                                    {challenge.id.includes('github') && <Github size={20} />}
                                    {challenge.id.includes('linkedin') && <Linkedin size={20} />}
                                    {challenge.id.includes('email') && <Mail size={20} />}
                                </div>
                                <div>
                                    <h3 className={`font-bold ${isCompleted ? 'text-emerald-500 line-through' : 'text-white'}`}>
                                        {challenge.title}
                                    </h3>
                                    <p className="text-sm text-slate-400">{challenge.description}</p>
                                    <div className="flex gap-3 mt-2 text-xs font-mono">
                                        <span className="text-yellow-500">+ {challenge.rewardCoins} Gold</span>
                                        <span className="text-indigo-400">+ {challenge.rewardXp} XP</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleAction(challenge)}
                                disabled={isCompleted}
                                className={`px-4 py-2 rounded text-sm font-bold flex items-center gap-2 whitespace-nowrap ${
                                    isCompleted 
                                    ? 'bg-transparent text-emerald-500' 
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                }`}
                            >
                                {isCompleted ? (
                                    <>Completed <CheckCircle2 size={16} /></>
                                ) : (
                                    <>{challenge.actionLabel} <ExternalLink size={14} /></>
                                )}
                            </button>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};