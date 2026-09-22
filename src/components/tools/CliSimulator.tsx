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
Reply from ${target}: bytes=32 time=15ms TTL=117
Reply from ${target}: bytes=32 time=13ms TTL=117
Ping statistics for ${target}: Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)`;
      }
    } else if (cmd.startsWith('tracert') || cmd.startsWith('traceroute')) {
      const target = raw.split(' ')[1] || '8.8.8.8';
      output = `Tracing route to ${target} over a maximum of 30 hops:
  1     1 ms     1 ms     1 ms  192.168.1.1 [Default Gateway]
  2     9 ms     8 ms     8 ms  10.240.0.1 [ISP Gateway]
  3    12 ms    11 ms    11 ms  72.14.215.85
  4    14 ms    13 ms    14 ms  ${target}
Trace complete.`;
    } else if (cmd.startsWith('ipconfig') || cmd === 'ifconfig' || cmd === 'ip a') {
      output = `Ethernet adapter Local Area Connection:
   Connection-specific DNS Suffix  . : corp.internal
   Physical Address. . . . . . . . . : AA-BB-CC-11-22-33
   IPv4 Address. . . . . . . . . . . : 192.168.1.45
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
   DNS Servers . . . . . . . . . . . : 1.1.1.1, 8.8.8.8`;
    } else if (cmd.startsWith('arp')) {
      output = `Interface: 192.168.1.45 --- 0x4
  Internet Address      Physical Address      Type
  192.168.1.1           00-50-56-c0-00-08     dynamic
  192.168.1.25          a4-83-e7-11-22-33     dynamic
  192.168.1.255         ff-ff-ff-ff-ff-ff     static`;
    } else if (cmd.startsWith('nslookup') || cmd.startsWith('dig')) {
      const domain = raw.split(' ')[1] || 'example.com';
      output = `Server:  one.one.one.one
Address:  1.1.1.1

Non-authoritative answer:
Name:    ${domain}
Addresses:  93.184.216.34`;
    } else if (cmd.startsWith('netstat') || cmd.startsWith('ss')) {
      output = `Active Connections
  Proto  Local Address          Foreign Address        State           PID
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       844
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4
  TCP    192.168.1.45:49821     140.82.121.3:443       ESTABLISHED     12380
  TCP    192.168.1.45:51234     198.51.100.24:4444     ESTABLISHED     4912 [SUSPICIOUS]`;
    } else {
      output = `'${raw}' is not recognized as an internal or external command. Type 'help' for supported commands.`;
    }

    setHistory((prev) => [...prev, { command: raw, output }]);
    setInputVal('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700">
                SANDBOX
              </span>
              <h1 className="text-xl font-bold text-slate-900">CLI Network Command Simulator</h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Practice essential command-line diagnostic utilities used in network engineering and SOC incident triage
            </p>
          </div>

          <button
            onClick={() => setHistory([])}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Console
          </button>
        </div>

        {/* Quick Command Buttons */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium py-1 mr-1">Quick Run:</span>
          {['ping 192.168.1.1', 'ping 8.8.8.8', 'tracert 8.8.8.8', 'arp -a', 'nslookup google.com', 'netstat -ano'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleRunCommand(cmd)}
              className="px-2 py-1 rounded bg-slate-50 border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 text-slate-700 text-xs font-mono transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs shadow-md overflow-hidden flex flex-col min-h-[420px]">
        {/* Terminal Header Bar */}
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-slate-400 ml-2">C:\Windows\System32\cmd.exe (or /bin/bash)</span>
          </div>
          <span className="text-[10px] text-slate-500">Type 'help' for commands</span>
        </div>

        {/* Output Stream */}
        <div className="p-4 flex-1 space-y-4 overflow-y-auto">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <span className="text-slate-500">C:\Users\Analyst&gt;</span>
                <span>{item.command}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed pl-2 border-l border-slate-800 font-mono">
                {item.output}
              </pre>
            </div>
          ))}
        </div>

        {/* Command Input Prompt */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
          <span className="text-indigo-400 font-bold">C:\Users\Analyst&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRunCommand();
            }}
            placeholder="Type ping, tracert, arp, nslookup, netstat, or help..."
            className="flex-1 bg-transparent border-none text-slate-100 focus:outline-none font-mono text-xs"
            autoFocus
          />
          <button
            onClick={() => handleRunCommand()}
            className="p-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            title="Execute Command"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
