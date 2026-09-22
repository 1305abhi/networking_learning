import { Flashcard } from '../types';

export const FLASHCARDS: Flashcard[] = [
  // Week 1
  {
    id: 'fc-d1-1',
    day: 1,
    category: 'Foundations',
    tag: 'Hardware',
    front: 'What is the primary role of a Layer 2 Switch?',
    back: 'A Switch connects devices within a local LAN and forwards Ethernet frames based on 48-bit MAC addresses stored in its CAM table.'
  },
  {
    id: 'fc-d1-2',
    day: 1,
    category: 'Foundations',
    tag: 'Hardware',
    front: 'What is the primary role of a Layer 3 Router?',
    back: 'A Router connects distinct networks, separates broadcast domains, and forwards IP packets based on its routing table.'
  },
  {
    id: 'fc-d1-3',
    day: 1,
    category: 'Foundations',
    tag: 'Theory',
    front: 'What is the difference between a Client-Server and a P2P architecture?',
    back: 'Client-Server uses centralized servers providing services to clients. In P2P, every node functions simultaneously as both client and server.'
  },
  {
    id: 'fc-d2-1',
    day: 2,
    category: 'OSI Model',
    tag: 'Models',
    front: 'List the 7 layers of the OSI model from Layer 7 to Layer 1.',
    back: '7: Application, 6: Presentation, 5: Session, 4: Transport, 3: Network, 2: Data Link, 1: Physical.'
  },
  {
    id: 'fc-d2-2',
    day: 2,
    category: 'OSI Model',
    tag: 'PDUs',
    front: 'What are the Protocol Data Units (PDUs) for Layers 1 through 4?',
    back: 'Layer 1: Bits, Layer 2: Frames, Layer 3: Packets, Layer 4: Segments (TCP) or Datagrams (UDP).'
  },
  {
    id: 'fc-d2-3',
    day: 2,
    category: 'OSI Model',
    tag: 'Encapsulation',
    front: 'What is the difference between Encapsulation and Decapsulation?',
    back: 'Encapsulation adds headers top-down as data prepares to leave the sender. Decapsulation strips and analyzes headers bottom-up upon reception.'
  },
  {
    id: 'fc-d3-1',
    day: 3,
    category: 'TCP/IP Model',
    tag: 'Models',
    front: 'What are the 4 layers of the TCP/IP model?',
    back: '1: Network Access, 2: Internet, 3: Transport, 4: Application.'
  },
  {
    id: 'fc-d4-1',
    day: 4,
    category: 'Ethernet',
    tag: 'Addressing',
    front: 'What is the structure and length of a MAC address?',
    back: '48 bits (6 bytes / 12 hex characters). First 24 bits are vendor OUI; last 24 bits are the NIC device identifier.'
  },
  {
    id: 'fc-d4-2',
    day: 4,
    category: 'Ethernet',
    tag: 'Addressing',
    front: 'What is the broadcast MAC address in Ethernet?',
    back: 'FF:FF:FF:FF:FF:FF (all 48 bits set to 1).'
  },
  {
    id: 'fc-d5-1',
    day: 5,
    category: 'Switching',
    tag: 'Operations',
    front: 'How does a switch learn MAC addresses?',
    back: 'By inspecting the SOURCE MAC address of incoming frames and recording the ingress physical port in its CAM table.'
  },
  {
    id: 'fc-d5-2',
    day: 5,
    category: 'Switching',
    tag: 'Domains',
    front: 'What is the difference between a Collision Domain and a Broadcast Domain?',
    back: 'Collision domain is isolated per switch port (full duplex). Broadcast domain spans all devices receiving a broadcast frame (terminated only by routers or VLANs).'
  },
  {
    id: 'fc-d6-1',
    day: 6,
    category: 'IP Addressing',
    tag: 'RFC 1918',
    front: 'What are the 3 RFC 1918 Private IPv4 address ranges?',
    back: 'Class A: 10.0.0.0/8\nClass B: 172.16.0.0/12 (172.16.0.0 - 172.31.255.255)\nClass C: 192.168.0.0/16 (192.168.0.0 - 192.168.255.255)'
  },
  {
    id: 'fc-d6-2',
    day: 6,
    category: 'IP Addressing',
    tag: 'Special IPs',
    front: 'What does an IP address starting with 169.254.x.x indicate?',
    back: 'APIPA (Automatic Private IP Addressing). Assigned when a device is set to DHCP but receives no response from a DHCP server.'
  },
  {
    id: 'fc-d7-1',
    day: 7,
    category: 'Packet Flow',
    tag: 'Routing',
    front: 'When sending a packet to a remote external web server, what is the destination MAC address of the frame leaving the client PC?',
    back: 'The MAC address of the Default Gateway (router), NOT the web server.'
  },

  // Week 2
  {
    id: 'fc-d8-1',
    day: 8,
    category: 'Subnetting',
    tag: 'Math',
    front: 'What is the formula for calculating usable hosts in an IPv4 subnet with h host bits?',
    back: '2^h - 2 (subtracting 2 for the Network ID and the Directed Broadcast ID).'
  },
  {
    id: 'fc-d8-2',
    day: 8,
    category: 'Subnetting',
    tag: 'CIDR',
    front: 'How many usable host addresses are available in a /27 subnet?',
    back: '30 usable hosts (32 - 27 = 5 host bits; 2^5 = 32; 32 - 2 = 30).'
  },
  {
    id: 'fc-d9-1',
    day: 9,
    category: 'Binary',
    tag: 'Weights',
    front: 'What are the 8 positional values in an 8-bit octet?',
    back: '128, 64, 32, 16, 8, 4, 2, 1.'
  },
  {
    id: 'fc-d10-1',
    day: 10,
    category: 'Subnetting',
    tag: 'Magic Number',
    front: 'How do you find the Block Size (Magic Number) from a subnet mask octet?',
    back: 'Block Size = 256 - [Subnet Mask Octet]. (e.g. for .224: 256 - 224 = 32).'
  },
  {
    id: 'fc-d11-1',
    day: 11,
    category: 'Transport Layer',
    tag: 'TCP',
    front: 'What is the 3-step TCP connection establishment handshake?',
    back: '1. SYN (Client -> Server)\n2. SYN-ACK (Server -> Client)\n3. ACK (Client -> Server).'
  },
  {
    id: 'fc-d11-2',
    day: 11,
    category: 'Transport Layer',
    tag: 'TCP vs UDP',
    front: 'Why does live voice/video streaming prefer UDP over TCP?',
    back: 'UDP has low protocol overhead (8 bytes) and does not retransmit dropped packets, preventing jitter and call freezes.'
  },
  {
    id: 'fc-d12-1',
    day: 12,
    category: 'Ports',
    tag: 'Security',
    front: 'Why is port 23 (Telnet) dangerous compared to port 22 (SSH)?',
    back: 'Telnet transmits all passwords and commands in unencrypted plaintext across the wire. SSH encrypts all communications with modern ciphers.'
  },
  {
    id: 'fc-d12-2',
    day: 12,
    category: 'Ports',
    tag: 'Protocols',
    front: 'What port does DNS use, and over which transport protocol?',
    back: 'Port 53. It uses UDP for standard queries, and TCP for zone transfers or queries exceeding 512 bytes.'
  },
  {
    id: 'fc-d13-1',
    day: 13,
    category: 'Protocols',
    tag: 'ARP',
    front: 'What is the purpose of Address Resolution Protocol (ARP)?',
    back: 'ARP resolves an IPv4 Layer 3 address to a physical Layer 2 MAC address on the local network segment.'
  },
  {
    id: 'fc-d13-2',
    day: 13,
    category: 'Protocols',
    tag: 'ICMP',
    front: 'How does traceroute / tracert discover intermediate routers?',
    back: 'By sending packets with incrementing IP TTL values (1, 2, 3...) and receiving ICMP Type 11 (Time Exceeded) messages from intermediate routers.'
  },

  // Week 3
  {
    id: 'fc-d15-1',
    day: 15,
    category: 'VLANs',
    tag: 'Switching',
    front: 'What is a VLAN and why is it used?',
    back: 'A Virtual LAN partitions a single physical switch into multiple isolated Layer 2 broadcast domains for security and broadcast containment.'
  },
  {
    id: 'fc-d16-1',
    day: 16,
    category: 'Trunking',
    tag: '802.1Q',
    front: 'What is an 802.1Q tag, and how large is it?',
    back: 'A 4-byte header inserted into the Ethernet frame to carry the 12-bit VLAN ID (1 - 4094) across trunk links.'
  },
  {
    id: 'fc-d16-2',
    day: 16,
    category: 'Trunking',
    tag: 'Native VLAN',
    front: 'What is the Native VLAN in 802.1Q trunking?',
    back: 'The single designated VLAN whose frames traverse the trunk link untagged. Both ends of a trunk MUST match native VLAN IDs!'
  },
  {
    id: 'fc-d17-1',
    day: 17,
    category: 'Routing',
    tag: 'ROAS',
    front: 'What is Router-on-a-Stick (ROAS)?',
    back: 'A topology where a single physical router interface connects to a switch trunk link and uses logical subinterfaces with 802.1Q encapsulation to route between VLANs.'
  },
  {
    id: 'fc-d18-1',
    day: 18,
    category: 'Routing',
    tag: 'Path Selection',
    front: 'What is the Longest Prefix Match rule?',
    back: 'The fundamental rule that the route with the most specific (longest) subnet prefix ALWAYS wins when forwarding a packet.'
  },
  {
    id: 'fc-d18-2',
    day: 18,
    category: 'Routing',
    tag: 'Metrics',
    front: 'What is Administrative Distance (AD)?',
    back: 'A rating of route trustworthiness (0-255). Lower is better. Connected = 0, Static = 1, eBGP = 20, OSPF = 110, RIP = 120.'
  },
  {
    id: 'fc-d19-1',
    day: 19,
    category: 'Routing',
    tag: 'Default Route',
    front: 'What is the route 0.0.0.0/0 (Gateway of Last Resort)?',
    back: 'A default route used to forward any packet whose destination does not match any specific route in the routing table.'
  },
  {
    id: 'fc-d20-1',
    day: 20,
    category: 'Routing',
    tag: 'OSPF',
    front: 'What algorithm does OSPF use to calculate shortest loop-free paths?',
    back: 'Dijkstra’s Shortest Path First (SPF) algorithm.'
  },

  // Week 4
  {
    id: 'fc-d22-1',
    day: 22,
    category: 'Services',
    tag: 'DHCP',
    front: 'What are the 4 steps of the DHCP handshake (DORA)?',
    back: '1. Discover (Client Broadcast)\n2. Offer (Server Unicast/Broadcast)\n3. Request (Client Broadcast)\n4. ACK (Server Confirmation).'
  },
  {
    id: 'fc-d23-1',
    day: 23,
    category: 'Services',
    tag: 'DNS',
    front: 'What is the difference between a DNS A record and AAAA record?',
    back: 'A record maps a hostname to a 32-bit IPv4 address; AAAA record maps to a 128-bit IPv6 address.'
  },
  {
    id: 'fc-d24-1',
    day: 24,
    category: 'NAT',
    tag: 'PAT',
    front: 'What is Port Address Translation (PAT / NAT Overload)?',
    back: 'Translating thousands of private internal IP addresses to a single public IP by assigning unique Layer 4 source port numbers.'
  },
  {
    id: 'fc-d25-1',
    day: 25,
    category: 'Security',
    tag: 'ACLs',
    front: 'What is the difference between Standard and Extended ACLs?',
    back: 'Standard ACLs filter on Source IP only. Extended ACLs filter on Source IP, Destination IP, Protocol (TCP/UDP), and Port numbers.'
  },
  {
    id: 'fc-d26-1',
    day: 26,
    category: 'Wireless',
    tag: 'WPA3',
    front: 'Why is WPA3-SAE superior to WPA2-PSK?',
    back: 'WPA3 uses Simultaneous Authentication of Equals (Dragonfly), preventing offline dictionary password cracking and providing forward secrecy.'
  },
  {
    id: 'fc-d27-1',
    day: 27,
    category: 'Management',
    tag: 'NTP',
    front: 'Why is NTP critical in cybersecurity and SOC operations?',
    back: 'It ensures precise timestamp synchronization across all logs (firewalls, servers, SIEM) so incident timelines can be reconstructed accurately.'
  },
  {
    id: 'fc-d28-1',
    day: 28,
    category: 'Troubleshooting',
    tag: 'CLI',
    front: 'What does pinging 127.0.0.1 test?',
    back: 'Tests the internal health and installation of the local operating system TCP/IP stack without sending packets on the physical wire.'
  },
  {
    id: 'fc-d29-1',
    day: 29,
    category: 'SOC',
    tag: 'Triage',
    front: 'What is the network 5-Tuple used by SIEMs to track connections?',
    back: '1. Source IP, 2. Destination IP, 3. Source Port, 4. Destination Port, 5. Protocol (TCP/UDP).'
  }
];
