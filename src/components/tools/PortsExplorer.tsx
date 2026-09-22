import React, { useState } from 'react';
import { ListFilter, Search, AlertTriangle, ShieldCheck, Lock } from 'lucide-react';
import { COMMON_PORTS } from '../../data/ports';

export const PortsExplorer: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'plaintext' | 'encrypted'>('all');

  const filteredPorts = COMMON_PORTS.filter((p) => {
    const matchesSearch = 
      p.port.toString().includes(search) ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.socAlertRisk.toLowerCase().includes(search.toLowerCase());

    const matchesType = 
      filterType === 'all' ||
      (filterType === 'plaintext' && p.defaultPlaintext) ||
      (filterType === 'encrypted' && !p.defaultPlaintext);

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700">
                DATABASE
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Common Ports & Threat Intelligence Matrix</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Reference guide connecting well-known transport layer ports to service functions and SOC security risks
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <div className="relative w-48 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search port or service..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200/90 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs transition-all"
              />
            </div>

            <select
              value={filterType}
              onChange={(e: any) => setFilterType(e.target.value)}
              className="bg-white border border-slate-200/90 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs cursor-pointer"
            >
              <option value="all">All Ports</option>
              <option value="plaintext">Plaintext Only</option>
              <option value="encrypted">Encrypted Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ports Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-5 font-mono">Port</th>
                <th className="py-3.5 px-3">Protocol</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Default Security</th>
                <th className="py-3.5 px-6">SOC Alert Risk & Threat Vector Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm">
              {filteredPorts.map((entry) => (
                <tr key={entry.port} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-900 text-sm">
                    {entry.port}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                      {entry.protocol}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {entry.name}
                    <span className="block text-xs text-slate-500 font-normal mt-0.5">
                      {entry.description}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {entry.defaultPlaintext ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/70">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Plaintext Risk
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/70">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" /> Encrypted
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-6 text-slate-600 leading-relaxed text-xs">
                    {entry.socAlertRisk}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
