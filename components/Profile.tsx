
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Save, Trash2, ShieldCheck, GraduationCap, Target, Mail, Lock, KeyRound, Loader2 } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState<UserProfile>(user);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'security'>('general');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'security' && newPassword.length > 0) {
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
    }

    setIsProcessing(true);
    // Directly save profile changes
    setTimeout(() => {
      onUpdate(formData);
      setIsSaved(true);
      setIsProcessing(false);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setIsSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your profile, email, and security.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl mx-auto flex items-center justify-center text-white text-4xl font-bold shadow-xl mb-4 transform -rotate-3">
              {formData.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold dark:text-white">{formData.name}</h3>
            <p className="text-sm text-slate-500 mb-6 truncate">{formData.email}</p>
            
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => setActiveTab('general')}
                className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'general' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                <User size={18} className="mr-3" /> General Profile
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'security' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                <KeyRound size={18} className="mr-3" /> Security & Email
              </button>
            </div>
          </div>

          <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
            <div className="relative z-10">
              <ShieldCheck className="mb-4" size={32} />
              <h4 className="font-bold text-lg mb-2">Privacy Focus</h4>
              <p className="text-sm text-blue-100 leading-relaxed">Your data is handled securely and only used to personalize your AI educational experience.</p>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-8 shadow-sm">
            {activeTab === 'general' ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                      <User size={14} className="mr-2" /> Preferred Name
                    </label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 dark:text-white outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                      <GraduationCap size={14} className="mr-2" /> Current Grade
                    </label>
                    <select 
                      value={formData.grade}
                      onChange={(e) => setFormData({...formData, grade: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 dark:text-white outline-none appearance-none"
                    >
                      <option value="">Select Grade</option>
                      <option value="9th Grade">9th Grade (Freshman)</option>
                      <option value="10th Grade">10th Grade (Sophomore)</option>
                      <option value="11th Grade">11th Grade (Junior)</option>
                      <option value="12th Grade">12th Grade (Senior)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                    <Target size={14} className="mr-2" /> Academic Interests
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Theoretical Physics, Creative Writing, Web Dev"
                    value={formData.major}
                    onChange={(e) => setFormData({...formData, major: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 dark:text-white outline-none"
                  />
                  <p className="text-[10px] text-slate-400 italic font-medium">This helps Gemini personalize your learning suggestions.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                    <Mail size={14} className="mr-2" /> New Email Address
                  </label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 dark:text-white outline-none"
                    required
                  />
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                  <h4 className="text-sm font-bold dark:text-white mb-4">Security Credentials</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                        <Lock size={14} className="mr-2" /> New Password
                      </label>
                      <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 dark:text-white outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                        <Lock size={14} className="mr-2" /> Confirm Password
                      </label>
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 dark:text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black transition-all flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-95"
              >
                {isProcessing ? <Loader2 size={18} className="animate-spin" /> : (
                  <>
                    <Save size={18} className="mr-2" />
                    {isSaved ? 'Identity Saved' : 'Update Profile'}
                  </>
                )}
              </button>
              
              <button 
                type="button"
                className="text-red-500 hover:text-red-600 flex items-center text-sm font-black group transition-colors"
              >
                <Trash2 size={18} className="mr-2 group-hover:scale-110 transition-transform" /> 
                Deactivate Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
