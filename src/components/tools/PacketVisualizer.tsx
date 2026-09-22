import React, { useState } from 'react';
import { Layers, ArrowRight, ArrowLeft, RotateCcw, ShieldAlert, Cpu } from 'lucide-react';

export const PacketVisualizer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      title: 'Step 1: Application Data Generation (Layer 7)',
      location: 'Client Workstation (Browser)',
      device: 'Host OS Application Layer',
      description: 'The user types https://example.com into their browser. The web client generates an HTTP GET request payload.',
      headers: {
        payload: 'GET /index.html HTTP/1.1\\r\\nHost: example.com\\r\\nUser-Agent: Mozilla/5.0...'
      },
      explanation: 'At this stage, data is pure application payload. No networking headers or addresses have been attached yet.',
      socNote: 'Malware or C2 beacons begin here with malicious payloads or encrypted command strings.'
    },
    {
      title: 'Step 2: Transport Layer Segmentation (Layer 4)',
      location: 'Client Workstation (TCP/IP Stack)',
      device: 'Kernel Transport Layer',
      description: 'The operating system encapsulates the payload into a TCP segment, assigning an ephemeral source port and the destination service port.',
      headers: {
        l4: 'TCP Header [ Src Port: 52145 | Dest Port: 443 (HTTPS) | Seq: 1001 | Flags: ACK, PSH ]',
        payload: 'Application Data (HTTP GET)'
      },
      explanation: 'TCP ensures reliability and sequencing. Ephemeral port 52145 tracks this specific browser tab session.',
      socNote: 'Port numbers determine which process initiated the connection. 443 is encrypted HTTPS.'
    },
    {
      title: 'Step 3: Internet Layer Encapsulation (Layer 3)',
      location: 'Client Workstation (IP Protocol)',
      device: 'Kernel Network Layer',
      description: 'The OS prepends the IPv4 packet header containing logical Source IP and Destination IP addresses, and sets the initial TTL.',
      headers: {
        l3: 'IPv4 Header [ Src IP: 192.168.1.10 | Dest IP: 93.184.216.34 | Protocol: 6 (TCP) | TTL: 64 ]',
        l4: 'TCP Header [ Ports: 52145 -> 443 ]',
        payload: 'Application Data'
      },
      explanation: 'The client checks its subnet mask. Since 93.184.216.34 is on a remote network, the packet must be sent to the Default Gateway (192.168.1.1).',
      socNote: 'Source IP identifies the internal victim; Dest IP identifies the remote server.'
    },
    {
      title: 'Step 4: Data Link Layer Framing (Layer 2)',
      location: 'Client Workstation (NIC)',
      device: 'Network Interface Card',
      description: 'The NIC wraps the packet in an Ethernet frame. It looks up the Default Gateway in its ARP table to find the destination MAC address.',
      headers: {
        l2: 'Ethernet II [ Dest MAC: 00:50:56:01:02:03 (Gateway Router!) | Src MAC: AA:BB:CC:11:22:33 (PC) | EtherType: 0x0800 ]',
        l3: 'IPv4 [ 192.168.1.10 -> 93.184.216.34 ]',
        l4: 'TCP [ 52145 -> 443 ]',
        payload: 'Application Data',
        trailer: 'FCS Trailer [ CRC-32 Checksum ]'
      },
      explanation: 'CRITICAL CONCEPT: The Destination MAC is the ROUTER GATEWAY MAC, NOT the external web server MAC! Ethernet frames only travel locally.',
      socNote: 'ARP poisoning on the local subnet can redirect this frame to an attacker machine.'
    },
    {
      title: 'Step 5: Layer 2 Switch Forwarding',
      location: 'Enterprise Access Switch (SW1)',
      device: 'Layer 2 Switch',
      description: 'The switch receives the frame on Port 1. It notes the Source MAC in its CAM table, checks the Destination MAC, and forwards it to the router port.',
      headers: {
        l2: 'Ethernet II (Untouched)',
        l3: 'IPv4 (Untouched)',
        l4: 'TCP (Untouched)',
        payload: 'Data'
      },
      explanation: 'The switch DOES NOT modify the frame headers. It forwards based purely on Layer 2 MAC addresses.',
      socNote: 'Switches do not inspect IP addresses or TCP ports during normal L2 forwarding.'
    },
    {
      title: 'Step 6: Layer 3 Router Routing & L2 Rewrite',
      location: 'Default Gateway Router (R1)',
      device: 'Layer 3 Router',
      description: 'The router decapsulates the Layer 2 Ethernet frame. It inspects the Layer 3 Destination IP, decrements TTL by 1 (64 -> 63), and rewrites the Layer 2 frame for the next hop!',
      headers: {
        l2New: 'New Ethernet Frame [ Src MAC: R1 WAN MAC | Dest MAC: ISP Next-Hop MAC ]',
        l3Modified: 'IPv4 [ Src: 192.168.1.10 -> Dest: 93.184.216.34 | TTL: 63 (Decremented!) ]',
        l4: 'TCP [ 52145 -> 443 ]',
        payload: 'Data'
      },
      explanation: 'Routers strip and reconstruct Layer 2 headers across every single routed hop. Layer 3 IPs remain intact (unless NAT is active).',
      socNote: 'TTL expiration (TTL=0) triggers ICMP Time Exceeded packets, which is the foundational mechanism for traceroute.'
    },
    {
      title: 'Step 7: Destination Server Decapsulation',
      location: 'Cloud Web Server (93.184.216.34)',
      device: 'Destination Host Stack',
      description: 'The server verifies the FCS, strips L2 frame, verifies Dest IP matches its own, routes L4 segment to TCP port 443, and hands the HTTP GET payload to the web server process (Nginx/Apache).',
      headers: {
        payload: 'HTTP GET /index.html (Processed by Nginx on Port 443)'
      },
      explanation: 'Decapsulation occurs bottom-up: Physical Bits -> Frame checked -> Packet routed -> Segment reassembled -> Application Data delivered.',
      socNote: 'Web application firewalls (WAF) inspect the decrypted payload for SQLi, XSS, or command injection.'
    }
  ];

  const current = steps[currentStep];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700">
                VISUALIZER
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Packet Encapsulation & Journey Flow</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Step through how packets are encapsulated from Layer 7 to Layer 1 and rewritten across switches and routers
            </p>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold text-slate-700 transition-all active:scale-98 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-3 py-2 rounded-xl">
              {currentStep + 1} / {steps.length}
            </span>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold text-white transition-all active:scale-98 shadow-xs"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress Tracker */}
        <div className="grid grid-cols-7 gap-1.5 mt-5 pt-4 border-t border-slate-100">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentStep
                  ? 'bg-indigo-600 ring-2 ring-indigo-300'
                  : idx < currentStep
                  ? 'bg-emerald-500'
                  : 'bg-slate-200 hover:bg-slate-300'
              }`}
              title={s.title}
            />
          ))}
        </div>
      </div>

      {/* Main Step Detail Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
              {current.location} • {current.device}
            </span>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 mt-2">{current.title}</h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {current.description}
        </p>

        {/* Visual Frame / Packet Container */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
            Protocol Data Unit (PDU) Header Anatomy:
          </span>

          <div className="p-5 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs space-y-2.5 shadow-inner overflow-x-auto">
            {current.headers.l2 && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
                <span className="text-slate-400 text-[10px] font-semibold block uppercase tracking-wider mb-0.5">Layer 2: Data Link Header</span>
                {current.headers.l2}
              </div>
            )}
            {current.headers.l2New && (
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-600 text-emerald-300">
                <span className="text-emerald-400 text-[10px] font-semibold block uppercase tracking-wider mb-0.5">Layer 2: Rewritten MAC Frame for Next Hop</span>
                {current.headers.l2New}
              </div>
            )}
            {current.headers.l3 && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                <span className="text-slate-400 text-[10px] font-semibold block uppercase tracking-wider mb-0.5">Layer 3: IP Packet Header</span>
                {current.headers.l3}
              </div>
            )}
            {current.headers.l3Modified && (
              <div className="p-3 rounded-xl bg-slate-900 border border-cyan-600 text-cyan-300">
                <span className="text-cyan-400 text-[10px] font-semibold block uppercase tracking-wider mb-0.5">Layer 3: IP Packet Header (TTL Decremented)</span>
                {current.headers.l3Modified}
              </div>
            )}
            {current.headers.l4 && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-400">
                <span className="text-slate-400 text-[10px] font-semibold block uppercase tracking-wider mb-0.5">Layer 4: TCP Segment Header</span>
                {current.headers.l4}
              </div>
            )}
            {current.headers.payload && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                <span className="text-slate-400 text-[10px] font-semibold block uppercase tracking-wider mb-0.5">Layer 7: User Application Data</span>
                {current.headers.payload}
              </div>
            )}
            {current.headers.trailer && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-purple-400">
                <span className="text-slate-400 text-[10px] font-semibold block uppercase tracking-wider mb-0.5">Layer 2 Trailer</span>
                {current.headers.trailer}
              </div>
            )}
          </div>
        </div>

        {/* Concept Notes & Cybersecurity Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs sm:text-sm">
            <span className="font-bold text-indigo-900 block mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-indigo-600" /> Networking Mechanism
            </span>
            <p className="text-indigo-950 leading-relaxed text-xs">{current.explanation}</p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100 text-xs sm:text-sm">
            <span className="font-bold text-amber-900 block mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" /> Cybersecurity / SOC Context
            </span>
            <p className="text-amber-950 leading-relaxed text-xs">{current.socNote}</p>
          </div>
        </div>
      </div>

    </div>
  );
};
