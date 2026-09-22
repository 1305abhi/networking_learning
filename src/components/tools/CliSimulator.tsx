import React, { useState } from 'react';
import { Terminal, Send, Trash2, HelpCircle } from 'lucide-react';
import { CLI_COMMANDS } from '../../data/cliCommands';

interface CommandHistoryItem {
  command: string;
  output: string;
}

export const CliSimulator: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'ipconfig /all',
      output: `Ethernet adapter Local Area Connection:
   Connection-specific DNS Suffix  . : corp.internal
   Description . . . . . . . . . . . : Intel(R) Ethernet Connection I219-LM
   Physical Address. . . . . . . . . : AA-BB-CC-11-22-33
   DHCP Enabled. . . . . . . . . . . : Yes
   IPv4 Address. . . . . . . . . . . : 192.168.1.45(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
   DHCP Server . . . . . . . . . . . : 192.168.1.1
   DNS Servers . . . . . . . . . . . : 1.1.1.1, 8.8.8.8`
    }
  ]);

  const handleRunCommand = (cmdToRun?: string) => {
    const raw = (cmdToRun || inputVal).trim();
    if (!raw) return;

    const cmd = raw.toLowerCase();
    let output = '';

    if (cmd === 'clear' || cmd === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (cmd === 'help') {
      output = `Supported diagnostic commands:
  - ping <ip / domain>      : Test Layer 3 ICMP reachability
  - tracert / traceroute    : Trace multi-hop route paths and TTL
  - ipconfig [/all]         : Display IP, mask, gateway, DNS settings
  - arp -a                  : Display local ARP cache (IP-to-MAC mappings)
  - nslookup <domain>       : Query DNS records
  - netstat -ano            : List active TCP connections and PIDs
  - clear / cls             : Clear terminal screen`;
    } else if (cmd.startsWith('ping')) {
      const target = raw.split(' ')[1] || '8.8.8.8';
      if (target.includes('fail') || target === '10.99.99.99') {
        output = `Pinging ${target} with 32 bytes of data:
Request timed out.
Request timed out.
Request timed out.
Request timed out.
Ping statistics for ${target}: Packets: Sent = 4, Received = 0, Lost = 4 (100% loss)`;
      } else {
        output = `Pinging ${target} with 32 bytes of data:
Reply from ${target}: bytes=32 time=14ms TTL=117
Reply from ${target}: bytes=32 time=12ms TTL=117
Reply from ${target}: bytes=32 time=13ms TTL=117
Reply from ${target}: bytes=32 time=15ms TTL=117
Ping statistics for ${target}: Packets: Sent = 4, Received = 4, Lost = 0 (0% loss), Approximate round trip times in milli-seconds: Minimum = 12ms, Maximum = 15ms, Average = 13ms`;
      }
    } else if (cmd.startsWith('tracert') || cmd.startsWith('traceroute')) {
      const target = raw.split(' ')[1] || '8.8.8.8';
      output = `Tracing route to ${target} over a maximum of 30 hops:
  1     1 ms     1 ms     1 ms  192.168.1.1 [Default Gateway]
  2    10 ms     9 ms     9 ms  10.240.0.1 [ISP Aggregation Node]
  3    12 ms    11 ms    11 ms  172.16.4.5 [Transit Backbone]
  4    15 ms    14 ms    14 ms  ${target} [Destination Reached]
Trace complete.`;
    } else if (cmd.startsWith('arp')) {
      output = `Interface: 192.168.1.45 --- 0x3
  Internet Address      Physical Address      Type
  192.168.1.1           00-14-22-01-23-45     dynamic
  192.168.1.10          50-7b-9d-44-11-22     dynamic
  192.168.1.255         ff-ff-ff-ff-ff-ff     static
  224.0.0.22            01-00-5e-00-00-16     static`;
    } else if (cmd.startsWith('nslookup')) {
      const host = raw.split(' ')[1] || 'google.com';
      output = `Server:  one.one.one.one
Address:  1.1.1.1

Non-authoritative answer:
Name:    ${host}
Addresses:  142.250.190.78
          2607:f8b0:4004:c07::64`;
    } else if (cmd.startsWith('netstat')) {
      output = `Active Connections
  Proto  Local Address          Foreign Address        State           PID
  TCP    192.168.1.45:49721     142.250.190.78:443     ESTABLISHED     4812
  TCP    192.168.1.45:49734     52.96.166.130:443      ESTABLISHED     9140
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       1044
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4`;
    } else if (cmd.startsWith('ipconfig')) {
      output = `Windows IP Configuration
Ethernet adapter Local Area Connection:
   Connection-specific DNS Suffix  . : corp.internal
   IPv4 Address. . . . . . . . . . . : 192.168.1.45
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1`;
    } else {
      output = `'${raw}' is not recognized as an internal or external command. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: raw, output }]);
    setInputVal('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700">
                SANDBOX
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">CLI Network Command Simulator</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Practice essential command-line diagnostic utilities used in network engineering and SOC incident triage
            </p>
          </div>

          <button
            onClick={() => setHistory([])}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors self-start sm:self-auto shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Console
          </button>
        </div>

        {/* Quick Command Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-semibold mr-1">Quick Run:</span>
          {['ping 192.168.1.1', 'ping 8.8.8.8', 'tracert 8.8.8.8', 'arp -a', 'nslookup google.com', 'netstat -ano'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleRunCommand(cmd)}
              className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/90 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 text-slate-700 text-xs font-mono transition-all active:scale-98 shadow-xs"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs shadow-md overflow-hidden flex flex-col min-h-[420px]">
        {/* Terminal Header Bar */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs text-slate-400 ml-2 font-mono">C:\Windows\System32\cmd.exe (or /bin/bash)</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Type 'help' for syntax</span>
        </div>

        {/* Output Stream */}
        <div className="p-5 flex-1 space-y-4 overflow-y-auto">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <span className="text-slate-500 font-mono">C:\Users\Analyst&gt;</span>
                <span className="font-mono">{item.command}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed pl-3 border-l-2 border-slate-800 font-mono text-xs">
                {item.output}
              </pre>
            </div>
          ))}
        </div>

        {/* Command Input Row */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
          <span className="text-indigo-400 font-bold pl-2 font-mono text-xs">C:\Users\Analyst&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRunCommand();
            }}
            placeholder="Type command (e.g. ping 8.8.8.8, arp -a, netstat -ano, help)..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none font-mono text-xs"
            autoFocus
          />
          <button
            onClick={() => handleRunCommand()}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            title="Execute Command"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
