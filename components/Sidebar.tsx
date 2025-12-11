import React from 'react';
import { AGENTS, getIcon } from '../constants';

export const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            H
          </div>
          <h1 className="font-bold text-slate-800 text-lg tracking-tight">Health-Agent-Core</h1>
        </div>
        <p className="text-xs text-slate-400 mt-2">Multi-Agent Hospital OS</p>
      </div>

      <div className="p-4 flex-1">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Active Agents</h3>
        <div className="space-y-2">
          {Object.values(AGENTS).map((agent) => {
            if (agent.id === 'COORDINATOR') return null; // Skip coordinator in list for cleaner look
            return (
              <div key={agent.id} className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-default border border-transparent hover:border-slate-100">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${agent.bgColor} ${agent.color}`}>
                  {getIcon(agent.iconName, 16)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{agent.name}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{agent.description}</p>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <h4 className="text-sm font-semibold text-blue-800 mb-1">System Status</h4>
          <div className="flex items-center gap-2 mt-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-xs text-blue-600 font-medium">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};