import React from 'react';
import { useGameStore } from '../store';
import { View } from '../types';
import { Lock, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Bio } from './sections/Bio';
import { TechStack } from './sections/TechStack';
import { Projects } from './sections/Projects';

interface ContentAreaProps {
    view: View;
    onChangeView: (view: View) => void;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ view, onChangeView }) => {
    const { unlockedSections, isRecruiterMode } = useGameStore();

    const renderContent = () => {
        switch(view) {
            case 'BIO': return <Bio />;
            case 'TECH': return <TechStack />;
            case 'PROJECTS': return <Projects />;
            case 'RESUME': return (
                <div className="space-y-6">
                    <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 shadow-2xl">
                        {/* Resume Header */}
                        <div className="border-b border-slate-600 pb-6 mb-6">
                            <h1 className="text-3xl font-bold text-white mb-2">Manas Arora</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                                <span>Indore, India</span>
                                <span>•</span>
                                <span>manas80082@gmail.com</span>
                                <span>•</span>
                                <span>+91-9406660695</span>
                            </div>
                            <div className="mt-2 text-indigo-400 text-sm">
                                linkedin.com/in/themanasarora • github.com/themanasarora
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-indigo-500 pl-3">Experience</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-white">Frontend Developer Intern</h4>
                                        <span className="text-xs text-slate-400">Jun 2025 – Present</span>
                                    </div>
                                    <div className="text-sm text-indigo-300 mb-2">Rent Prompts — Indore</div>
                                    <p className="text-sm text-slate-400">Enhanced UI with React and modern CSS, boosting user engagement by 30%. Integrated APIs and optimized UI responsiveness.</p>
                                </div>
                                <div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-white">Intern (PEBL)</h4>
                                        <span className="text-xs text-slate-400">Jun 2025 – Jul 2025</span>
                                    </div>
                                    <div className="text-sm text-indigo-300 mb-2">IBM — Indore</div>
                                    <p className="text-sm text-slate-400">Built a Sentiment Analysis model using Python and Scikit-learn with NLP preprocessing. Improved accuracy by 20% through model tuning.</p>
                                </div>
                                <div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-white">Full-Stack Developer Intern</h4>
                                        <span className="text-xs text-slate-400">Jan 2025 – Mar 2025</span>
                                    </div>
                                    <div className="text-sm text-indigo-300 mb-2">CodTech IT Solutions — Indore</div>
                                    <p className="text-sm text-slate-400">Developed responsive UIs and REST APIs using React and Flask, improving load times by 20%.</p>
                                </div>
                                <div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-white">Python and Data Science Intern</h4>
                                        <span className="text-xs text-slate-400">Sep 2024 – Feb 2025</span>
                                    </div>
                                    <div className="text-sm text-indigo-300 mb-2">DCL Technologies — Indore</div>
                                    <p className="text-sm text-slate-400">Worked on data preprocessing, exploratory data analysis, visualization, and basic ML workflows.</p>
                                </div>
                            </div>
                        </div>

                         {/* Education */}
                         <div className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-indigo-500 pl-3">Education</h3>
                            <div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-white">B.Tech in Computer Science</h4>
                                    <span className="text-xs text-slate-400">Jan 2022 – Jan 2026</span>
                                </div>
                                <div className="text-sm text-indigo-300 mb-2">Shri Vaishnav Vidyapeeth Vishwavidyalaya</div>
                                <p className="text-sm text-slate-400">CGPA: 7 (7th Semester)</p>
                                <p className="text-xs text-slate-500 mt-1">Coursework: DSA, Web Technologies, DBMS, Computer Networks</p>
                            </div>
                        </div>

                         {/* Achievements */}
                         <div>
                            <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-indigo-500 pl-3">Achievements & Certifications</h3>
                            <ul className="list-disc list-inside text-sm text-slate-400 space-y-2">
                                <li><span className="text-white font-bold">Winner</span> — IBM National Hackathon (S-VYASA University)</li>
                                <li><span className="text-white font-bold">Chief of Operations</span> — SVVVIMUN 2K24</li>
                                <li><span className="text-white font-bold">Runner-Up</span> — Web Designing Competition (Kaushal 6.0)</li>
                                <li><span className="text-white font-bold">Certifications:</span> NPTEL (Software Eng, DBMS), Infosys Springboard (AI, NLP)</li>
                            </ul>
                        </div>

                    </div>
                    
                    <button 
                        onClick={() => window.print()}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-lg border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                    >
                        <Download size={20} /> Print / Save as PDF
                    </button>
                </div>
            );
            default: return null;
        }
    };

    const isLocked = !unlockedSections[view as keyof typeof unlockedSections] && !isRecruiterMode;

    if (isLocked) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 bg-slate-900/50 rounded-2xl border-2 border-slate-800 border-dashed"
            >
                <div className="bg-slate-800 p-6 rounded-full mb-6 ring-4 ring-slate-800/50">
                    <Lock size={48} className="text-slate-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Area Locked</h2>
                <p className="text-slate-400 mb-6 max-w-sm">
                    This section contains high-level classified data. 
                    You must purchase access from the Item Shop.
                </p>
                <button 
                    onClick={() => onChangeView('SHOP')}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded shadow-lg transition-transform hover:scale-105"
                >
                    Go to Shop
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl mx-auto py-8"
        >
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white pixel-font uppercase tracking-wider">
                    {view}
                </h1>
                <div className="h-1 bg-gradient-to-r from-indigo-500 to-transparent flex-grow ml-6 rounded-full opacity-50"></div>
            </div>
            {renderContent()}
        </motion.div>
    );
};