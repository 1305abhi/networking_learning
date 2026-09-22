import { LessonContent } from '../../types';

export const WEEK3_LESSONS: Record<number, LessonContent> = {
  15: {
    day: 15,
    title: 'VLANs & Logical Segmentation',
    partA: {
      summary: 'Virtual Local Area Networks (VLANs) divide a single physical switch into multiple isolated logical broadcast domains at Layer 2, enhancing security, traffic management, and scalability.',
      sections: [
        {
          heading: 'Why VLANs Exist',
          content: 'Without VLANs, every port on an unmanaged switch belongs to the same flat broadcast domain. Broadcast frames (ARP, DHCP) are flooded to every device, wasting CPU cycles and exposing sensitive traffic.',
          diagram: `Single Physical Switch Partitioned by VLANs:
        ┌─────────────────────────┐
        │       Switch SW1        │
        ├────────────┬────────────┤
        │  VLAN 10   │  VLAN 20   │
        │ [Finance]  │ [Guest-WiFi]
        │ Ports 1-12 │ Ports 13-24│
        └────────────┴────────────┘
Traffic CANNOT cross between VLAN 10 and VLAN 20 without a Layer 3 Router!`
        },
        {
          heading: 'VLAN ID Ranges (IEEE 802.1Q)',
          content: 'VLAN IDs range from 1 to 4094 (12-bit integer):\n- **Normal Range (1 - 1005)**: Standard campus enterprise VLANs. VLAN 1 is the default native VLAN on all switches.\n- **Extended Range (1006 - 4094)**: Used in service provider networks and massive cloud data centers.',
          table: {
            headers: ['Port Type', 'Carries Traffic For', 'Frame Tagging', 'Typical Device Connected'],
            rows: [
              ['Access Port', 'Single specific VLAN', 'Untagged (standard 802.3 frame)', 'End-user PC, laptop, IP camera, printer'],
              ['Trunk Port', 'Multiple VLANs simultaneously', 'Tagged with 802.1Q 4-byte header', 'Switch-to-switch link, switch-to-router link']
            ]
          }
        }
      ]
    },
    partB: {
      whyItExists: 'In a corporate office, guest Wi-Fi users, accounting servers, and building HVAC sensors should not be on the same broadcast network. VLANs enforce logical barriers without buying separate physical switches for each group.',
      problemSolved: 'Reduces broadcast traffic overhead and isolates sensitive departments onto isolated Layer 2 domains.',
      behindTheScenes: 'When an untagged frame arrives on an access port configured for VLAN 10, the switch internally attaches a VLAN 10 tag to the frame metadata in its switching fabric. The switch will only forward that frame to ports that belong to VLAN 10.',
      commonMistakes: [
        'Believing two devices on different VLANs can ping each other simply because they plug into the same switch (different VLANs require a Layer 3 router).',
        'Leaving all devices in the default VLAN 1 (major security hazard).',
        'Confusing access ports (single VLAN) with trunk ports (multiple VLANs).'
      ],
      socCybersecurityRelevance: {
        title: 'Zero-Trust Network Segmentation & Ransomware Containment',
        description: 'VLAN segmentation is the first line of defense against lateral movement. If an employee laptop in VLAN 20 is infected with ransomware, it cannot scan or infect database servers in VLAN 50 without passing through an inspection firewall.',
        investigationTip: 'In incident response, check the switch port VLAN configuration to verify if a compromised host was placed in an isolated quarantine VLAN.'
      }
    },
    partC: {
      title: 'Lab 15: VLAN Partitioning & Port Assignment Lab',
      instructions: 'Configure switch ports for VLAN 10 (Sales) and VLAN 20 (Engineering) and determine connectivity.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'PC1 on Port 1 is in VLAN 10 (192.168.10.5). PC2 on Port 2 is in VLAN 20 (192.168.20.5). They try to ping.',
        hints: ['Different VLANs are different broadcast domains', 'Switch drops broadcast between different VLANs'],
        solutionExplanation: 'The ping fails completely. Even though both are on the same physical switch, they belong to different Layer 2 broadcast domains. PC1’s ARP request for PC2 is never flooded into VLAN 20.'
      }
    },
    partD: {
      day: 15,
      title: 'Day 15 VLAN Architecture Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q15-1',
          question: 'What is the primary function of a Virtual Local Area Network (VLAN)?',
          type: 'multiple-choice',
          options: [
            'To encrypt all internet web browsing',
            'To segment a physical switch into multiple isolated Layer 2 broadcast domains',
            'To replace the need for IP addressing',
            'To boost wireless signal strength'
          ],
          correctAnswer: 1,
          explanation: 'VLANs create multiple logical broadcast domains within a single physical switch infrastructure.'
        },
        {
          id: 'q15-2',
          question: 'What type of switch port connects an end-user workstation and carries traffic for a single VLAN?',
          type: 'multiple-choice',
          options: ['Trunk port', 'Access port', 'Console port', 'SPAN port'],
          correctAnswer: 1,
          explanation: 'An Access port is assigned to a single VLAN and connects to end-user endpoint devices (PCs, printers).'
        },
        {
          id: 'q15-3',
          question: 'Can two computers in different VLANs communicate directly through a pure Layer 2 switch without a router or Layer 3 switch?',
          type: 'multiple-choice',
          options: [
            'Yes, if they are on the same switch model',
            'No, inter-VLAN communication requires a Layer 3 routing device',
            'Yes, by using static ARP entries',
            'Yes, if the switch has more than 24 ports'
          ],
          correctAnswer: 1,
          explanation: 'Different VLANs are separate Layer 2 domains and different Layer 3 subnets; communication between them requires Layer 3 routing.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'VLANs partition a physical switch into separate Layer 2 broadcast domains.',
        'VLAN IDs range from 1 to 4094; VLAN 1 is the default native VLAN.',
        'Access ports carry untagged traffic for a single VLAN to endpoint devices.',
        'Trunk ports carry traffic for multiple VLANs between switches and routers.',
        'Traffic between different VLANs must be routed by a Layer 3 device.'
      ],
      threeCommonMistakes: [
        'Assuming assigning the same IP subnet across two different VLANs allows them to talk.',
        'Leaving user traffic in VLAN 1 (exposes management traffic to user tampering).',
        'Thinking a hub can support VLAN configuration.'
      ],
      miniScenario: {
        scenario: 'A network administrator plugs a new server into switch port 18. The server has link lights and a static IP `192.168.10.50`, but cannot reach the default gateway `192.168.10.1`. Other servers on the same subnet on ports 1-12 work fine.',
        question: 'What is the most probable switch port misconfiguration?',
        answer: 'Port 18 is assigned to the wrong VLAN (e.g. VLAN 1 default instead of VLAN 10).',
        explanation: 'If port 18 is in a different VLAN than ports 1-12, the new server is isolated in a different broadcast domain and cannot communicate with the VLAN 10 gateway.'
      },
      flashcardIds: ['fc-d15-1', 'fc-d15-2', 'fc-d15-3']
    }
  },

  16: {
    day: 16,
    title: '802.1Q & Trunking',
    partA: {
      summary: 'IEEE 802.1Q is the industry standard for VLAN trunking, inserting a 4-byte tag into Ethernet frames to preserve VLAN identity across inter-switch and switch-to-router links.',
      sections: [
        {
          heading: 'The 802.1Q 4-Byte Tag Anatomy',
          content: 'The 802.1Q tag is inserted directly between the Source MAC and EtherType fields of the standard Ethernet frame:',
          diagram: `Standard Ethernet:
[ Dest MAC (6B) | Source MAC (6B) | EtherType (2B) | Payload | FCS (4B) ]

Tagged 802.1Q Ethernet:
[ Dest MAC (6B) | Source MAC (6B) | 802.1Q Tag (4B) | EtherType (2B) | Payload | FCS (4B) ]
                                    └──────────────┘
                                    Tag breakdown:
                                    - TPID (2 bytes): 0x8100 (Identifies 802.1Q)
                                    - PCP (3 bits): Priority / QoS (0-7)
                                    - DEI (1 bit): Drop Eligible Indicator
                                    - VID (12 bits): VLAN ID (1 - 4094)`
        },
        {
          heading: 'The Native VLAN Concept',
          content: '- A trunk link can carry untagged frames alongside tagged frames.\n- **The Native VLAN** is the designated VLAN whose frames traverse the trunk **UNTAGGED** (default is VLAN 1).\n- When an untagged frame arrives on a trunk port, the switch assumes it belongs to the configured Native VLAN.\n- **CRITICAL**: Native VLAN IDs must match on both ends of a trunk link! A mismatch causes traffic from VLAN X on Switch 1 to leak into VLAN Y on Switch 2.'
        }
      ]
    },
    partB: {
      whyItExists: 'Without trunking, connecting 20 VLANs between two switches would require 20 separate physical Ethernet cables. Trunking allows all 20 VLANs to share a single high-speed 10Gbps fiber link.',
      problemSolved: 'Drastically reduces cabling costs, port consumption, and switch infrastructure complexity.',
      behindTheScenes: 'When an access frame moves toward a trunk port, the switch chip injects the 4-byte 802.1Q tag and recalculates the FCS checksum. On the receiving switch, the tag is read, stripped, and the frame is delivered untagged to the target access port.',
      commonMistakes: [
        'Native VLAN mismatch on trunk ends (causes CDP/LLDP warning logs and VLAN traffic leakage).',
        'Sending tagged 802.1Q frames to regular desktop PCs (most consumer NICs drop tagged frames).',
        'Leaving Dynamic Trunking Protocol (DTP) enabled on user access ports (allows switch spoofing attacks).'
      ],
      socCybersecurityRelevance: {
        title: 'VLAN Hopping Attacks (Switch Spoofing & Double Tagging)',
        description: '1. **Switch Spoofing**: An attacker connects a rogue laptop running Yersinia and negotiates trunking via DTP, gaining access to all corporate VLANs!\n2. **Double Tagging**: An attacker crafts a frame with two 802.1Q tags (outer tag = Native VLAN 1, inner tag = Target VLAN 10). The first switch strips the outer tag; the second switch reads the inner tag and forwards the packet into VLAN 10!',
        investigationTip: 'Mitigation: Disable DTP on all access ports (`switchport mode access`), set an unused dedicated Native VLAN (e.g. VLAN 999), and tag the native VLAN globally.'
      }
    },
    partC: {
      title: 'Lab 16: 802.1Q Frame Inspection & Trunk Mismatch Triage',
      instructions: 'Analyze an 802.1Q packet capture and diagnose a native VLAN mismatch outage.',
      type: 'packet-flow',
      drillConfig: {
        scenario: 'Switch 1 has Native VLAN 10. Switch 2 has Native VLAN 20. Host in VLAN 10 sends untagged frame across trunk. Where does it end up?',
        hints: ['Switch 1 sends it untagged because it matches Native VLAN 10', 'Switch 2 receives untagged frame and assigns it to its Native VLAN (20)'],
        solutionExplanation: 'The frame leaves Switch 1 untagged. Switch 2 receives an untagged frame and assumes it belongs to its Native VLAN (20). The packet leaked from VLAN 10 into VLAN 20! This is a dangerous Native VLAN Mismatch vulnerability.'
      }
    },
    partD: {
      day: 16,
      title: 'Day 16 802.1Q Trunking Mastery Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q16-1',
          question: 'What is the size of the IEEE 802.1Q tag inserted into an Ethernet frame?',
          type: 'multiple-choice',
          options: ['2 bytes', '4 bytes', '8 bytes', '16 bytes'],
          correctAnswer: 1,
          explanation: 'The 802.1Q tag is 4 bytes (32 bits) in length, containing TPID (2 bytes), PCP (3 bits), DEI (1 bit), and VID (12 bits).'
        },
        {
          id: 'q16-2',
          question: 'What happens to frames belonging to the Native VLAN when they travel across an 802.1Q trunk link?',
          type: 'multiple-choice',
          options: [
            'They are encrypted with AES-256',
            'They are transmitted untagged without an 802.1Q header',
            'They are dropped automatically',
            'They are converted into UDP packets'
          ],
          correctAnswer: 1,
          explanation: 'By default in 802.1Q, frames belonging to the configured Native VLAN are sent across trunk links untagged.'
        },
        {
          id: 'q16-3',
          question: 'Which cybersecurity defense best mitigates double-tagging VLAN hopping attacks?',
          type: 'multiple-choice',
          options: [
            'Enable Telnet on trunk ports',
            'Change the Native VLAN to an unused, dedicated VLAN and ensure all user access ports are explicitly untagged access ports',
            'Increase MTU to 9000 bytes',
            'Run OSPF on all switch ports'
          ],
          correctAnswer: 1,
          explanation: 'Double tagging exploits the Native VLAN. Changing the native VLAN to an unused ID and disabling DTP on user access ports neutralizes double-tagging.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        '802.1Q adds a 4-byte tag to the Ethernet frame.',
        '12 bits in the 802.1Q tag identify the VLAN ID (1 to 4094).',
        'Trunks carry multiple VLANs; access ports connect to single endpoints.',
        'Native VLAN frames travel across the trunk untagged.',
        'Native VLAN mismatches cause cross-VLAN traffic leakage and security vulnerabilities.'
      ],
      threeCommonMistakes: [
        'Setting different native VLANs on opposite ends of a trunk link.',
        'Leaving DTP in dynamic auto mode on ports facing untrusted user cubes.',
        'Forgetting to allow necessary VLANs on the trunk allowed list (`switchport trunk allowed vlan`).'
      ],
      miniScenario: {
        scenario: 'A SOC analyst discovers that an intern on the guest Wi-Fi VLAN was able to sniff database traffic on the internal finance VLAN without compromising any router.',
        question: 'What switch port trunking misconfiguration allowed this cross-VLAN traffic leak?',
        answer: 'Native VLAN mismatch between the access switch and distribution switch.',
        explanation: 'If Switch A had Native VLAN = Guest, and Switch B had Native VLAN = Finance, untagged traffic from the guest VLAN crossed the trunk and was ingested directly into the Finance VLAN on Switch B.'
      },
      flashcardIds: ['fc-d16-1', 'fc-d16-2', 'fc-d16-3']
    }
  },

  17: {
    day: 17,
    title: 'Inter-VLAN Routing',
    partA: {
      summary: 'Inter-VLAN routing enables communication between segregated VLANs, implemented either through Router-on-a-Stick (ROAS) using subinterfaces or multilayer Layer 3 switches using Switched Virtual Interfaces (SVIs).',
      sections: [
        {
          heading: 'Router-on-a-Stick (ROAS) Architecture',
          content: 'A single physical router interface connects to a switch trunk port. The router interface is partitioned into logical subinterfaces, each serving as the default gateway for a specific VLAN.',
          diagram: `[ PC1 (VLAN 10) ] ──┐
                     ├──> [ Switch SW1 ] ═══════(Trunk Link)═══════> [ Router R1 (ROAS) ]
[ PC2 (VLAN 20) ] ──┘                                                  - g0/0.10 (GW: 192.168.10.1)
                                                                       - g0/0.20 (GW: 192.168.20.1)
Packet Flow from PC1 to PC2:
1. PC1 sends frame to Switch SW1 (tagged VLAN 10) -> forwarded up trunk to R1 g0/0.10
2. R1 decapsulates VLAN 10, routes packet to subnet 192.168.20.0
3. R1 encapsulates in VLAN 20 tag -> sends back down same physical cable to SW1
4. SW1 delivers untagged frame to PC2 on access port VLAN 20`
        },
        {
          heading: 'Layer 3 Switching (SVIs)',
          content: 'In modern campus backbones, routing between VLANs is performed directly inside high-speed Layer 3 Multilayer Switches using Switched Virtual Interfaces (SVIs).\n\n- **SVI**: A virtual Layer 3 routed interface inside the switch (e.g. `interface Vlan10`).\n- **Hardware Routing (ASIC)**: Packet forwarding occurs at wire-speed in silicon without bottlenecks on a single router link.\n- Eliminates the single-cable bottleneck of Router-on-a-Stick.'
        }
      ]
    },
    partB: {
      whyItExists: 'VLANs provide security by isolating traffic, but legitimate business applications need cross-department access (e.g. Sales PCs reaching a centralized Database). Inter-VLAN routing controls and routes this authorized traffic.',
      problemSolved: 'Maintains broadcast isolation while providing controlled Layer 3 pathing between subnets.',
      behindTheScenes: 'Every subinterface or SVI acts as the Default Gateway for its respective subnet. The IP address of `interface Vlan10` (e.g. 192.168.10.1) is entered as the default gateway on all client PCs in VLAN 10.',
      commonMistakes: [
        'Forgetting the `encapsulation dot1q <vlan_id>` command on router subinterfaces.',
        'Not enabling `ip routing` on a Layer 3 switch (without it, the switch behaves as a pure L2 switch).',
        'Assigning the same IP subnet to two different subinterfaces/SVIs.'
      ],
      socCybersecurityRelevance: {
        title: 'Microsegmentation & East-West Traffic Filtering',
        description: 'By placing a Next-Generation Firewall (NGFW) as the inter-VLAN routing device instead of a basic router, every packet travelling between internal subnets undergoes deep packet inspection (DPI).',
        investigationTip: 'SOC analysts rely on inter-VLAN firewall logs to detect lateral reconnaissance (e.g. BloodHound scans, SMB port probes) before an attacker can pivot to the domain controller.'
      }
    },
    partC: {
      title: 'Lab 17: Router-on-a-Stick Packet Flow Simulator',
      instructions: 'Trace the subinterface tagging and default gateway hops as PC1 (VLAN 10) pings PC2 (VLAN 20).',
      type: 'packet-flow',
      drillConfig: {
        scenario: 'PC1 (192.168.10.15) sends ping to PC2 (192.168.20.25). Router R1 has subinterfaces g0/0.10 and g0/0.20.',
        hints: ['PC1 sends frame to Gateway g0/0.10', 'Router routes between subinterfaces'],
        solutionExplanation: 'Frame 1: PC1 -> SW1 -> R1 g0/0.10 (VLAN 10 tagged). Router decapsulates, inspects IP header, routes to g0/0.20. Frame 2: R1 -> SW1 (VLAN 20 tagged) -> delivered untagged to PC2.'
      }
    },
    partD: {
      day: 17,
      title: 'Day 17 Inter-VLAN Routing Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q17-1',
          question: 'In a Router-on-a-Stick (ROAS) topology, how does a single physical router interface route between multiple VLANs?',
          type: 'multiple-choice',
          options: [
            'By dividing the interface into logical subinterfaces configured with 802.1Q encapsulation',
            'By running BGP on the client workstations',
            'By turning the router into a repeater',
            'By using multiple MAC addresses on the physical cable'
          ],
          correctAnswer: 0,
          explanation: 'ROAS divides a physical router interface into subinterfaces (e.g. g0/0.10, g0/0.20), each tagged with 802.1Q for its respective VLAN.'
        },
        {
          id: 'q17-2',
          question: 'What is a primary performance advantage of Layer 3 switching over Router-on-a-Stick?',
          type: 'multiple-choice',
          options: [
            'Layer 3 switches do not require IP addresses',
            'Hardware ASIC routing at wire speed without bottlenecking across a single router link',
            'Layer 3 switches eliminate the need for subnet masks',
            'Layer 3 switches prevent all malware automatically'
          ],
          correctAnswer: 1,
          explanation: 'Layer 3 switches route traffic using specialized hardware ASICs at multi-gigabit wire speed without bottle-necking on a single router trunk link.'
        },
        {
          id: 'q17-3',
          question: 'What must be configured as the "Default Gateway" on a client PC in VLAN 10?',
          type: 'multiple-choice',
          options: [
            'The IP address of the DNS server',
            'The IP address of the router subinterface or Layer 3 switch SVI assigned to VLAN 10',
            'The broadcast address of VLAN 10',
            '127.0.0.1'
          ],
          correctAnswer: 1,
          explanation: 'The default gateway is the Layer 3 interface IP on that specific subnet (subinterface or SVI) providing exit access to other networks.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'Inter-VLAN routing allows communication between separate VLANs.',
        'Router-on-a-Stick (ROAS) uses subinterfaces over a single trunk link.',
        'Layer 3 switches use Switched Virtual Interfaces (SVIs) for wire-speed routing.',
        'Each subinterface or SVI acts as the default gateway for that VLAN.',
        'Routing between VLANs enables enforcement of inter-subnet firewall security policies.'
      ],
      threeCommonMistakes: [
        'Forgetting to configure 802.1Q encapsulation on subinterfaces.',
        'Omitting the `ip routing` command on multilayer switches.',
        'Connecting a router access port to a switch trunk port.'
      ],
      miniScenario: {
        scenario: 'An admin configures subinterface `g0/0.10` with IP `192.168.10.1/24`, and subinterface `g0/0.20` with IP `192.168.20.1/24`. Client on VLAN 10 cannot ping `192.168.20.1`. The switch trunk port configuration shows `switchport trunk allowed vlan 20`.',
        question: 'Why did the ping fail?',
        answer: 'VLAN 10 was not included in the trunk allowed VLAN list on the switch.',
        explanation: 'Because the switch trunk port was restricted to `allowed vlan 20`, all VLAN 10 frames from PC1 were dropped at the trunk port before reaching the router subinterface.'
      },
      flashcardIds: ['fc-d17-1', 'fc-d17-2', 'fc-d17-3']
    }
  },

  18: {
    day: 18,
    title: 'Routing Fundamentals',
    partA: {
      summary: 'Routers are Layer 3 devices that forward packets toward remote destinations by evaluating their IP routing table and applying the universal Longest Prefix Match rule.',
      sections: [
        {
          heading: 'Routing Table Architecture',
          content: 'A routing table stores paths to network destinations. Every route entry contains:\n- **Destination Subnet & Prefix**: e.g. `10.5.0.0/16`\n- **Next-Hop IP**: The IP of the adjacent router interface that can forward the packet.\n- **Exit Interface**: Physical local interface to transmit out (e.g. `GigabitEthernet0/1`).\n- **Route Source / Protocol**: Direct (C), Static (S), OSPF (O), BGP (B).\n- **Metric**: Cost of the path (bandwidth, delay, hop count).\n- **Administrative Distance (AD)**: Trustworthiness of the route source.',
          table: {
            headers: ['Route Source', 'Cisco AD', 'Description'],
            rows: [
              ['Connected (C)', '0', 'Directly connected physical interface with IP assigned & link up'],
              ['Static Route (S)', '1', 'Manually configured path by administrator'],
              ['eBGP', '20', 'External Border Gateway Protocol across Autonomous Systems'],
              ['OSPF (O)', '110', 'Open Shortest Path First link-state dynamic routing'],
              ['RIP (R)', '120', 'Routing Information Protocol (legacy hop-count based)']
            ]
          }
        },
        {
          heading: 'The Longest Prefix Match Rule',
          content: 'When a router receives a packet, it compares the Destination IP against all entries in its routing table. If multiple routes match, **the route with the longest (most specific) prefix ALWAYS wins**, regardless of metric or administrative distance!',
          diagram: `Packet arrives with Destination IP: 10.10.10.55

Routing Table Entries:
1. 10.0.0.0/8       via 192.168.1.1   (Matches 8 bits)
2. 10.10.0.0/16     via 192.168.2.1   (Matches 16 bits)
3. 10.10.10.0/24    via 192.168.3.1   (Matches 24 bits)  <-- WINNER! (Most specific)
4. 0.0.0.0/0        via 192.168.0.1   (Matches 0 bits)

Packet is forwarded to 192.168.3.1!`
        }
      ]
    },
    partB: {
      whyItExists: 'Without routing tables, routers would have to flood packets across every cable like a dumb hub. The routing table provides deterministic, loop-free path determination across global networks.',
      problemSolved: 'Scalable worldwide path selection and dynamic adaptation to line cuts and congestion.',
      behindTheScenes: 'Routers compile their software Routing Information Base (RIB) into a hardware-optimized Forwarding Information Base (FIB) using Cisco Express Forwarding (CEF) or TCAM for line-rate lookups.',
      commonMistakes: [
        'Assuming lower Administrative Distance overrides Longest Prefix Match (Longest Prefix Match is evaluated FIRST; AD only breaks ties between identical prefixes!).',
        'Confusing the Next-Hop IP with the destination IP of the packet.',
        'Believing a router knows the entire end-to-end path (a router only knows the next hop!).'
      ],
      socCybersecurityRelevance: {
        title: 'BGP Route Hijacking & Rogue Route Injection',
        description: 'If an adversary or rogue router advertises a more specific prefix (e.g. `/24` when the legitimate owner advertises `/22`), the entire world’s traffic diverts to the attacker’s router due to Longest Prefix Match!',
        investigationTip: 'In SOC telemetry, monitor routing protocol neighbor flaps and routing table changes to detect unauthorized route injections.'
      }
    },
    partC: {
      title: 'Lab 18: Routing Table Lookup & Next-Hop Solver',
      instructions: 'Given a realistic routing table, evaluate destination IPs and identify the winning next-hop interface.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'Determine forwarding decision for 172.16.5.99 with routes: 172.16.0.0/16, 172.16.5.0/24, 172.16.5.64/26, 0.0.0.0/0.',
        hints: ['Calculate subnet boundaries for 172.16.5.64/26', '64 to 127 contains 99', 'Longest prefix wins'],
        solutionExplanation: 'Destination 172.16.5.99 falls within 172.16.5.64/26 (range .64 to .127). The /26 prefix is longer and more specific than /24, /16, or /0. Forwarded via the /26 next hop.'
      }
    },
    partD: {
      day: 18,
      title: 'Day 18 Routing Principles Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q18-1',
          question: 'If a routing table contains routes for 10.0.0.0/8, 10.1.0.0/16, and 10.1.1.0/24, which route forwards traffic for 10.1.1.25?',
          type: 'multiple-choice',
          options: ['10.0.0.0/8', '10.1.0.0/16', '10.1.1.0/24', 'Default route 0.0.0.0/0'],
          correctAnswer: 2,
          explanation: 'The Longest Prefix Match rule dictates that the route with the most specific prefix (/24 in this case) is chosen.'
        },
        {
          id: 'q18-2',
          question: 'What metric represents the trustworthiness and believability of a routing source in Cisco routers?',
          type: 'multiple-choice',
          options: ['Bandwidth', 'Administrative Distance', 'Hop Count', 'Delay'],
          correctAnswer: 1,
          explanation: 'Administrative Distance (AD) is an integer from 0 to 255 indicating the believability of the routing information source (lower is more trusted).'
        },
        {
          id: 'q18-3',
          question: 'What is the Administrative Distance of a directly connected interface that is administratively up?',
          type: 'multiple-choice',
          options: ['0', '1', '90', '110'],
          correctAnswer: 0,
          explanation: 'Directly connected interfaces have an Administrative Distance of 0 (the most trusted possible route).'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'Routers forward packets using Layer 3 IP routing tables.',
        'Longest Prefix Match is the universal rule for path selection.',
        'Administrative Distance (AD) ranks the trustworthiness of different route sources.',
        'Connected routes have AD 0; Static routes have AD 1; OSPF has AD 110.',
        'Routers only need to know the Next Hop, not the entire multi-hop path.'
      ],
      threeCommonMistakes: [
        'Thinking a static route with AD 1 overrides a dynamic /28 route when evaluating a packet for that /28 (prefix length beats AD!).',
        'Confusing routing metrics (cost, hop count) with Administrative Distance.',
        'Assuming a router forwards broadcasts across networks.'
      ],
      miniScenario: {
        scenario: 'A router has an OSPF route for `192.168.1.0/24` (AD 110) and a Static route for `192.168.1.0/24` (AD 1). Which route is installed in the active routing table?',
        question: 'Which route wins and why?',
        answer: 'The Static route wins because both prefixes are identical (/24) and Static has a lower Administrative Distance (1 vs 110).',
        explanation: 'When destination prefix lengths are identical, the router uses Administrative Distance as the tie-breaker. AD 1 (Static) is preferred over AD 110 (OSPF).'
      },
      flashcardIds: ['fc-d18-1', 'fc-d18-2', 'fc-d18-3']
    }
  },

  19: {
    day: 19,
    title: 'Static & Default Routing',
    partA: {
      summary: 'Static routing involves manually entering route entries into a router table. The Default Route (0.0.0.0/0) serves as the "Gateway of Last Resort" for packets destined for unknown remote networks.',
      sections: [
        {
          heading: 'Static Route Syntax & Anatomy',
          content: 'In Cisco IOS syntax:\n`ip route <destination-network> <subnet-mask> <next-hop-ip | exit-interface>`\n\nExample:\n`ip route 10.5.0.0 255.255.0.0 192.168.1.2`\n- Instructs the router: "If traffic is destined for 10.5.0.0/16, forward it to adjacent router IP 192.168.1.2".',
          diagram: `Branch Router ─────────────(WAN Serial)─────────────> HQ Core Router
[ 192.168.1.0/24 ]                                      [ 10.0.0.0/8 ]
Branch needs: ip route 10.0.0.0 255.0.0.0 <HQ-IP>
HQ needs:     ip route 192.168.1.0 255.255.255.0 <Branch-IP>
(Routing must be bidirectional! Traffic sent must have a return path!)`
        },
        {
          heading: 'The Default Route: Gateway of Last Resort (0.0.0.0/0)',
          content: '- **0.0.0.0 0.0.0.0** matches literally any destination IP with a prefix length of 0.\n- Because prefix length is 0, it has the shortest match possible. Any specific route will override it.\n- Configured on stub networks and perimeter routers pointing out to the Internet Service Provider (ISP):\n  `ip route 0.0.0.0 0.0.0.0 203.0.113.1`\n- "If no specific path exists in the routing table, send it to the ISP gateway."'
        }
      ]
    },
    partB: {
      whyItExists: 'Enterprise routers cannot store the entire global Internet routing table (over 950,000 routes). A simple default route offloads Internet traffic to the provider.',
      problemSolved: 'Low CPU and memory usage, simple deterministic routing for stub sites, and precise administrator control.',
      behindTheScenes: 'A "Floating Static Route" is configured with a high administrative distance (e.g. `ip route ... 200`) so it remains dormant as a backup link until the primary route drops.',
      commonMistakes: [
        'Configuring a route in one direction and forgetting the return route (traffic reaches destination but replies are dropped!).',
        'Creating a routing loop by pointing default routes at each other.',
        'Typing the destination host IP instead of the network ID.'
      ],
      socCybersecurityRelevance: {
        title: 'C2 Bypass via Malicious Static Route Modification',
        description: 'Malware with local administrator privileges on a Windows endpoint can execute `route add 0.0.0.0 mask 0.0.0.0 <Attacker-Gateway>` to hijack all outbound traffic or route around VPN tunnels.',
        investigationTip: 'Audit host routing tables (`netstat -rn` / `route print`) during forensic host investigations to verify the default gateway has not been modified.'
      }
    },
    partC: {
      title: 'Lab 19: Static Route Configuration & Black Hole Triage',
      instructions: 'Diagnose why ping fails between Router A and Router B despite valid physical link status.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'Router A has route to Subnet B. Subnet B does NOT have a route back to Subnet A. Host A pings Host B.',
        hints: ['Echo Request arrives at Host B', 'Echo Reply cannot find a route back'],
        solutionExplanation: 'Host A sends ICMP Echo Request. Host B receives it successfully. But when Host B attempts to reply, its router has no route back to Subnet A and drops the packet. Solution: add return static route.'
      }
    },
    partD: {
      day: 19,
      title: 'Day 19 Static & Default Routing Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q19-1',
          question: 'What does the route `0.0.0.0 0.0.0.0` represent in an IPv4 routing table?',
          type: 'multiple-choice',
          options: [
            'A loopback route to localhost',
            'The Default Route (Gateway of Last Resort)',
            'A multicast rendezvous point',
            'A broadcast address'
          ],
          correctAnswer: 1,
          explanation: '0.0.0.0/0 represents the Default Route, used whenever no more specific route exists in the routing table.'
        },
        {
          id: 'q19-2',
          question: 'What is a "Floating Static Route"?',
          type: 'multiple-choice',
          options: [
            'A route that changes its IP every 5 minutes',
            'A backup static route configured with a higher Administrative Distance that only becomes active when the primary route fails',
            'A wireless routing protocol',
            'A route that has no next-hop address'
          ],
          correctAnswer: 1,
          explanation: 'A floating static route is given a higher AD (e.g. 200) than the primary route so it remains inactive until the primary route goes down.'
        },
        {
          id: 'q19-3',
          question: 'When troubleshooting end-to-end connectivity between two subnets, what common routing omission causes ping to fail?',
          type: 'multiple-choice',
          options: [
            'Failure to configure a return route on the remote router',
            'Using CAT6 cable instead of CAT5',
            'Enabling DNS on the switches',
            'Setting clock time on the routers'
          ],
          correctAnswer: 0,
          explanation: 'Networking is bidirectional. If the remote router lacks a return route back to the source subnet, return packets are dropped.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'Static routes are manually entered and do not adapt automatically to topology changes.',
        'Default route `0.0.0.0/0` handles all unmatched traffic as the Gateway of Last Resort.',
        'Static routes have a default Administrative Distance of 1.',
        'Routing must be configured bidirectionally (both forward and return paths).',
        'Floating static routes act as backup links using elevated Administrative Distance.'
      ],
      threeCommonMistakes: [
        'Forgetting the return route on the remote router.',
        'Pointing the next-hop IP to an IP that is not directly connected or reachable.',
        'Creating routing loops by pointing two routers at each other as default gateways.'
      ],
      miniScenario: {
        scenario: 'A branch office router has a high-speed fiber link running OSPF (AD 110) and a cellular LTE backup modem configured with a static route `ip route 0.0.0.0 0.0.0.0 LTE-IP 200`.',
        question: 'Under normal conditions, which link carries user traffic? What happens if fiber is cut?',
        answer: 'Fiber carries traffic normally (AD 110 < 200). When fiber drops, OSPF withdraws its route and the floating static route (AD 200) activates automatically.',
        explanation: 'Because 110 is lower than 200, OSPF is preferred. When the fiber link goes down, OSPF removes the route, and the floating static route immediately takes over forwarding.'
      },
      flashcardIds: ['fc-d19-1', 'fc-d19-2', 'fc-d19-3']
    }
  },

  20: {
    day: 20,
    title: 'OSPF Dynamic Routing Fundamentals',
    partA: {
      summary: 'Open Shortest Path First (OSPF) is an open-standard Link-State dynamic routing protocol using Dijkstra’s Shortest Path First (SPF) algorithm to build a complete topological map of the network.',
      sections: [
        {
          heading: 'Distance Vector vs Link-State',
          content: 'Dynamic routing protocols fall into two major architectural categories:',
          table: {
            headers: ['Characteristic', 'Distance Vector (e.g. RIP)', 'Link-State (e.g. OSPF)'],
            rows: [
              ['View of Network', 'Routing by rumor (only knows what neighbor reports)', 'Complete synchronized topological roadmap of entire area'],
              ['Algorithm', 'Bellman-Ford', 'Dijkstra Shortest Path First (SPF)'],
              ['Metric', 'Hop count (Max 15 hops)', 'Cost (inversely proportional to link bandwidth)'],
              ['Convergence Speed', 'Slow (periodic full table broadcasts)', 'Fast (event-driven Link State Advertisements / LSAs)'],
              ['Resource Consumption', 'Low CPU and memory', 'Moderate CPU and memory to compute SPF tree']
            ]
          }
        },
        {
          heading: 'Core OSPF Concepts',
          content: '- **Router ID (RID)**: 32-bit identifier for each router (highest loopback IP or highest active physical IP).\n- **Hello Packets**: Sent every 10 seconds to multicast `224.0.0.5` to discover neighbors and maintain keepalives.\n- **Link State Advertisements (LSAs)**: Packets describing links, states, and costs exchanged to populate the **Link State Database (LSDB)**.\n- **Area 0 (Backbone Area)**: In multi-area OSPF, all areas must connect to Area 0. For initial CCNA, focus on Single-Area OSPF.\n- **Cost Formula**: `Cost = Reference Bandwidth (default 100 Mbps) / Interface Bandwidth`.'
        }
      ]
    },
    partB: {
      whyItExists: 'In large corporate networks with hundreds of routers, manually configuring static routes is unsustainable. If a fiber line is severed, OSPF recalculates the shortest alternate path within seconds with zero human intervention.',
      problemSolved: 'Automated convergence, loop-free shortest path calculation, and scalability.',
      behindTheScenes: 'All routers in the same OSPF area have identical Link State Databases. Each router runs the Dijkstra algorithm independently with itself as the root of the tree to compute the lowest-cost paths to every subnet.',
      commonMistakes: [
        'Mismatched Hello / Dead intervals between neighbors (prevents neighbor adjacency).',
        'Mismatched Area IDs on connecting interfaces.',
        'Mismatched subnet masks on connecting point-to-point links.'
      ],
      socCybersecurityRelevance: {
        title: 'OSPF Injection & LSA Poisoning',
        description: 'If OSPF authentication is not enabled, an attacker plugging a laptop into a switch port can inject rogue LSAs, advertising a low cost to intercept all corporate traffic (blackholing or MitM).',
        investigationTip: 'Always configure OSPF cryptographic authentication (`ip ospf authentication message-digest`) and set user-facing switch ports as passive interfaces (`passive-interface`).'
      }
    },
    partC: {
      title: 'Lab 20: OSPF Neighbor Adjacency & Cost Calculator',
      instructions: 'Calculate the OSPF cost for a 10 Mbps, 100 Mbps, and 1 Gbps link, and diagnose failed neighbor states.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'Router 1 has Hello timer = 10s. Router 2 has Hello timer = 20s. Why is OSPF neighbor state stuck in DOWN/INIT?',
        hints: ['OSPF neighbor parameters must match', 'Hello and Dead timers must be identical on both ends'],
        solutionExplanation: 'OSPF requires matching Hello and Dead intervals to form an adjacency. Because Router 1 (10s) and Router 2 (20s) disagree, they will never reach the FULL adjacency state.'
      }
    },
    partD: {
      day: 20,
      title: 'Day 20 OSPF Dynamic Routing Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q20-1',
          question: 'What algorithm does OSPF use to calculate the shortest loop-free path to every network?',
          type: 'multiple-choice',
          options: ['Bellman-Ford Algorithm', 'Dijkstra Shortest Path First (SPF)', 'Diffie-Hellman', 'Spanning Tree Algorithm'],
          correctAnswer: 1,
          explanation: 'OSPF runs Edsger Dijkstra’s Shortest Path First (SPF) algorithm over its Link State Database.'
        },
        {
          id: 'q20-2',
          question: 'What is the default Administrative Distance of OSPF in Cisco routers?',
          type: 'multiple-choice',
          options: ['90', '100', '110', '120'],
          correctAnswer: 2,
          explanation: 'OSPF has an Administrative Distance of 110 (EIGRP is 90, RIP is 120, Static is 1).'
        },
        {
          id: 'q20-3',
          question: 'Which Cisco command prevents OSPF Hello packets from being transmitted out a user-facing access port while still advertising the subnet?',
          type: 'multiple-choice',
          options: ['shutdown', 'passive-interface', 'no router ospf', 'switchport mode access'],
          correctAnswer: 1,
          explanation: 'The `passive-interface` command stops sending OSPF Hellos out an interface, preventing rogue neighbor formation while still advertising the connected subnet into OSPF.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'OSPF is a link-state dynamic routing protocol using the Dijkstra SPF algorithm.',
        'OSPF Administrative Distance is 110.',
        'OSPF metric is Cost, inversely proportional to interface bandwidth.',
        'Neighbors exchange Hello packets to form 2-Way and FULL adjacencies.',
        'Passive interfaces protect user-facing networks from rogue OSPF neighbor injection.'
      ],
      threeCommonMistakes: [
        'Mismatched Hello/Dead timers or mismatched Area IDs between neighbors.',
        'Leaving default reference bandwidth at 100 Mbps in Gigabit/10G networks (makes 1G and 10G have identical cost 1).',
        'Advertising user LANs without configuring `passive-interface`.'
      ],
      miniScenario: {
        scenario: 'Two routers connect over a serial link. OSPF is enabled on both, but `show ip ospf neighbor` returns empty output. Pinging the neighbor IP directly succeeds.',
        question: 'What OSPF configuration discrepancy is the most common cause?',
        answer: 'Mismatched OSPF Area ID, mismatched Hello/Dead timers, or mismatched MTU.',
        explanation: 'Because IP ping works, Layer 1, 2, and 3 are functional. OSPF adjacency fails when protocol-specific parameters (Area ID, Hello/Dead timers, authentication password, or MTU) do not match exactly on both sides.'
      },
      flashcardIds: ['fc-d20-1', 'fc-d20-2', 'fc-d20-3']
    }
  },

  21: {
    day: 21,
    title: 'Week 3 Hands-On Practical Topology Lab',
    partA: {
      summary: 'Week 3 integration: Comprehensive synthesis of VLAN creation, access port assignment, 802.1Q trunking, Router-on-a-Stick inter-VLAN routing, and static/OSPF routing across a multi-segment campus network.',
      sections: [
        {
          heading: 'The Full Week 3 Topology Blueprint',
          content: 'Examine the multi-tier campus topology connecting two branches across routed links:',
          diagram: `[ PC1: VLAN 10 (Sales) ] ──┐
  192.168.10.50             ├── [ Switch SW1 ] ════(Trunk)════ [ Router R1 ]
[ PC2: VLAN 20 (Eng) ]   ──┘    Trunk: 10,20                      │ g0/0.10 & g0/0.20
  192.168.20.50                                                   │ (10.0.0.1/30)
                                                                  ▼
                                                      [ WAN Link: 10.0.0.0/30 ]
                                                                  ▲
                                                                  │ (10.0.0.2/30)
[ PC3: VLAN 30 (Servers) ] ── [ Switch SW2 ] ════(Trunk)════ [ Router R2 ]
  192.168.30.50                 Trunk: 30                         g0/0.30`
        },
        {
          heading: 'End-to-End Configuration & Verification Checklist',
          content: 'Step 1: Assign IP & Subnet Masks to PC1, PC2, and PC3.\nStep 2: Create VLANs 10, 20 on SW1 and VLAN 30 on SW2.\nStep 3: Assign access ports to respective VLANs.\nStep 4: Configure 802.1Q trunks between SW1-R1 and SW2-R2.\nStep 5: Configure ROAS subinterfaces on R1 and R2 with Default Gateway IPs.\nStep 6: Configure routing across WAN (10.0.0.0/30) using OSPF Area 0 or static routes.\nStep 7: Test end-to-end ping from PC1 (Sales) to PC3 (Servers).'
        }
      ]
    },
    partB: {
      whyItExists: 'Isolated commands mean little until combined into an integrated architecture where VLAN tags, subinterfaces, routing tables, and ARP resolution all interact simultaneously.',
      problemSolved: 'Transforms theoretical knowledge into senior-level configuration and diagnostic troubleshooting competency.',
      behindTheScenes: 'When PC1 pings PC3 across the entire topology: PC1 encapsulates in VLAN 10 -> SW1 forwards to R1 -> R1 decapsulates, inspects IP routing table -> R1 routes across WAN link 10.0.0.0/30 -> R2 receives packet -> R2 routes to subinterface g0/0.30 -> R2 encapsulates in VLAN 30 tag -> SW2 delivers untagged to PC3.',
      commonMistakes: [
        'VLAN allowed list missing on switch trunk ports.',
        'Typing the wrong default gateway on client workstations.',
        'Missing WAN route between Router 1 and Router 2.'
      ],
      socCybersecurityRelevance: {
        title: 'Network Containment & Incident Isolation Drill',
        description: 'Simulate a security breach: PC2 (Engineering) has been infected with ransomware. The SOC issues an immediate containment directive.',
        investigationTip: 'Execute immediate containment: Change SW1 Port 2 to an isolated Quarantine VLAN (`switchport access vlan 666`), or apply an ACL on R1 g0/0.20 to block all outbound traffic while preserving forensic SSH access.'
      }
    },
    partC: {
      title: 'Lab 21: Full Multi-Device Topology & Fault Injection Lab',
      instructions: 'Build and verify the full PC1-SW1-R1-R2-SW2-PC3 topology, then troubleshoot a deliberate configuration break.',
      type: 'topology',
      drillConfig: {
        scenario: 'PC1 can ping R1 gateway, but cannot ping PC3. Pinging from R1 to R2 across WAN succeeds. Where is the fault?',
        hints: ['Check routing table on R1 for Subnet 30', 'Check return route on R2 for Subnet 10'],
        solutionExplanation: 'R1 has a route to Subnet 30, but R2 is missing a route back to Subnet 10 (192.168.10.0/24). Pings reached PC3, but return Echo Replies were dropped at R2.'
      }
    },
    partD: {
      day: 21,
      title: 'Week 3 Comprehensive Topology & Diagnostics Exam',
      passingScore: 80,
      questions: [
        {
          id: 'q21-1',
          question: 'In the Week 3 topology, what encapsulates the packet as it travels from Switch 1 to Router 1 across the trunk?',
          type: 'multiple-choice',
          options: [
            'An Ethernet frame containing a 4-byte 802.1Q VLAN tag',
            'A raw PPP packet',
            'An unencrypted Telnet stream',
            'A BGP update message'
          ],
          correctAnswer: 0,
          explanation: 'Inter-VLAN trunks carry 802.1Q tagged Ethernet frames to identify which subinterface/VLAN the packet belongs to.'
        },
        {
          id: 'q21-2',
          question: 'If PC1 in VLAN 10 wants to ping PC2 in VLAN 20 on the same switch, does the packet leave the switch?',
          type: 'multiple-choice',
          options: [
            'No, the switch handles routing internally without any other device',
            'Yes, with Router-on-a-Stick, the frame must travel up the trunk to the router and come back down to the switch',
            'Yes, it travels to the ISP DNS server and returns',
            'No, different VLANs can never communicate under any circumstances'
          ],
          correctAnswer: 1,
          explanation: 'In a Router-on-a-Stick topology, inter-VLAN packets must traverse the trunk link up to the router subinterfaces and back down into the destination VLAN.'
        },
        {
          id: 'q21-3',
          question: 'What subnet mask is standard for point-to-point serial or routed Ethernet links connecting two routers?',
          type: 'multiple-choice',
          options: ['255.255.255.0 (/24)', '255.255.255.252 (/30)', '255.255.255.128 (/25)', '255.0.0.0 (/8)'],
          correctAnswer: 1,
          explanation: 'A /30 subnet (mask 255.255.255.252) provides exactly 2 usable host IP addresses, conserving address space on point-to-point links.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'Full topology connects access layers (switches), distribution layers (ROAS), and core routing (WAN).',
        'VLANs keep local traffic segregated until Layer 3 routing is invoked.',
        'Trunks use 802.1Q tags to carry multiple VLANs over a single link.',
        'Routers inspect IP destination headers and forward across subinterfaces and WAN links.',
        'Complete end-to-end communication requires matching bidirectional routing paths.'
      ],
      threeCommonMistakes: [
        'Forgetting that routers strip and rebuild Layer 2 frames at every hop.',
        'Misconfiguring the IP address of the default gateway on client workstations.',
        'Neglecting to test the return routing path when troubleshooting.'
      ],
      miniScenario: {
        scenario: 'A company suffers a security incident in Sales (VLAN 10). The CISO orders that VLAN 10 must immediately lose all access to the Server farm (VLAN 30) while preserving internet access.',
        question: 'Where should this restriction be implemented?',
        answer: 'On Router R1 using an Access Control List (ACL) applied outbound or on the subinterface.',
        explanation: 'Applying an ACL on Router 1 blocking traffic from source `192.168.10.0/24` to destination `192.168.30.0/24` terminates inter-VLAN access while allowing 0.0.0.0/0 (Internet) to pass.'
      },
      flashcardIds: ['fc-d21-1', 'fc-d21-2', 'fc-d21-3']
    }
  }
};
