import React from 'react';
import { motion } from 'framer-motion';

export const Bio: React.FC = () => {
  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
    >
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-32 h-32 bg-indigo-500 rounded-lg flex-shrink-0 flex items-center justify-center text-4xl overflow-hidden border-4 border-slate-700 shadow-xl">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Manas&top=shortHair&accessories=glasses&clothing=hoodie`} alt="Manas Arora" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Manas Arora</h2>
          <div className="text-indigo-400 font-bold mb-3">Full-Stack Developer & ML Enthusiast</div>
          <p className="text-slate-400 leading-relaxed mb-4">
            Computer Science undergraduate (Class of 2026) with a strong foundation in Web Development and Machine Learning. 
            I specialize in building responsive UIs with React and developing intelligent backends using Python and Flask.
            Currently exploring the intersection of AI and user-centric applications.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-800 p-3 rounded border border-slate-700">
                <div className="text-slate-500 text-xs uppercase">Class</div>
                <div className="text-white font-bold">B.Tech Scholar</div>
            </div>
            <div className="bg-slate-800 p-3 rounded border border-slate-700">
                <div className="text-slate-500 text-xs uppercase">Location</div>
                <div className="text-white font-bold">Indore, India</div>
            </div>
            <div className="bg-slate-800 p-3 rounded border border-slate-700">
                <div className="text-slate-500 text-xs uppercase">Email</div>
                <div className="text-white font-bold text-xs truncate">manas80082@gmail.com</div>
            </div>
            <div className="bg-slate-800 p-3 rounded border border-slate-700">
                <div className="text-slate-500 text-xs uppercase">Status</div>
                <div className="text-emerald-400 font-bold">Open to Work</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};