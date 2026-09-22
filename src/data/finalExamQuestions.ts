import { QuizQuestion } from '../types';

export interface FinalExamQuestion extends QuizQuestion {
  category: 'Foundations' | 'Switching' | 'Subnetting' | 'Protocols' | 'Routing' | 'Security';
}

export const FINAL_EXAM_QUESTIONS: FinalExamQuestion[] = [
  // 1. Foundations & Models (1-8)
  {
    id: 'fe-1',
    category: 'Foundations',
    question: 'Which OSI layer is responsible for translating data between different application formats, compression, and TLS/SSL encryption?',
    type: 'multiple-choice',
    options: ['Application (Layer 7)', 'Presentation (Layer 6)', 'Session (Layer 5)', 'Transport (Layer 4)'],
    correctAnswer: 1,
    explanation: 'Layer 6 Presentation handles data syntax formatting, character encoding, compression, and encryption.'
  },
  {
    id: 'fe-2',
    category: 'Foundations',
    question: 'What is the correct PDU sequence during encapsulation from top to bottom?',
    type: 'multiple-choice',
    options: ['Bits -> Frame -> Packet -> Segment -> Data', 'Data -> Segment -> Packet -> Frame -> Bits', 'Data -> Packet -> Segment -> Frame -> Bits', 'Frame -> Packet -> Segment -> Bits -> Data'],
    correctAnswer: 1,
    explanation: 'Data (L5-7) -> Segment (L4) -> Packet (L3) -> Frame (L2) -> Bits (L1).'
  },
  {
    id: 'fe-3',
    category: 'Foundations',
    question: 'What does a Layer 2 switch do to eliminate collisions on an Ethernet segment?',
    type: 'multiple-choice',
    options: ['Assigns each port to its own dedicated collision domain in full-duplex', 'Converts all traffic into radio waves', 'Routes packets across IP subnets', 'Requires all PCs to take turns sending tokens'],
    correctAnswer: 0,
    explanation: 'Each switch port is an independent collision domain running full-duplex, eliminating physical carrier contention.'
  },
  {
    id: 'fe-4',
    category: 'Foundations',
    question: 'Which of the following devices terminates and breaks up a broadcast domain?',
    type: 'multiple-choice',
    options: ['Repeater', 'Hub', 'Layer 2 Switch', 'Router'],
    correctAnswer: 3,
    explanation: 'Routers do not forward broadcast frames by default, terminating the broadcast domain boundary.'
  },
  {
    id: 'fe-5',
    category: 'Foundations',
    question: 'In the TCP/IP model, which layer corresponds to OSI Layers 1 and 2?',
    type: 'multiple-choice',
    options: ['Application', 'Transport', 'Internet', 'Network Access (Link)'],
    correctAnswer: 3,
    explanation: 'The TCP/IP Network Access layer corresponds to OSI Physical (Layer 1) and Data Link (Layer 2).'
  },
  {
    id: 'fe-6',
    category: 'Foundations',
    question: 'What is the primary role of the FCS (Frame Check Sequence) field in an Ethernet frame?',
    type: 'multiple-choice',
    options: ['Encrypts the payload with AES', 'Detects transmission bit errors using CRC-32', 'Identifies the next-hop router IP', 'Sets the VLAN ID'],
    correctAnswer: 1,
    explanation: 'The 4-byte FCS field contains a CRC-32 checksum used by the receiver to detect bit errors and corrupt frames.'
  },
  {
    id: 'fe-7',
    category: 'Foundations',
    question: 'True or False: In a Client-Server architecture, client workstations must be configured as active listening servers.',
    type: 'true-false',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'False. Only servers listen for incoming requests; clients initiate outbound requests using ephemeral source ports.'
  },
  {
    id: 'fe-8',
    category: 'Foundations',
    question: 'What is the MTU (Maximum Transmission Unit) for standard Ethernet frames?',
    type: 'multiple-choice',
    options: ['512 bytes', '1500 bytes', '9000 bytes', '65535 bytes'],
    correctAnswer: 1,
    explanation: 'Standard Ethernet payload MTU is 1500 bytes.'
  },

  // 2. Ethernet, MAC & Switching (9-17)
  {
    id: 'fe-9',
    category: 'Switching',
    question: 'How long is a standard Ethernet MAC address?',
    type: 'multiple-choice',
    options: ['32 bits', '48 bits', '64 bits', '128 bits'],
    correctAnswer: 1,
    explanation: 'MAC addresses are 48 bits (6 bytes / 12 hexadecimal characters).'
  },
  {
    id: 'fe-10',
    category: 'Switching',
    question: 'What are the first 24 bits of a MAC address called?',
    type: 'multiple-choice',
    options: ['Device ID', 'Organizationally Unique Identifier (OUI)', 'Subnet Identifier', 'Serial Number'],
    correctAnswer: 1,
    explanation: 'The first 24 bits are the OUI (Organizationally Unique Identifier) assigned by IEEE to the hardware manufacturer.'
  },
  {
    id: 'fe-11',
    category: 'Switching',
    question: 'How does a switch learn which MAC address exists on which port?',
    type: 'multiple-choice',
    options: ['By reading the Destination MAC of incoming frames', 'By reading the Source MAC of incoming frames', 'By querying the DHCP server', 'By broadcasting ARP requests'],
    correctAnswer: 1,
    explanation: 'A switch reads the Source MAC address of every arriving frame and writes it into its CAM table.'
  },
  {
    id: 'fe-12',
    category: 'Switching',
    question: 'What action does a switch take when it receives a frame destined for an unknown unicast address?',
    type: 'multiple-choice',
    options: ['Drops the frame', 'Sends an ICMP error', 'Floods the frame out all ports in the VLAN except the ingress port', 'Forwards it to port 1'],
    correctAnswer: 2,
    explanation: 'Unknown unicast frames are flooded to all ports in that VLAN except the port on which it arrived.'
  },
  {
    id: 'fe-13',
    category: 'Switching',
    question: 'What is the Ethernet broadcast MAC address?',
    type: 'multiple-choice',
    options: ['00:00:00:00:00:00', 'FF:FF:FF:FF:FF:FF', '01:00:5E:00:00:01', '255.255.255.255'],
    correctAnswer: 1,
    explanation: 'FF:FF:FF:FF:FF:FF represents the Layer 2 broadcast address.'
  },
  {
    id: 'fe-14',
    category: 'Switching',
    question: 'What cyberattack floods a switch with thousands of fake random MAC addresses to turn it into a hub?',
    type: 'multiple-choice',
    options: ['SYN Flood', 'MAC Flooding (CAM Table Exhaustion)', 'ARP Poisoning', 'Smurf Attack'],
    correctAnswer: 1,
    explanation: 'MAC flooding exhausts the switch CAM table, forcing it to fail-open and flood all traffic out all ports like a hub.'
  },
  {
    id: 'fe-15',
    category: 'Switching',
    question: 'What switch port security feature limits the number of MAC addresses permitted on an access port?',
    type: 'multiple-choice',
    options: ['Port Security', 'BPDU Guard', 'CDP', 'VTP'],
    correctAnswer: 0,
    explanation: 'Port Security (`switchport port-security`) limits and restricts MAC addresses on access ports.'
  },
  {
    id: 'fe-16',
    category: 'Switching',
    question: 'True or False: A standard Layer 2 switch rewrites the Source and Destination MAC addresses of forwarded frames.',
    type: 'true-false',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'False. Switches forward frames untouched. Only routers rewrite Layer 2 headers.'
  },
  {
    id: 'fe-17',
    category: 'Switching',
    question: 'What protocol runs on switches to prevent Layer 2 switching loops and broadcast storms?',
    type: 'multiple-choice',
    options: ['BGP', 'OSPF', 'Spanning Tree Protocol (STP)', 'RIP'],
    correctAnswer: 2,
    explanation: 'STP (IEEE 802.1D / 802.1w) blocks redundant links to prevent infinite switching loops.'
  },

  // 3. IPv4 Subnetting & CIDR (18-26)
  {
    id: 'fe-18',
    category: 'Subnetting',
    question: 'How many total bits are in an IPv4 address?',
    type: 'multiple-choice',
    options: ['16 bits', '32 bits', '64 bits', '128 bits'],
    correctAnswer: 1,
    explanation: 'IPv4 uses 32 bits divided into four 8-bit octets.'
  },
  {
    id: 'fe-19',
    category: 'Subnetting',
    question: 'How many usable host IP addresses are in a /26 subnet?',
    type: 'multiple-choice',
    options: ['64', '62', '30', '14'],
    correctAnswer: 1,
    explanation: '32 - 26 = 6 host bits. 2^6 = 64 total addresses. 64 - 2 = 62 usable hosts.'
  },
  {
    id: 'fe-20',
    category: 'Subnetting',
    question: 'What is the dotted decimal subnet mask corresponding to /28?',
    type: 'multiple-choice',
    options: ['255.255.255.192', '255.255.255.224', '255.255.255.240', '255.255.255.248'],
    correctAnswer: 2,
    explanation: 'In the 4th octet: 128 + 64 + 32 + 16 = 240. So mask is 255.255.255.240.'
  },
  {
    id: 'fe-21',
    category: 'Subnetting',
    question: 'What is the network address for a host with IP 192.168.1.130/26?',
    type: 'multiple-choice',
    options: ['192.168.1.0', '192.168.1.128', '192.168.1.64', '192.168.1.192'],
    correctAnswer: 1,
    explanation: 'In /26, block size is 64 (multiples: 0, 64, 128, 192). 130 falls in the 128 subnet: 192.168.1.128.'
  },
  {
    id: 'fe-22',
    category: 'Subnetting',
    question: 'What is the broadcast address for 10.0.0.64/27?',
    type: 'multiple-choice',
    options: ['10.0.0.95', '10.0.0.96', '10.0.0.127', '10.0.0.65'],
    correctAnswer: 0,
    explanation: 'In /27, block size is 32. Next subnet is 64 + 32 = 96. Broadcast is 96 - 1 = 10.0.0.95.'
  },
  {
    id: 'fe-23',
    category: 'Subnetting',
    question: 'Which of the following IP addresses is within an RFC 1918 Private range?',
    type: 'multiple-choice',
    options: ['172.33.1.5', '192.169.1.1', '172.25.10.4', '11.0.0.1'],
    correctAnswer: 2,
    explanation: '172.16.0.0 to 172.31.255.255 is private. 172.25.10.4 falls cleanly within this range.'
  },
  {
    id: 'fe-24',
    category: 'Subnetting',
    question: 'What is the block size (magic number) for subnet mask 255.255.255.248?',
    type: 'multiple-choice',
    options: ['4', '8', '16', '32'],
    correctAnswer: 1,
    explanation: '256 - 248 = 8.'
  },
  {
    id: 'fe-25',
    category: 'Subnetting',
    question: 'What is the purpose of the 127.0.0.1 loopback address?',
    type: 'multiple-choice',
    options: ['To test the local TCP/IP stack without sending packets on the physical network', 'To communicate with the gateway', 'To send broadcasts', 'To renew DHCP'],
    correctAnswer: 0,
    explanation: '127.0.0.1 loops internal packets within the OS kernel to verify TCP/IP stack health.'
  },
  {
    id: 'fe-26',
    category: 'Subnetting',
    question: 'What CIDR prefix is best suited for a point-to-point link between two routers to minimize wasted IPs?',
    type: 'multiple-choice',
    options: ['/28', '/29', '/30', '/24'],
    correctAnswer: 2,
    explanation: 'A /30 provides exactly 2 usable host IP addresses (2^2 - 2 = 2).'
  },

  // 4. Transport Layer & Protocols (27-35)
  {
    id: 'fe-27',
    category: 'Protocols',
    question: 'What is the correct sequence of the TCP 3-way handshake?',
    type: 'multiple-choice',
    options: ['SYN -> ACK -> SYN-ACK', 'SYN -> SYN-ACK -> ACK', 'ACK -> SYN -> FIN', 'DATA -> ACK -> CLOSE'],
    correctAnswer: 1,
    explanation: 'TCP connection establishment: Client SYN -> Server SYN-ACK -> Client ACK.'
  },
  {
    id: 'fe-28',
    category: 'Protocols',
    question: 'Which TCP flag is used to abruptly terminate or reject an invalid connection attempt?',
    type: 'multiple-choice',
    options: ['FIN', 'PSH', 'RST', 'URG'],
    correctAnswer: 2,
    explanation: 'RST (Reset) rejects or forcibly terminates a connection.'
  },
  {
    id: 'fe-29',
    category: 'Protocols',
    question: 'Which protocol operates on TCP port 22 and encrypts remote terminal communication?',
    type: 'multiple-choice',
    options: ['Telnet', 'SSH', 'FTP', 'RDP'],
    correctAnswer: 1,
    explanation: 'SSH (Secure Shell) runs on TCP port 22.'
  },
  {
    id: 'fe-30',
    category: 'Protocols',
    question: 'Which port is used by DNS for standard name resolution queries?',
    type: 'multiple-choice',
    options: ['TCP 80', 'UDP 53', 'UDP 67', 'TCP 443'],
    correctAnswer: 1,
    explanation: 'Standard DNS queries use UDP port 53.'
  },
  {
    id: 'fe-31',
    category: 'Protocols',
    question: 'What is the 4-step DHCP handshake called?',
    type: 'multiple-choice',
    options: ['DORA (Discover, Offer, Request, ACK)', 'SYN, SYN-ACK, ACK', 'ARP, RARP, DNS, ICMP', 'CIDR, VLSM, NAT, PAT'],
    correctAnswer: 0,
    explanation: 'DHCP uses Discover -> Offer -> Request -> Acknowledgment (DORA).'
  },
  {
    id: 'fe-32',
    category: 'Protocols',
    question: 'What protocol resolves an IPv4 address to a local MAC address?',
    type: 'multiple-choice',
    options: ['DNS', 'DHCP', 'ARP', 'ICMP'],
    correctAnswer: 2,
    explanation: 'Address Resolution Protocol (ARP) maps IP addresses to physical MAC addresses.'
  },
  {
    id: 'fe-33',
    category: 'Protocols',
    question: 'What ICMP message type does traceroute rely on to discover intermediate router hops?',
    type: 'multiple-choice',
    options: ['Echo Request (Type 8)', 'Destination Unreachable (Type 3)', 'Time Exceeded (Type 11)', 'Redirect (Type 5)'],
    correctAnswer: 2,
    explanation: 'Routers decrement TTL to 0 and reply with ICMP Type 11 (Time Exceeded).'
  },
  {
    id: 'fe-34',
    category: 'Protocols',
    question: 'Which port is used by Remote Desktop Protocol (RDP) on Windows?',
    type: 'multiple-choice',
    options: ['22', '443', '3389', '8080'],
    correctAnswer: 2,
    explanation: 'RDP uses TCP port 3389.'
  },
  {
    id: 'fe-35',
    category: 'Protocols',
    question: 'Which DNS record type maps an IPv6 address to a domain name?',
    type: 'multiple-choice',
    options: ['A', 'AAAA', 'CNAME', 'MX'],
    correctAnswer: 1,
    explanation: 'AAAA records map domain names to 128-bit IPv6 addresses.'
  },

  // 5. VLANs, Trunking & Routing (36-43)
  {
    id: 'fe-36',
    category: 'Routing',
    question: 'What IEEE standard defines VLAN tagging on Ethernet trunk links?',
    type: 'multiple-choice',
    options: ['802.3', '802.11', '802.1Q', '802.1X'],
    correctAnswer: 2,
    explanation: 'IEEE 802.1Q defines the 4-byte tag used for VLAN trunking.'
  },
  {
    id: 'fe-37',
    category: 'Routing',
    question: 'What happens to frames in the Native VLAN when traversing an 802.1Q trunk?',
    type: 'multiple-choice',
    options: ['They are encrypted', 'They are sent untagged', 'They are dropped', 'They are converted to IPv6'],
    correctAnswer: 1,
    explanation: 'By default, Native VLAN frames traverse trunk links without an 802.1Q tag.'
  },
  {
    id: 'fe-38',
    category: 'Routing',
    question: 'In Router-on-a-Stick (ROAS), how does a single router interface support multiple VLANs?',
    type: 'multiple-choice',
    options: ['By using subinterfaces configured with 802.1Q encapsulation', 'By turning the router into a hub', 'By running BGP', 'By connecting 10 physical cables'],
    correctAnswer: 0,
    explanation: 'Logical subinterfaces (e.g. g0/0.10, g0/0.20) are created, each tied to a specific VLAN tag.'
  },
  {
    id: 'fe-39',
    category: 'Routing',
    question: 'What fundamental rule determines which route is chosen when multiple routes match a packet’s destination IP?',
    type: 'multiple-choice',
    options: ['Lowest Metric', 'Lowest Administrative Distance', 'Longest Prefix Match', 'Shortest Hop Count'],
    correctAnswer: 2,
    explanation: 'Longest Prefix Match always wins, regardless of metric or Administrative Distance.'
  },
  {
    id: 'fe-40',
    category: 'Routing',
    question: 'What is the default Administrative Distance of OSPF?',
    type: 'multiple-choice',
    options: ['1', '90', '110', '120'],
    correctAnswer: 2,
    explanation: 'OSPF has an AD of 110 (Static is 1, EIGRP is 90, RIP is 120).'
  },
  {
    id: 'fe-41',
    category: 'Routing',
    question: 'What is the default route (Gateway of Last Resort) in IPv4?',
    type: 'multiple-choice',
    options: ['127.0.0.1/8', '0.0.0.0/0', '255.255.255.255/32', '169.254.0.0/16'],
    correctAnswer: 1,
    explanation: '0.0.0.0/0 matches any IP destination when no more specific route is found.'
  },
  {
    id: 'fe-42',
    category: 'Routing',
    question: 'What algorithm does OSPF run to calculate the shortest loop-free path?',
    type: 'multiple-choice',
    options: ['Bellman-Ford', 'Dijkstra SPF', 'Diffie-Hellman', 'RSA'],
    correctAnswer: 1,
    explanation: 'OSPF uses Dijkstra’s Shortest Path First (SPF) algorithm.'
  },
  {
    id: 'fe-43',
    category: 'Routing',
    question: 'What is the metric used by OSPF to measure path cost?',
    type: 'multiple-choice',
    options: ['Hop count', 'Cost based on inverse bandwidth', 'Delay', 'Reliability'],
    correctAnswer: 1,
    explanation: 'OSPF cost is calculated based on bandwidth: Reference Bandwidth / Interface Bandwidth.'
  },

  // 6. Security, Management & Troubleshooting (44-50)
  {
    id: 'fe-44',
    category: 'Security',
    question: 'What form of NAT allows multiple private hosts to share a single public IP using Layer 4 port numbers?',
    type: 'multiple-choice',
    options: ['Static NAT', 'Dynamic NAT', 'Port Address Translation (PAT / NAT Overload)', 'Dual NAT'],
    correctAnswer: 2,
    explanation: 'PAT (NAT Overload) translates source ports to map thousands of private hosts to one public IP.'
  },
  {
    id: 'fe-45',
    category: 'Security',
    question: 'Where should an Extended ACL typically be placed for maximum network efficiency?',
    type: 'multiple-choice',
    options: ['As close to the source of traffic as possible', 'As close to the destination as possible', 'On the core switch only', 'On the internet gateway'],
    correctAnswer: 0,
    explanation: 'Extended ACLs should be placed close to the source to avoid transporting discarded traffic over the network.'
  },
  {
    id: 'fe-46',
    category: 'Security',
    question: 'What invisible rule exists at the bottom of every Cisco Access Control List?',
    type: 'multiple-choice',
    options: ['permit ip any any', 'deny ip any any (Implicit Deny)', 'log all traffic', 'redirect to port 80'],
    correctAnswer: 1,
    explanation: 'Every ACL terminates with an implicit deny all rule.'
  },
  {
    id: 'fe-47',
    category: 'Security',
    question: 'What modern authentication mechanism in WPA3 prevents offline dictionary attacks?',
    type: 'multiple-choice',
    options: ['WEP IVs', 'Simultaneous Authentication of Equals (SAE)', 'Cleartext PSK', 'TKIP'],
    correctAnswer: 1,
    explanation: 'WPA3 uses SAE (Simultaneous Authentication of Equals / Dragonfly handshake).'
  },
  {
    id: 'fe-48',
    category: 'Security',
    question: 'Why is Network Time Protocol (NTP) vital in digital forensics and SOC operations?',
    type: 'multiple-choice',
    options: ['Accelerates packet routing', 'Synchronizes timestamps across logs so events can be correlated accurately', 'Encrypts user emails', 'Replaces DNS'],
    correctAnswer: 1,
    explanation: 'NTP synchronizes device clocks, allowing SOC analysts to construct an accurate chronological incident timeline.'
  },
  {
    id: 'fe-49',
    category: 'Security',
    question: 'What command-line tool on Windows displays active TCP connections, listening ports, and Process IDs (PIDs)?',
    type: 'multiple-choice',
    options: ['ipconfig /all', 'ping', 'netstat -ano', 'tracert'],
    correctAnswer: 2,
    explanation: '`netstat -ano` displays active sockets and the PID of the owning process.'
  },
  {
    id: 'fe-50',
    category: 'Security',
    question: 'A computer can ping 8.8.8.8, but cannot load `google.com` in a browser. What is the root cause?',
    type: 'multiple-choice',
    options: ['Layer 1 cable fault', 'Default gateway router is down', 'DNS resolution failure', 'VLAN mismatch'],
    correctAnswer: 2,
    explanation: 'Pinging by IP proves routing and physical connectivity work. Inability to reach by domain name isolates the issue to DNS.'
  }
];
