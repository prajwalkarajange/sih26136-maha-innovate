import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Building2, ExternalLink, Mail, Phone, MapPin, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1e33] text-slate-300 text-xs border-t border-slate-800">
      {/* Top Footer Pillars */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Government Branding */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white border border-amber-400/80 shadow-xs flex items-center justify-center overflow-hidden p-0.5 shrink-0">
              <img
                src="/maharashtra_seal.png"
                alt="Government of Maharashtra Seal"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="text-base font-black text-white tracking-tight">
                Maha<span className="text-blue-400">Innovate</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Government of Maharashtra
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            A startup-friendly public procurement platform based on Government Problem Statement ID 26136. Enabling departments to identify, pilot, procure, and scale innovative solutions.
          </p>

          <div className="text-[11px] text-blue-300 font-medium flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>State Innovation Council Verified</span>
          </div>
        </div>

        {/* Col 2: Public Navigation */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Quick Navigation
          </h4>
          <ul className="space-y-1.5 text-[11px] text-slate-400">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">Portal Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400 transition">About Problem Statement 26136</Link>
            </li>
            <li>
              <Link to="/ai-analysis" className="hover:text-blue-400 transition">AI Requirement Analysis</Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-blue-400 transition">Challenge Marketplace</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-400 transition">Officer / Startup Login</Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Government Policies */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Procurement Framework
          </h4>
          <ul className="space-y-1.5 text-[11px] text-slate-400">
            <li>
              <span className="text-slate-300 font-semibold">Maharashtra Startup Policy 2026</span>
            </li>
            <li>Direct Procurement Exemption for 85%+ Pilot Score</li>
            <li>DPIIT Recognition Verification Process</li>
            <li>Standard Pilot Agreement Guidelines</li>
            <li>Cybersecurity & Data Protection Norms</li>
          </ul>
        </div>

        {/* Col 4: Official Contact & Nodal Office */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Nodal Agency
          </h4>
          <div className="space-y-2 text-[11px] text-slate-400">
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Urban Development & Information Technology Dept., Mantralaya, Mumbai - 400032</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>support.mahinnovate@maharashtra.gov.in</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>Toll Free: 1800-120-8040</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Disclaimer Bar */}
      <div className="border-t border-slate-800 bg-[#081726] py-4 px-4 sm:px-6 lg:px-8 text-[11px] text-slate-400">
        <div className="w-full flex flex-wrap items-center justify-between gap-3">
          <div>
            © 2026 Government of Maharashtra. All rights reserved. Content managed by Department of Urban Development.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-400">
            <span>Website Policies</span>
            <span>Terms of Use</span>
            <span>Privacy Policy</span>
            <span>Help</span>
            <span>Last Updated: September 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
