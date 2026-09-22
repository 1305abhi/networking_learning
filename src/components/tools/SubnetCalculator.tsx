import React, { useState } from 'react';
import { Binary, RefreshCw, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface SubnetResult {
  ip: string;
  prefix: number;
  mask: string;
  wildcard: string;
  network: string;
  broadcast: string;
  firstUsable: string;
  lastUsable: string;
  totalHosts: number;
  usableHosts: number;
  binaryIp: string;
  binaryMask: string;
}

export const SubnetCalculator: React.FC = () => {
  const [ipInput, setIpInput] = useState<string>('192.168.10.45');
  const [prefixInput, setPrefixInput] = useState<number>(27);
  const [activeTab, setActiveTab] = useState<'calc' | 'drill'>('calc');

  // Drill state
  const [drillProblem, setDrillProblem] = useState<{
    ip: string;
    prefix: number;
    network: string;
    broadcast: string;
    firstUsable: string;
    lastUsable: string;
    usableHosts: number;
  }>({
    ip: '10.1.50.77',
    prefix: 26,
    network: '10.1.50.64',
    broadcast: '10.1.50.127',
    firstUsable: '10.1.50.65',
    lastUsable: '10.1.50.126',
    usableHosts: 62
  });

  const [userAnswers, setUserAnswers] = useState({
    network: '',
    broadcast: '',
    firstUsable: '',
    lastUsable: '',
    usableHosts: ''
  });

  const [drillSubmitted, setDrillSubmitted] = useState<boolean>(false);

  // Helper math
  const calculateSubnet = (ipStr: string, prefix: number): SubnetResult | null => {
    const octets = ipStr.trim().split('.').map(Number);
    if (octets.length !== 4 || octets.some((o) => isNaN(o) || o < 0 || o > 255)) {
      return null;
    }

    const ipInt = ((octets[0] << 24) >>> 0) + ((octets[1] << 16) >>> 0) + ((octets[2] << 8) >>> 0) + (octets[3] >>> 0);
    const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    const wildcardInt = ~maskInt >>> 0;
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | wildcardInt) >>> 0;

    const intToIp = (num: number) => [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');

    const intToBinary = (num: number) => {
      const parts = [
        ((num >>> 24) & 255).toString(2).padStart(8, '0'),
        ((num >>> 16) & 255).toString(2).padStart(8, '0'),
        ((num >>> 8) & 255).toString(2).padStart(8, '0'),
        (num & 255).toString(2).padStart(8, '0')
      ];
      return parts.join('.');
    };

    const totalHosts = Math.pow(2, 32 - prefix);
    const usableHosts = prefix >= 31 ? (prefix === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

    const firstUsable = prefix >= 31 ? intToIp(networkInt) : intToIp(networkInt + 1);
    const lastUsable = prefix >= 31 ? intToIp(broadcastInt) : intToIp(broadcastInt - 1);

    return {
      ip: ipStr,
      prefix,
      mask: intToIp(maskInt),
      wildcard: intToIp(wildcardInt),
      network: intToIp(networkInt),
      broadcast: intToIp(broadcastInt),
      firstUsable,
      lastUsable,
      totalHosts,
      usableHosts,
      binaryIp: intToBinary(ipInt),
      binaryMask: intToBinary(maskInt)
    };
  };

  const result = calculateSubnet(ipInput, prefixInput);

  const generateNewDrill = () => {
    const prefixes = [24, 25, 26, 27, 28, 29, 30];
    const chosenPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const o1 = Math.random() > 0.5 ? 192 : 10;
    const o2 = o1 === 192 ? 168 : Math.floor(Math.random() * 20) + 1;
    const o3 = Math.floor(Math.random() * 50) + 1;
    const o4 = Math.floor(Math.random() * 254) + 1;
    const randomIp = `${o1}.${o2}.${o3}.${o4}`;

    const calculated = calculateSubnet(randomIp, chosenPrefix);
    if (calculated) {
      setDrillProblem({
        ip: randomIp,
        prefix: chosenPrefix,
        network: calculated.network,
        broadcast: calculated.broadcast,
        firstUsable: calculated.firstUsable,
        lastUsable: calculated.lastUsable,
        usableHosts: calculated.usableHosts
      });
      setUserAnswers({
        network: '',
        broadcast: '',
        firstUsable: '',
        lastUsable: '',
        usableHosts: ''
      });
      setDrillSubmitted(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700">
                SANDBOX
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Subnetting Sandbox & Calculator</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Calculate CIDR boundaries, subnet masks, host ranges, and test yourself with timed drills
            </p>
          </div>

          {/* Segmented Control */}
          <div className="bg-slate-100/90 p-1 rounded-xl flex items-center gap-1 border border-slate-200/60 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('calc')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'calc' 
                  ? 'bg-white shadow-xs text-slate-950 font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => {
                setActiveTab('drill');
                if (!drillSubmitted) generateNewDrill();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'drill' 
                  ? 'bg-white shadow-xs text-slate-950 font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Practice Drills
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'calc' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Input parameters */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
              IP & Mask Parameters
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">IPv4 Host Address</label>
              <input
                type="text"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                placeholder="192.168.1.1"
                className="w-full font-mono text-sm px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>CIDR Prefix: /{prefixInput}</span>
                <span className="text-indigo-600 font-mono font-bold">
                  {result ? result.mask : ''}
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="30"
                value={prefixInput}
                onChange={(e) => setPrefixInput(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1.5">
                <span>/8 (Class A)</span>
                <span>/16</span>
                <span>/24 (Class C)</span>
                <span>/30 (P2P)</span>
              </div>
            </div>

            {/* Quick prefix presets */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium block mb-2">Common CCNA Subnets:</span>
              <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                {[24, 25, 26, 27, 28, 29, 30].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrefixInput(p)}
                    className={`py-1.5 rounded-lg border text-center transition-all ${
                      prefixInput === p 
                        ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-xs active:scale-98' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80 shadow-xs'
                    }`}
                  >
                    /{p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Calculated Subnet Results (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
              Calculated Subnet Properties
            </h2>

            {result ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                    <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">Network ID</span>
                    <span className="font-mono text-base font-bold text-indigo-700 mt-1 block">{result.network}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                    <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">Broadcast Address</span>
                    <span className="font-mono text-base font-bold text-amber-700 mt-1 block">{result.broadcast}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                    <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">Subnet Mask</span>
                    <span className="font-mono text-base font-semibold text-slate-900 mt-1 block">{result.mask}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                    <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">First Usable Host</span>
                    <span className="font-mono text-base font-semibold text-slate-800 mt-1 block">{result.firstUsable}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                    <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">Last Usable Host</span>
                    <span className="font-mono text-base font-semibold text-slate-800 mt-1 block">{result.lastUsable}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
                    <span className="text-slate-400 block text-[11px] font-medium uppercase tracking-wider">Usable Hosts</span>
                    <span className="font-mono text-base font-bold text-emerald-700 mt-1 block">{result.usableHosts} hosts</span>
                  </div>
                </div>

                {/* Binary breakdown */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    32-Bit Binary Bit Boundary Alignment
                  </span>
                  <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs space-y-1.5 shadow-inner overflow-x-auto">
                    <div>
                      <span className="text-slate-400">IP BINARY:   </span>
                      <span className="text-slate-100">{result.binaryIp}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">MASK BINARY: </span>
                      <span className="text-indigo-400">{result.binaryMask}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    The first <strong className="text-slate-800 font-mono">{result.prefix} bits</strong> are Network bits (1s in subnet mask); the remaining <strong className="text-slate-800 font-mono">{32 - result.prefix} bits</strong> determine the host addresses within this broadcast domain.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs sm:text-sm">
                Invalid IP address format. Please enter a valid dotted-decimal IPv4 address (e.g. 192.168.1.10).
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Practice Drill Mode */
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                PRACTICE CHALLENGE
              </span>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 mt-1.5">
                Calculate for: <span className="font-mono text-indigo-700">{drillProblem.ip}/{drillProblem.prefix}</span>
              </h2>
            </div>
            <button
              onClick={generateNewDrill}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all active:scale-98 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              New Problem
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Network Address</label>
              <input
                type="text"
                value={userAnswers.network}
                onChange={(e) => setUserAnswers({ ...userAnswers, network: e.target.value.trim() })}
                placeholder="e.g. 192.168.1.0"
                className="w-full font-mono px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs"
              />
              {drillSubmitted && (
                <div className="mt-1.5 flex items-center gap-1 text-xs">
                  {userAnswers.network === drillProblem.network ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Correct</span>
                  ) : (
                    <span className="text-red-600 font-medium flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Ans: {drillProblem.network}</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Broadcast Address</label>
              <input
                type="text"
                value={userAnswers.broadcast}
                onChange={(e) => setUserAnswers({ ...userAnswers, broadcast: e.target.value.trim() })}
                placeholder="e.g. 192.168.1.255"
                className="w-full font-mono px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs"
              />
              {drillSubmitted && (
                <div className="mt-1.5 flex items-center gap-1 text-xs">
                  {userAnswers.broadcast === drillProblem.broadcast ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Correct</span>
                  ) : (
                    <span className="text-red-600 font-medium flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Ans: {drillProblem.broadcast}</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">First Usable Host</label>
              <input
                type="text"
                value={userAnswers.firstUsable}
                onChange={(e) => setUserAnswers({ ...userAnswers, firstUsable: e.target.value.trim() })}
                placeholder="e.g. 192.168.1.1"
                className="w-full font-mono px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs"
              />
              {drillSubmitted && (
                <div className="mt-1.5 flex items-center gap-1 text-xs">
                  {userAnswers.firstUsable === drillProblem.firstUsable ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Correct</span>
                  ) : (
                    <span className="text-red-600 font-medium flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Ans: {drillProblem.firstUsable}</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Last Usable Host</label>
              <input
                type="text"
                value={userAnswers.lastUsable}
                onChange={(e) => setUserAnswers({ ...userAnswers, lastUsable: e.target.value.trim() })}
                placeholder="e.g. 192.168.1.254"
                className="w-full font-mono px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs"
              />
              {drillSubmitted && (
                <div className="mt-1.5 flex items-center gap-1 text-xs">
                  {userAnswers.lastUsable === drillProblem.lastUsable ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Correct</span>
                  ) : (
                    <span className="text-red-600 font-medium flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Ans: {drillProblem.lastUsable}</span>
                  )}
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1.5">Usable Host Count</label>
              <input
                type="number"
                value={userAnswers.usableHosts}
                onChange={(e) => setUserAnswers({ ...userAnswers, usableHosts: e.target.value.trim() })}
                placeholder="e.g. 62"
                className="w-full font-mono px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs"
              />
              {drillSubmitted && (
                <div className="mt-1.5 flex items-center gap-1 text-xs">
                  {Number(userAnswers.usableHosts) === drillProblem.usableHosts ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Correct</span>
                  ) : (
                    <span className="text-red-600 font-medium flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Ans: {drillProblem.usableHosts}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
            {!drillSubmitted ? (
              <button
                onClick={() => setDrillSubmitted(true)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs active:scale-98"
              >
                Check Answers
              </button>
            ) : (
              <button
                onClick={generateNewDrill}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 active:scale-98"
              >
                Next Problem <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
