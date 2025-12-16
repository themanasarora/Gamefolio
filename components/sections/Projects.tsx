import React from 'react';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PROJECTS = [
    {
        title: "Sahayak AI",
        desc: "Teacher AI Assistant to automate academic workflows. Built with a React UI and ML-enabled Flask backend.",
        tags: ["React", "Flask", "Firebase", "AI"],
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
    },
    {
        title: "Sentiment Analysis System",
        desc: "Text-classification model using TF-IDF and Logistic Regression. Improved accuracy by 20% through hyperparameter tuning.",
        tags: ["Python", "Scikit-learn", "NLP", "Data Viz"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
        title: "Fraud Detection",
        desc: "Anomaly detection system using Transaction Logs. Implemented Random Forest and Logistic Regression models.",
        tags: ["Python", "Pandas", "ML", "ROC-AUC"],
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"
    },
    {
        title: "Hand Gesture Controller",
        desc: "Real-time gesture recognition system to control system volume through hand detection using OpenCV.",
        tags: ["Python", "OpenCV", "Computer Vision"],
        image: "https://images.unsplash.com/photo-1599582386228-56903dfc8216?w=800&q=80"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
};

export const Projects: React.FC = () => {
  return (
    <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6"
    >
        {PROJECTS.map((project, idx) => (
            <motion.div 
                key={idx} 
                variants={itemVariants}
                className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col md:flex-row group hover:border-indigo-500 transition-colors"
            >
                <div className="md:w-48 h-48 md:h-auto flex-shrink-0 bg-slate-900 overflow-hidden relative">
                    <motion.img 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                    />
                    <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply"></div>
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-slate-400 text-sm mb-4">{project.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-slate-700 text-indigo-300 text-xs rounded font-mono">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <a href="https://github.com/themanasarora" target="_blank" rel="noreferrer" className="text-sm flex items-center gap-1 text-white hover:text-indigo-400 font-bold transition-colors">
                            <Code2 size={14} /> View Code
                        </a>
                        <a href="https://github.com/themanasarora" target="_blank" rel="noreferrer" className="text-sm flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                            <Github size={14} /> GitHub
                        </a>
                    </div>
                </div>
            </motion.div>
        ))}
    </motion.div>
  );
};