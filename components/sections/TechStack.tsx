import React from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
    { name: 'Python', level: 90, color: 'bg-yellow-500' },
    { name: 'React.js', level: 85, color: 'bg-cyan-500' },
    { name: 'Flask', level: 80, color: 'bg-white' },
    { name: 'SQL', level: 75, color: 'bg-blue-500' },
    { name: 'Machine Learning', level: 70, color: 'bg-purple-500' },
    { name: 'Tailwind CSS', level: 85, color: 'bg-teal-500' },
    { name: 'Pandas/NumPy', level: 75, color: 'bg-orange-500' },
    { name: 'Git', level: 80, color: 'bg-red-500' },
];

export const TechStack: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SKILLS.map((skill, index) => (
            <motion.div 
                key={skill.name} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 p-4 rounded-lg border border-slate-700"
            >
                <div className="flex justify-between mb-2">
                    <span className="font-bold text-white">{skill.name}</span>
                    <span className="text-slate-400 text-xs">{skill.level}/100</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                        className={`h-full ${skill.color}`} 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    />
                </div>
            </motion.div>
        ))}
    </div>
  );
};