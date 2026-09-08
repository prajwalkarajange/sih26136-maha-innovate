import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  Search,
  Filter,
  Calendar,
  IndianRupee,
  Building2,
  Tag,
  ArrowRight,
  Sparkles,
  Bot
} from 'lucide-react';

export const Page08_ChallengeMarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const { challenges, setActiveChallengeId } = useWorkflow();
  const { askMahiContext } = useMahi();

  const [search, setSearch] = useState('');
  const [selectedTech, setSelectedTech] = useState('ALL');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const filteredChallenges = challenges.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.problem_description.toLowerCase().includes(search.toLowerCase());

    const matchesTech =
      selectedTech === 'ALL' ||
      c.required_technologies.some(t => t.toLowerCase() === selectedTech.toLowerCase());

    const matchesDept =
      selectedDept === 'ALL' ||
      (c.department_name && c.department_name.includes(selectedDept));

    return matchesSearch && matchesTech && matchesDept;
  });

  return (
    <div className="space-y-6 w-full">
      {/* Top Header & Search Bar matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-black text-slate-900">
              Available Government Challenges
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore state challenges published by Maharashtra departments open for innovative startup pilots.
            </p>
          </div>

          <button
            onClick={() =>
              askMahiContext(
                'I am an AI and IoT CleanTech startup. Find challenges related to my skills.',
                'marketplace'
              )
            }
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold border border-blue-200 transition"
          >
            <Bot className="w-4 h-4 text-blue-600" />
            <span>AI Skills Match Finder</span>
          </button>
        </div>

        {/* Search & Filter Inputs matching Reference Image */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search challenges by keyword, problem statement, or tech..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:ring-1 focus:ring-blue-500"
          >
            <option value="ALL">All Technologies</option>
            <option value="AI">AI / Computer Vision</option>
            <option value="IoT">IoT & Hardware</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Environment">Environment</option>
          </select>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:ring-1 focus:ring-blue-500"
          >
            <option value="ALL">All Departments</option>
            <option value="Urban">Urban Development</option>
            <option value="Health">Public Health</option>
            <option value="Transport">Home & Transport</option>
          </select>
        </div>
      </div>

      {/* Challenge Cards matching Reference Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChallenges.map((ch) => (
          <div
            key={ch.id}
            className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-md transition p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{ch.department_name || 'Dept. of Urban Development'}</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {ch.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                {ch.title}
              </h3>

              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {ch.problem_description}
              </p>

              {/* Tags matching Reference Image */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {ch.required_technologies.map((t, tidx) => (
                  <span
                    key={tidx}
                    className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 flex items-center gap-1">
                  <span>Budget:</span>
                  <span className="text-blue-700 font-extrabold">
                    ₹{(ch.budget_inr / 100000).toFixed(0)} Lakhs
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Deadline: {ch.deadline || '20 Oct 2026'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveChallengeId(ch.id);
                    navigate(`/proposals/submit?challengeId=${ch.id}`);
                  }}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-sm transition flex items-center gap-1"
                >
                  <span>Submit Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi to find the best challenges for your skills"
        contextPage="marketplace"
        customPrompt="I am an AI and IoT startup. Find challenges related to my skills."
      />
    </div>
  );
};
