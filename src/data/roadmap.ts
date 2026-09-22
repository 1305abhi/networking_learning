import { DayMeta } from '../types';

export const ROADMAP_DAYS: DayMeta[] = [
  // WEEK 1: Networking Foundations
  {
    day: 1,
    week: 1,
    title: 'What Is a Network?',
    subtitle: 'LAN, WAN, WLAN, topologies, network devices & packets',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['LAN vs WAN vs WLAN', 'Client-Server & P2P', 'Packets', 'Network Devices (NIC, Switch, Router, Firewall)'],
    cybersecurityFocus: 'Device attack surface, rogue APs, perimeter defense boundary.'
  },
  {
    day: 2,
    week: 1,
    title: 'The OSI 7-Layer Model',
    subtitle: 'Layers, Encapsulation, Decapsulation & PDU terminology',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['7 OSI Layers (Physical to Application)', 'Encapsulation & Decapsulation', 'PDUs (Bits, Frame, Packet, Segment, Data)'],
    cybersecurityFocus: 'Layer-specific threats: Layer 2 ARP poisoning, Layer 3 IP spoofing, Layer 4 SYN floods, Layer 7 SQLi/XSS.'
  },
  {
    day: 3,
    week: 1,
    title: 'The TCP/IP Model',
    subtitle: 'Application, Transport, Internet, Network Access & OSI Mapping',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['4-Layer TCP/IP Architecture', 'OSI vs TCP/IP Mapping', 'Internet Protocol Suite in Practice'],
    cybersecurityFocus: 'Analyzing PCAP captures; mapping packet dissection to the 4-layer protocol stack in Wireshark.'
  },
  {
    day: 4,
    week: 1,
    title: 'Ethernet & MAC Addresses',
    subtitle: 'Layer 2 framing, 48-bit MAC addresses, Unicast, Broadcast, Multicast',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Ethernet Frame Anatomy', 'MAC Address Structure (OUI vs Vendor)', 'Unicast vs Broadcast vs Multicast'],
    cybersecurityFocus: 'MAC spoofing, broadcast storm amplification, NIC promiscuous mode sniffing.'
  },
  {
    day: 5,
    week: 1,
    title: 'Switching & Forwarding',
    subtitle: 'MAC tables, learning, flooding, filtering, collision & broadcast domains',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Switch Learning Process', 'MAC Address Table (CAM)', 'Forwarding vs Flooding', 'Collision vs Broadcast Domains'],
    cybersecurityFocus: 'CAM table overflow (MAC flooding attack) forcing a switch into fail-open hub behavior.'
  },
  {
    day: 6,
    week: 1,
    title: 'IP Addressing Introduction',
    subtitle: 'IPv4 vs IPv6 structure, octets, network vs host portion, private ranges',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['32-bit IPv4 Structure', 'RFC 1918 Private Ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)', 'Loopback & APIPA', 'IPv6 128-bit preview'],
    cybersecurityFocus: 'Internal RFC 1918 leak detection, identifying loopback exfiltration, recognizing rogue DHCP from APIPA (169.254.x.x).'
  },
  {
    day: 7,
    week: 1,
    title: 'Week 1 Review & Practical Lab',
    subtitle: 'Foundations review, packet journey diagram, end-to-end tracing',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Comprehensive Week 1 Assessment', 'Packet Journey Exercise (PC to Router to Internet)', 'End-to-end Encapsulation Trace'],
    cybersecurityFocus: 'SOC Triage: Reconstructing a multi-hop lateral movement incident across Layer 2 and Layer 3.'
  },

  // WEEK 2: IP, TCP/UDP & Core Protocols
  {
    day: 8,
    week: 2,
    title: 'IPv4 Addressing & CIDR',
    subtitle: 'Address classes, prefix notation, network, broadcast & usable host calculation',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Classful vs Classless (CIDR)', 'Prefix Notation (/24, /27, etc.)', 'Network ID, Broadcast, Host Range Formula (2^h - 2)'],
    cybersecurityFocus: 'CIDR scoping in firewall rules and cloud Security Groups (avoiding accidental 0.0.0.0/0 exposure).'
  },
  {
    day: 9,
    week: 2,
    title: 'Binary & Subnetting Fundamentals',
    subtitle: 'Decimal-binary conversion, octet weights, subnet mask representation',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['8-bit Binary Weights (128, 64, 32, 16, 8, 4, 2, 1)', 'Subnet Mask Octet Conversion', 'Bitwise ANDing'],
    cybersecurityFocus: 'Subnet boundaries in network intrusion detection (NIDS) and honeynet isolation.'
  },
  {
    day: 10,
    week: 2,
    title: 'Subnetting Mastery & VLSM',
    subtitle: 'Progressive calculation: /24, /25, /26, /27, /28, /29, /30 & point-to-point',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Step-by-step Subnet Calculation', 'Magic Number Technique', 'Point-to-Point /30 and /31 links', 'Variable Length Subnet Masking'],
    cybersecurityFocus: 'Segmenting DMZs, management subnets, and isolated sandbox VLANs with tight host bounds.'
  },
  {
    day: 11,
    week: 2,
    title: 'TCP & UDP Deep Dive',
    subtitle: 'Three-way handshake, flags (SYN, ACK, FIN, RST), reliability vs speed',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['TCP Three-Way Handshake (SYN, SYN-ACK, ACK)', 'TCP Flags (SYN, ACK, FIN, RST, PSH, URG)', 'UDP Datagrams', 'Flow Control & Sequencing'],
    cybersecurityFocus: 'TCP SYN flood attacks, port scanning techniques (SYN stealth scan, Xmas scan, NULL scan).'
  },
  {
    day: 12,
    week: 2,
    title: 'Common Ports & Protocols',
    subtitle: 'Critical services: 20/21, 22, 23, 25, 53, 67/68, 80, 110, 143, 443, 3389',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Well-Known Ports (0-1023) & Ephemeral Ports', 'Insecure vs Secure Pairs (Telnet vs SSH, HTTP vs HTTPS)', 'Service Identification'],
    cybersecurityFocus: 'Exposure analysis: detecting unencrypted cleartext protocols (FTP, Telnet), exposed RDP (3389) brute-forcing.'
  },
  {
    day: 13,
    week: 2,
    title: 'ARP & ICMP in Action',
    subtitle: 'ARP request/reply, ARP cache, ICMP echo, ping, traceroute TTL mechanics',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['ARP Resolution Process', 'ARP Cache Inspection', 'ICMP Echo / Echo Reply', 'Traceroute / Tracert TTL Expiration'],
    cybersecurityFocus: 'ARP Cache Poisoning (Man-in-the-Middle), ICMP tunneling, ping sweeps for network discovery.'
  },
  {
    day: 14,
    week: 2,
    title: 'Week 2 Review & Diagnostic Exam',
    subtitle: 'Subnetting test, protocol identification, TCP/UDP scenarios, ARP flow',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Timed Subnetting Drills', 'Protocol & Port Matching', 'Troubleshooting Gateway & Ping Scenarios'],
    cybersecurityFocus: 'Analyzing real PCAP snippets to identify an ARP spoofing attack and suspicious DNS queries.'
  },

  // WEEK 3: Switching, VLANs & Routing
  {
    day: 15,
    week: 3,
    title: 'VLANs & Logical Segmentation',
    subtitle: 'Why VLANs exist, broadcast domain isolation, access ports, security benefits',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Broadcast Domain Segmentation', 'VLAN IDs (1-4094)', 'Access Port Configuration', 'Departmental Network Isolation'],
    cybersecurityFocus: 'Zero-trust network architecture, containing ransomware laterally through strict VLAN separation.'
  },
  {
    day: 16,
    week: 3,
    title: '802.1Q & Trunking',
    subtitle: 'VLAN tagging, trunk links, native VLAN concepts, trunk negotiation pitfalls',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['IEEE 802.1Q 4-byte Tag Header', 'Trunk Ports vs Access Ports', 'Native VLAN Role', 'VLAN Hopping Hazards'],
    cybersecurityFocus: 'Double-tagging attacks, switch spoofing via DTP, mitigating native VLAN 1 vulnerabilities.'
  },
  {
    day: 17,
    week: 3,
    title: 'Inter-VLAN Routing',
    subtitle: 'Router-on-a-Stick (subinterfaces), Layer 3 switching (SVIs), default gateways',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Router-on-a-Stick (ROAS)', 'Subinterfaces & 802.1Q Encapsulation', 'Layer 3 Switch Switched Virtual Interfaces (SVIs)', 'Packet Flow Between VLANs'],
    cybersecurityFocus: 'Enforcing firewall inspection and microsegmentation policies between VLANs.'
  },
  {
    day: 18,
    week: 3,
    title: 'Routing Fundamentals',
    subtitle: 'Routing tables, connected, static, dynamic, next hop, administrative distance',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Routing Table Architecture', 'Longest Prefix Match Rule', 'Administrative Distance (AD) & Metrics', 'Next-Hop Resolution'],
    cybersecurityFocus: 'Detecting route hijacking, unauthorized static route injection, rogue default gateways.'
  },
  {
    day: 19,
    week: 3,
    title: 'Static & Default Routing',
    subtitle: 'Manual routes, 0.0.0.0/0 default gateway, route diagnosis & next-hop resolution',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Configuring Static Routes', 'Gateway of Last Resort (0.0.0.0/0)', 'Diagnosing Routing Loops and Black Holes', 'Floating Static Routes'],
    cybersecurityFocus: 'Detecting command-and-control (C2) bypass through malicious static route manipulation on compromised hosts.'
  },
  {
    day: 20,
    week: 3,
    title: 'OSPF Dynamic Routing Fundamentals',
    subtitle: 'Link-state protocols, neighbor adjacency, areas, cost metric, Dijkstra SPF',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Distance Vector vs Link-State', 'OSPF Router ID & Hello Packets', 'Single-Area OSPF (Area 0)', 'Cost Calculation (Reference Bandwidth)'],
    cybersecurityFocus: 'OSPF MD5/SHA authentication to prevent rogue router injection and poisoned LSA advertisements.'
  },
  {
    day: 21,
    week: 3,
    title: 'Week 3 Hands-On Topology Lab',
    subtitle: 'Multi-device topology configuration, VLANs, routing, and broken state triage',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['PC-Switch-Router Topology', 'IP Assignment & Gateway Config', 'Trunk Verification', 'Deliberate Misconfiguration Troubleshooting'],
    cybersecurityFocus: 'Simulated breach containment: Isolate infected VLAN 20 while preserving critical server VLAN 10 uptime.'
  },

  // WEEK 4: Services, Security, Wireless & Troubleshooting
  {
    day: 22,
    week: 4,
    title: 'DHCP Operations & Security',
    subtitle: 'DORA process (Discover, Offer, Request, Ack), DHCP relay (ip helper), reservations',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['DHCP 4-Step Handshake (DORA)', 'DHCP Relay Agent Across Routers', 'Scope, Lease Times & Reservations', 'UDP Ports 67 & 68'],
    cybersecurityFocus: 'DHCP starvation attacks (exhausting IP pool) and rogue DHCP server rogue-gateway injection; DHCP Snooping defense.'
  },
  {
    day: 23,
    week: 4,
    title: 'DNS & Name Resolution',
    subtitle: 'DNS hierarchy, recursive vs authoritative, A, AAAA, CNAME, MX, TXT records',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Root, TLD & Authoritative DNS Servers', 'Recursive Resolver Query Flow', 'Common DNS Record Types', 'DNS Caching & TTL'],
    cybersecurityFocus: 'DNS cache poisoning (Kaminsky bug), DNS exfiltration/tunneling (Iodine), fast-flux malware domains, Sinkholing.'
  },
  {
    day: 24,
    week: 4,
    title: 'NAT & PAT (Network Address Translation)',
    subtitle: 'IPv4 exhaustion solution, Static NAT, Dynamic NAT, PAT (Port Address Translation)',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Inside Local vs Inside Global', 'Outside Local vs Outside Global', 'Port Address Translation (NAT Overload)', 'NAT vs Firewall distinction'],
    cybersecurityFocus: 'Investigating NAT connection logs in SIEM: matching external observed IP/port back to internal compromised client.'
  },
  {
    day: 25,
    week: 4,
    title: 'ACLs & Network Filtering',
    subtitle: 'Standard vs Extended ACLs, permit/deny logic, implicit deny, stateful firewalls',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Standard ACLs (Source IP only)', 'Extended ACLs (Source, Dest, Protocol, Port)', 'Implicit Deny Rule', 'Stateful vs Stateless Filtering'],
    cybersecurityFocus: 'Constructing egress filtering rules to prevent C2 outbound beacons and data exfiltration.'
  },
  {
    day: 26,
    week: 4,
    title: 'Wireless Networking (802.11)',
    subtitle: 'SSID, BSSID, 2.4/5/6 GHz channels, WPA2 vs WPA3, 4-way handshake, wireless threats',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Wi-Fi Architecture & Access Points', 'Frequencies, Channels & Interference', 'WPA2-PSK vs WPA3 SAE vs Enterprise 802.1X', 'Wireless Authentication vs Encryption'],
    cybersecurityFocus: 'Evil Twin APs, Deauthentication frames (802.11 deauth attacks), cracking WPA2 4-way handshakes, KRACK attack.'
  },
  {
    day: 27,
    week: 4,
    title: 'Network Management & Monitoring',
    subtitle: 'SSH vs Telnet, SNMP (v2c vs v3), Syslog facilities & severity, NTP synchronization',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Secure Shell (SSH) Protocol', 'SNMP MIBs, OIDs & Community Strings', 'Syslog RFC 5424 Levels (0-7)', 'Network Time Protocol (NTP)'],
    cybersecurityFocus: 'Why NTP is non-negotiable for digital forensics & SOC correlation; SNMP community string sniffing (public/private).'
  },
  {
    day: 28,
    week: 4,
    title: 'Troubleshooting Methodology & CLI',
    subtitle: '7-step troubleshooting model, ping, tracert, ipconfig, arp, nslookup, netstat',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['The 7-Step Troubleshooting Methodology', 'Top-Down vs Bottom-Up vs Divide-and-Conquer', 'CLI Diagnostic Tools (Windows & Linux equivalents)'],
    cybersecurityFocus: 'Using live CLI commands for rapid host incident triage: identifying unauthorized active connections with netstat/ss.'
  },
  {
    day: 29,
    week: 4,
    title: 'Networking for Cybersecurity & SOC',
    subtitle: 'End-to-end packet journey through SIEM, firewalls, IDS/IPS, and suspicious traffic triage',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Connecting All 28 Days Together', 'Anatomy of a SOC Security Incident', 'Firewall, Proxy & NetFlow Logs Analysis', 'Recognizing Malicious Packet Patterns'],
    cybersecurityFocus: 'Hands-on alert triage: Tracking a phishing link click through DNS query, TLS session, firewall permit, and outbound beaconing.'
  },
  {
    day: 30,
    week: 4,
    title: 'Final Assessment & Readiness Scorecard',
    subtitle: '50-question comprehensive exam, practical topology verification & readiness report',
    timeEstimate: '2 hours',
    targetTimeMinutes: 120,
    topics: ['Comprehensive 50-Question Examination', 'Subnetting Practical Section', 'Protocol & Switching Diagnostics', 'Final Diagnostic Report & Next Steps'],
    cybersecurityFocus: 'Demonstrate holistic CCNA-level networking competency ready for SOC tier-1 operations and Linux/Wireshark modules.'
  }
];

export const WEEK_MODULES = [
  {
    week: 1,
    title: 'Networking Foundations',
    description: 'Hardware, models, encapsulation, MAC addresses, switching & basic IP concepts.',
    days: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    week: 2,
    title: 'IP, TCP/UDP & Core Protocols',
    description: 'Subnetting, binary calculations, transport layer mechanics, port security & ARP/ICMP.',
    days: [8, 9, 10, 11, 12, 13, 14]
  },
  {
    week: 3,
    title: 'Switching, VLANs & Routing',
    description: 'VLAN segmentation, 802.1Q trunking, inter-VLAN routing, static routes & OSPF.',
    days: [15, 16, 17, 18, 19, 20, 21]
  },
  {
    week: 4,
    title: 'Services, Security & Troubleshooting',
    description: 'DHCP, DNS, NAT, ACLs, wireless security, device management, troubleshooting & final exam.',
    days: [22, 23, 24, 25, 26, 27, 28, 29, 30]
  }
];
