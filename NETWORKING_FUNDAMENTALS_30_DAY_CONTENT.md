# Networking Fundamentals
## 30-Day Study Content

Daily target: **2 hours**

Recommended daily split:

- 45 min theory
- 20 min concept understanding
- 35 min practical work
- 20 min quiz/revision

---

# DAY 1 — What Is a Network?

## Learning objectives

Understand:

- What a computer network is
- Why networks exist
- LAN vs WAN vs WLAN
- Client/server model
- Peer-to-peer
- Packets
- Basic network devices

## Core theory

A computer network is a group of connected devices that communicate and exchange data.

Common devices:

| Device | Purpose |
|---|---|
| NIC | Connects a device to a network |
| Switch | Connects devices inside a LAN |
| Router | Connects different networks |
| Access Point | Provides wireless connectivity |
| Firewall | Controls network traffic |
| Modem | Provides access to a service provider network |

### LAN

A Local Area Network covers a limited area such as a home, office, lab or campus.

### WAN

A Wide Area Network connects geographically separated networks.

The Internet is a global network of interconnected networks.

### Packet

Applications do not normally send an entire message as one giant block.

Data is divided into smaller units that can travel through the network.

---

# DAY 2 — OSI Model

## The seven layers

| Layer | Name | Examples |
|---|---|---|
| 7 | Application | HTTP, DNS, SMTP |
| 6 | Presentation | Encoding, encryption |
| 5 | Session | Session management |
| 4 | Transport | TCP, UDP |
| 3 | Network | IP, routing |
| 2 | Data Link | Ethernet, MAC |
| 1 | Physical | Cable, radio, signals |

## Important idea

When data moves down the stack, headers are added.

This is called **encapsulation**.

At the destination, headers are processed in reverse.

This is **decapsulation**.

## PDU terminology

- Layer 7-5: Data
- Layer 4: Segment for TCP, Datagram for UDP
- Layer 3: Packet
- Layer 2: Frame
- Layer 1: Bits

## Cybersecurity connection

Different attacks and security controls operate at different layers.

Examples:

- ARP spoofing → Layer 2
- IP filtering → Layer 3
- Port filtering → Layer 4
- Web attacks → Layer 7

---

# DAY 3 — TCP/IP Model

## Four layers

1. Application
2. Transport
3. Internet
4. Network Access

### Mapping

```text
OSI                    TCP/IP

Application ┐
Presentation├──→ Application
Session     ┘

Transport ─────→ Transport

Network ───────→ Internet

Data Link  ┐
Physical   ┘───→ Network Access
```

## Key idea

OSI is mainly a conceptual model.

TCP/IP is the practical protocol suite used by modern networks.

---

# DAY 4 — Ethernet and MAC Addresses

## MAC address

A MAC address identifies a network interface at Layer 2.

Typical format:

```text
00:1A:2B:3C:4D:5E
```

## Ethernet frame

Basic concept:

```text
Destination MAC
Source MAC
Type/Length
Payload
FCS
```

## Traffic types

### Unicast
One sender → one receiver.

### Broadcast
One sender → all devices in the local broadcast domain.

### Multicast
One sender → subscribed group of receivers.

---

# DAY 5 — Switching

A switch learns which MAC address exists on which port.

Example:

```text
MAC A → Port 1
MAC B → Port 2
MAC C → Port 3
```

When a frame arrives:

1. Switch reads source MAC.
2. It learns the source location.
3. It checks destination MAC.
4. It forwards if the destination is known.
5. It floods when appropriate if destination is unknown.

## Important distinction

A switch primarily operates at Layer 2.

A router operates at Layer 3.

---

# DAY 6 — IP Addressing

## IPv4

IPv4 uses 32 bits.

Example:

```text
192.168.1.10
```

Four octets, each ranging from 0 to 255.

## Private IPv4 ranges

```text
10.0.0.0/8

172.16.0.0/12

192.168.0.0/16
```

## Special addresses

```text
127.0.0.1     Loopback
169.254.x.x   APIPA/link-local IPv4
0.0.0.0       Unspecified/default-route context
255.255.255.255  IPv4 limited broadcast
```

---

# DAY 7 — WEEK 1 REVIEW

## Questions

1. What is the difference between a switch and router?
2. Which OSI layer handles routing?
3. What is a MAC address?
4. What is encapsulation?
5. What is a packet?
6. What is the purpose of a LAN?
7. What is a broadcast?
8. What does a NIC do?
9. Which protocol suite powers the Internet?
10. Why do networks divide data into packets?

## Practical exercise

Draw this:

```text
PC1 ── Switch ── Router ── Internet
PC2 ─────┘
```

Label:

- MAC addresses
- IP addresses
- Layer 2
- Layer 3
- Default gateway

---

# DAY 8 — IPv4 Addressing

## CIDR

CIDR represents the network prefix.

Example:

```text
192.168.1.0/24
```

The `/24` means 24 bits identify the network portion.

IPv4 contains 32 bits.

Therefore:

```text
32 - 24 = 8 host bits
```

Number of addresses:

```text
2^8 = 256
```

Traditional usable host count for a normal /24 subnet:

```text
256 - 2 = 254
```

The two excluded addresses are normally the network and broadcast addresses.

---

# DAY 9 — Binary and Subnetting

## IPv4 octet values

```text
128 64 32 16 8 4 2 1
```

Example:

```text
192

128 + 64 = 192
```

## Subnet mask

```text
/24 = 255.255.255.0
/25 = 255.255.255.128
/26 = 255.255.255.192
/27 = 255.255.255.224
/28 = 255.255.255.240
/29 = 255.255.255.248
/30 = 255.255.255.252
```

Memorize these progressively through practice, not just rote learning.

---

# DAY 10 — Subnetting Practice

Example:

```text
192.168.1.0/26
```

A /26 leaves 6 host bits.

```text
2^6 = 64 addresses
64 - 2 = 62 usable hosts
```

Subnets within a /24:

```text
192.168.1.0/26
192.168.1.64/26
192.168.1.128/26
192.168.1.192/26
```

For each subnet identify:

- Network address
- First usable
- Last usable
- Broadcast
- Number of hosts

---

# DAY 11 — TCP and UDP

## TCP

TCP provides:

- Connection-oriented communication
- Reliability
- Ordering
- Flow control
- Retransmission

### Three-way handshake

```text
Client → SYN → Server
Client ← SYN/ACK ← Server
Client → ACK → Server
```

## UDP

UDP is connectionless and has lower protocol overhead.

It does not provide TCP-style delivery guarantees.

Common uses include DNS queries and real-time applications.

---

# DAY 12 — Common Ports

Know the purpose of common services.

| Port | Protocol | Purpose |
|---:|---|---|
| 20/21 | FTP | File transfer |
| 22 | SSH | Secure remote administration |
| 23 | Telnet | Remote terminal, insecure |
| 25 | SMTP | Mail transfer |
| 53 | DNS | Name resolution |
| 67/68 | DHCP | Address configuration |
| 80 | HTTP | Web |
| 110 | POP3 | Email retrieval |
| 143 | IMAP | Email retrieval |
| 443 | HTTPS | Secure web |
| 3389 | RDP | Remote desktop |

Security principle:

An open port is not automatically a vulnerability.

The service, version, configuration, exposure and access controls matter.

---

# DAY 13 — ARP and ICMP

## ARP

ARP helps IPv4 devices discover the MAC address associated with an IP address on the local network.

Example:

```text
Who has 192.168.1.1?

192.168.1.1 is at AA:BB:CC:DD:EE:FF
```

## ICMP

ICMP is used for network control and diagnostic messaging.

`ping` commonly uses ICMP Echo Request and Echo Reply.

`traceroute`/`tracert` uses techniques involving TTL and ICMP responses, with implementation differences between systems.

## Security relevance

ARP spoofing can allow an attacker to interfere with local network traffic.

---

# DAY 14 — WEEK 2 REVIEW

Practice:

### Subnetting

Find the network, broadcast and usable range for:

```text
192.168.10.45/27
10.10.20.130/26
172.16.50.200/28
```

### Protocols

Explain:

- DNS
- DHCP
- ARP
- ICMP
- TCP
- UDP

### Troubleshooting

A computer can ping its local gateway but cannot access a website.

List possible causes in order:

- DNS problem
- Routing problem
- Internet connectivity
- Firewall
- Application/server issue

---

# DAY 15 — VLANs

A VLAN logically separates a switch into different broadcast domains.

Example:

```text
VLAN 10 → Employees
VLAN 20 → Guests
VLAN 30 → Servers
```

Devices in different VLANs normally need Layer 3 routing to communicate.

## Access port

Normally carries traffic for one VLAN.

## Trunk

Carries traffic for multiple VLANs.

---

# DAY 16 — 802.1Q and Trunking

802.1Q provides VLAN tagging for Ethernet frames on trunks.

Conceptually:

```text
Frame
+ VLAN Tag
+ Payload
```

A trunk can carry multiple VLANs.

Important troubleshooting areas:

- Wrong VLAN
- Trunk not configured
- VLAN not allowed
- Native VLAN mismatch
- Incorrect access-port assignment

---

# DAY 17 — Inter-VLAN Routing

Different VLANs are different Layer 2 broadcast domains.

To communicate:

```text
VLAN 10
   ↓
Layer 3 device
   ↓
VLAN 20
```

The default gateway for a host is the Layer 3 interface that provides access to other networks.

---

# DAY 18 — Routing Fundamentals

A routing table tells a router where to send packets.

Typical information includes:

- Destination network
- Prefix
- Next hop
- Exit interface
- Route source
- Metric

## Longest prefix match

When multiple routes match, the most specific matching route is generally preferred.

Example:

```text
10.0.0.0/8
10.10.0.0/16
10.10.10.0/24
```

Traffic destined for `10.10.10.5` matches all three, but `/24` is the most specific.

---

# DAY 19 — Static and Default Routes

## Static route

Manually configured.

Concept:

```text
Destination → Next hop
```

## Default route

Used when no more specific route exists.

IPv4:

```text
0.0.0.0/0
```

Think of it as:

> If I don't know a more specific path, send it here.

---

# DAY 20 — OSPF Fundamentals

OSPF is a link-state dynamic routing protocol.

Important concepts:

- Neighbors
- Link-state information
- Cost
- Areas
- Router ID
- Shortest Path First

For initial CCNA-level understanding, focus on single-area OSPF.

Basic idea:

```text
Router A ←→ Router B ←→ Router C
```

Routers exchange routing information and calculate paths.

---

# DAY 21 — WEEK 3 PRACTICAL LAB

Build:

```text
PC1
 |
SW1
 |
R1
 |
R2
 |
SW2
 |
PC2
```

Tasks:

1. Assign IP addresses.
2. Create VLANs.
3. Configure access ports.
4. Configure a trunk.
5. Configure router interfaces.
6. Add routes.
7. Test ping.
8. Break one configuration.
9. Troubleshoot it.

Troubleshooting questions:

- Is the interface up?
- Is the IP correct?
- Is the subnet mask correct?
- Is the default gateway correct?
- Does the routing table contain a route?
- Is the VLAN correct?

---

# DAY 22 — DHCP

DHCP automatically provides network configuration.

Common process:

```text
Discover
Offer
Request
ACK
```

This is commonly remembered as DORA.

DHCP can provide:

- IP address
- Subnet mask
- Default gateway
- DNS server

Security concerns include rogue DHCP servers and DHCP starvation attacks.

---

# DAY 23 — DNS

DNS translates names into IP information.

Example:

```text
example.com
     ↓
DNS
     ↓
93.x.x.x
```

Important records:

- A
- AAAA
- CNAME
- MX
- NS
- TXT

Understand the difference between:

- Recursive resolver
- Authoritative DNS server

Security relevance:

- DNS spoofing
- DNS tunneling
- Malicious domains
- DNS logging

---

# DAY 24 — NAT

NAT translates addresses between network contexts.

Common forms:

### Static NAT

One private address maps to one public address.

### Dynamic NAT

Addresses are mapped from a pool.

### PAT

Multiple private hosts share a public address using different ports.

PAT is commonly called NAT overload.

---

# DAY 25 — ACLs and Security

An ACL is a rule set that controls traffic.

Concept:

```text
Source
Destination
Protocol
Port
Action
```

Example concept:

```text
Allow HTTPS
Deny Telnet
```

Important principles:

- Least privilege
- Explicit rules
- Correct direction
- Correct interface
- Logging where appropriate

Also understand:

- Firewall
- IDS
- IPS
- Stateful inspection
- Network segmentation

---

# DAY 26 — Wireless

Important concepts:

- SSID
- Access Point
- Wireless client
- Authentication
- Encryption
- Channels
- 2.4 GHz
- 5 GHz
- 6 GHz

Security:

Prefer modern security such as WPA2/WPA3 where supported.

Avoid legacy insecure protocols such as WEP.

Understand the difference between:

- Authentication
- Authorization
- Encryption

---

# DAY 27 — Network Management

## SSH

Secure remote management of network devices.

Avoid Telnet for administrative access because it sends communication without modern transport encryption.

## SNMP

Used for network monitoring and management.

## Syslog

Centralized logging of system events.

## NTP

Synchronizes system clocks.

## Why time matters in cybersecurity

If logs from different devices have incorrect times, investigating an incident becomes much harder.

---

# DAY 28 — Troubleshooting

Use a repeatable methodology.

```text
1. Identify
2. Gather information
3. Form hypothesis
4. Test
5. Fix
6. Verify
7. Document
```

Useful commands:

Windows:

```text
ipconfig
ping
tracert
arp -a
nslookup
route print
netstat
```

Linux:

```text
ip addr
ip route
ping
traceroute
ip neigh
dig
ss
```

Learn what each command tells you rather than memorizing syntax alone.

---

# DAY 29 — Networking for Cybersecurity

Bring everything together.

Imagine:

```text
User
 ↓
DNS
 ↓
Web Server
 ↓
TCP 443
 ↓
Router
 ↓
Firewall
 ↓
Internet
```

Ask:

1. What is the source IP?
2. What is the destination IP?
3. What is the source port?
4. What is the destination port?
5. What protocol is being used?
6. Which device routes the packet?
7. Which device switches the frame?
8. What logs might record this traffic?
9. Where could an ACL block it?
10. What would suspicious traffic look like?

## SOC connection

A SOC analyst frequently works with:

- Source IP
- Destination IP
- Source port
- Destination port
- Protocol
- DNS queries
- HTTP/HTTPS connections
- Authentication events
- Firewall logs
- IDS/IPS alerts

Networking knowledge makes these events much easier to understand.

---

# DAY 30 — FINAL ASSESSMENT

## Section 1 — Fundamentals

Explain:

- OSI
- TCP/IP
- MAC
- IP
- Switch
- Router
- Packet
- Frame

## Section 2 — Subnetting

Solve at least 10 subnetting questions.

For each, identify:

- Network
- Broadcast
- First host
- Last host
- Host count

## Section 3 — Protocols

Explain:

- ARP
- ICMP
- DHCP
- DNS
- TCP
- UDP
- HTTP
- HTTPS

## Section 4 — Switching

Explain:

- VLAN
- Access port
- Trunk
- 802.1Q
- Broadcast domain

## Section 5 — Routing

Explain:

- Routing table
- Static route
- Default route
- Next hop
- OSPF
- Longest prefix match

## Section 6 — Security

Explain:

- ACL
- Firewall
- IDS
- IPS
- NAT
- Network segmentation
- SSH
- WPA2/WPA3

## Section 7 — Troubleshooting

Scenario:

```text
PC → Switch → Router → Internet
```

The PC has an IP address and can ping the router, but:

```text
ping 8.8.8.8       fails
ping example.com   fails
```

Create a troubleshooting sequence.

Then consider another scenario:

```text
ping 8.8.8.8       works
ping example.com   fails
```

What does this suggest?

Expected direction:

The second scenario points toward a DNS/name-resolution issue, although other causes should still be considered.

---

# Final Knowledge Checklist

Before moving to the next cybersecurity module, the learner should be able to explain without notes:

- [ ] OSI model
- [ ] TCP/IP model
- [ ] Encapsulation
- [ ] MAC addresses
- [ ] Ethernet frames
- [ ] Switching
- [ ] IPv4
- [ ] IPv6 basics
- [ ] CIDR
- [ ] Subnetting
- [ ] TCP
- [ ] UDP
- [ ] Ports
- [ ] ARP
- [ ] ICMP
- [ ] DNS
- [ ] DHCP
- [ ] VLANs
- [ ] Trunks
- [ ] Inter-VLAN routing
- [ ] Routing tables
- [ ] Static routes
- [ ] Default routes
- [ ] OSPF basics
- [ ] NAT/PAT
- [ ] ACLs
- [ ] Firewalls
- [ ] Wireless security
- [ ] SSH
- [ ] SNMP
- [ ] Syslog
- [ ] NTP
- [ ] Network troubleshooting
- [ ] Basic networking security concepts

# Recommended Next Step

After completing this 30-day module:

```text
Networking Fundamentals
        ↓
Linux Fundamentals
        ↓
Security Fundamentals
        ↓
Wireshark + Nmap
        ↓
SOC Fundamentals
        ↓
Web/API Security
        ↓
Practical Cybersecurity Labs
```

Do not treat the end of Day 30 as the end of networking. Continue practicing subnetting, packet analysis and troubleshooting while moving into cybersecurity.
