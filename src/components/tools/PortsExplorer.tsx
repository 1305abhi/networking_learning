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
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700">
                DATABASE
              </span>
              <h1 className="text-xl font-bold text-slate-900">Common Ports & Threat Intelligence Matrix</h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Reference guide connecting well-known transport layer ports to service functions and SOC security risks
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search port or service..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <select
              value={filterType}
              onChange={(e: any) => setFilterType(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none"
            >
              <option value="all">All Ports</option>
              <option value="plaintext">Plaintext Only</option>
              <option value="encrypted">Encrypted Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ports Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 font-mono">Port</th>
                <th className="py-3 px-3">Protocol</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Default Encryption</th>
                <th className="py-3 px-6">SOC Alert Risk & Exploitation Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredPorts.map((entry) => (
                <tr key={entry.port} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 text-sm">
                    {entry.port}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {entry.protocol}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {entry.name}
                    <span className="block text-[11px] text-slate-500 font-normal mt-0.5">
                      {entry.description}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {entry.defaultPlaintext ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <AlertTriangle className="w-3 h-3" /> Plaintext
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <Lock className="w-3 h-3" /> Encrypted
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-slate-600 leading-relaxed text-[11px]">
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
