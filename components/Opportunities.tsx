
import React, { useState, useEffect } from 'react';
import { OPPORTUNITIES } from '../constants';
import { Calendar, CheckCircle, ExternalLink, Clock, RefreshCw } from 'lucide-react';

const Opportunities: React.FC = () => {
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [time, setTime] = useState(new Date());

  // Simulation of periodic data refresh
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const refreshInterval = setInterval(() => {
      handleManualRefresh();
    }, 60000); // Auto refresh every minute

    return () => {
      clearInterval(timer);
      clearInterval(refreshInterval);
    };
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefreshed(new Date());
      setIsRefreshing(false);
    }, 1500);
  };

  const getCountdown = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    const diff = deadline.getTime() - time.getTime();
    if (diff <= 0) return 'Expired';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Opportunity Radar</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Active competitions and summer programs updated in real-time.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Synced</p>
            <p className="text-xs text-slate-500">{lastRefreshed.toLocaleTimeString()}</p>
          </div>
          <button 
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
          >
            <RefreshCw size={20} className={`text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {OPPORTUNITIES.map((opp) => (
          <div key={opp.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Calendar size={120} />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {opp.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 uppercase tracking-wider ${getCountdown(opp.deadline).includes('d') ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    <Clock size={12} className="mr-1" />
                    {getCountdown(opp.deadline)} left
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {opp.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">{opp.description}</p>
                
                <div className="pt-4 flex flex-col md:flex-row md:items-center gap-6">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Key Requirements</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {opp.requirements.map((req, i) => (
                        <li key={i} className="flex items-center text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle size={14} className="text-emerald-500 mr-2 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <a 
                  href={opp.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center space-x-3 shadow-xl"
                >
                  <span>Check Eligibility</span>
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
