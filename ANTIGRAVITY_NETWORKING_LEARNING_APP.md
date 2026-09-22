# Networking Fundamentals Learning Web App
## Antigravity Build Specification

### Goal
Build a local-first web application that teaches networking fundamentals over 30 days with a daily commitment of 2 hours.

The learner is preparing for CCNA-level networking knowledge and wants a strong foundation for cybersecurity/SOC work. The app must prioritize understanding, practice, revision, and hands-on labs rather than passive reading.

### Core Learning Target

By the end of 30 days, the learner should understand:

- How networks communicate end-to-end
- OSI and TCP/IP models
- Ethernet and MAC addressing
- IPv4 and IPv6 fundamentals
- Binary and subnetting
- TCP vs UDP and common ports
- ARP, ICMP, DHCP, DNS, HTTP/HTTPS
- Switching and VLANs
- Routing and default gateways
- Static routing and OSPF concepts
- NAT
- ACLs and basic network security
- Wireless networking fundamentals
- Troubleshooting methodology
- Basic packet analysis concepts
- How networking concepts relate to cybersecurity and SOC work

This is a learning roadmap, not an official Cisco exam simulator.

---

# 1. App Requirements

## Dashboard

Show:

- Current day
- Current topic
- Overall progress %
- Days completed / 30
- Current streak
- Total learning time
- Quiz score average
- Lab completion
- Revision due today
- Continue Learning button

Example:

```text
Day 12 / 30
Topic: IPv4 Addressing & Subnetting

Progress: ███████░░░ 40%

Today's target
Theory       45 min
Practice     35 min
Quiz         20 min
Revision     20 min

[ Continue Learning ]
```

## Roadmap Page

Display all 30 days grouped into weekly modules.

Each day should show:

- Day number
- Topic
- Learning objectives
- Status
- Estimated time
- Quiz score
- Lab status

Statuses:

- Locked
- Available
- In Progress
- Completed
- Revision Due

Do not force strict locking if the learner wants to revisit previous topics.

---

# 2. Daily Learning Page

Every day follows this structure:

### Part A: Learn
Approximately 45 minutes.

Use:

- Clear explanations
- Diagrams
- Packet-flow examples
- Tables
- Key terminology
- Real-world examples

### Part B: Understand
Approximately 20 minutes.

Include:

- Why this concept exists
- What problem it solves
- What happens behind the scenes
- Common mistakes
- Cybersecurity relevance

### Part C: Practice
Approximately 35 minutes.

Include interactive activities or Packet Tracer-style exercises.

Examples:

- Calculate a subnet
- Identify a protocol
- Build a small topology
- Identify source/destination IP
- Identify source/destination MAC
- Determine whether traffic is switched or routed
- Read a routing table

### Part D: Quiz
Approximately 20 minutes.

Use 10-15 questions.

Question types:

- Multiple choice
- True/false
- Match the concept
- Scenario based
- Troubleshooting

Explain every answer.

### Part E: Revision
Approximately 20 minutes.

Include:

- Flashcards
- 5 key facts
- 3 common mistakes
- One mini scenario
- Spaced-repetition review

---

# 3. 30-Day Roadmap

## Week 1: Networking Foundations

### Day 1
What is a computer network?

Learn:
- LAN, WAN, WLAN
- Client/server
- Peer-to-peer
- Network devices
- Internet vs intranet
- Packets

### Day 2
OSI Model

Learn all 7 layers and what each layer does.

Focus on:
- Encapsulation
- Decapsulation
- PDUs
- Real examples

### Day 3
TCP/IP Model

Learn:
- Application
- Transport
- Internet
- Network Access

Map TCP/IP to OSI.

### Day 4
Ethernet and MAC Addresses

Learn:
- Ethernet frame
- MAC address
- Source/destination MAC
- Broadcast
- Unicast
- Multicast
- NIC

### Day 5
Switches

Learn:
- How a switch learns MAC addresses
- MAC address table
- Forwarding
- Flooding
- Collision domains
- Broadcast domains

### Day 6
IP Addressing Introduction

Learn:
- IPv4
- IPv6
- Network portion
- Host portion
- Private/public IP
- Loopback
- APIPA

### Day 7
Week 1 Review

Do:
- 30-question quiz
- OSI/TCP-IP comparison
- Packet journey exercise
- Basic troubleshooting scenarios

---

# Week 2: IP, TCP/UDP and Core Protocols

### Day 8
IPv4 Addressing

Learn:
- Address classes as historical context
- CIDR
- Prefix notation
- Network address
- Broadcast address
- Host range

### Day 9
Binary and Subnetting

Learn:
- Binary conversion
- Subnet masks
- Prefix lengths
- Network calculation
- Broadcast calculation
- Host calculation

Practice heavily.

### Day 10
Subnetting Practice

Solve progressively:

- /24
- /25
- /26
- /27
- /28
- /29
- /30

Then introduce variable-size subnet scenarios.

### Day 11
TCP and UDP

Learn:
- TCP
- UDP
- Three-way handshake
- Reliability
- Ports
- Ephemeral ports
- TCP flags

### Day 12
Common Ports and Protocols

Study:

- 20/21 FTP
- 22 SSH
- 23 Telnet
- 25 SMTP
- 53 DNS
- 67/68 DHCP
- 80 HTTP
- 110 POP3
- 143 IMAP
- 443 HTTPS
- 3389 RDP

Explain security implications rather than memorizing only numbers.

### Day 13
ARP and ICMP

Learn:
- ARP request/reply
- ARP cache
- ICMP
- ping
- traceroute/tracert
- Neighbor Discovery concept for IPv6

### Day 14
Week 2 Review

Include:
- Subnetting test
- Protocol identification
- TCP/UDP scenarios
- ARP packet-flow exercise
- Troubleshooting quiz

---

# Week 3: Switching, VLANs and Routing

### Day 15
VLANs

Learn:
- Why VLANs exist
- VLAN IDs
- Broadcast-domain segmentation
- Access ports
- Trunk ports

### Day 16
802.1Q and Trunking

Learn:
- VLAN tagging
- Native VLAN concept
- Access vs trunk
- Common trunk problems

### Day 17
Inter-VLAN Routing

Learn:
- Router-on-a-stick
- Layer 3 switching concept
- Default gateway
- Packet flow between VLANs

### Day 18
Routing Fundamentals

Learn:
- Routing table
- Connected route
- Static route
- Default route
- Next hop
- Administrative distance
- Metric

### Day 19
Static and Default Routing

Practice:
- Configure simple routes
- Find next hop
- Diagnose missing routes
- Understand 0.0.0.0/0

### Day 20
OSPF Fundamentals

Learn:
- Dynamic routing
- OSPF purpose
- Neighbors
- Areas
- Cost
- Router ID
- Basic single-area OSPF concept

Do not go too deep into advanced OSPF yet.

### Day 21
Week 3 Review

Build a small topology:

```text
PC1 --- SW1 --- Router1 --- Router2 --- SW2 --- PC2
          |                    |
        VLAN10               VLAN20
```

Tasks:
- Assign IPs
- Configure VLANs
- Configure routing
- Test connectivity
- Diagnose one deliberately broken configuration

---

# Week 4: Services, Security, Wireless and Troubleshooting

### Day 22
DHCP

Learn:
- DHCP Discover
- Offer
- Request
- ACK
- DHCP relay concept
- Reservations
- DHCP security issues

### Day 23
DNS

Learn:
- Domain names
- Resolver
- Recursive query
- Authoritative server
- A/AAAA records
- CNAME
- DNS caching
- DNS security basics

### Day 24
NAT

Learn:
- Private vs public IP
- Static NAT
- Dynamic NAT
- PAT
- Why NAT is commonly used

### Day 25
ACLs and Network Security

Learn:
- Standard ACL concept
- Extended ACL concept
- Permit/deny logic
- Stateful vs stateless filtering
- Firewall basics
- Principle of least privilege

### Day 26
Wireless Networking

Learn:
- Wi-Fi basics
- SSID
- Access point
- 2.4 GHz / 5 GHz / 6 GHz
- WPA2/WPA3
- Authentication
- Encryption
- Common wireless threats

### Day 27
Network Management and Monitoring

Learn:
- SSH
- SNMP
- Syslog
- NTP
- Configuration backups
- Monitoring
- Logs

Connect these concepts to SOC operations.

### Day 28
Troubleshooting

Use a structured methodology:

1. Identify the problem
2. Gather information
3. Form a hypothesis
4. Test
5. Fix
6. Verify
7. Document

Practice:

- ping
- tracert/traceroute
- ipconfig/ifconfig/ip
- arp
- nslookup/dig
- route
- netstat/ss

### Day 29
Cybersecurity Networking Day

Connect everything:

- Packet capture
- IP/MAC
- TCP connections
- Ports
- DNS
- HTTP/HTTPS
- ARP
- VLANs
- ACLs
- Firewall
- IDS/IPS
- SIEM logs

Walk through a simulated suspicious connection.

### Day 30
Final Assessment

Include:

- 50-question assessment
- Subnetting section
- Protocol identification
- Troubleshooting scenarios
- Packet-flow questions
- Security scenarios
- Final practical topology

Generate a final report:

```text
Networking Fundamentals Score: 82%

Strong:
- TCP/IP
- VLANs
- DNS

Needs revision:
- Subnetting
- Routing tables

Recommended next module:
Linux + Networking Security
```

---

# 4. Progress Tracking

Store locally:

```json
{
  "day": 12,
  "completedDays": [1,2,3],
  "quizScores": {
    "1": 85,
    "2": 90
  },
  "labCompletion": {
    "1": true
  },
  "studyMinutes": 1240,
  "streak": 4
}
```

Use localStorage or IndexedDB for MVP.

No authentication is required for the first version.

---

# 5. Important UX Features

Include:

- Dark/light mode
- Responsive desktop/mobile UI
- Search topics
- Bookmark topic
- Mark difficult
- Notes
- Flashcards
- Quiz history
- Progress dashboard
- Daily study timer
- Revision queue
- Keyboard shortcuts
- Reset progress
- Export progress JSON

Avoid gamification that distracts from learning.

Use a clean technical-learning aesthetic.

---

# 6. Visual Components

Use diagrams wherever possible.

Examples:

OSI:

```text
Application
Presentation
Session
Transport
Network
Data Link
Physical
```

Packet flow:

```text
Application
    ↓
TCP
    ↓
IP
    ↓
Ethernet
    ↓
Switch
    ↓
Router
    ↓
Internet
```

VLAN:

```text
             Switch
        ┌──────┴──────┐
      VLAN 10       VLAN 20
       PCs             PCs
```

Make diagrams interactive where practical.

---

# 7. Recommended Tech Stack

Use a simple modern stack:

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide icons
- LocalStorage/IndexedDB
- Recharts for progress analytics if needed

Do not introduce a backend unless necessary.

The learning content should be stored in structured JSON/TypeScript data so it can be expanded later.

Suggested structure:

```text
src/
  components/
  pages/
  data/
    roadmap.ts
    lessons/
    quizzes/
    flashcards/
  hooks/
  utils/
  types/
```

---

# 8. Quality Requirements

The app should:

- Work offline after initial load where practical
- Never lose progress
- Have accessible contrast
- Work on mobile
- Have fast navigation
- Avoid huge blocks of text
- Break lessons into small sections
- Explain technical terms before using them
- Give practical examples
- Show why concepts matter in cybersecurity

Do not claim that completing this app alone makes someone CCNA-certified.

The app prepares the learner with networking fundamentals that overlap substantially with CCNA-level knowledge.

---

# 9. Future Extensions

Design the data model so future modules can be added:

- CCNA advanced topics
- Linux fundamentals
- Cybersecurity fundamentals
- SOC Analyst roadmap
- Wireshark labs
- Nmap labs
- API security
- Web security
- Python for cybersecurity
- Interview preparation

The 30-day networking module must remain independent so new courses can be plugged into the same platform.
