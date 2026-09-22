import { LessonContent } from '../../types';

export const WEEK1_LESSONS: Record<number, LessonContent> = {
  1: {
    day: 1,
    title: 'What Is a Network?',
    partA: {
      summary: 'A computer network is an interconnected collection of autonomous computing devices that exchange data and share resources via wired or wireless transmission media.',
      sections: [
        {
          heading: 'Network Scale & Geographies',
          content: 'Networks are categorized by their geographic footprint and administrative control. Understanding these boundaries defines how security perimeters and access policies are architected.',
          table: {
            headers: ['Type', 'Full Name', 'Scope', 'Typical Speeds', 'Ownership / Administration'],
            rows: [
              ['LAN', 'Local Area Network', 'Single room, office, home, campus', '1 Gbps - 100 Gbps', 'Privately owned & managed internally'],
              ['WLAN', 'Wireless LAN', 'Local area using radio frequencies (Wi-Fi)', '54 Mbps - 9.6 Gbps', 'Local enterprise or home admin'],
              ['WAN', 'Wide Area Network', 'Cities, countries, or global connections', '10 Mbps - 10 Gbps', 'Owned by Telecoms/ISPs (leased circuits)'],
              ['MAN', 'Metropolitan Area Network', 'Across a metropolitan city/municipality', '1 Gbps - 10 Gbps', 'Consortium or regional provider'],
              ['PAN', 'Personal Area Network', 'Around an individual (Bluetooth, USB)', '1 Mbps - 24 Mbps', 'Personal consumer device']
            ]
          }
        },
        {
          heading: 'Network Architecture Models',
          content: 'Modern communication operates under two primary organizational models:\n\n1. **Client-Server Model**: Centralized architecture where dedicated server machines provide services (web, database, files, DNS) and client devices (laptops, phones) initiate requests. Centralized security controls, logging, and backups, but servers represent single points of failure.\n2. **Peer-to-Peer (P2P)**: Decentralized architecture where every host functions simultaneously as both a client and a server (e.g. BitTorrent, blockchain). Resilient against single-node outages, but challenging to secure, audit, and administer uniformly.',
          diagram: `Client-Server:
[Client A] ──┐
[Client B] ──┼──> [ Central Server (Auth, Data, Logs) ]
[Client C] ──┘

Peer-to-Peer (P2P):
[Host A] <───> [Host B]
   ^              ^
   │              │
   v              v
[Host C] <───> [Host D]`
        },
        {
          heading: 'Core Network Hardware Devices',
          content: 'Every packet traverses specialized hardware components with specific OSI layer duties.',
          table: {
            headers: ['Device', 'OSI Layer', 'Primary Purpose', 'Intelligence / Forwarding Logic'],
            rows: [
              ['NIC (Network Interface Card)', 'Layer 1 & 2', 'Hardware interface connecting device to medium', 'Has a unique burned-in 48-bit MAC address'],
              ['Switch', 'Layer 2', 'Connects devices inside a local LAN', 'Maintains MAC table (CAM); forwards unicast, floods unknown'],
              ['Router', 'Layer 3', 'Connects distinct IP subnets and WANs', 'Maintains IP routing table; forwards packets across networks'],
              ['Firewall', 'Layer 3, 4, 7', 'Inspects and filters permitted traffic', 'Stateful inspection, ACL rules, deep packet inspection (DPI)'],
              ['Access Point (AP)', 'Layer 2', 'Bridges wireless radio waves to wired Ethernet', 'Translates 802.11 Wi-Fi frames to 802.3 Ethernet frames']
            ]
          },
          keyTerms: [
            { term: 'Packet', definition: 'A discrete formatted block of data carried by a network, containing control headers and user payload.' },
            { term: 'Bandwidth vs Throughput', definition: 'Bandwidth is maximum theoretical capacity; throughput is the actual payload data successfully transferred per second.' },
            { term: 'Intranet vs Extranet vs Internet', definition: 'Intranet is strictly internal; Extranet allows trusted external partners; Internet is public global routing.' }
          ]
        }
      ]
    },
    partB: {
      whyItExists: 'Without networks, every computer would be an isolated island. Computing requires sharing resources, centralized identity, high-speed collaboration, and automated data pipelines.',
      problemSolved: 'Eliminates manual file transfer (sneakernet), allows distributed storage, centralizes security governance, and powers real-time global telemetry.',
      behindTheScenes: 'When an application sends 100 MB, the operating system splits the data into thousands of packets (typically 1500-byte MTU chunks). If one packet drops, only that slice is retransmitted rather than the entire 100 MB.',
      commonMistakes: [
        'Confusing bandwidth with latency (high bandwidth does not mean low round-trip delay).',
        'Thinking the Internet and the Web are synonymous (The Web is an application-layer service running on the global Internet network).',
        'Assuming a switch can route between different IP subnets (standard L2 switches only forward within the same broadcast domain).'
      ],
      socCybersecurityRelevance: {
        title: 'Perimeter Visibility & Asset Discovery',
        description: 'In a Security Operations Center (SOC), you cannot defend what you cannot see. Unmanaged devices (rogue APs, unauthorized client machines) connected to a corporate LAN bypass perimeter defenses.',
        investigationTip: 'Always correlate the device MAC address to switch port logs (802.1X / DHCP snooping) to locate unauthorized physical hardware plugged into an office wall jack.'
      }
    },
    partC: {
      title: 'Lab 1: Device Role & Boundary Identifier',
      instructions: 'Examine each communication scenario and select the appropriate networking device responsible for handling the connection.',
      type: 'protocol-matcher',
      drillConfig: {
        scenario: 'A workstation at 192.168.1.50 needs to resolve a domain and access a web server located on a foreign subnet 203.0.113.10.',
        hints: [
          'Connecting devices on the same local subnet is a Switch function.',
          'Crossing boundaries between different subnets requires a Layer 3 device (Router).'
        ],
        solutionExplanation: 'The local workstation transmits an Ethernet frame to the local Switch. The Switch forwards it to the Default Gateway (Router). The Router strips the Layer 2 header, looks up its routing table, and forwards the packet toward 203.0.113.10.'
      }
    },
    partD: {
      day: 1,
      title: 'Day 1 Concept Check & Scenario Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q1-1',
          question: 'Which device is primarily responsible for forwarding frames within a local broadcast domain using MAC addresses?',
          type: 'multiple-choice',
          options: ['Router', 'Switch', 'Modem', 'DNS Server'],
          correctAnswer: 1,
          explanation: 'A Layer 2 Switch forwards Ethernet frames between locally connected devices using its MAC address table (CAM table).'
        },
        {
          id: 'q1-2',
          question: 'What is the primary difference between a LAN and a WAN?',
          type: 'multiple-choice',
          options: [
            'LAN uses wireless only, while WAN uses fiber only',
            'LAN covers a restricted geographical area under one admin; WAN connects dispersed LANs across long distances',
            'LANs cannot use routers',
            'WANs do not use IP addressing'
          ],
          correctAnswer: 1,
          explanation: 'LANs are localized (homes, offices, campuses) under private ownership, whereas WANs span large distances and rely on telecommunication carriers.'
        },
        {
          id: 'q1-3',
          question: 'Why do computer networks slice large messages into smaller packets?',
          type: 'multiple-choice',
          options: [
            'Because computers cannot calculate files larger than 1 MB',
            'To enable fair multiplexing of line capacity and avoid retransmitting huge files upon single-bit errors',
            'To encrypt the communication automatically',
            'Because switches only operate in 10-byte increments'
          ],
          correctAnswer: 1,
          explanation: 'Packet switching allows multiple computers to share links simultaneously (multiplexing) and ensures that minor transmission loss requires retransmitting only the lost segment.'
        },
        {
          id: 'q1-4',
          question: 'True or False: In a pure Peer-to-Peer (P2P) network, every node can act as both a client and a server.',
          type: 'true-false',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True. In P2P architectures, participating hosts share processing, bandwidth, and storage equally without a centralized server authority.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'A LAN covers a localized physical area under single administrative domain.',
        'Switches operate at Layer 2 using 48-bit MAC addresses.',
        'Routers operate at Layer 3 using IP addresses to interconnect different networks.',
        'Data is chunked into packets to enable line sharing and efficient error recovery.',
        'Firewalls enforce security boundaries by inspecting packet headers and connection state.'
      ],
      threeCommonMistakes: [
        'Treating Wi-Fi as an entirely separate network rather than a wireless Layer 2 access medium to a wired LAN.',
        'Thinking routers are needed to communicate between two PCs plugged into the same switch and IP subnet.',
        'Assuming faster link bandwidth automatically reduces network propagation latency.'
      ],
      miniScenario: {
        scenario: 'A SOC analyst spots an alert showing thousands of outbound requests to unusual external IPs from a developer workstation. The developer insists they only installed a file-sharing app.',
        question: 'What network architecture did the file-sharing app introduce onto the corporate workstation?',
        answer: 'Peer-to-Peer (P2P) architecture.',
        explanation: 'P2P client applications turn the workstation into an active listening server, advertising chunks of files to unauthorized external peers and potentially bypassing egress firewalls.'
      },
      flashcardIds: ['fc-d1-1', 'fc-d1-2', 'fc-d1-3', 'fc-d1-4']
    }
  },

  2: {
    day: 2,
    title: 'The OSI 7-Layer Model',
    partA: {
      summary: 'The Open Systems Interconnection (OSI) reference model is an ISO standard conceptual framework that standardizes telecommunication functions into seven distinct abstraction layers.',
      sections: [
        {
          heading: 'The 7 Abstraction Layers',
          content: 'Remembered by the mnemonic "All People Seem To Need Data Processing" (Layer 7 down to Layer 1) or "Please Do Not Throw Sausage Pizza Away" (Layer 1 up to Layer 7).',
          table: {
            headers: ['Layer #', 'Layer Name', 'PDU Name', 'Core Responsibilities', 'Typical Protocols / Standards'],
            rows: [
              ['7', 'Application', 'Data', 'Interface between user apps and network', 'HTTP, HTTPS, DNS, SSH, SMTP, DHCP'],
              ['6', 'Presentation', 'Data', 'Data syntax, formatting, compression, encryption', 'TLS/SSL, ASCII, UTF-8, JPEG, JSON'],
              ['5', 'Session', 'Data', 'Establish, maintain, and tear down communication dialogues', 'RPC, NetBIOS, PPTP, Sockets'],
              ['4', 'Transport', 'Segment (TCP) / Datagram (UDP)', 'End-to-end reliability, port multiplexing, segmentation', 'TCP, UDP, SCTP'],
              ['3', 'Network', 'Packet', 'Logical addressing, path determination, routing', 'IPv4, IPv6, ICMP, OSPF, BGP'],
              ['2', 'Data Link', 'Frame', 'Physical addressing (MAC), framing, media access, error detection', 'Ethernet (802.3), Wi-Fi (802.11), PPP, ARP'],
              ['1', 'Physical', 'Bits', 'Electrical signals, light pulses, radio waves, cabling, connectors', 'Cat6, RJ45, Fiber optic, SFP+, Radio RF']
            ]
          }
        },
        {
          heading: 'Encapsulation & Decapsulation',
          content: 'As data moves down the stack on the sender, each layer prepends a protocol header (and at Layer 2, appends an FCS trailer). When received, the process is inverted.\n\n- **Encapsulation (Sender)**: Data -> +L4 Header (Segment) -> +L3 Header (Packet) -> +L2 Header & Trailer (Frame) -> L1 Bits.\n- **Decapsulation (Receiver)**: Bits -> Frame checked & L2 stripped -> Packet routed & L3 stripped -> Segment reassembled & L4 stripped -> Application Data.',
          diagram: `[ Application Data ]
       │  (Layer 7-5)
       ▼
[ TCP Header | Application Data ]                      <- L4 Segment
       │
       ▼
[ IP Header | TCP Header | Application Data ]           <- L3 Packet
       │
       ▼
[ L2 Frame Header | IP Hdr | TCP Hdr | Data | FCS Trailer ] <- L2 Frame
       │
       ▼
1 0 1 1 0 1 0 0 1 1 0 1 0 1 0 0 1 0 1 1 0 1 1 0        <- L1 Physical Bits`
        }
      ]
    },
    partB: {
      whyItExists: 'Before OSI, computer networking was proprietary (IBM SNA, DECnet). Hardware and software from different vendors could not communicate. The model introduced modular interoperability.',
      problemSolved: 'Enables engineers to troubleshoot by isolating the failing layer (e.g. "Is it a Layer 1 cable fault or a Layer 3 routing issue?"). Vendors can innovate at Layer 7 without redesigning Layer 1 cables.',
      behindTheScenes: 'Each header contains an "indicator field" pointing to the next layer protocol. The Layer 2 frame has an EtherType (e.g. 0x0800 for IPv4). The IPv4 header has a Protocol field (e.g. 6 for TCP, 17 for UDP). The TCP header has Destination Port (e.g. 443 for HTTPS).',
      commonMistakes: [
        'Assuming modern operating systems strictly implement OSI (the Internet runs TCP/IP; OSI is a conceptual reference model).',
        'Confusing Packets (Layer 3) with Frames (Layer 2) or Segments (Layer 4).',
        'Believing switches inspect IP addresses (standard Layer 2 switches only inspect Layer 2 Frame MAC addresses).'
      ],
      socCybersecurityRelevance: {
        title: 'Layer-by-Layer Attack Vectors & Defenses',
        description: 'Security analysts evaluate threats based on their target OSI layer.',
        investigationTip: 'Match the attack to the layer: ARP Spoofing (L2), IP Spoofing & ICMP Floods (L3), SYN Flood & Port Scans (L4), SQL Injection & Phishing (L7). Never look for SQL injection with a Layer 3 packet filter.'
      }
    },
    partC: {
      title: 'Lab 2: Protocol Data Unit (PDU) & Layer Matcher',
      instructions: 'Identify which layer, PDU, and protocol are invoked during each phase of an HTTPS web transaction.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'A client browser connects securely to https://soc-training.internal.',
        hints: [
          'TLS encryption and certificate negotiation occur at the Presentation / Session boundary.',
          'Port 443 is evaluated at the Transport Layer.'
        ],
        solutionExplanation: 'The user payload is encrypted via TLS (Presentation/Application). It is segmented with TCP Port 443 header (Transport, Segment). It is addressed with Source/Destination IPs (Network, Packet). It is framed with Source/Destination MAC addresses (Data Link, Frame). Finally, it is pulsed as optical signals across fiber (Physical, Bits).'
      }
    },
    partD: {
      day: 2,
      title: 'Day 2 OSI Knowledge & Diagnostic Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q2-1',
          question: 'What is the correct PDU term for data encapsulated at the Network Layer (Layer 3)?',
          type: 'multiple-choice',
          options: ['Segment', 'Frame', 'Packet', 'Bit'],
          correctAnswer: 2,
          explanation: 'Layer 3 PDUs are called Packets (or Datagrams). Layer 4 uses Segments, Layer 2 uses Frames, and Layer 1 uses Bits.'
        },
        {
          id: 'q2-2',
          question: 'At which OSI layer does an Ethernet Switch primarily operate?',
          type: 'multiple-choice',
          options: ['Layer 1 (Physical)', 'Layer 2 (Data Link)', 'Layer 3 (Network)', 'Layer 4 (Transport)'],
          correctAnswer: 1,
          explanation: 'Standard switches operate at Layer 2 (Data Link) because they make forwarding decisions based on 48-bit MAC addresses.'
        },
        {
          id: 'q2-3',
          question: 'During encapsulation, in what direction does data move through the OSI layers on the sending host?',
          type: 'multiple-choice',
          options: ['Layer 1 to Layer 7', 'Layer 7 to Layer 1', 'Layer 4 to Layer 2 only', 'Random order'],
          correctAnswer: 1,
          explanation: 'On the transmitting machine, encapsulation proceeds top-down from Layer 7 (Application) down to Layer 1 (Physical).'
        },
        {
          id: 'q2-4',
          question: 'Which OSI layer handles data compression, format conversion (e.g. ASCII/JSON), and cryptographic encryption (TLS)?',
          type: 'multiple-choice',
          options: ['Session (Layer 5)', 'Presentation (Layer 6)', 'Transport (Layer 4)', 'Network (Layer 3)'],
          correctAnswer: 1,
          explanation: 'Layer 6 (Presentation) is responsible for data syntax formatting, character encoding/decoding, and cryptographic encryption.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'OSI has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
        'PDUs: Bits (L1) -> Frames (L2) -> Packets (L3) -> Segments (L4) -> Data (L5-7).',
        'Encapsulation wraps headers top-down; Decapsulation unwraps headers bottom-up.',
        'The Frame Check Sequence (FCS) at Layer 2 detects bit transmission errors using CRC.',
        'Layer boundaries let security engineers pinpoint exact attack vectors and remediation points.'
      ],
      threeCommonMistakes: [
        'Calling an IP payload a "frame" instead of a "packet".',
        'Thinking routers inspect TCP port numbers during standard routing (routers only read Layer 3 IP headers unless running ACLs/NAT).',
        'Forgetting that Layer 2 frames only travel to the next local hop, whereas Layer 3 IP packets travel end-to-end.'
      ],
      miniScenario: {
        scenario: 'A network administrator reports: "The link has optical carrier sync and light levels are good, but no IP traffic is passing." Which OSI layers are confirmed working and which is failing?',
        question: 'Identify the operational and suspect OSI layers.',
        answer: 'Layer 1 (Physical) is operational; Layer 2 or Layer 3 is suspect.',
        explanation: 'Good light levels and carrier sync confirm Layer 1 Physical connectivity. The failure must lie in Layer 2 (VLAN mismatch, encapsulation mismatch) or Layer 3 (wrong IP subnet, missing default route).'
      },
      flashcardIds: ['fc-d2-1', 'fc-d2-2', 'fc-d2-3', 'fc-d2-4']
    }
  },

  3: {
    day: 3,
    title: 'The TCP/IP Model',
    partA: {
      summary: 'The TCP/IP model (DoD model) is the practical architectural suite powering the global Internet, collapsing the 7 OSI layers into 4 streamlined operational layers.',
      sections: [
        {
          heading: 'The 4-Layer Architecture',
          content: 'Developed by DARPA in the 1970s, TCP/IP prioritizes practical, robust, survivable internetworking.',
          table: {
            headers: ['TCP/IP Layer', 'Equivalent OSI Layers', 'Core Duty', 'Prominent Protocols'],
            rows: [
              ['4. Application', 'Application (7), Presentation (6), Session (5)', 'User application services, formatting, state', 'HTTP/S, DNS, SSH, DHCP, BGP, SMTP'],
              ['3. Transport', 'Transport (4)', 'Host-to-host communication, reliability, ports', 'TCP, UDP'],
              ['2. Internet', 'Network (3)', 'Inter-network addressing, routing, diagnostics', 'IPv4, IPv6, ICMP, ARP (adjacent)'],
              ['1. Network Access (Link)', 'Data Link (2), Physical (1)', 'Physical framing, MAC addressing, bit signaling', 'Ethernet (802.3), Wi-Fi (802.11), Fiber']
            ]
          }
        },
        {
          heading: 'OSI vs TCP/IP Comparison',
          content: 'While OSI is prescriptive and formal (created by committee), TCP/IP is descriptive and implementation-first (created by engineers building ARPANET).\n\nIn TCP/IP, session and formatting duties are handled directly within the application libraries (e.g. OpenSSL handling TLS within a web browser) rather than by the OS networking stack.',
          diagram: `OSI 7 Layers               TCP/IP 4 Layers
┌──────────────┐
│ Application  │ ──┐
├──────────────┤   │
│ Presentation │ ──┼───────> [ Application Layer ]
├──────────────┤   │         (HTTP, DNS, SSH, TLS)
│   Session    │ ──┘
├──────────────┤
│  Transport   │ ──────────> [ Transport Layer ]
│              │             (TCP, UDP)
├──────────────┤
│   Network    │ ──────────> [ Internet Layer ]
│              │             (IPv4, IPv6, ICMP)
├──────────────┤
│  Data Link   │ ──┐
├──────────────┤   ├───────> [ Network Access Layer ]
│   Physical   │ ──┘         (Ethernet, 802.11, Hardware)
└──────────────┘`
        }
      ]
    },
    partB: {
      whyItExists: 'Networks must survive localized catastrophic failure. TCP/IP was designed so that if one node or line goes down, dynamic routing immediately reroutes packets across remaining paths.',
      problemSolved: 'Eliminates proprietary vendor lock-in; enables universal end-to-end communication regardless of physical media (copper, glass, air).',
      behindTheScenes: 'The end-to-end principle: The core network (routers) only focuses on moving packets quickly (Layer 3). Complexity, state management, retransmissions, and application logic belong at the endpoints (servers and clients).',
      commonMistakes: [
        'Believing TCP/IP and OSI contradict each other; they are complementary lenses for the same systems.',
        'Thinking ARP belongs strictly to Layer 3; ARP operates as a bridge between the Internet Layer and Network Access Layer.',
        'Assuming TCP/IP guarantees zero latency (it guarantees reliable delivery, not real-time timing).'
      ],
      socCybersecurityRelevance: {
        title: 'Packet Analysis & Wireshark Tree Mapping',
        description: 'When inspecting a packet capture (.pcap) in Wireshark, the packet details pane displays the TCP/IP stack in descending order.',
        investigationTip: 'Frame 1 (Network Access) -> Ethernet II (MACs) -> Internet Protocol Version 4 (IPs) -> Transmission Control Protocol (Ports) -> Hypertext Transfer Protocol (Payload). Learn to navigate this hierarchy instantly during incident triage.'
      }
    },
    partC: {
      title: 'Lab 3: Wireshark Packet Dissection Sandbox',
      instructions: 'Examine a raw packet header dump and map each field to its corresponding TCP/IP layer.',
      type: 'packet-flow',
      drillConfig: {
        scenario: 'A client at 10.0.0.15 makes a DNS request for malicious-c2.xyz to 10.0.0.1.',
        hints: ['DNS runs on UDP port 53', 'UDP is Transport Layer', 'IP addressing is Internet Layer'],
        solutionExplanation: 'Ethernet Source: Host MAC, Dest: Gateway MAC (Network Access) -> IPv4 Source: 10.0.0.15, Dest: 10.0.0.1 (Internet) -> UDP Source: 54123, Dest: 53 (Transport) -> DNS Query: malicious-c2.xyz (Application).'
      }
    },
    partD: {
      day: 3,
      title: 'Day 3 TCP/IP Suite Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q3-1',
          question: 'Which layer of the TCP/IP model corresponds to OSI Layers 5, 6, and 7?',
          type: 'multiple-choice',
          options: ['Transport', 'Internet', 'Application', 'Network Access'],
          correctAnswer: 2,
          explanation: 'The TCP/IP Application layer encompasses the functionality of OSI Session, Presentation, and Application layers.'
        },
        {
          id: 'q3-2',
          question: 'Which of the following protocols operates at the TCP/IP Internet layer?',
          type: 'multiple-choice',
          options: ['TCP', 'ICMP', 'HTTP', 'Ethernet'],
          correctAnswer: 1,
          explanation: 'ICMP (Internet Control Message Protocol), along with IPv4 and IPv6, operates at the Internet Layer.'
        },
        {
          id: 'q3-3',
          question: 'What core architectural principle dictates that network routers remain stateless while hosts manage connection reliability?',
          type: 'multiple-choice',
          options: ['Store-and-forward', 'End-to-End Principle', 'Broadcast Contention', 'CSMA/CD'],
          correctAnswer: 1,
          explanation: 'The End-to-End Principle states that application reliability should reside at the communication endpoints rather than in intermediate routers.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'The TCP/IP model has 4 layers: Application, Transport, Internet, Network Access.',
        'It is the actual working architecture of the Internet.',
        'Application layer handles protocols like HTTP, DNS, and SSH.',
        'Transport layer provides host-to-host ports and ordering (TCP/UDP).',
        'Internet layer provides logical addressing and routing (IPv4/IPv6).'
      ],
      threeCommonMistakes: [
        'Saying "TCP/IP" refers only to TCP and IP (it refers to the entire protocol suite).',
        'Confusing the Internet layer with the physical Internet cable infrastructure.',
        'Thinking UDP lacks ports (both TCP and UDP rely on 16-bit port numbers).'
      ],
      miniScenario: {
        scenario: 'A firewall rule is created: "Deny all traffic where Protocol = 6". A user complains they cannot open web pages, but ping still works.',
        question: 'Why does ping work while web traffic fails?',
        answer: 'Protocol 6 is TCP; ping uses ICMP (Protocol 1).',
        explanation: 'Web traffic (HTTP/HTTPS) runs over TCP (Protocol 6 in the IP header). Ping uses ICMP (Protocol 1), which was not blocked by the rule.'
      },
      flashcardIds: ['fc-d3-1', 'fc-d3-2', 'fc-d3-3']
    }
  },

  4: {
    day: 4,
    title: 'Ethernet & MAC Addresses',
    partA: {
      summary: 'Ethernet (IEEE 802.3) is the dominant wired Layer 2 local networking standard. Devices on an Ethernet segment communicate using 48-bit physical Media Access Control (MAC) addresses.',
      sections: [
        {
          heading: 'MAC Address Structure (EUI-48)',
          content: 'A MAC address consists of 48 bits (6 octets / 12 hex characters), typically written as `00:1A:2B:3C:4D:5E` or `001a.2b3c.4d5e`.\n\n- **First 24 bits (3 bytes)**: Organizationally Unique Identifier (OUI) assigned by IEEE to the manufacturer (e.g. Cisco, Intel, Apple).\n- **Last 24 bits (3 bytes)**: Network Interface Controller (NIC) specific identifier assigned by vendor.\n- **I/G Bit (Least significant bit of first octet)**: 0 = Unicast, 1 = Multicast/Broadcast.\n- **U/L Bit**: 0 = Universally administered, 1 = Locally administered.',
          diagram: `MAC: 00 : 1A : 2B : 3C : 4D : 5E
     └──────────────┘   └──────────────┘
       First 24 bits      Last 24 bits
       OUI (Vendor)       NIC Device ID`
        },
        {
          heading: 'The Ethernet Frame Anatomy',
          content: 'When data travels on an Ethernet wire, it is encapsulated in this standard frame:',
          table: {
            headers: ['Field', 'Size', 'Purpose'],
            rows: [
              ['Preamble + SFD', '8 bytes', 'Clock synchronization and Start Frame Delimiter (10101011)'],
              ['Destination MAC', '6 bytes', 'Hardware address of recipient interface (or broadcast FF:FF:FF:FF:FF:FF)'],
              ['Source MAC', '6 bytes', 'Hardware address of sending interface'],
              ['EtherType / Length', '2 bytes', 'Identifies upper-layer payload (0x0800 for IPv4, 0x86DD for IPv6, 0x0806 for ARP)'],
              ['Payload (Data)', '46 - 1500 bytes', 'The encapsulated L3 packet (min 46 bytes, padded if smaller)'],
              ['FCS (Frame Check Sequence)', '4 bytes', '32-bit CRC checksum for detecting bit corruption in transit']
            ]
          }
        },
        {
          heading: 'Transmission Modes',
          content: '1. **Unicast**: One sender to one specific recipient MAC (e.g. `00:11:22:33:44:55`).\n2. **Broadcast**: One sender to all devices in the local broadcast domain. Destination MAC is always `FF:FF:FF:FF:FF:FF`.\n3. **Multicast**: One sender to an interested group. In IPv4 Ethernet, destination MAC starts with `01:00:5E:xx:xx:xx`.',
          keyTerms: [
            { term: 'MTU (Maximum Transmission Unit)', definition: 'The largest Layer 3 packet payload that can be encapsulated in a frame (standard Ethernet MTU is 1500 bytes).' },
            { term: 'Jumbo Frames', definition: 'Ethernet frames with payloads up to 9000 bytes, used in data center SANs to reduce CPU overhead.' }
          ]
        }
      ]
    },
    partB: {
      whyItExists: 'Within a single physical wire or local switch, devices need hardware addresses to claim frames off the wire without relying on complex, hierarchical IP routing tables.',
      problemSolved: 'Allows the NIC hardware to filter out traffic meant for other machines directly in the hardware chipset without waking up the computer CPU.',
      behindTheScenes: 'A NIC checks the destination MAC of every passing frame. If it matches its own MAC, the broadcast address, or a subscribed multicast, it triggers a hardware interrupt and decapsulates the frame. Otherwise, it discards it.',
      commonMistakes: [
        'Believing MAC addresses route across the Internet (MAC headers are stripped and replaced at every single router hop).',
        'Thinking MAC addresses can never be changed (operating systems allow spoofing or randomized MAC addresses easily).',
        'Confusing uppercase/lowercase hex in MACs (hex is case-insensitive: `AA:BB` is identical to `aa:bb`).'
      ],
      socCybersecurityRelevance: {
        title: 'MAC Spoofing & Promiscuous Sniffing',
        description: 'An attacker can easily rewrite their NIC MAC address in software to bypass MAC-filtering firewalls or bypass captive portals at hotels/airports.',
        investigationTip: 'In Wireshark, if a NIC is put in Promiscuous Mode, it captures all frames passing through the wire, ignoring destination MAC checks. Use switch port security (limiting MACs per port) to block rogue devices.'
      }
    },
    partC: {
      title: 'Lab 4: MAC Address Anatomy & Frame Analyzer',
      instructions: 'Decode a raw Ethernet frame header and extract the Source MAC, Destination MAC, and EtherType.',
      type: 'packet-flow',
      drillConfig: {
        scenario: 'Frame capture: FF FF FF FF FF FF 00 15 5D 4A 32 1B 08 06 ...',
        hints: ['First 6 bytes are Destination MAC', 'Next 6 bytes are Source MAC', 'Bytes 12-13 are EtherType'],
        solutionExplanation: 'Destination MAC is FF:FF:FF:FF:FF:FF (Broadcast). Source MAC is 00:15:5D:4A:32:1B (Hyper-V / Microsoft). EtherType is 0x0806 (ARP Request).'
      }
    },
    partD: {
      day: 4,
      title: 'Day 4 Ethernet & MAC Knowledge Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q4-1',
          question: 'How many bits and bytes are in a standard MAC address?',
          type: 'multiple-choice',
          options: ['32 bits (4 bytes)', '48 bits (6 bytes)', '64 bits (8 bytes)', '128 bits (16 bytes)'],
          correctAnswer: 1,
          explanation: 'A standard IEEE 802 MAC address is 48 bits (6 bytes / 12 hexadecimal digits) in length.'
        },
        {
          id: 'q4-2',
          question: 'What is the Ethernet broadcast MAC address?',
          type: 'multiple-choice',
          options: ['00:00:00:00:00:00', '255.255.255.255', 'FF:FF:FF:FF:FF:FF', '01:00:5E:00:00:01'],
          correctAnswer: 2,
          explanation: 'The Layer 2 broadcast address is FF:FF:FF:FF:FF:FF (all 48 bits set to 1).'
        },
        {
          id: 'q4-3',
          question: 'What happens to the Layer 2 MAC addresses when a packet crosses a router into another network?',
          type: 'multiple-choice',
          options: [
            'They remain unchanged from source to final destination',
            'The router strips the old L2 frame and writes new source/destination MAC addresses for the next hop',
            'The router converts the MAC addresses into IPv6',
            'The frame is encrypted and preserved'
          ],
          correctAnswer: 1,
          explanation: 'MAC addresses are strictly hop-to-hop local. Every router strips the incoming Layer 2 frame and generates a new Layer 2 frame with its own outgoing MAC and the next-hop MAC.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'MAC addresses are 48 bits long, formatted as 12 hexadecimal characters.',
        'The first 24 bits represent the vendor OUI; the last 24 bits identify the NIC.',
        'Ethernet frames include a 4-byte FCS (CRC-32) trailer to detect transmission errors.',
        'Standard Ethernet payload MTU is 1500 bytes.',
        'MAC addresses only exist on local Layer 2 broadcast domains; routers rewrite them at each hop.'
      ],
      threeCommonMistakes: [
        'Believing MAC addresses guarantee identity (they can be easily spoofed).',
        'Searching for an external public website by its MAC address in a firewall.',
        'Assuming a switch modifies the source MAC address when forwarding a frame (switches forward untouched).'
      ],
      miniScenario: {
        scenario: 'A SOC analyst discovers two different IP addresses (192.168.1.10 and 192.168.1.1) sharing the exact same MAC address `b4:2e:99:a1:02:f4` in the network switch logs.',
        question: 'What type of attack does this symptom strongly indicate?',
        answer: 'ARP Cache Poisoning / ARP Spoofing attack.',
        explanation: 'In an ARP spoofing attack, an attacker advertises their own MAC address as belonging to the default gateway (192.168.1.1), intercepting all client traffic.'
      },
      flashcardIds: ['fc-d4-1', 'fc-d4-2', 'fc-d4-3']
    }
  },

  5: {
    day: 5,
    title: 'Switching & Forwarding',
    partA: {
      summary: 'Network switches are Layer 2 multi-port bridges that learn connected device MAC addresses dynamically and forward frames intelligently between switch ports, eliminating collision domains.',
      sections: [
        {
          heading: 'How a Switch Learns MAC Addresses',
          content: 'A switch begins with an empty MAC Address Table (also called Content Addressable Memory or CAM Table). It learns by inspecting the **SOURCE MAC** address of incoming frames.',
          diagram: `Incoming Frame on Port 1: [ Dest: Host B (Unknown) | Source: Host A (00:AA) ]
1. Switch learns: Port 1 = Host A (00:AA) -> writes to CAM table
2. Switch checks Destination (Host B): Not found in CAM table
3. Switch FLOODS frame out Ports 2, 3, 4 (all ports except ingress Port 1)`
        },
        {
          heading: 'The Three Forwarding Decisions',
          content: 'For every received frame, the switch performs one of three actions:\n\n1. **Forward**: If Destination MAC is in CAM table and on a different port, forward exclusively out that port.\n2. **Filter / Drop**: If Destination MAC is on the same port where it arrived, drop it (traffic is already on that segment).\n3. **Flood**: If Destination MAC is unknown unicast OR broadcast (FF:FF:FF:FF:FF:FF), copy and send out all ports except the arrival port.',
          table: {
            headers: ['Frame Type', 'Destination in CAM Table?', 'Switch Action', 'Ports Transmitted'],
            rows: [
              ['Known Unicast', 'Yes', 'Forward', 'Single specific egress port'],
              ['Unknown Unicast', 'No', 'Flood (Unknown Unicast Flood)', 'All ports in VLAN except ingress port'],
              ['Broadcast', 'N/A (FF:FF:FF:FF:FF:FF)', 'Flood', 'All ports in VLAN except ingress port'],
              ['Multicast', 'Without IGMP snooping', 'Flood', 'All ports in VLAN except ingress port']
            ]
          }
        },
        {
          heading: 'Collision Domains vs Broadcast Domains',
          content: 'A foundational concept for CCNA and network design:\n\n- **Collision Domain**: A network segment where packets can collide if sent simultaneously. Each switch port is its own separate collision domain (running full-duplex).\n- **Broadcast Domain**: The set of all devices that receive a broadcast frame emitted by any member. A standard switch contains one single broadcast domain unless segmented into VLANs.\n- **Routers break up broadcast domains; switches break up collision domains.**'
        }
      ]
    },
    partB: {
      whyItExists: 'Legacy hubs repeated electrical signals indiscriminately to all ports, creating massive collisions, half-duplex slowness, and allowing any connected user to sniff everyone’s traffic.',
      problemSolved: 'Switches provide dedicated full-duplex bandwidth per port, eliminate packet collisions, and prevent basic casual sniffing by sending frames only to the intended recipient.',
      behindTheScenes: 'CAM tables use specialized high-speed hardware memory that can search the entire table in a single clock cycle. MAC table entries have an inactivity aging timer (default 300 seconds on Cisco switches).',
      commonMistakes: [
        'Believing a switch learns from the Destination MAC (switches learn ONLY from the Source MAC of incoming frames).',
        'Confusing an unknown unicast flood with a broadcast (unknown unicast is meant for one host whose port is not yet known).',
        'Thinking switches stop broadcast storms (switches happily flood broadcasts; only routers or VLANs stop broadcasts).'
      ],
      socCybersecurityRelevance: {
        title: 'MAC Flooding (CAM Table Exhaustion Attack)',
        description: 'An attacker uses tools like `macof` to flood a switch port with hundreds of thousands of fake random MAC addresses within seconds.',
        investigationTip: 'Once the CAM table fills to capacity, the switch fails open into "hub mode", flooding all subsequent traffic to every port! Attackers then sniff all sensitive traffic. Mitigate with Port Security (`switchport port-security`).'
      }
    },
    partC: {
      title: 'Lab 5: Interactive MAC Table Learning Simulator',
      instructions: 'Track the contents of a switch CAM table across a sequence of frame arrivals and predict forwarding actions.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'Port 1 receives frame from MAC-A to MAC-B (empty table). Next, Port 2 receives frame from MAC-B to MAC-A.',
        hints: ['On step 1, MAC-A is recorded, frame is flooded', 'On step 2, MAC-B is recorded, frame is forwarded to Port 1'],
        solutionExplanation: 'After step 1, CAM table has: Port 1 -> MAC-A. Frame flooded. After step 2, CAM table has: Port 1 -> MAC-A, Port 2 -> MAC-B. Because MAC-A is now known, the frame is cleanly forwarded to Port 1 without flooding.'
      }
    },
    partD: {
      day: 5,
      title: 'Day 5 Switching & CAM Table Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q5-1',
          question: 'How does a switch learn which MAC address belongs to which port?',
          type: 'multiple-choice',
          options: [
            'By querying the DNS server',
            'By reading the Source MAC address on incoming frames',
            'By reading the Destination MAC address on incoming frames',
            'By running ping sweeps'
          ],
          correctAnswer: 1,
          explanation: 'A switch inspects the Source MAC address of every incoming frame and binds that MAC to the receiving ingress port in its CAM table.'
        },
        {
          id: 'q5-2',
          question: 'What does a switch do when it receives a frame with a Destination MAC that is NOT present in its CAM table?',
          type: 'multiple-choice',
          options: [
            'Drops the frame immediately',
            'Sends an ICMP error message back to the sender',
            'Floods the frame out all ports in the VLAN except the ingress port',
            'Routes the frame to the default gateway'
          ],
          correctAnswer: 2,
          explanation: 'When a switch encounters an unknown unicast destination, it floods the frame out all ports belonging to that VLAN except the receiving port.'
        },
        {
          id: 'q5-3',
          question: 'Which device separates broadcast domains?',
          type: 'multiple-choice',
          options: ['Hub', 'Layer 2 Switch', 'Router', 'Repeater'],
          correctAnswer: 2,
          explanation: 'Routers do not forward broadcast frames by default, terminating the broadcast domain. Switches only separate collision domains unless configured with VLANs.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'Switches maintain a CAM table mapping MAC addresses to physical switch ports.',
        'Switches learn dynamically from Source MACs and forward based on Destination MACs.',
        'Three switch actions: Forward, Filter/Drop, and Flood.',
        'Each switch port is a dedicated collision domain running full-duplex.',
        'Routers break up broadcast domains; standard switches forward broadcasts to all ports.'
      ],
      threeCommonMistakes: [
        'Assuming switches read IP packets during normal Layer 2 switching.',
        'Thinking a switch drops unknown destination frames.',
        'Believing MAC table entries remain forever without expiration (they expire after 300s of inactivity).'
      ],
      miniScenario: {
        scenario: 'A network administrator notices that all switch link lights are flickering at 100% capacity and network responsiveness has slowed to a crawl across the entire office floor.',
        question: 'What switching phenomenon has occurred?',
        answer: 'A Broadcast Storm (or Switching Loop).',
        explanation: 'If redundant physical links are connected between switches without Spanning Tree Protocol (STP) enabled, broadcast and flooded frames circulate endlessly, multiplying and exhausting all bandwidth.'
      },
      flashcardIds: ['fc-d5-1', 'fc-d5-2', 'fc-d5-3']
    }
  },

  6: {
    day: 6,
    title: 'IP Addressing Introduction',
    partA: {
      summary: 'Internet Protocol (IP) addressing provides hierarchical logical addressing at Layer 3, enabling packets to navigate globally across heterogeneous networks and routers.',
      sections: [
        {
          heading: 'IPv4 Address Anatomy',
          content: 'An IPv4 address is 32 bits long, divided into four 8-bit octets separated by dots (e.g. `192.168.1.10`). Each octet ranges from 0 to 255 (2^8 = 256 possibilities).\n\nEvery IP address consists of two parts:\n1. **Network Portion**: Identifies the specific network/subnet the device belongs to.\n2. **Host Portion**: Identifies the unique host interface within that subnet.',
          diagram: `IP Address: 192 . 168 . 1 . 10  (/24)
Binary:     11000000.10101000.00000001 . 00001010
            └────────────────────────┘   └──────┘
                 Network Portion (24b)    Host (8b)`
        },
        {
          heading: 'RFC 1918 Private vs Public IP Addresses',
          content: 'Because 32-bit IPv4 only yields ~4.29 billion addresses, RFC 1918 reserved three non-routable private IP blocks for internal networks. Private IPs are never routed across the public Internet.',
          table: {
            headers: ['Class / Range', 'CIDR Block', 'Address Range', 'Total Addresses', 'Typical Use Case'],
            rows: [
              ['Class A Private', '10.0.0.0/8', '10.0.0.0 - 10.255.255.255', '16,777,216', 'Large enterprise networks, cloud VPCs'],
              ['Class B Private', '172.16.0.0/12', '172.16.0.0 - 172.31.255.255', '1,048,576', 'Medium-sized organizations, lab environments'],
              ['Class C Private', '192.168.0.0/16', '192.168.0.0 - 192.168.255.255', '65,536', 'Small businesses, home networks, Wi-Fi routers']
            ]
          }
        },
        {
          heading: 'Special Purpose IPv4 Addresses',
          content: 'Key addresses with reserved behavior every networking engineer must recognize instantly:',
          table: {
            headers: ['Address / Range', 'Name', 'Description & Behavior'],
            rows: [
              ['127.0.0.1 (127.0.0.0/8)', 'Loopback Address', 'Routes internally back to the local host TCP/IP stack (localhost) for testing without hitting a wire.'],
              ['169.254.0.0/16', 'APIPA (Link-Local)', 'Automatic Private IP Addressing. Assigned automatically by Windows/macOS when a DHCP server fails to respond.'],
              ['0.0.0.0', 'Unspecified / Default Route', 'Represents "any network" when configuring default static routes, or "this host" before receiving a DHCP lease.'],
              ['255.255.255.255', 'Limited Broadcast', 'Layer 3 broadcast sent to all hosts on the local physical network segment. Never routed beyond local subnet.']
            ]
          }
        }
      ]
    },
    partB: {
      whyItExists: 'MAC addresses are flat and physical; switches would need tables containing billions of MACs to forward traffic worldwide. IP addresses are hierarchical (like country, zip code, street), allowing routers to summarize millions of hosts into a single route entry.',
      problemSolved: 'Scalable worldwide routing, network segmentation, and logical isolation regardless of what physical network card or cable is used.',
      behindTheScenes: 'A host determines whether a destination is local or remote by performing a bitwise logical AND operation between its own IP and subnet mask, and between the destination IP and subnet mask. If they match, it sends locally via ARP; if different, it sends to the Default Gateway.',
      commonMistakes: [
        'Confusing private IP ranges (e.g. thinking 172.32.0.0 is private; private Class B stops at 172.31.255.255).',
        'Assuming a computer with a 169.254.x.x IP address has Internet connectivity (APIPA means DHCP failed!).',
        'Believing loopback 127.0.0.1 transmits frames over the Ethernet cable (it never leaves the kernel).'
      ],
      socCybersecurityRelevance: {
        title: 'Triage Indicator: Detecting Failed DHCP & IP Spoofing',
        description: 'When users submit tickets claiming "the Internet is broken", checking for a 169.254.x.x address immediately identifies a DHCP failure.',
        investigationTip: 'In firewall logs, if an inbound packet arrives on the external WAN interface with a Source IP in the RFC 1918 range (e.g. 10.x or 192.168.x), it is spoofed! RFC 2827 ingress filtering (BCP 38) should drop it immediately.'
      }
    },
    partC: {
      title: 'Lab 6: IP Classification & Address Range Drill',
      instructions: 'Classify given IP addresses as Public, RFC 1918 Private, Loopback, APIPA, or Broadcast.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'Analyze: 172.20.14.5, 8.8.8.8, 169.254.12.99, 127.0.0.1, 192.168.100.1, 203.0.113.50.',
        hints: ['172.16-172.31 is private', '169.254 is APIPA', '127 is loopback'],
        solutionExplanation: '172.20.14.5 is Private (Class B). 8.8.8.8 is Public (Google DNS). 169.254.12.99 is APIPA. 127.0.0.1 is Loopback. 192.168.100.1 is Private (Class C). 203.0.113.50 is Public.'
      }
    },
    partD: {
      day: 6,
      title: 'Day 6 IP Addressing Fundamentals Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q6-1',
          question: 'Which of the following IP addresses falls within an RFC 1918 private range?',
          type: 'multiple-choice',
          options: ['11.0.4.1', '172.32.10.1', '192.168.50.25', '169.254.1.1'],
          correctAnswer: 2,
          explanation: '192.168.50.25 is in the 192.168.0.0/16 private range. 172.32.x.x is public (private Class B ends at 172.31.255.255).'
        },
        {
          id: 'q6-2',
          question: 'If a Windows workstation boots up and is assigned the IP address 169.254.88.102, what does this indicate?',
          type: 'multiple-choice',
          options: [
            'It connected successfully to the high-speed fiber gateway',
            'It failed to contact a DHCP server and assigned itself an APIPA address',
            'It is currently participating in a multicast video stream',
            'Its network card has suffered permanent hardware failure'
          ],
          correctAnswer: 1,
          explanation: '169.254.0.0/16 is the APIPA (Automatic Private IP Addressing) block, self-assigned when a device cannot reach a DHCP server.'
        },
        {
          id: 'q6-3',
          question: 'What is the purpose of the 127.0.0.1 loopback address?',
          type: 'multiple-choice',
          options: [
            'To test internal TCP/IP protocol stack functionality without sending traffic on physical wire',
            'To broadcast messages to every workstation on the LAN',
            'To communicate with the nearest ISP router',
            'To establish an encrypted tunnel to the cloud'
          ],
          correctAnswer: 0,
          explanation: '127.0.0.1 loops traffic straight back to the local operating system kernel to test the TCP/IP stack.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'IPv4 addresses are 32 bits divided into four 8-bit octets (0-255).',
        'RFC 1918 Private Ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.',
        'Private addresses cannot route on the public Internet without NAT.',
        '169.254.0.0/16 indicates DHCP failure (APIPA).',
        '127.0.0.1 is the local loopback address for internal host testing.'
      ],
      threeCommonMistakes: [
        'Assuming 172.16 through 172.255 are all private (only 172.16.0.0 through 172.31.255.255 are private).',
        'Believing public IP addresses can be chosen arbitrarily on internal networks without causing routing collisions.',
        'Confusing an IP address with a MAC address.'
      ],
      miniScenario: {
        scenario: 'A helpdesk technician sees that an executive laptop cannot reach internal file shares. Running `ipconfig` shows IPv4 Address: `169.254.40.12`. The technician recommends replacing the laptop motherboard.',
        question: 'Is the technician’s diagnosis correct? What is the actual problem?',
        answer: 'Diagnosis is incorrect; the laptop has an APIPA address caused by DHCP failure.',
        explanation: 'An APIPA address (169.254.x.x) indicates the laptop network card is functioning, but no DHCP server answered the DHCP Discover broadcast (e.g. disconnected cable, bad Wi-Fi credentials, or exhausted DHCP pool).'
      },
      flashcardIds: ['fc-d6-1', 'fc-d6-2', 'fc-d6-3']
    }
  },

  7: {
    day: 7,
    title: 'Week 1 Review & Practical Lab',
    partA: {
      summary: 'Week 1 synthesis: Consolidation of computer network models, the 7 OSI layers, TCP/IP 4 layers, encapsulation mechanics, Ethernet framing, MAC learning, and IP addressing into a unified packet journey.',
      sections: [
        {
          heading: 'The Complete End-to-End Packet Journey',
          content: 'Follow an HTTP request from a client PC to an external Web Server across a switch and router:',
          diagram: `[ PC1: 192.168.1.10 ] (MAC: AA:AA)
        │
        ▼  (Layer 2 frame with Dest MAC: Gateway CC:CC)
[ Switch SW1 ] (Inspects CAM: forwards to router port)
        │
        ▼
[ Router R1 Default Gateway ] (MAC: CC:CC, IP: 192.168.1.1)
  - Strips Layer 2 Ethernet Frame
  - Inspects Layer 3 IP Packet (Dest IP: 203.0.113.50)
  - Looks up Routing Table -> Finds outgoing WAN interface
  - Re-encapsulates with new L2 header (Source: R1 WAN MAC, Dest: Next-Hop MAC)
        │
        ▼
[ Internet / WAN Cloud ]
        │
        ▼
[ Web Server: 203.0.113.50 ]`
        },
        {
          heading: 'Week 1 Core Concept Matrix',
          content: 'A rapid review comparison between key concepts mastered this week:',
          table: {
            headers: ['Dimension', 'Layer 2 (Data Link)', 'Layer 3 (Network)', 'Layer 4 (Transport)'],
            rows: [
              ['Address Type', '48-bit MAC Address (Physical)', '32-bit IPv4 / 128-bit IPv6 (Logical)', '16-bit Port Numbers (Application Multiplexing)'],
              ['Scope', 'Local single link / broadcast domain', 'End-to-end multi-hop across global internet', 'Process-to-process communication on endpoints'],
              ['Primary Device', 'Switch, Access Point, NIC', 'Router, Layer 3 Switch', 'Firewall, End-host OS Kernel'],
              ['PDU Unit', 'Frame (with FCS trailer)', 'Packet', 'Segment (TCP) or Datagram (UDP)'],
              ['Address Lifespan', 'Burned into hardware (OUI + vendor)', 'Configured dynamically via DHCP or static', 'Assigned dynamically per active socket connection']
            ]
          }
        }
      ]
    },
    partB: {
      whyItExists: 'Networking fundamentals cannot be learned in isolated silos. High-performing network and security engineers mentally visualize the entire stack from physical electrons up to application payloads instantaneously.',
      problemSolved: 'Transforms theoretical memorization into diagnostic intuition. When an alert fires or connection drops, you can instantly trace which device along the path made the drop decision.',
      behindTheScenes: 'At each router along the path, the TTL (Time to Live) field in the IPv4 header is decremented by 1, and the IPv4 header checksum is recalculated. The original Source IP and Destination IP never change (unless traversing NAT).',
      commonMistakes: [
        'Thinking the source MAC address remains unchanged all the way to a web server across the Internet.',
        'Believing switches inspect IP packet headers.',
        'Forgetting that routers break broadcast domains and do not forward Layer 2 broadcasts.'
      ],
      socCybersecurityRelevance: {
        title: 'SOC Triage: Tracing Multi-Hop Lateral Movement',
        description: 'Attackers pivot through internal networks. A SOC analyst must correlate switch MAC address logs, router NetFlow logs, and host endpoint logs to reconstruct an attacker’s exact movement path.',
        investigationTip: 'When inspecting firewall logs, verify whether the logged IP is the true endpoint or a NAT/Proxy IP. Always check the Layer 2 MAC address on the local segment to identify the exact physical NIC involved.'
      }
    },
    partC: {
      title: 'Lab 7: Complete Packet Flow & Diagnostic Topology',
      instructions: 'Trace a packet from PC1 (192.168.1.5) through Switch 1 to Router 1 to Internet Server (93.184.216.34) and verify all L2 and L3 header transformations.',
      type: 'packet-flow',
      drillConfig: {
        scenario: 'PC1 wants to send data to 93.184.216.34. Gateway is 192.168.1.1.',
        hints: [
          'Destination IP is 93.184.216.34',
          'Destination MAC on the local wire is the Gateway MAC, NOT the server MAC'
        ],
        solutionExplanation: 'PC1 determines 93.184.216.34 is remote. It looks up its Default Gateway (192.168.1.1) in its ARP table to find Gateway MAC. Frame leaves PC1 with: Dest MAC = Gateway, Dest IP = 93.184.216.34. Router receives frame, strips L2, routes L3, rewrites L2 for next hop.'
      }
    },
    partD: {
      day: 7,
      title: 'Week 1 Comprehensive Diagnostic Examination (30 Questions Concept)',
      passingScore: 80,
      questions: [
        {
          id: 'q7-1',
          question: 'When PC-A sends a packet to a web server on a remote network, what is the destination MAC address of the Ethernet frame leaving PC-A?',
          type: 'multiple-choice',
          options: [
            'The MAC address of the remote web server',
            'The MAC address of PC-A default gateway (router)',
            'FF:FF:FF:FF:FF:FF broadcast MAC',
            '00:00:00:00:00:00'
          ],
          correctAnswer: 1,
          explanation: 'PC-A cannot send Layer 2 frames across a router. To reach a remote IP, PC-A encapsulates the packet in a frame addressed to the Layer 2 MAC address of its Default Gateway.'
        },
        {
          id: 'q7-2',
          question: 'Which sequence correctly represents data encapsulation from top to bottom?',
          type: 'multiple-choice',
          options: [
            'Data -> Segment -> Packet -> Frame -> Bits',
            'Bits -> Frame -> Packet -> Segment -> Data',
            'Data -> Packet -> Segment -> Frame -> Bits',
            'Frame -> Packet -> Segment -> Data -> Bits'
          ],
          correctAnswer: 0,
          explanation: 'Encapsulation proceeds top-down: Application Data -> Layer 4 Segment -> Layer 3 Packet -> Layer 2 Frame -> Layer 1 Bits.'
        },
        {
          id: 'q7-3',
          question: 'What happens to the Time to Live (TTL) field in an IPv4 packet header when it passes through a router?',
          type: 'multiple-choice',
          options: [
            'It is increased by 1',
            'It is decreased by 1',
            'It is reset to 255',
            'It remains unchanged'
          ],
          correctAnswer: 1,
          explanation: 'Every Layer 3 router decrements the TTL field by 1. If TTL hits 0, the router discards the packet and sends an ICMP Time Exceeded message back to the sender, preventing infinite routing loops.'
        },
        {
          id: 'q7-4',
          question: 'Which of the following describes the function of a Layer 2 switch CAM table?',
          type: 'multiple-choice',
          options: [
            'Maps IP addresses to URL domain names',
            'Maps physical switch ports to learned MAC addresses',
            'Stores routing paths to remote subnets',
            'Encrypts wireless transmission channels'
          ],
          correctAnswer: 1,
          explanation: 'A Content Addressable Memory (CAM) table stores the mapping of MAC addresses to specific physical switch ports.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'Ethernet frames carry local MAC addresses; IP packets carry end-to-end logical IP addresses.',
        'Switches forward using CAM tables; routers forward using IP routing tables.',
        'Routers strip and rebuild the Layer 2 frame at every single hop along the transmission path.',
        'Each router decrements the IPv4 TTL field by 1 to prevent infinite routing loops.',
        'A host sends traffic to its Default Gateway whenever the destination IP is on a different subnet.'
      ],
      threeCommonMistakes: [
        'Believing the destination MAC address in a frame is the web server’s MAC when browsing the Internet.',
        'Confusing broadcast domains (bounded by routers) with collision domains (bounded by switch ports).',
        'Thinking encapsulation occurs on routers (routers perform decapsulation and re-encapsulation).'
      ],
      miniScenario: {
        scenario: 'A workstation at 192.168.1.50 can ping 192.168.1.1 (its default gateway), but cannot ping 8.8.8.8. A neighbor workstation on the same switch with IP 192.168.1.51 CAN ping 8.8.8.8 without any issues.',
        question: 'What is the most likely misconfiguration on workstation 192.168.1.50?',
        answer: 'Incorrect Default Gateway configured or incorrect subnet mask on workstation 192.168.1.50.',
        explanation: 'Because the neighbor works, the router and ISP link are fine. Because 192.168.1.50 can ping 192.168.1.1, local Layer 2 is working. But if 192.168.1.50 has an erroneous gateway or a subnet mask that misinterprets external IPs as local, it fails to send packets to the router for forwarding.'
      },
      flashcardIds: ['fc-d7-1', 'fc-d7-2', 'fc-d7-3', 'fc-d7-4']
    }
  }
};
