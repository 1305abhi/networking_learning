# NetLearn: 30-Day Networking Fundamentals & CCNA Readiness Platform

A minimal, light-themed, local-first web application designed to teach networking fundamentals across a structured 30-day curriculum with a 2-hour daily commitment.

Built for learners targeting CCNA-level networking fundamentals and practical foundation knowledge for Cybersecurity / SOC operations.

---

## 🌟 Key Features

- **Light & Minimal Aesthetic**: Crisp, high-contrast typography, subtle slate borders, and monospace formatting for IP addresses, MACs, CIDR subnets, packet headers, and CLI terminal outputs.
- **5-Part Daily Learning Structure (120 Minutes Target)**:
  - **Part A: Learn (45 min)**: Core theory, structured concepts, RFC references, ASCII/diagrammatic flows, and comparison tables.
  - **Part B: Understand (20 min)**: Why the concept exists, problem it solves, behind-the-scenes execution, common student pitfalls, and SOC/cybersecurity relevance.
  - **Part C: Practice (35 min)**: Interactive hands-on exercises (Subnet calculations, packet journeys, topology troubleshooting).
  - **Part D: Quiz (20 min)**: Scenario-based and diagnostic quizzes with instant grading and detailed explanations for every option.
  - **Part E: Revision (20 min)**: 5 high-yield key facts, 3 common mistakes, mini-scenario, and interactive flashcards.
- **Integrated Interactive Tools**:
  - **Subnetting Sandbox & Calculator**: Real-time CIDR boundaries, subnet masks, wildcard masks, host ranges, binary breakdown, and randomized timed practice drills.
  - **Packet Encapsulation & Journey Visualizer**: Step-by-step layer-by-layer animation showing packet traversal (Layer 7 down to Layer 1) and router Layer 2 frame rewrites.
  - **CLI Command Simulator**: Realistic terminal sandbox supporting `ping`, `tracert`, `arp -a`, `ipconfig /all`, `nslookup`, and `netstat -ano`.
  - **Common Ports & Threat Matrix**: Database of well-known ports (0-1023) and registered ports with SOC risk ratings and plaintext indicators.
  - **Day 30 Final Assessment**: 50-question comprehensive CCNA/SOC examination with a 6-domain scorecard and readiness report.
- **Local-First Persistence**:
  - `localStorage` tracking of completed days, quiz scores, focus study minutes, streaks, bookmarks, and notes.
  - Export and Import progress as JSON.

---

## 📚 30-Day Curriculum Structure

- **Week 1: Networking Foundations**
  - Day 1: What Is a Network? (LAN, WAN, Devices, Packets)
  - Day 2: The OSI 7-Layer Model (PDUs, Encapsulation, Decapsulation)
  - Day 3: The TCP/IP Model (Application, Transport, Internet, Link)
  - Day 4: Ethernet & MAC Addresses (Frames, 48-bit EUI, Unicast/Broadcast)
  - Day 5: Switching & Forwarding (CAM Tables, Learning, Flooding, Domains)
  - Day 6: IP Addressing Introduction (IPv4, RFC 1918 Private Ranges, Loopback, APIPA)
  - Day 7: Week 1 Review & Packet Journey Lab
- **Week 2: IP, TCP/UDP & Core Protocols**
  - Day 8: IPv4 Addressing & CIDR (Prefixes, Usable Hosts)
  - Day 9: Binary & Subnetting Fundamentals (8-Bit Weights, Bitwise AND)
  - Day 10: Subnetting Mastery & VLSM (/24 to /30, Magic Number Method)
  - Day 11: TCP & UDP Deep Dive (Handshake, Flags, Reliability)
  - Day 12: Common Ports & Protocols (20/21, 22, 23, 25, 53, 80, 443, 3389)
  - Day 13: ARP & ICMP in Action (Resolution, Ping, Traceroute TTL)
  - Day 14: Week 2 Review & Diagnostic Exam
- **Week 3: Switching, VLANs & Routing**
  - Day 15: VLANs & Logical Segmentation (Access Ports, Isolation)
  - Day 16: 802.1Q & Trunking (VLAN Tags, Native VLAN Hazards)
  - Day 17: Inter-VLAN Routing (Router-on-a-Stick & Layer 3 SVIs)
  - Day 18: Routing Fundamentals (Routing Tables, Longest Prefix Match, AD)
  - Day 19: Static & Default Routing (Manual Routes, 0.0.0.0/0)
  - Day 20: OSPF Dynamic Routing Fundamentals (SPF, Cost, Neighbors)
  - Day 21: Week 3 Hands-On Practical Topology Lab
- **Week 4: Services, Security & Troubleshooting**
  - Day 22: DHCP Operations & Security (DORA Handshake, Relay, DHCP Snooping)
  - Day 23: DNS & Name Resolution (Hierarchy, A/AAAA/CNAME/MX, Tunneling)
  - Day 24: NAT & PAT (Port Address Translation, Inside/Outside Local/Global)
  - Day 25: ACLs & Network Security (Standard vs Extended, Stateful Firewalls)
  - Day 26: Wireless Networking (802.11, WPA2 vs WPA3 SAE, Evil Twins)
  - Day 27: Network Management & Monitoring (SSH, SNMPv3, Syslog, NTP)
  - Day 28: Troubleshooting Methodology & CLI (7-Step Model, Diagnostics)
  - Day 29: Networking for Cybersecurity & SOC Operations (SIEM, PCAP Triage)
  - Day 30: Final Assessment & Readiness Scorecard (50 Questions)

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Lucide Icons**
- **Local-First Storage** (`localStorage`)

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/1305abhi/networking_learning.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
