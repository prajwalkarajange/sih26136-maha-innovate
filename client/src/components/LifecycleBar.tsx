import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Sparkles,
  ClipboardCheck,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  CreditCard,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

export const LifecycleBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { key: 'identify', label: '1. Identify', icon: Search, path: '/challenges/create' },
    { key: 'discover', label: '2. Discover', icon: Sparkles, path: '/ai-recommendations' },
    { key: 'evaluate', label: '3. Evaluate', icon: ClipboardCheck, path: '/evaluations/1' },
    { key: 'pilot', label: '4. Pilot', icon: Rocket, path: '/pilots/1' },
    { key: 'validate', label: '5. Validate', icon: ShieldCheck, path: '/pilot-evaluation/1' },
    { key: 'procure', label: '6. Procure', icon: ShoppingBag, path: '/procurement/1' },
    { key: 'pay', label: '7. Pay', icon: CreditCard, path: '/contract-tracking' },
    { key: 'scale', label: '8. Scale', icon: TrendingUp, path: '/scaling-dashboard' },
  ];

  const currentPath = location.pathname;

  return (
    <div className="bg-white border-b border-slate-200 px-3 py-2 overflow-x-auto shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[760px] text-xs">
        <div className="flex items-center gap-1 font-bold text-slate-700 uppercase tracking-wider text-[10px] mr-2">
          <span>Lifecycle:</span>
        </div>

        <div className="flex items-center gap-1 flex-1 justify-between">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentPath.startsWith(step.path.split('?')[0]);

            return (
              <React.Fragment key={step.key}>
                <button
                  onClick={() => navigate(step.path)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{step.label}</span>
                </button>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
