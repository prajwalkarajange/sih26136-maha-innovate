import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MahiPill } from '../components/MahiPill';
import { Eye, EyeOff, Lock, Mail, Building2, Rocket, Scale, Shield, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

export const Page02_LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(searchParams.get('tab') === 'register');
  const [email, setEmail] = useState('officer@maharashtra.gov.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('government');
  const [companyName, setCompanyName] = useState('GreenTech Innovations');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemoLogins, setShowDemoLogins] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const testAccounts = [
    { role: 'government' as UserRole, title: 'Government Officer', name: 'Shri Rajesh Patil', dept: 'Dept. of Urban Development', email: 'officer@maharashtra.gov.in', icon: Building2, targetPath: '/dashboard' },
    { role: 'startup' as UserRole, title: 'Startup Founder', name: 'Amit Deshmukh', dept: 'GreenTech Innovations (CleanTech/AI)', email: 'greentech@startup.in', icon: Rocket, targetPath: '/marketplace' },
    { role: 'evaluator' as UserRole, title: 'Technical Evaluator', name: 'Dr. Sunita Sharma', dept: 'State Innovation Council', email: 'evaluator@maha.gov.in', icon: Scale, targetPath: '/evaluations/1' },
    { role: 'admin' as UserRole, title: 'System Administrator', name: 'MahaInnovate Admin', dept: 'System Governance & Audit', email: 'admin@mahinnovate.gov.in', icon: Shield, targetPath: '/admin' },
  ];

  const selectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'government') setEmail('officer@maharashtra.gov.in');
    else if (selectedRole === 'startup') setEmail('greentech@startup.in');
    else if (selectedRole === 'evaluator') setEmail('evaluator@maha.gov.in');
    else setEmail('admin@mahinnovate.gov.in');
  };

  const handleInstantTestLogin = async (account: typeof testAccounts[0]) => {
    setLoading(true);
    try { await login(account.email, account.role); navigate(account.targetPath); }
    catch { setError('Login failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      await login(email, role);
      if (role === 'government') navigate('/dashboard');
      else if (role === 'startup') navigate('/marketplace');
      else if (role === 'evaluator') navigate('/evaluations/1');
      else navigate('/admin');
    } catch { setError('Login failed. Please verify credentials.'); }
    finally { setLoading(false); }
  };

  const roles: { value: UserRole; label: string; icon: React.ElementType }[] = [
    { value: 'government', label: 'Government Official', icon: Building2 },
    { value: 'startup', label: 'Startup', icon: Rocket },
    { value: 'evaluator', label: 'Evaluator', icon: Scale },
    { value: 'admin', label: 'Admin', icon: Shield },
  ];

  return <div className="min-h-screen bg-[#f7f6f2] text-[#102f52] font-sans">
    <main className="grid min-h-[calc(100vh-72px)] lg:grid-cols-[55%_45%]">
      <section className="relative min-h-[510px] overflow-hidden bg-[#0b2b4d] text-white">
        <img src="/india_gate.jpg" alt="India Gate at sunset" className="absolute inset-0 h-full w-full object-contain object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,38,68,.84),rgba(7,38,68,.28)_75%,rgba(7,38,68,.12))]" />
        <div className="relative z-10 flex min-h-[510px] flex-col justify-between px-7 py-12 sm:px-12 lg:px-[7.5%] lg:py-[9%]">
          <div className="max-w-[510px]"><div className="mb-4 h-[3px] w-10 bg-[#f05a16]" /><p className="mb-3 text-[11px] font-semibold tracking-[.22em] text-white/75">INNOVATION DRIVES PROGRESS</p><h1 className="max-w-[460px] font-serif text-5xl font-bold leading-[.98] sm:text-6xl">From Ideas<br />to a Stronger<br />Maharashtra</h1><p className="mt-5 max-w-[430px] text-sm leading-5 text-white/90 sm:text-base">MahaInnovate connects government challenges with innovative startup solutions through a transparent and collaborative procurement process.</p><div className="mt-6 flex max-w-[470px] gap-4 text-[10px] font-semibold sm:gap-7">{[['♧', 'Solve', 'Real Problems'], ['♟', 'Empower', 'Startups'], ['▥', 'Build a', 'Better Maharashtra']].map(([icon, title, caption]) => <div key={title} className="flex items-center gap-2 border-r border-white/25 pr-4 last:border-0"><span className="text-xl text-[#f05a16]">{icon}</span><span>{title}<br /><span className="font-normal text-white/75">{caption}</span></span></div>)}</div></div>
          <div className="mt-12 flex max-w-[520px] items-center gap-5 border-t border-white/30 pt-4 text-[11px] sm:gap-10"><div><strong className="text-lg text-[#f05a16]">24+</strong><br />Government Challenges</div><div><strong className="text-lg text-[#f05a16]">100+</strong><br />Registered Startups</div><div><strong className="text-lg text-[#f05a16]">8+</strong><br />Ongoing Pilots</div></div>
        </div>
      </section>

      <section className="flex items-start justify-center px-4 py-10 sm:px-8 lg:items-center lg:py-8"><div className="w-full max-w-[455px] rounded-md border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(16,47,82,.09)] sm:p-7">
        <div className="mb-5"><h2 className="text-[26px] font-bold leading-tight">{isRegister ? 'Register Your Startup' : <>Welcome to<br /><span>Maha<span className="text-[#f05a16]">Innovate</span></span></>}</h2><p className="mt-1 text-sm text-[#38506a]">{isRegister ? 'Create your startup access for MahaInnovate' : 'Login to access your dashboard'}</p></div>
        {!isRegister && <div className="mb-5 grid grid-cols-4 overflow-hidden rounded-md border border-slate-200">{roles.map(({ value, label, icon: Icon }) => <button key={value} type="button" onClick={() => selectRole(value)} className={`min-h-[56px] px-1.5 text-[11px] font-semibold transition ${role === value ? 'bg-[#0b2f59] text-white' : 'bg-white text-[#29435e] hover:bg-slate-50'}`}><Icon className="mx-auto mb-1 h-[18px] w-[18px]" /><span className="block leading-tight">{label}</span></button>)}</div>}
        {error && <div className="mb-4 rounded border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">{error}</div>}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {isRegister && <div><label className="mb-1.5 block text-xs font-bold">Select Role</label><select value={role} onChange={(e) => selectRole(e.target.value as UserRole)} className="h-10 w-full rounded border border-slate-300 bg-white px-3 text-xs outline-none focus:border-[#0b2f59]"><option value="government">Government Official</option><option value="startup">Startup</option><option value="evaluator">Evaluator</option><option value="admin">Admin</option></select></div>}
          <div><label className="mb-1.5 block text-xs font-bold">Email ID</label><div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-[#0b2f59]" /><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your official email ID" className="h-10 w-full rounded border border-slate-300 pl-9 pr-3 text-xs outline-none focus:border-[#0b2f59]" /></div></div>
          <div><label className="mb-1.5 block text-xs font-bold">Password</label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-[#0b2f59]" /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" className="h-10 w-full rounded border border-slate-300 pl-9 pr-10 text-xs outline-none focus:border-[#0b2f59]" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-[#0b2f59]">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
          {isRegister && role === 'startup' && <div><label className="mb-1.5 block text-xs font-bold">Company / Startup Name</label><input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="GreenTech Innovations Pvt Ltd" className="h-10 w-full rounded border border-slate-300 px-3 text-xs outline-none focus:border-[#0b2f59]" /></div>}
          {!isRegister && <div className="text-right"><button type="button" className="text-[11px] font-bold text-blue-600">Forgot password?</button></div>}
          <button type="submit" disabled={loading} className="h-11 w-full rounded bg-[#0b3765] text-sm font-bold text-white transition hover:bg-[#082b50] disabled:cursor-wait disabled:opacity-70">{loading ? 'Authenticating...' : isRegister ? 'Register Startup' : 'Login'}</button>
        </form>
        {!isRegister && <><div className="my-4 flex items-center gap-3 text-[10px] text-slate-400"><span className="h-px flex-1 bg-slate-200" />OR<span className="h-px flex-1 bg-slate-200" /></div><button type="button" className="h-10 w-full rounded border border-slate-300 text-xs font-bold text-[#1e3550]"><span className="mr-2 text-base font-bold text-[#4285f4]">G</span>Continue with Google</button><p className="mt-4 text-center text-[10px] text-slate-500">Don't have an account? Contact your department administrator.</p></>}
        <div className="mt-5 rounded-md bg-[#eef4fa] p-3 text-[11px] text-[#29435e]"><div className="flex gap-3"><Shield className="mt-0.5 h-5 w-5 shrink-0 text-[#0b3765]" /><div><strong>This portal is for authorized users only.</strong><br />All activities are monitored and secured.</div></div></div>
        <button type="button" onClick={() => setShowDemoLogins(!showDemoLogins)} className="mt-5 flex w-full items-center justify-between border-t border-slate-200 pt-4 text-xs font-bold text-[#0b3765]"><span>Demo Logins</span><span>{showDemoLogins ? '−' : '+'}</span></button>
        {showDemoLogins && <div className="mt-3 space-y-2">{testAccounts.map((acc) => { const Icon = acc.icon; return <button key={acc.role} type="button" disabled={loading} onClick={() => handleInstantTestLogin(acc)} className="flex w-full items-center gap-3 rounded border border-slate-200 p-2 text-left text-[10px] hover:border-[#f05a16]"><Icon className="h-4 w-4 text-[#f05a16]" /><span className="min-w-0 flex-1"><strong className="block text-[#102f52]">{acc.title}</strong><span className="block truncate text-slate-500">{acc.email}</span></span><ArrowRight className="h-3 w-3 text-[#0b3765]" /></button>; })}</div>}
        <div className="mt-4 border-t border-slate-100 pt-3 text-center text-[11px] text-slate-500">{isRegister ? <button type="button" onClick={() => setIsRegister(false)} className="font-bold text-blue-600 hover:underline">Already registered? Login Now</button> : <button type="button" onClick={() => setIsRegister(true)} className="h-10 w-full rounded border border-[#d94b0b] bg-[#f05a16] px-4 text-xs font-bold text-white transition hover:bg-[#d94b0b]">New Startup? Register Now</button>}</div>
      </div></section>
    </main>
    <MahiPill label="Need help to login? Ask Mahi" contextPage="login" customPrompt="Explain how each role accesses the procurement system" />
  </div>;
};
