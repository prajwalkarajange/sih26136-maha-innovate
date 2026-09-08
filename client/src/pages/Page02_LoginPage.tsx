import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MahiPill } from '../components/MahiPill';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Building2,
  Rocket,
  Scale,
  Shield,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { UserRole } from '../types';

export const Page02_LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isRegisterParam = searchParams.get('tab') === 'register';

  const [isRegister, setIsRegister] = useState(isRegisterParam);
  const [email, setEmail] = useState('officer@maharashtra.gov.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('government');
  const [companyName, setCompanyName] = useState('GreenTech Innovations');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const testAccounts = [
    {
      role: 'government' as UserRole,
      title: 'Government Officer',
      name: 'Shri Rajesh Patil',
      dept: 'Dept. of Urban Development',
      email: 'officer@maharashtra.gov.in',
      icon: Building2,
      targetPath: '/dashboard',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      btnColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      role: 'startup' as UserRole,
      title: 'Startup Founder',
      name: 'Amit Deshmukh',
      dept: 'GreenTech Innovations (CleanTech/AI)',
      email: 'greentech@startup.in',
      icon: Rocket,
      targetPath: '/marketplace',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    {
      role: 'evaluator' as UserRole,
      title: 'Technical Evaluator',
      name: 'Dr. Sunita Sharma',
      dept: 'State Innovation Council',
      email: 'evaluator@maha.gov.in',
      icon: Scale,
      targetPath: '/evaluations/1',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      btnColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
    {
      role: 'admin' as UserRole,
      title: 'System Administrator',
      name: 'MahaInnovate Admin',
      dept: 'System Governance & Audit',
      email: 'admin@mahinnovate.gov.in',
      icon: Shield,
      targetPath: '/admin',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
  ];

  const handleInstantTestLogin = async (account: typeof testAccounts[0]) => {
    setLoading(true);
    try {
      await login(account.email, account.role);
      navigate(account.targetPath);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, role);
      if (role === 'government') navigate('/dashboard');
      else if (role === 'startup') navigate('/marketplace');
      else if (role === 'evaluator') navigate('/evaluations/1');
      else if (role === 'admin') navigate('/admin');
    } catch (err: any) {
      setError('Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      {/* Government of Maharashtra Welcome Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-amber-50 border-2 border-amber-600 flex items-center justify-center text-amber-800 shadow-sm">
          <svg viewBox="0 0 100 100" className="w-9 h-9 fill-amber-700">
            <circle cx="50" cy="50" r="45" stroke="#b45309" strokeWidth="4" fill="#fef3c7" />
            <polygon points="50,15 60,35 85,35 65,50 72,75 50,60 28,75 35,50 15,35 40,35" fill="#d97706" />
            <circle cx="50" cy="50" r="10" fill="#92400e" />
          </svg>
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Government of Maharashtra
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {isRegister ? 'Register Your Startup' : 'MahInnovate Portal Sign In'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Select your test role below for instant access, or enter your official credentials.
        </p>
      </div>

      {/* 4 Test Accounts Grid matching user request */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider text-center">
          ⚡ 1-Click Instant Test Accounts (Pre-configured for Evaluation)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testAccounts.map((acc) => {
            const Icon = acc.icon;
            return (
              <div
                key={acc.role}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-blue-400 transition flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${acc.badgeColor}`}>
                      {acc.title}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="font-bold text-slate-900 text-sm">{acc.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{acc.dept}</div>

                  <div className="mt-2.5 p-2 bg-slate-50 rounded border border-slate-100 font-mono text-[10px] text-slate-600 space-y-0.5">
                    <div><strong>User:</strong> {acc.email}</div>
                    <div><strong>Pass:</strong> password123</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleInstantTestLogin(acc)}
                    className={`w-full py-2 rounded-lg text-xs font-bold shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${acc.btnColor}`}
                  >
                    <span>Test as {acc.title.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Standard Official Form Container */}
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
        <h3 className="text-sm font-bold text-slate-900 mb-1 border-b border-slate-100 pb-2">
          Or Enter Credentials Manually
        </h3>

        {error && (
          <div className="my-3 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs mt-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Official Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="officer@maharashtra.gov.in"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-1 focus:ring-blue-500 focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-1 focus:ring-blue-500 focus:bg-white focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => {
                const r = e.target.value as UserRole;
                setRole(r);
                if (r === 'government') setEmail('officer@maharashtra.gov.in');
                else if (r === 'startup') setEmail('greentech@startup.in');
                else if (r === 'evaluator') setEmail('evaluator@maha.gov.in');
                else if (r === 'admin') setEmail('admin@mahinnovate.gov.in');
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-1 focus:ring-blue-500 focus:bg-white focus:outline-hidden font-medium"
            >
              <option value="government">Government Officer</option>
              <option value="startup">Startup</option>
              <option value="evaluator">Evaluator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {isRegister && role === 'startup' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Company / Startup Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="GreenTech Innovations Pvt Ltd"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-1 focus:ring-blue-500 focus:bg-white focus:outline-hidden"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-sm hover:shadow text-xs cursor-pointer"
          >
            {loading ? 'Authenticating...' : isRegister ? 'Register Startup' : 'Login to Portal'}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
          {isRegister ? (
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className="text-blue-600 font-bold hover:underline"
            >
              Already registered? Login Now
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className="text-blue-600 font-bold hover:underline"
            >
              New Startup? Register Now
            </button>
          )}
        </div>
      </div>

      <MahiPill
        label="Need help to login? Ask Mahi"
        contextPage="login"
        customPrompt="Explain how each role accesses the procurement system"
      />
    </div>
  );
};
