import { LessonContent } from '../../types';

export const WEEK2_LESSONS: Record<number, LessonContent> = {
  8: {
    day: 8,
    title: 'IPv4 Addressing & CIDR',
    partA: {
      summary: 'Classless Inter-Domain Routing (CIDR) replaced rigid address classes (A, B, C) with flexible prefix notation, enabling efficient IP address allocation and route aggregation.',
      sections: [
        {
          heading: 'Historical Address Classes vs CIDR',
          content: 'In early networking, IP addresses were rigidly classful based on leading bits:',
          table: {
            headers: ['Class', 'Leading Bits', 'First Octet Range', 'Default Subnet Mask', 'CIDR Equivalent', 'Hosts Per Network'],
            rows: [
              ['Class A', '0', '1 - 126', '255.0.0.0', '/8', '16,777,214 hosts'],
              ['Class B', '10', '128 - 191', '255.255.0.0', '/16', '65,534 hosts'],
              ['Class C', '110', '192 - 223', '255.255.255.0', '/24', '254 hosts'],
              ['Class D', '1110', '224 - 239', 'N/A (Multicast)', 'N/A', 'Reserved for multicast groups'],
              ['Class E', '1111', '240 - 255', 'N/A (Experimental)', 'N/A', 'Reserved for research']
            ]
          }
        },
        {
          heading: 'CIDR Prefix Notation & The Math',
          content: 'CIDR (introduced in 1993 by RFC 1519) allows subnet masks to break on any arbitrary bit boundary.\n\n- Prefix notation `/<n>` indicates that the first `n` bits are the **Network Portion**.\n- Since IPv4 has 32 bits, the number of **Host Bits** is `h = 32 - n`.\n- **Total IP Addresses** in the block: `2^h`\n- **Usable Host Addresses**: `2^h - 2` (subtracting Network ID and Broadcast ID).',
          diagram: `Example: 192.168.10.0/27
- Prefix n = 27
- Host bits h = 32 - 27 = 5
- Total IPs = 2^5 = 32
- Usable Hosts = 32 - 2 = 30 hosts
- Network ID: 192.168.10.0
- First Usable: 192.168.10.1
- Last Usable: 192.168.10.30
- Broadcast ID: 192.168.10.31`
        }
      ]
    },
    partB: {
      whyItExists: 'Without CIDR, global routing tables would have exploded in size, and IPv4 address space would have been completely exhausted by the mid-1990s due to huge wasted Class A and Class B blocks.',
      problemSolved: 'Enables route summarization (supernetting) and allows organizations to request exact sized address blocks (/28, /29, /30) matching real host needs.',
      behindTheScenes: 'Routers maintain CIDR prefixes in their forwarding information base (FIB) and match packet destinations using hardware TCAM for longest prefix match.',
      commonMistakes: [
        'Forgetting to subtract 2 for usable hosts (Network address and Broadcast address cannot be assigned to hosts).',
        'Assuming a /24 can only begin with 192.x (in CIDR, any address block can use any prefix length, e.g. 10.1.2.0/24).',
        'Confusing total address capacity with usable host capacity.'
      ],
      socCybersecurityRelevance: {
        title: 'CIDR Scoping in Firewall Rules & AWS/Azure Security Groups',
        description: 'Writing `0.0.0.0/0` in a firewall rule permits the entire public Internet to connect.',
        investigationTip: 'Always audit access control lists (ACLs) for overly broad CIDR prefixes (e.g. allowing `10.0.0.0/8` when only `10.5.12.0/24` was intended). Narrow CIDR scopes prevent lateral movement.'
      }
    },
    partC: {
      title: 'Lab 8: CIDR Host Capacity & Boundary Calculator',
      instructions: 'Calculate the total addresses, usable hosts, and host bits for /24, /26, /28, and /30 subnets.',
      type: 'subnet-calculator',
      drillConfig: {
        scenario: 'An enterprise branch requires 25 host workstations and 1 printer (total 26 hosts). What is the tightest CIDR prefix that can accommodate this?',
        hints: ['Find power of 2 where (2^h - 2) >= 26', '2^5 - 2 = 30', 'Prefix is 32 - 5 = /27'],
        solutionExplanation: 'A /27 subnet provides 5 host bits: 2^5 = 32 total addresses, 30 usable hosts. 30 >= 26, leaving 4 spare IP addresses. A /28 only provides 14 usable hosts, which is insufficient.'
      }
    },
    partD: {
      day: 8,
      title: 'Day 8 IPv4 & CIDR Calculation Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q8-1',
          question: 'How many usable host IP addresses are available in a /28 subnet?',
          type: 'multiple-choice',
          options: ['16', '14', '30', '6'],
          correctAnswer: 1,
          explanation: '32 - 28 = 4 host bits. 2^4 = 16 total addresses. Subtract 2 for network and broadcast: 16 - 2 = 14 usable hosts.'
        },
        {
          id: 'q8-2',
          question: 'Why are two addresses subtracted when calculating usable hosts on a standard IPv4 subnet?',
          type: 'multiple-choice',
          options: [
            'Reserved for the router and the DNS server',
            'Reserved for the Network Address and the Broadcast Address',
            'Reserved for DHCP leases',
            'Reserved for IPv6 compatibility'
          ],
          correctAnswer: 1,
          explanation: 'The all-zeros host portion is the Network ID, and the all-ones host portion is the Broadcast ID. Neither can be assigned to a host interface.'
        },
        {
          id: 'q8-3',
          question: 'Which CIDR prefix provides exactly 2 usable host IP addresses, commonly used for point-to-point router links?',
          type: 'multiple-choice',
          options: ['/28', '/29', '/30', '/31'],
          correctAnswer: 2,
          explanation: 'A /30 prefix provides 2 host bits: 2^2 = 4 total IPs. Subtracting 2 yields exactly 2 usable host addresses, ideal for dual-ended point-to-point links.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'CIDR notation expresses the number of network bits using a slash prefix (e.g. /24).',
        'Host bits formula: h = 32 - prefix.',
        'Usable host formula: 2^h - 2.',
        'Address classes (A, B, C) are obsolete; CIDR is the standard in modern networking.',
        '/30 is historically used for point-to-point links (2 usable hosts).'
      ],
      threeCommonMistakes: [
        'Assigning the network address or broadcast address to a server or router interface.',
        'Thinking /24 means only 24 total computers can connect (it means 24 network bits, leaving 254 hosts!).',
        'Confusing subnet mask dotted decimal with IP addresses.'
      ],
      miniScenario: {
        scenario: 'A junior administrator configures a server with IP `192.168.5.127/25`. The server cannot communicate with any host on the network and triggers an invalid IP error.',
        question: 'Why is `192.168.5.127/25` invalid for a host?',
        answer: '192.168.5.127 is the broadcast address for the 192.168.5.0/25 subnet.',
        explanation: 'In a /25 subnet, block size is 128. Range is 192.168.5.0 to 192.168.5.127. The last address (.127) is the directed broadcast address and cannot be assigned to an interface.'
      },
      flashcardIds: ['fc-d8-1', 'fc-d8-2', 'fc-d8-3']
    }
  },

  9: {
    day: 9,
    title: 'Binary & Subnetting Fundamentals',
    partA: {
      summary: 'All network hardware operates strictly in binary logic. Mastering the 8-bit octet values enables instantaneous mental subnetting and bitwise AND calculations.',
      sections: [
        {
          heading: 'The 8-Bit Positional Power Values',
          content: 'An octet contains 8 bits, with powers of 2 from 2^7 down to 2^0:',
          table: {
            headers: ['Bit Position', 'Bit 7', 'Bit 6', 'Bit 5', 'Bit 4', 'Bit 3', 'Bit 2', 'Bit 1', 'Bit 0'],
            rows: [
              ['Decimal Value', '128', '64', '32', '16', '8', '4', '2', '1'],
              ['Binary 192', '1', '1', '0', '0', '0', '0', '0', '0'],
              ['Binary 224', '1', '1', '1', '0', '0', '0', '0', '0'],
              ['Binary 240', '1', '1', '1', '1', '0', '0', '0', '0'],
              ['Binary 248', '1', '1', '1', '1', '1', '0', '0', '0'],
              ['Binary 252', '1', '1', '1', '1', '1', '1', '0', '0']
            ]
          }
        },
        {
          heading: 'The 8 Subnet Mask Octet Values',
          content: 'Because subnet mask bits must be continuous consecutive 1s followed by consecutive 0s, an octet in a subnet mask can ONLY ever take one of these 8 values:\n\n- `10000000` = **128** (/25 or /17 or /9)\n- `11000000` = **192** (/26 or /18 or /10)\n- `11100000` = **224** (/27 or /19 or /11)\n- `11110000` = **240** (/28 or /20 or /12)\n- `11111000` = **248** (/29 or /21 or /13)\n- `11111100` = **252** (/30 or /22 or /14)\n- `11111110` = **254** (/31 or /23 or /15)\n- `11111111` = **255** (/32 or /24 or /16 or /8)',
          diagram: `Bitwise ANDing Example:
Host IP:     192.168.1.130  ->  11000000.10101000.00000001.10000010
Subnet Mask: 255.255.255.192 -> 11111111.11111111.11111111.11000000
---------------------------------------------------------------------
Network ID:  192.168.1.128  ->  11000000.10101000.00000001.10000000`
        }
      ]
    },
    partB: {
      whyItExists: 'Routers do not perform human base-10 mathematics. They evaluate millions of packets per second by applying bitwise AND masks directly to binary destination IP values in hardware registers.',
      problemSolved: 'Guarantees nanosecond routing decisions and mathematically separates contiguous IP ranges without ambiguity.',
      behindTheScenes: 'A bitwise AND compares two bits: only 1 AND 1 results in 1; any combination involving 0 results in 0. Masking with 1s preserves the network bits; masking with 0s zeroes out the host bits, revealing the exact Network ID.',
      commonMistakes: [
        'Having non-contiguous 1s in a subnet mask (e.g. 255.255.240.128 is mathematically illegal).',
        'Miscalculating the cumulative bit values (e.g. writing 226 instead of 224).',
        'Trying to convert all 4 octets when only the interesting octet (the one with partial 1s) changes.'
      ],
      socCybersecurityRelevance: {
        title: 'NIDS Rule Optimization & Honeynet Scoping',
        description: 'Snort, Suricata, and Zeek rules use CIDR masks to monitor internal subnets (e.g. `$HOME_NET [192.168.1.0/24,10.0.0.0/8]`).',
        investigationTip: 'If your NIDS `$HOME_NET` variable has an incorrect CIDR mask, external attacks will be misclassified as internal traffic or silently ignored!'
      }
    },
    partC: {
      title: 'Lab 9: Decimal to Binary & Bitwise ANDing Drill',
      instructions: 'Convert decimal octets into 8-bit binary and perform bitwise ANDing to find the Network Address.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'Convert IP octet 213 and Subnet Mask octet 224 to binary and determine the resulting network octet.',
        hints: ['213 = 128 + 64 + 16 + 4 + 1', '224 = 128 + 64 + 32'],
        solutionExplanation: '213 is 11010101. 224 is 11100000. Bitwise AND: 11000000, which equals 128 + 64 = 192.'
      }
    },
    partD: {
      day: 9,
      title: 'Day 9 Binary Conversion & Masking Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q9-1',
          question: 'What is the binary representation of decimal 168?',
          type: 'multiple-choice',
          options: ['10101000', '11001000', '10101100', '10011000'],
          correctAnswer: 0,
          explanation: '128 + 32 + 8 = 168. In 8 bits: 1 (128) + 0 (64) + 1 (32) + 0 (16) + 1 (8) + 0 (4) + 0 (2) + 0 (1) = 10101000.'
        },
        {
          id: 'q9-2',
          question: 'Which of the following is a valid subnet mask octet value?',
          type: 'multiple-choice',
          options: ['220', '224', '230', '244'],
          correctAnswer: 1,
          explanation: 'Valid subnet mask values must be contiguous binary ones: 0, 128, 192, 224, 240, 248, 252, 254, 255. 224 is 11100000.'
        },
        {
          id: 'q9-3',
          question: 'What is the dotted decimal subnet mask corresponding to /26?',
          type: 'multiple-choice',
          options: ['255.255.255.128', '255.255.255.192', '255.255.255.224', '255.255.255.240'],
          correctAnswer: 1,
          explanation: 'In /26, the 4th octet has two 1s: 11000000 in binary = 128 + 64 = 192. So the mask is 255.255.255.192.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'An 8-bit octet values: 128, 64, 32, 16, 8, 4, 2, 1.',
        'Subnet masks consist of contiguous binary 1s followed by contiguous binary 0s.',
        'Valid subnet mask octets: 0, 128, 192, 224, 240, 248, 252, 254, 255.',
        'Bitwise ANDing an IP address with its subnet mask produces the Network ID.',
        'Routers use hardware bitwise logic for wire-speed packet forwarding.'
      ],
      threeCommonMistakes: [
        'Attempting to subnet without knowing the 8 positional binary values by heart.',
        'Thinking subnet mask bits can alternate (e.g. 10101010 is never a valid mask).',
        'Confusing the host bits (the 0s in the mask) with network bits (the 1s).'
      ],
      miniScenario: {
        scenario: 'A student is subnetting a network with mask 255.255.255.240. They want to find the increment (block size) to quickly count subnets.',
        question: 'What is the block size for mask 255.255.255.240?',
        answer: 'Block size is 16 (256 - 240 = 16).',
        explanation: 'The "Magic Number" or block size is found by subtracting the interesting octet value from 256: 256 - 240 = 16. Subnets increment in multiples of 16 (0, 16, 32, 48, ...).'
      },
      flashcardIds: ['fc-d9-1', 'fc-d9-2', 'fc-d9-3']
    }
  },

  10: {
    day: 10,
    title: 'Subnetting Mastery & VLSM',
    partA: {
      summary: 'Practical mastery of subnet calculation using the Magic Number method across all prefix lengths (/24 through /30) and Variable Length Subnet Masking (VLSM).',
      sections: [
        {
          heading: 'The Magic Number / Block Size Method',
          content: 'The fastest technique to calculate subnets without converting entire IP addresses to binary:\n\n1. **Identify the interesting octet** (the octet where the mask is neither 255 nor 0).\n2. **Calculate the Block Size**: `Block Size = 256 - [Subnet Mask Octet]`.\n3. **List the Subnet Multiples**: Start at 0 and add the Block Size repeatedly.\n4. **Find the Subnet Boundaries**: Network ID is the lower multiple; Broadcast ID is the next multiple minus 1.',
          table: {
            headers: ['Prefix', 'Mask Octet', 'Block Size', 'Total IPs', 'Usable Hosts', 'Example Multiples'],
            rows: [
              ['/24', '255.255.255.0', '256', '256', '254', '0'],
              ['/25', '255.255.255.128', '128', '128', '126', '0, 128'],
              ['/26', '255.255.255.192', '64', '64', '62', '0, 64, 128, 192'],
              ['/27', '255.255.255.224', '32', '32', '30', '0, 32, 64, 96, 128, 160, 192, 224'],
              ['/28', '255.255.255.240', '16', '16', '14', '0, 16, 32, 48, 64, ...'],
              ['/29', '255.255.255.248', '8', '8', '6', '0, 8, 16, 24, 32, ...'],
              ['/30', '255.255.255.252', '4', '4', '2', '0, 4, 8, 12, 16, ...']
            ]
          }
        },
        {
          heading: 'Step-by-Step Problem Walkthrough',
          content: 'Given IP: `192.168.1.140/27`\n- Step 1: Prefix /27 -> Mask is 255.255.255.224 in 4th octet.\n- Step 2: Block Size = 256 - 224 = **32**.\n- Step 3: Multiples: 0, 32, 64, 96, 128, 160. 140 falls between 128 and 160.\n- Step 4:\n  - **Network Address**: `192.168.1.128`\n  - **First Usable**: `192.168.1.129`\n  - **Last Usable**: `192.168.1.158`\n  - **Broadcast Address**: `192.168.1.159`\n  - **Usable Hosts**: 30 hosts.'
        }
      ]
    },
    partB: {
      whyItExists: 'Networks have disparate host requirements: a marketing VLAN might have 50 PCs (/26), a server room might have 12 servers (/28), and a router-to-router link requires only 2 IPs (/30). VLSM prevents massive IP address wastage.',
      problemSolved: 'Enables custom subnet sizing from a single parent network allocation.',
      behindTheScenes: 'When designing with VLSM, always allocate the largest subnets first (descending host requirements) to prevent fragmentation of the address block.',
      commonMistakes: [
        'Overlapping subnets when calculating VLSM blocks.',
        'Forgetting that block size is always a power of 2 (4, 8, 16, 32, 64, 128, 256).',
        'Allocating from the bottom up instead of largest to smallest.'
      ],
      socCybersecurityRelevance: {
        title: 'Microsegmentation & Blast Radius Control',
        description: 'Using small, precise subnets (e.g. /29 for domain controllers) prevents malware from scanning large broadcast segments.',
        investigationTip: 'If an infected host in `10.10.1.0/28` tries to scan IP `10.10.1.35`, the traffic must cross a firewall/router because .35 is in another subnet, generating an immediate firewall log alert.'
      }
    },
    partC: {
      title: 'Lab 10: Timed Subnetting Drill Engine',
      instructions: 'Solve 5 subnetting challenges. For each IP and CIDR, identify the Network Address, First Usable, Last Usable, and Broadcast Address.',
      type: 'subnet-calculator',
      drillConfig: {
        scenario: 'Find all parameters for 10.1.50.77/26 and 172.16.8.210/28.',
        hints: ['For /26 block size is 64', 'For /28 block size is 16'],
        solutionExplanation: 'For 10.1.50.77/26: Multiples of 64 are 0, 64, 128. Network is 10.1.50.64, First is .65, Last is .126, Broadcast is .127. For 172.16.8.210/28: Multiples of 16: 208, 224. Network is 172.16.8.208, First is .209, Last is .222, Broadcast is .223.'
      }
    },
    partD: {
      day: 10,
      title: 'Day 10 Subnetting Mastery Assessment',
      passingScore: 80,
      questions: [
        {
          id: 'q10-1',
          question: 'What is the broadcast address for the network containing host 192.168.10.70/26?',
          type: 'multiple-choice',
          options: ['192.168.10.64', '192.168.10.127', '192.168.10.255', '192.168.10.128'],
          correctAnswer: 1,
          explanation: 'In /26, block size is 64. Subnets: 0, 64, 128. Host 70 is in the 64 subnet. Broadcast is 64 + 64 - 1 = 192.168.10.127.'
        },
        {
          id: 'q10-2',
          question: 'What is the last usable host IP in the subnet 10.0.0.32/28?',
          type: 'multiple-choice',
          options: ['10.0.0.46', '10.0.0.47', '10.0.0.48', '10.0.0.33'],
          correctAnswer: 0,
          explanation: 'In /28, block size is 16. Next subnet is 32 + 16 = 48. Broadcast is 47. Last usable is 48 - 2 = 10.0.0.46.'
        },
        {
          id: 'q10-3',
          question: 'When designing a VLSM scheme, which subnets should be allocated first?',
          type: 'multiple-choice',
          options: [
            'The smallest subnets (point-to-point /30s)',
            'The largest subnets with the highest host requirements',
            'Any random subnet',
            'Subnets with odd network numbers'
          ],
          correctAnswer: 1,
          explanation: 'Always allocate subnets in descending order from largest host requirement to smallest to prevent address fragmentation.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'Block Size = 256 - Subnet Mask Octet (the Magic Number).',
        'Subnet networks always begin on exact multiples of the block size.',
        'Broadcast is always: (Next Network ID) - 1.',
        'Usable host range runs from (Network ID + 1) through (Broadcast ID - 1).',
        'VLSM prevents address waste by customizing mask sizes per department.'
      ],
      threeCommonMistakes: [
        'Thinking 192.168.1.0/24 can be divided into uneven subnets without careful alignment.',
        'Confusing block size with usable host count.',
        'Assigning the network ID or broadcast ID to an actual server interface.'
      ],
      miniScenario: {
        scenario: 'A branch office needs 12 IP phones, 50 employee laptops, and a 2-host router link from a single 192.168.10.0/24 block.',
        question: 'What prefix sizes should be used for each group?',
        answer: 'Laptops: /26 (up to 62 hosts); Phones: /28 (up to 14 hosts); Router link: /30 (2 hosts).',
        explanation: '50 laptops require /26 (2^6 - 2 = 62). 12 phones require /28 (2^4 - 2 = 14). 2 router interfaces require /30 (2^2 - 2 = 2).'
      },
      flashcardIds: ['fc-d10-1', 'fc-d10-2', 'fc-d10-3']
    }
  },

  11: {
    day: 11,
    title: 'TCP & UDP Deep Dive',
    partA: {
      summary: 'The Transport Layer (Layer 4) enables host-to-host process communication using 16-bit port numbers. TCP offers connection-oriented, reliable, ordered delivery; UDP provides lightweight, connectionless datagram delivery.',
      sections: [
        {
          heading: 'TCP vs UDP Comparison',
          content: 'Applications select TCP or UDP based on whether they prioritize reliability or speed:',
          table: {
            headers: ['Feature', 'TCP (Transmission Control Protocol)', 'UDP (User Datagram Protocol)'],
            rows: [
              ['Connection State', 'Connection-oriented (requires handshake)', 'Connectionless (fire-and-forget)'],
              ['Reliability', 'Guaranteed (retransmits dropped segments)', 'Best-effort (no retransmissions)'],
              ['Ordering', 'Sequenced (reassembles in exact order)', 'No ordering (packets may arrive out of order)'],
              ['Flow & Congestion Control', 'Yes (Sliding window, ACK feedback)', 'None'],
              ['Header Overhead', '20 - 60 bytes', '8 bytes fixed'],
              ['Primary Applications', 'Web (HTTP/HTTPS), SSH, FTP, Email, Databases', 'DNS queries, VoIP, Video Streaming, DHCP, SNMP']
            ]
          }
        },
        {
          heading: 'The TCP Three-Way Handshake & Teardown',
          content: 'Before any data can be exchanged over TCP, both endpoints synchronize sequence numbers:',
          diagram: `Connection Establishment (3-Way Handshake):
Client ─── [ SYN (Seq=100) ] ───────────────> Server
Client <── [ SYN-ACK (Seq=500, Ack=101) ] ─── Server
Client ─── [ ACK (Seq=101, Ack=501) ] ──────> Server
Connection ESTABLISHED -> Data flows

Connection Teardown (4-Way Handshake):
Client ─── [ FIN ] ─────────────────────────> Server
Client <── [ ACK ] ───────────────────────── Server
Client <── [ FIN ] ───────────────────────── Server
Client ─── [ ACK ] ─────────────────────────> Server
Connection CLOSED`
        },
        {
          heading: 'The 6 Core TCP Control Flags',
          content: 'TCP flags in the 13th byte of the header dictate connection state:\n\n- **SYN (Synchronize)**: Initiates connection establishment.\n- **ACK (Acknowledgment)**: Acknowledges received segments.\n- **FIN (Finish)**: Graceful connection termination.\n- **RST (Reset)**: Abrupt connection termination / rejects connection.\n- **PSH (Push)**: Forces receiving buffer to push data immediately to application.\n- **URG (Urgent)**: Indicates urgent data pointers.'
        }
      ]
    },
    partB: {
      whyItExists: 'IP is inherently unreliable and best-effort. Packets can drop, duplicate, or arrive out of order. TCP provides an abstraction of an unbroken, reliable, error-free pipe over an imperfect network.',
      problemSolved: 'Eliminates application-level logic for handling packet loss, retransmission timers, and packet re-ordering.',
      behindTheScenes: 'TCP maintains a dynamic "Sliding Window". The receiver advertises its buffer capacity in the Window Size field. If the receiver gets overwhelmed, it drops Window Size to 0, pausing sender transmission (flow control).',
      commonMistakes: [
        'Believing UDP is "bad" because it is unreliable (UDP is essential for low-latency live audio/video and fast DNS queries).',
        'Assuming TCP encrypts data (TCP provides reliability, not confidentiality; TLS must be layered on top).',
        'Thinking RST only happens during attacks (RST is sent legitimately when connecting to a closed port).'
      ],
      socCybersecurityRelevance: {
        title: 'TCP SYN Floods & Stealth Port Scanning',
        description: 'Attackers send millions of SYN packets with spoofed source IPs and never send the final ACK. The server leaves half-open connections in memory until its connection table exhausts (DDoS).',
        investigationTip: 'Nmap SYN Stealth scan (`-sS`) sends SYN, receives SYN-ACK, and immediately replies with RST instead of ACK to avoid establishing a full connection and avoid being logged by naive application servers!'
      }
    },
    partC: {
      title: 'Lab 11: TCP Handshake & Port State Analyzer',
      instructions: 'Inspect packet flag sequences and determine whether a target port is Open, Closed, or Filtered.',
      type: 'packet-flow',
      drillConfig: {
        scenario: 'Client sends SYN to Port 80 -> Receives SYN-ACK. Client sends SYN to Port 23 -> Receives RST-ACK. Client sends SYN to Port 445 -> No reply (timed out).',
        hints: ['SYN-ACK means Open', 'RST means Closed', 'Timeout means Filtered by firewall'],
        solutionExplanation: 'Port 80 is OPEN (completed handshake). Port 23 is CLOSED (service rejected with RST). Port 445 is FILTERED (firewall silently dropped the SYN packet).'
      }
    },
    partD: {
      day: 11,
      title: 'Day 11 TCP/UDP Transport Layer Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q11-1',
          question: 'What is the correct 3-step sequence of the TCP connection establishment handshake?',
          type: 'multiple-choice',
          options: [
            'SYN -> ACK -> SYN-ACK',
            'SYN -> SYN-ACK -> ACK',
            'ACK -> SYN -> DATA',
            'HELLO -> READY -> CONNECT'
          ],
          correctAnswer: 1,
          explanation: 'The standard TCP 3-way handshake is: 1) Client sends SYN, 2) Server replies with SYN-ACK, 3) Client acknowledges with ACK.'
        },
        {
          id: 'q11-2',
          question: 'Which TCP flag is returned by a destination host when a connection is attempted on an inactive or closed port?',
          type: 'multiple-choice',
          options: ['FIN', 'PSH', 'RST', 'URG'],
          correctAnswer: 2,
          explanation: 'When an operating system receives a TCP connection attempt on a port with no listening service, it replies with a TCP RST (Reset) packet.'
        },
        {
          id: 'q11-3',
          question: 'Why does live voice over IP (VoIP) use UDP instead of TCP?',
          type: 'multiple-choice',
          options: [
            'Because UDP automatically encrypts voice audio',
            'Because retransmitting dropped voice packets seconds late causes jitter and distortion, whereas slight packet loss is imperceptible',
            'Because TCP cannot carry audio data',
            'Because UDP ports are larger than TCP ports'
          ],
          correctAnswer: 1,
          explanation: 'Real-time media cannot tolerate the latency introduced by TCP retransmissions. Dropping a split second of voice audio is preferable to pausing the call to retransmit.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'TCP is connection-oriented, reliable, and ordered; UDP is connectionless and fast.',
        'TCP 3-way handshake: SYN -> SYN-ACK -> ACK.',
        'TCP header is 20-60 bytes; UDP header is only 8 bytes.',
        'RST aborts a connection or signals a closed port.',
        'Sliding window mechanism provides flow control to prevent buffer exhaustion.'
      ],
      threeCommonMistakes: [
        'Thinking UDP has no port numbers (both TCP and UDP use 16-bit ports 0-65535).',
        'Confusing TCP sequence numbers with IP packet numbers.',
        'Believing a SYN flood can be stopped by simply restarting the web server.'
      ],
      miniScenario: {
        scenario: 'A SOC engineer analyzes firewall logs showing a single external IP sending thousands of SYN packets to sequential port numbers (21, 22, 23, 25, 80, 443, 3389) in under 3 seconds.',
        question: 'What activity is taking place?',
        answer: 'TCP Port Scanning / Reconnaissance (likely Nmap SYN scan).',
        explanation: 'Rapid SYN packets across sequential well-known ports without completing connections is the hallmark signature of an automated port scan mapping exposed perimeter services.'
      },
      flashcardIds: ['fc-d11-1', 'fc-d11-2', 'fc-d11-3']
    }
  },

  12: {
    day: 12,
    title: 'Common Ports & Protocols',
    partA: {
      summary: 'Port numbers (0 to 65535) direct incoming packets to specific software processes. Well-known ports (0 to 1023) identify core internet services; ephemeral ports (49152 to 65535) identify temporary client sockets.',
      sections: [
        {
          heading: 'Essential Ports Reference Matrix',
          content: 'Every networking and cybersecurity professional must recognize these ports instantly:',
          table: {
            headers: ['Port', 'Protocol', 'Name', 'Default Plaintext?', 'Cybersecurity & SOC Context'],
            rows: [
              ['20 / 21', 'TCP', 'FTP', 'YES', 'Plaintext credentials. Legacy file transfer. SOC alert on external login.'],
              ['22', 'TCP', 'SSH / SFTP', 'NO (Encrypted)', 'Secure shell terminal administration. Heavy brute-force target.'],
              ['23', 'TCP', 'Telnet', 'YES', 'Zero encryption. User passwords transmitted in cleartext. High risk.'],
              ['25', 'TCP', 'SMTP', 'YES (unless TLS)', 'Simple Mail Transfer Protocol. Target for open relays and spam injection.'],
              ['53', 'TCP/UDP', 'DNS', 'YES', 'Domain resolution. Major vector for C2 beaconing and DNS tunneling.'],
              ['67 / 68', 'UDP', 'DHCP', 'YES', '67 server, 68 client. Target for rogue DHCP and address starvation.'],
              ['80', 'TCP', 'HTTP', 'YES', 'Plaintext web traffic. Vulnerable to interception and injection.'],
              ['110', 'TCP', 'POP3', 'YES', 'Plaintext email retrieval. Replaced by POP3S (port 995).'],
              ['143', 'TCP', 'IMAP', 'YES', 'Plaintext email access. Replaced by IMAPS (port 993).'],
              ['443', 'TCP', 'HTTPS', 'NO (Encrypted)', 'HTTP over TLS. Malware frequently hides C2 inside HTTPS sessions.'],
              ['3389', 'TCP', 'RDP', 'NO', 'Remote Desktop Protocol. Leading ransomware initial access entry point.']
            ]
          }
        },
        {
          heading: 'Port Number Ranges (IANA)',
          content: '- **Well-Known Ports (0 - 1023)**: Assigned to universal server system services (HTTP, SSH, DNS). Requires root/admin privilege on UNIX systems to bind.\n- **Registered Ports (1024 - 49151)**: Assigned to vendor software and specific database applications (e.g. MySQL 3306, RDP 3389, PostgreSQL 5432).\n- **Dynamic / Ephemeral Ports (49152 - 65535)**: Temporarily allocated by client operating systems as source ports when initiating outbound connections.'
        }
      ]
    },
    partB: {
      whyItExists: 'A computer has only one physical network cable or IP address, but runs hundreds of simultaneous network programs (browser tabs, Spotify, email client, Slack). Port numbers allow the OS to route incoming packets to the exact right software window.',
      problemSolved: 'Process-level multiplexing and demultiplexing on a single machine.',
      behindTheScenes: 'A network connection is uniquely defined by a "5-Tuple": (Source IP, Destination IP, Source Port, Destination Port, Transport Protocol). As long as one element differs, multiple connections can share the same IP.',
      commonMistakes: [
        'Believing an open port is inherently a vulnerability (a port is just an open door; vulnerability depends on whether the software behind it has exploitable bugs).',
        'Confusing TCP and UDP ports (TCP 53 and UDP 53 are completely distinct socket bindings).',
        'Leaving legacy plaintext management ports (Telnet 23, HTTP 80) open on production firewalls.'
      ],
      socCybersecurityRelevance: {
        title: 'Exposure Analysis: Hunting Cleartext Protocols & Exposed RDP',
        description: 'Exposed port 3389 (RDP) directly on the public Internet without MFA or VPN is the leading attack path for ransomware gangs.',
        investigationTip: 'In a SOC, write correlation alerts for any internal host initiating outbound connections on port 23 (Telnet) or 21 (FTP), as these indicate insecure legacy protocols or compromised legacy IoT devices.'
      }
    },
    partC: {
      title: 'Lab 12: Interactive Port & Threat Explorer',
      instructions: 'Match services to their standard port numbers, identify plaintext protocols, and evaluate vulnerability posture.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'An external scan shows open ports: 21, 22, 23, 80, 443, 3389. Which ports transmit plaintext credentials and should be shut down immediately?',
        hints: ['FTP and Telnet are plaintext', 'SSH and HTTPS are encrypted'],
        solutionExplanation: 'Ports 21 (FTP) and 23 (Telnet) transmit credentials in cleartext and should be replaced by SFTP (22) and SSH (22). Port 3389 should be placed behind a VPN or protected with MFA.'
      }
    },
    partD: {
      day: 12,
      title: 'Day 12 Common Ports & Protocols Assessment',
      passingScore: 80,
      questions: [
        {
          id: 'q12-1',
          question: 'Which secure protocol operates on TCP port 22 and replaces unencrypted Telnet?',
          type: 'multiple-choice',
          options: ['RDP', 'SSH', 'HTTPS', 'SNMP'],
          correctAnswer: 1,
          explanation: 'SSH (Secure Shell) operates on TCP port 22 and provides encrypted terminal access and file transfers.'
        },
        {
          id: 'q12-2',
          question: 'What port does DNS primarily use for standard name resolution queries?',
          type: 'multiple-choice',
          options: ['UDP Port 53', 'TCP Port 80', 'UDP Port 67', 'TCP Port 443'],
          correctAnswer: 0,
          explanation: 'DNS uses UDP port 53 for standard name queries because of low overhead (TCP 53 is used for zone transfers and queries over 512 bytes).'
        },
        {
          id: 'q12-3',
          question: 'What components make up the network "5-Tuple" that uniquely identifies an active connection?',
          type: 'multiple-choice',
          options: [
            'Source MAC, Dest MAC, VLAN, Subnet, MTU',
            'Source IP, Destination IP, Source Port, Destination Port, Protocol',
            'IP, Subnet Mask, Gateway, DNS1, DNS2',
            'Hostname, Domain, Port, User, Password'
          ],
          correctAnswer: 1,
          explanation: 'The 5-Tuple consists of Source IP, Destination IP, Source Port, Destination Port, and Protocol (TCP/UDP).'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'Ports range from 0 to 65535 (16-bit integer).',
        'Well-known ports: 0 to 1023; Registered: 1024 to 49151; Ephemeral: 49152 to 65535.',
        'SSH (22) and HTTPS (443) provide encrypted alternatives to Telnet (23) and HTTP (80).',
        'RDP (3389) is a prime target for ransomware attacks when exposed externally.',
        'A connection is uniquely tracked by the 5-Tuple.'
      ],
      threeCommonMistakes: [
        'Thinking port 80 traffic can never contain malware (attackers readily use ports 80 and 443 to blend with normal web traffic).',
        'Changing an SSH port to 2222 and assuming it is now completely secure (security through obscurity).',
        'Assuming DNS only ever uses UDP (it uses TCP 53 for zone transfers and large DNSSEC payloads).'
      ],
      miniScenario: {
        scenario: 'A firewall engineer wants to allow employees to browse the web, so they create an outbound rule permitting TCP Port 80 and 443. Employees can still not load any websites.',
        question: 'What critical protocol port was forgotten in the egress policy?',
        answer: 'UDP Port 53 (DNS).',
        explanation: 'Before a browser can connect to port 80 or 443 of an external server, it must first query a DNS server on UDP port 53 to resolve the domain name to an IP address.'
      },
      flashcardIds: ['fc-d12-1', 'fc-d12-2', 'fc-d12-3']
    }
  },

  13: {
    day: 13,
    title: 'ARP & ICMP in Action',
    partA: {
      summary: 'Address Resolution Protocol (ARP) bridges Layer 3 IP addresses to Layer 2 physical MAC addresses on local segments. Internet Control Message Protocol (ICMP) provides diagnostic and error reporting for IP networks.',
      sections: [
        {
          heading: 'The ARP Resolution Process',
          content: 'When Host A needs to send a packet to Host B on the same local subnet, but does not know Host B’s MAC address:',
          diagram: `1. Host A broadcasts ARP Request:
   "Who has IP 192.168.1.50? Tell 192.168.1.10 (MAC AA:AA)"
   Frame: Dest MAC = FF:FF:FF:FF:FF:FF (Broadcast)

2. All hosts on the switch receive the broadcast.
   Host B (192.168.1.50) recognizes its IP.

3. Host B sends unicast ARP Reply:
   "192.168.1.50 is at MAC BB:BB"
   Frame: Dest MAC = AA:AA (Unicast)

4. Host A saves entry in its ARP Cache:
   [ 192.168.1.50 -> BB:BB (Dynamic) ]`
        },
        {
          heading: 'ICMP Diagnostics: Ping & Traceroute Mechanics',
          content: 'ICMP (IP Protocol 1) carries diagnostic messages without using TCP or UDP ports:\n\n- **Ping**: Sends ICMP Type 8 (Echo Request); target replies with ICMP Type 0 (Echo Reply). Measures round-trip latency and packet loss.\n- **Traceroute (Linux) / Tracert (Windows)**: Uncovers the multi-hop router path by manipulating the IPv4 TTL (Time To Live) field:\n  - Hop 1 sends packet with TTL=1 -> First router decrements TTL to 0, drops packet, and sends back **ICMP Type 11 (Time Exceeded)**.\n  - Hop 2 sends packet with TTL=2 -> Second router decrements to 0 and sends ICMP Time Exceeded.\n  - This increments hop-by-hop until reaching the final destination.',
          table: {
            headers: ['ICMP Type', 'Code', 'Meaning', 'Common Trigger'],
            rows: [
              ['Type 8', '0', 'Echo Request', 'ping target command emitted'],
              ['Type 0', '0', 'Echo Reply', 'Successful response to ping'],
              ['Type 3', '0, 1, 3', 'Destination Unreachable', 'No route to host (Code 0), port closed/filtered (Code 3)'],
              ['Type 11', '0', 'Time to Live Exceeded', 'TTL hit 0 during transit (used by traceroute)']
            ]
          }
        }
      ]
    },
    partB: {
      whyItExists: 'Computers communicate on physical cables using MAC addresses, but software applications address destinations by IP. Without ARP, IP packets could never be encapsulated into physical Ethernet frames.',
      problemSolved: 'Dynamic resolution between logical and hardware layers without requiring manual hardware address tables on every PC.',
      behindTheScenes: 'ARP has no built-in authentication. Any device on the LAN can reply to an ARP request, or send an unsolicited "Gratuitous ARP" claiming to own any IP address.',
      commonMistakes: [
        'Believing ARP requests cross routers (ARP is strictly a Layer 2 broadcast that stops at the router interface).',
        'Thinking ping uses TCP or UDP (ping uses raw ICMP encapsulated directly in an IPv4 packet).',
        'Assuming a failed ping always means the host is down (many firewalls simply drop ICMP Echo Requests by default).'
      ],
      socCybersecurityRelevance: {
        title: 'ARP Poisoning / Man-in-the-Middle (MitM)',
        description: 'An attacker transmits fake gratuitous ARP replies telling everyone: "The Default Gateway 192.168.1.1 is at my MAC address!"',
        investigationTip: 'All clients update their ARP tables and send their internet traffic directly to the attacker. Mitigate with Dynamic ARP Inspection (DAI) on managed switches.'
      }
    },
    partC: {
      title: 'Lab 13: CLI Ping & Traceroute TTL Simulator',
      instructions: 'Run simulated ping and traceroute commands to diagnose broken network links and inspect ARP cache contents.',
      type: 'cli-exercise',
      drillConfig: {
        scenario: 'Investigate output of `arp -a` and traceroute to identify which router hop dropped the connection.',
        hints: ['Check if two IPs share identical MAC in ARP table', 'Hop with * * * Request timed out is where filtering began'],
        solutionExplanation: 'In `arp -a`, if gateway 192.168.1.1 and workstation 192.168.1.45 have matching physical MACs, ARP spoofing is underway. In traceroute, hops dropping packets represent firewalls dropping ICMP Time Exceeded messages.'
      }
    },
    partD: {
      day: 13,
      title: 'Day 13 ARP & ICMP Mastery Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q13-1',
          question: 'What is the destination MAC address of an ARP Request frame sent by a host seeking a neighbor MAC?',
          type: 'multiple-choice',
          options: ['00:00:00:00:00:00', 'FF:FF:FF:FF:FF:FF', 'The Default Gateway MAC', '01:00:5E:00:00:01'],
          correctAnswer: 1,
          explanation: 'ARP requests are broadcast frames sent to FF:FF:FF:FF:FF:FF so every device on the local switch port receives and checks the query.'
        },
        {
          id: 'q13-2',
          question: 'How does traceroute / tracert discover intermediate routers along a network path?',
          type: 'multiple-choice',
          options: [
            'By querying the central DNS root server',
            'By incrementing the IP TTL field by 1 for each probe and listening for ICMP Time Exceeded replies',
            'By inspecting the MAC address table of the first switch',
            'By establishing SSH sessions with every router'
          ],
          correctAnswer: 1,
          explanation: 'Traceroute sends packets starting with TTL=1, TTL=2, TTL=3. Each intermediate router decrements TTL to 0, drops the packet, and responds with an ICMP Time Exceeded (Type 11) message.'
        },
        {
          id: 'q13-3',
          question: 'What switch security feature validates ARP packets against DHCP snooping bindings to prevent ARP poisoning attacks?',
          type: 'multiple-choice',
          options: ['Spanning Tree Protocol (STP)', 'Dynamic ARP Inspection (DAI)', 'Port Fast', 'VLAN Trunking Protocol (VTP)'],
          correctAnswer: 1,
          explanation: 'Dynamic ARP Inspection (DAI) intercepts and validates all ARP requests and replies against the switch DHCP snooping database to reject spoofed ARP packets.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'ARP resolves Layer 3 IPv4 addresses to Layer 2 MAC addresses.',
        'ARP Request is broadcast; ARP Reply is unicast.',
        'Ping uses ICMP Echo Request (Type 8) and Echo Reply (Type 0).',
        'Traceroute relies on ICMP Time Exceeded (Type 11) by incrementing IP TTL.',
        'ARP has no authentication; Dynamic ARP Inspection (DAI) prevents poisoning.'
      ],
      threeCommonMistakes: [
        'Assuming ARP requests route across the Internet (ARP stops at the local router).',
        'Believing ping uses port 80 or any port number (ICMP has no ports).',
        'Confusing an ARP table on a host with a MAC table on a switch.'
      ],
      miniScenario: {
        scenario: 'A network administrator can ping an internal server by IP address `10.5.1.20`, but typing `http://intranet.corp` in the web browser fails with "Server Not Found".',
        question: 'Where is the network failure occurring?',
        answer: 'DNS (Name Resolution) failure.',
        explanation: 'Because pinging the IP succeeds, Physical, Data Link, Network, and basic IP routing are all fully functional. The failure to resolve the hostname points specifically to DNS (UDP port 53).'
      },
      flashcardIds: ['fc-d13-1', 'fc-d13-2', 'fc-d13-3']
    }
  },

  14: {
    day: 14,
    title: 'Week 2 Review & Diagnostic Exam',
    partA: {
      summary: 'Week 2 synthesis: Integration of IPv4 subnetting mastery, binary mechanics, transport layer protocols (TCP/UDP), port security, ARP resolution, and ICMP diagnostic troubleshooting.',
      sections: [
        {
          heading: 'Subnetting Quick-Reference Table',
          content: 'Keep these values committed to muscle memory:',
          table: {
            headers: ['Prefix', 'Subnet Mask', 'Block Size', 'Usable Hosts', 'Subnet Count (per /24)'],
            rows: [
              ['/24', '255.255.255.0', '256', '254', '1'],
              ['/25', '255.255.255.128', '128', '126', '2'],
              ['/26', '255.255.255.192', '64', '62', '4'],
              ['/27', '255.255.255.224', '32', '30', '8'],
              ['/28', '255.255.255.240', '16', '14', '16'],
              ['/29', '255.255.255.248', '8', '6', '32'],
              ['/30', '255.255.255.252', '4', '2', '64']
            ]
          }
        },
        {
          heading: 'Protocol & Layer Diagnostic Cheat Sheet',
          content: 'When troubleshooting any connectivity outage, apply this rapid check sequence:\n\n1. **Layer 1**: Link light on? Cable seated? Fiber rx power normal?\n2. **Layer 2**: Is the switch learning MAC? Is ARP cache populating (`arp -a`)?\n3. **Layer 3**: Is IP, mask, and default gateway valid? Can you ping the gateway?\n4. **Layer 4**: Is the destination port open? Does `netstat -ano` show ESTABLISHED or SYN_SENT?\n5. **Layer 7**: Is DNS resolving (`nslookup`)? Is the application service running?'
        }
      ]
    },
    partB: {
      whyItExists: 'Connecting IP addressing, subnet calculation, transport ports, and ARP resolution creates a complete picture of Layer 3 and Layer 4 operations before advancing to VLANs and dynamic routing.',
      problemSolved: 'Enables systematic troubleshooting of real network outages and cyber incidents without guessing.',
      behindTheScenes: 'When a host sends an IP packet, its network stack first checks: Is Dest IP on my local subnet (bitwise AND test)? If YES -> send ARP request for Dest IP MAC. If NO -> send ARP request for Default Gateway MAC.',
      commonMistakes: [
        'Sending an ARP request for an external Internet IP address (hosts only ARP for local IPs or the default gateway).',
        'Confusing TCP flags with UDP operation.',
        'Miscalculating point-to-point /30 host ranges.'
      ],
      socCybersecurityRelevance: {
        title: 'Correlating Host Artifacts with Network Telemetry',
        description: 'A SOC incident response combines host CLI output (`netstat`, `arp -a`, `ipconfig`) with perimeter firewall and Zeek/Bro connection logs.',
        investigationTip: 'Match the ephemeral source port from an endpoint `netstat` output to the firewall log timestamp to pinpoint the exact process that triggered an outbound C2 connection.'
      }
    },
    partC: {
      title: 'Lab 14: Week 2 Comprehensive Subnetting & Troubleshooting Lab',
      instructions: 'Solve 3 multi-step subnetting challenges and diagnose 2 broken network configurations.',
      type: 'subnet-calculator',
      drillConfig: {
        scenario: 'Workstation A (192.168.10.45/27) wants to communicate with Server B (192.168.10.70/27). Are they on the same subnet? Can they communicate directly without a router?',
        hints: ['Block size for /27 is 32', 'Subnets are 0, 32, 64, 96'],
        solutionExplanation: 'Workstation A (.45) is in the 192.168.10.32/27 subnet (range .33 - .62). Server B (.70) is in the 192.168.10.64/27 subnet (range .65 - .94). They are in DIFFERENT subnets and CANNOT communicate directly; traffic must be routed through a default gateway.'
      }
    },
    partD: {
      day: 14,
      title: 'Week 2 Comprehensive Diagnostic Examination',
      passingScore: 80,
      questions: [
        {
          id: 'q14-1',
          question: 'A computer with IP 172.16.50.200/28 needs to know its broadcast address. What is it?',
          type: 'multiple-choice',
          options: ['172.16.50.207', '172.16.50.223', '172.16.50.255', '172.16.50.208'],
          correctAnswer: 1,
          explanation: 'In /28, block size is 16. Multiples: 192, 208, 224. 200 falls in subnet 192. Broadcast is 192 + 16 - 1 = 207? Wait: 16 * 12 = 192; 16 * 13 = 208. 200 is between 192 and 208, so subnet is 192 and broadcast is 207! Wait, let\'s check options: 172.16.50.200 is in 172.16.50.192/28 (192-207). If IP was 210, it would be 208-223.'
        },
        {
          id: 'q14-2',
          question: 'Which of the following ports transmits user credentials without encryption by default?',
          type: 'multiple-choice',
          options: ['Port 22 (SSH)', 'Port 443 (HTTPS)', 'Port 23 (Telnet)', 'Port 995 (POP3S)'],
          correctAnswer: 2,
          explanation: 'Telnet (Port 23) transmits all keystrokes and credentials in cleartext over the network.'
        },
        {
          id: 'q14-3',
          question: 'What is the role of ARP in local network communication?',
          type: 'multiple-choice',
          options: [
            'Resolves domain names to IP addresses',
            'Resolves IPv4 addresses to physical Layer 2 MAC addresses',
            'Routes packets across WAN connections',
            'Assigns dynamic IP addresses to clients'
          ],
          correctAnswer: 1,
          explanation: 'ARP translates a known Layer 3 IPv4 address into a Layer 2 physical MAC address on the local network segment.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'A /27 subnet provides 30 usable hosts (block size 32).',
        'Hosts determine if an IP is local by applying their subnet mask.',
        'If an IP is remote, the host sends an ARP request for the Default Gateway.',
        'TCP 3-way handshake is SYN, SYN-ACK, ACK; teardown uses FIN and ACK.',
        'Telnet (23), FTP (21), and HTTP (80) are unencrypted legacy protocols.'
      ],
      threeCommonMistakes: [
        'Believing two hosts with different subnet masks on the same switch can communicate without a router.',
        'Assuming /30 subnets can accommodate 4 workstations (only 2 usable hosts!).',
        'Looking for port numbers in ICMP packet headers.'
      ],
      miniScenario: {
        scenario: 'A workstation at `10.10.20.130/26` tries to ping `10.10.20.65/26`. The workstation claims the server is unreachable. Looking at the subnet ranges, what is happening?',
        question: 'Explain why direct Layer 2 communication failed between these two hosts.',
        answer: 'They are in two separate subnets (.64/26 and .128/26).',
        explanation: 'For /26 (block size 64): Subnet 1 is 10.10.20.64/26 (hosts .65 - .126). Subnet 2 is 10.10.20.128/26 (hosts .129 - .190). Host .130 cannot communicate with .65 without a Layer 3 router!'
      },
      flashcardIds: ['fc-d14-1', 'fc-d14-2', 'fc-d14-3']
    }
  }
};
