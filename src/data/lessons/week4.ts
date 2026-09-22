import { LessonContent } from '../../types';

export const WEEK4_LESSONS: Record<number, LessonContent> = {
  22: {
    day: 22,
    title: 'DHCP Operations & Security',
    partA: {
      summary: 'Dynamic Host Configuration Protocol (DHCP) automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to client devices using the 4-step DORA handshake.',
      sections: [
        {
          heading: 'The 4-Step DORA Handshake',
          content: 'Operates over UDP using port 67 (Server) and port 68 (Client):',
          diagram: `Client (Port 68)                           DHCP Server (Port 67)
  │                                                  │
  ├─── [ Discover ] (Broadcast: 255.255.255.255) ────>│  "Any DHCP servers available?"
  │                                                  │
  │<── [ Offer ]    (Unicast/Broadcast) ─────────────┤  "Here is IP 192.168.1.50, lease 24h"
  │                                                  │
  ├─── [ Request ]  (Broadcast) ─────────────────────>│  "I accept 192.168.1.50 from Server A"
  │                                                  │
  │<── [ Acknowledgment (ACK) ] ─────────────────────┤  "Lease confirmed! Config locked in."
  │                                                  │`
        },
        {
          heading: 'DHCP Relay Agent (ip helper-address)',
          content: 'Because the initial DHCP Discover is a Layer 2 broadcast (`FF:FF:FF:FF:FF:FF`), it is dropped by routers! To avoid placing a physical DHCP server on every single VLAN subnet, routers act as **DHCP Relay Agents**.\n\n- The router intercepts the client broadcast Discover and converts it into a unicast packet forwarded directly to the centralized enterprise DHCP server: `ip helper-address <DHCP-Server-IP>`.\n- The router injects its own subinterface IP as the **Gateway IP (GIADDR)** so the DHCP server knows which subnet pool to draw the address from!'
        }
      ]
    },
    partB: {
      whyItExists: 'In a company with 5,000 employees moving between offices and Wi-Fi, manually typing static IP addresses, subnet masks, and DNS servers on every laptop and phone would cause massive duplicate IP collisions and operational chaos.',
      problemSolved: 'Automated IP address management, seamless roaming, dynamic lease reclamation, and centralized configuration distribution.',
      behindTheScenes: 'When a lease hits 50% of its duration (T1 timer), the client attempts to renew directly with the original DHCP server via unicast DHCP Request. If unanswered at 87.5% (T2 timer), it broadcasts to any available DHCP server.',
      commonMistakes: [
        'Forgetting that DHCP Discover cannot cross routers without an `ip helper-address` configured on the router interface.',
        'Not reserving static IPs for critical servers and printers outside the dynamic DHCP pool range.',
        'Allowing rogue consumer Wi-Fi routers plugged into office cubicle jacks to respond to DHCP requests.'
      ],
      socCybersecurityRelevance: {
        title: 'DHCP Starvation & Rogue DHCP Server Attacks',
        description: '1. **DHCP Starvation**: An attacker uses tools like `dhcpstarv` to generate thousands of spoofed MAC requests, exhausting all available IP addresses in the pool (Denial of Service).\n2. **Rogue DHCP Server**: The attacker launches their own DHCP server on the LAN. When clients send Discovers, the rogue server replies faster than the legitimate server, assigning the attacker’s machine as the Default Gateway and DNS server (complete Man-in-the-Middle MitM)!',
        investigationTip: 'Mitigation: Enable **DHCP Snooping** on switches. Configure user access ports as "untrusted" and only the uplink port to the true DHCP server as "trusted". Untrusted ports dropping DHCP Offers/ACKs instantly block rogue servers!'
      }
    },
    partC: {
      title: 'Lab 22: DHCP Handshake & Relay Simulator',
      instructions: 'Track the DORA packet flow across a router configured with `ip helper-address` and identify rogue DHCP behavior.',
      type: 'packet-flow',
      drillConfig: {
        scenario: 'A workstation broadcasts DHCP Discover on VLAN 10. Centralized DHCP server is on VLAN 100 at 10.0.100.5.',
        hints: ['Router subinterface g0/0.10 needs ip helper-address 10.0.100.5', 'Router unicasts to DHCP server with GIADDR = 192.168.10.1'],
        solutionExplanation: 'The client Discover broadcast is intercepted by the router at subinterface g0/0.10. The router converts the broadcast into a unicast UDP packet destined for 10.0.100.5 with GIADDR=192.168.10.1. The DHCP server uses GIADDR to select the 192.168.10.0 pool and sends an Offer back.'
      }
    },
    partD: {
      day: 22,
      title: 'Day 22 DHCP Operations & Security Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q22-1',
          question: 'What is the correct 4-step sequence of the dynamic host address configuration handshake?',
          type: 'multiple-choice',
          options: [
            'Discover, Offer, Request, Acknowledgment (DORA)',
            'Domain, Order, Route, Address',
            'SYN, SYN-ACK, ACK, FIN',
            'Probe, Response, Query, Confirm'
          ],
          correctAnswer: 0,
          explanation: 'DHCP uses the 4-step DORA process: Discover -> Offer -> Request -> Acknowledgment.'
        },
        {
          id: 'q22-2',
          question: 'What Cisco switch security feature inspects DHCP traffic and drops unauthorized DHCP Offers from untrusted ports?',
          type: 'multiple-choice',
          options: ['PortFast', 'DHCP Snooping', 'Spanning Tree', 'VTP Pruning'],
          correctAnswer: 1,
          explanation: 'DHCP Snooping creates trusted and untrusted ports, discarding unauthorized DHCP server replies (Offers/ACKs) on untrusted user ports.'
        },
        {
          id: 'q22-3',
          question: 'Which Cisco router command is required to forward client DHCP broadcast requests across a router to a centralized server on another subnet?',
          type: 'multiple-choice',
          options: ['ip route 0.0.0.0', 'ip helper-address <server-ip>', 'switchport mode trunk', 'no shutdown'],
          correctAnswer: 1,
          explanation: 'The `ip helper-address <ip>` command converts client Layer 2 broadcasts into unicast packets routed to the specified remote DHCP server.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'DHCP uses UDP ports 67 (server) and 68 (client).',
        'The DORA handshake: Discover, Offer, Request, ACK.',
        'Routers drop broadcasts by default; `ip helper-address` acts as a DHCP Relay.',
        'DHCP provides IP address, subnet mask, default gateway, and DNS server.',
        'DHCP Snooping protects networks from rogue DHCP servers and pool exhaustion.'
      ],
      threeCommonMistakes: [
        'Forgetting `ip helper-address` on router subinterfaces when using a centralized DHCP server.',
        'Overlapping static IP assignments with the dynamic DHCP address pool.',
        'Assuming DHCP leases are permanent (they expire unless renewed).'
      ],
      miniScenario: {
        scenario: 'Multiple users in an office suddenly complain that their web traffic is redirected to an unknown Russian search engine. Checking `ipconfig /all` on affected laptops reveals their Default Gateway and DNS server were changed to `192.168.1.189` (a coworker’s laptop).',
        question: 'What security incident has occurred?',
        answer: 'Rogue DHCP Server attack (Man-in-the-Middle).',
        explanation: 'The coworker’s laptop (or attacker malware) ran a rogue DHCP server that answered client Discovers faster than the real server, distributing malicious gateway and DNS settings to hijack traffic.'
      },
      flashcardIds: ['fc-d22-1', 'fc-d22-2', 'fc-d22-3']
    }
  },

  23: {
    day: 23,
    title: 'DNS & Name Resolution',
    partA: {
      summary: 'Domain Name System (DNS) is the global hierarchical directory translating human-friendly domain names (e.g. google.com) into machine-routable IP addresses (142.250.190.46) and vice versa.',
      sections: [
        {
          heading: 'The Global DNS Hierarchy',
          content: 'Organized as an inverted tree structure starting from the root:\n- **Root Level (`.`)**: 13 named root server clusters worldwide (managed by ICANN/IANA).\n- **Top-Level Domains (TLD)**: Generic (.com, .org, .edu) and Country-Code (.us, .uk, .de), managed by TLD registries.\n- **Second-Level Domains**: Registered enterprise domains (e.g. `cisco.com`, `github.com`).\n- **Subdomains**: Departmental divisions (e.g. `vpn.corp.cisco.com`).',
          diagram: `                    [ Root Level "." ]
                            │
        ┌───────────────────┴───────────────────┐
     [ .com ]                                [ .org ]
        │                                       │
   [ google.com ]                           [ wikipedia.org ]
        │
   [ mail.google.com ]`
        },
        {
          heading: 'Recursive Query vs Authoritative Server',
          content: '1. **Recursive Resolver (e.g. 8.8.8.8, ISP resolver)**: Does the hard work of traversing the root, TLD, and authoritative servers on behalf of the client.\n2. **Authoritative Name Server**: Holds the official, binding DNS record database for a specific registered domain.',
          table: {
            headers: ['Record Type', 'Name', 'Description & Purpose'],
            rows: [
              ['A Record', 'IPv4 Host', 'Maps a domain name to a 32-bit IPv4 address (e.g. example.com -> 93.184.216.34)'],
              ['AAAA Record', 'IPv6 Host', 'Maps a domain name to a 128-bit IPv6 address'],
              ['CNAME', 'Canonical Name', 'Alias pointing one domain name to another domain name (e.g. www -> example.com)'],
              ['MX Record', 'Mail Exchange', 'Specifies mail servers responsible for accepting email for the domain (with priority)'],
              ['TXT Record', 'Text Data', 'Arbitrary text used for domain verification and email anti-spoofing (SPF, DKIM, DMARC)'],
              ['NS Record', 'Name Server', 'Delegates a DNS zone to authoritative name servers'],
              ['PTR Record', 'Pointer', 'Reverse DNS lookup: resolves an IP address back to a hostname']
            ]
          }
        }
      ]
    },
    partB: {
      whyItExists: 'Humans remember names, not 32-bit binary strings or 128-bit IPv6 hex. Furthermore, an organization can change its hosting provider and IP address without changing its public website URL.',
      problemSolved: 'Decouples human-facing brand identity from physical IP hosting locations.',
      behindTheScenes: 'DNS heavily relies on caching with Time-to-Live (TTL). When a resolver queries an authoritative server, it caches the reply for the duration of the TTL (e.g. 3600 seconds) so future queries are answered locally in 1 millisecond.',
      commonMistakes: [
        'Creating a CNAME record that points directly to an IP address (CNAME can only point to another domain name; use an A record for IPs!).',
        'Confusing recursive resolvers (which look up names for clients) with authoritative servers (which own the zone files).',
        'Setting DNS TTL to 0 in production (overwhelms DNS servers with continuous traffic).'
      ],
      socCybersecurityRelevance: {
        title: 'DNS Tunneling, DGA & Fast-Flux Malware C2',
        description: 'DNS is the number one protocol abused by malware because port 53 is almost universally permitted outbound through firewalls!\n1. **DNS Tunneling**: Malware encodes stolen files into subdomains: `exfiltrated-password-chunk.attacker-domain.com`. The attacker’s authoritative server logs the query and reconstructs the data!\n2. **Domain Generation Algorithms (DGA)**: Malware queries 1,000 randomly generated domains per day to evade static domain blocklists.',
        investigationTip: 'In your SIEM, monitor DNS query volume and alert on unusually long subdomains (high entropy / base64 strings) or sudden spikes in NXDOMAIN (domain does not exist) errors.'
      }
    },
    partC: {
      title: 'Lab 23: DNS Query Flow & nslookup Diagnostic Lab',
      instructions: 'Use simulated `nslookup` queries to resolve A records, MX records, and diagnose DNS resolution failures.',
      type: 'cli-exercise',
      drillConfig: {
        scenario: 'A user cannot access `intranet.corp`. `nslookup intranet.corp 1.1.1.1` returns NXDOMAIN, but `nslookup intranet.corp 10.0.0.2` returns 10.0.5.50.',
        hints: ['1.1.1.1 is public internet DNS', '10.0.0.2 is internal enterprise Active Directory DNS'],
        solutionExplanation: 'Internal private domains (.corp, .internal) only exist on internal DNS servers (10.0.0.2). If a client workstation is misconfigured to use public DNS (1.1.1.1) instead of the company DNS server, internal domain lookups fail completely.'
      }
    },
    partD: {
      day: 23,
      title: 'Day 23 DNS & Name Resolution Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q23-1',
          question: 'Which DNS record type maps a domain name to an IPv4 address?',
          type: 'multiple-choice',
          options: ['AAAA Record', 'A Record', 'CNAME Record', 'PTR Record'],
          correctAnswer: 1,
          explanation: 'An A (Address) record maps a domain name directly to a 32-bit IPv4 address.'
        },
        {
          id: 'q23-2',
          question: 'What email security mechanisms rely on DNS TXT records to verify sender authenticity and prevent email spoofing?',
          type: 'multiple-choice',
          options: ['BGP and OSPF', 'SPF, DKIM, and DMARC', 'DHCP and ARP', 'SNMP and NTP'],
          correctAnswer: 1,
          explanation: 'SPF (Sender Policy Framework), DKIM, and DMARC use DNS TXT records to publish authorized sending mail servers and cryptographic keys.'
        },
        {
          id: 'q23-3',
          question: 'What cyberattack technique encodes arbitrary data into DNS queries to sneak files past perimeter firewalls?',
          type: 'multiple-choice',
          options: ['DNS Tunneling', 'ARP Poisoning', 'SYN Flooding', 'VLAN Hopping'],
          correctAnswer: 0,
          explanation: 'DNS Tunneling encapsulates non-DNS data into DNS query names and responses to bypass firewalls on port 53.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'DNS translates human-readable hostnames into IP addresses.',
        'Hierarchy: Root -> TLD (.com) -> Second Level (cisco.com) -> Subdomain.',
        'A records hold IPv4; AAAA hold IPv6; CNAME are aliases; MX route email.',
        'DNS caching uses TTL to reduce latency and server load.',
        'DNS tunneling and DGA are prominent malware command-and-control vectors.'
      ],
      threeCommonMistakes: [
        'Pointing a CNAME to an IP address instead of a domain name.',
        'Forgetting that internal corporate domains cannot be resolved by external public DNS servers like 8.8.8.8.',
        'Overlooking DNS query logs during cybersecurity threat investigations.'
      ],
      miniScenario: {
        scenario: 'A SOC analyst discovers an endpoint making 20,000 DNS queries per hour to domains resembling `q8x7z2m1p9.biz`, `a3k9v0x2y7.biz`, all returning NXDOMAIN.',
        question: 'What malware communication mechanism does this behavior indicate?',
        answer: 'Domain Generation Algorithm (DGA).',
        explanation: 'Malware uses DGAs to generate pseudo-random domain names to locate an active command-and-control (C2) server. Because most generated domains have not been registered by the attacker yet, queries return NXDOMAIN (Non-Existent Domain).'
      },
      flashcardIds: ['fc-d23-1', 'fc-d23-2', 'fc-d23-3']
    }
  },

  24: {
    day: 24,
    title: 'NAT & PAT (Network Address Translation)',
    partA: {
      summary: 'Network Address Translation (NAT) modifies IP header addresses in transit through a router or firewall, enabling private RFC 1918 networks to communicate across the public Internet and conserving IPv4 space.',
      sections: [
        {
          heading: 'The Three Flavors of NAT',
          content: '1. **Static NAT**: One-to-one mapping between a private IP and a permanent public IP (used for hosting publicly accessible web or mail servers).\n2. **Dynamic NAT**: Many-to-many mapping where private hosts dynamically grab an available public IP from a shared pool.\n3. **PAT (Port Address Translation / NAT Overload)**: Many-to-one mapping where thousands of internal private hosts share a SINGLE public IP address by assigning unique Layer 4 source port numbers!',
          table: {
            headers: ['NAT Type', 'Private to Public Ratio', 'Port Modification?', 'Common Enterprise Use'],
            rows: [
              ['Static NAT', '1 : 1', 'No (Port preserved)', 'Public web servers, inbound DMZ services'],
              ['Dynamic NAT', 'M : N (Pool)', 'No', 'Temporary outbound pool allocation'],
              ['PAT (NAT Overload)', 'Thousands : 1', 'YES (Translates Source Ports)', 'Standard home routers, corporate office outbound browsing']
            ]
          }
        },
        {
          heading: 'Cisco NAT Terminology Matrix',
          content: 'Four standardized terms that define addresses during translation:',
          table: {
            headers: ['Term', 'Definition & Location', 'Example Value'],
            rows: [
              ['Inside Local', 'The private IP address assigned to an internal host inside the LAN', '192.168.1.50'],
              ['Inside Global', 'The registered public IP address representing the internal host to the outside world', '203.0.113.10'],
              ['Outside Local', 'The IP address of an external destination as seen from inside the LAN', '93.184.216.34'],
              ['Outside Global', 'The true public IP address assigned to the destination host on the Internet', '93.184.216.34']
            ]
          }
        }
      ]
    },
    partB: {
      whyItExists: 'IPv4 was designed with only 4.29 billion addresses. Without PAT/NAT allowing an entire company or household to share a single public IP, the global Internet would have ground to an absolute halt in 1998.',
      problemSolved: 'Solves IPv4 address exhaustion and conceals internal network topology from external Internet scanners.',
      behindTheScenes: 'The NAT router maintains a stateful **NAT Translation Table**. When Host A (192.168.1.10:45000) sends a packet to a web server, the router changes the source to (203.0.113.10:59123). When the web server replies to port 59123, the router consults its table and translates it back to 192.168.1.10:45000.',
      commonMistakes: [
        'Assuming NAT is a complete firewall (NAT translates addresses, but does not perform stateful packet filtering or malware inspection on its own).',
        'Protocols with embedded IP addresses in payloads (like SIP VoIP or active FTP) break with standard NAT without an Application Layer Gateway (ALG).',
        'Confusing Inside Local (private) with Inside Global (public).'
      ],
      socCybersecurityRelevance: {
        title: 'SOC Attribution Challenge: Demultiplexing NAT Logs',
        description: 'An external threat intelligence alert states: "Attacks originated from your company’s public IP 203.0.113.10 at 14:02:15 UTC." But 2,000 employees share that single IP!',
        investigationTip: 'Without the **Source Port** number (e.g. port 49821), you CANNOT identify which internal employee machine initiated the attack! A SOC must log NAT translation events (timestamp, source IP, source port, translated IP, translated port) to preserve forensic attribution.'
      }
    },
    partC: {
      title: 'Lab 24: NAT Translation Table Inspection Lab',
      instructions: 'Trace a connection through a NAT overload table and map inside local addresses to outside global destinations.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'PC1 (192.168.1.10:51200) and PC2 (192.168.1.20:51200) connect to the same web server. How does the PAT router differentiate their traffic?',
        hints: ['Both have the same source port 51200 internally', 'PAT assigns unique translated external ports'],
        solutionExplanation: 'The router translates PC1 to 203.0.113.10:60001 and PC2 to 203.0.113.10:60002. When web server replies arrive on port 60001, they go to PC1; replies on 60002 go to PC2.'
      }
    },
    partD: {
      day: 24,
      title: 'Day 24 NAT & PAT Operations Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q24-1',
          question: 'What form of NAT allows thousands of private IP addresses to share a single public IP address by translating transport layer port numbers?',
          type: 'multiple-choice',
          options: ['Static NAT', 'Dynamic NAT', 'Port Address Translation (PAT / NAT Overload)', 'Bridged NAT'],
          correctAnswer: 2,
          explanation: 'PAT (Port Address Translation), also called NAT Overload, maps multiple private hosts to a single public IP using unique source port numbers.'
        },
        {
          id: 'q24-2',
          question: 'In Cisco NAT terminology, what is an "Inside Local" address?',
          type: 'multiple-choice',
          options: [
            'The private IP address assigned to an internal host on the inside network',
            'The public IP address assigned to an external web server',
            'The MAC address of the default gateway',
            'The DNS server IP address'
          ],
          correctAnswer: 0,
          explanation: 'Inside Local is the actual private RFC 1918 IP address assigned to a device inside the private network.'
        },
        {
          id: 'q24-3',
          question: 'Why is logging the source port critical for a SOC investigating traffic traversing an enterprise PAT router?',
          type: 'multiple-choice',
          options: [
            'Because ports determine the Wi-Fi frequency',
            'Because thousands of internal hosts share the identical public IP; only the source port uniquely identifies which specific host communicated',
            'Because routers cannot forward packets without port logging',
            'Because port numbers contain encrypted user passwords'
          ],
          correctAnswer: 1,
          explanation: 'Because PAT multiplexes multiple hosts behind one public IP, the translated source port is the only differentiator linking external traffic back to an internal endpoint.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'NAT converts private RFC 1918 IPs to routable public IPs.',
        'Static NAT: 1-to-1; Dynamic NAT: pool-to-pool; PAT (Overload): many-to-1.',
        'PAT translates Layer 4 source ports to track connections.',
        'Inside Local is private; Inside Global is the translated public IP.',
        'NAT hides internal topologies but is not a substitute for a stateful firewall.'
      ],
      threeCommonMistakes: [
        'Assuming NAT provides full firewall protection.',
        'Failing to log source ports when investigating external alerts from NATed egress points.',
        'Expecting inbound connections from the Internet to reach internal private hosts without Static NAT or port forwarding.'
      ],
      miniScenario: {
        scenario: 'A company hosts an internal web server at `192.168.1.100`. Customers on the Internet cannot access it. The router has PAT enabled for outbound browsing.',
        question: 'What NAT configuration is needed to make the internal web server accessible to the public Internet?',
        answer: 'Static NAT (or Port Forwarding).',
        explanation: 'PAT only builds temporary translation entries when internal clients initiate outbound connections. For unsolicited inbound traffic to reach the web server, a permanent Static NAT entry (e.g. `ip nat inside source static 192.168.1.100 203.0.113.50`) is required.'
      },
      flashcardIds: ['fc-d24-1', 'fc-d24-2', 'fc-d24-3']
    }
  },

  25: {
    day: 25,
    title: 'ACLs & Network Security',
    partA: {
      summary: 'Access Control Lists (ACLs) are ordered rule sets applied to router and firewall interfaces that permit or deny packets based on header fields, enforcing network boundary security.',
      sections: [
        {
          heading: 'Standard vs Extended ACLs',
          content: 'In Cisco IOS networking:',
          table: {
            headers: ['ACL Type', 'Number Ranges', 'Inspection Criteria', 'Placement Best Practice'],
            rows: [
              ['Standard ACL', '1 - 99 and 1300 - 1999', 'Source IP address ONLY', 'Place as CLOSE TO DESTINATION as possible (avoids blocking needed traffic elsewhere)'],
              ['Extended ACL', '100 - 199 and 2000 - 2699', 'Source IP, Destination IP, Protocol (TCP/UDP/ICMP), Port numbers', 'Place as CLOSE TO SOURCE as possible (drops unwanted traffic before consuming link bandwidth)']
            ]
          }
        },
        {
          heading: 'The Cardinal Rules of ACL Execution',
          content: '1. **Top-Down Sequential Processing**: Packets are evaluated against rules sequentially from top to bottom. The moment a match occurs, the action (permit or deny) is executed immediately and evaluation stops!\n2. **The Implicit Deny Any**: At the very bottom of every ACL exists an invisible rule: `deny ip any any`. If a packet reaches the end without matching an explicit permit, it is dropped silently!\n3. **Interface & Direction**: An ACL does nothing until applied to an interface in a specific direction:\n   - **Inbound (`in`)**: Processed before routing decisions.\n   - **Outbound (`out`)**: Processed after routing decisions.'
        },
        {
          heading: 'Stateful vs Stateless Filtering',
          content: '- **Stateless Filtering (Traditional ACLs)**: Evaluates each packet in total isolation without remembering past packets. To permit web browsing, you must explicitly create a rule allowing outbound SYN packets AND a return rule allowing inbound web traffic!\n- **Stateful Firewalls**: Monitors the connection state (SYN -> SYN-ACK -> ESTABLISHED). When an outbound connection is permitted, the firewall dynamically opens a temporary pinhole to allow return traffic automatically, blocking unsolicited inbound probes.'
        }
      ]
    },
    partB: {
      whyItExists: 'Without packet filtering, any host on the Internet or an adjacent VLAN could connect to any internal port or database service. ACLs enforce the security Principle of Least Privilege at the network layer.',
      problemSolved: 'Blocks unauthorized lateral communication and terminates unapproved protocol traffic.',
      behindTheScenes: 'Extended ACLs can match on TCP flags using the `established` keyword, ensuring only packets with the ACK or RST bit set (replies to connections initiated from inside) are permitted back in.',
      commonMistakes: [
        'Forgetting the implicit deny at the bottom and accidentally blocking all traffic.',
        'Placing a broad permit rule above a specific deny rule (the deny rule will never be reached!).',
        'Applying an extended ACL close to the destination instead of near the source.'
      ],
      socCybersecurityRelevance: {
        title: 'Egress Filtering & C2 Containment',
        description: 'Most organizations spend millions on ingress firewalls but neglect egress filtering. Malware that compromises an endpoint needs to communicate out to an external C2 server.',
        investigationTip: 'Egress ACLs that strictly block all outbound ports except authorized web proxies and enterprise DNS servers prevent malware from establishing reverse shells or exfiltrating data.'
      }
    },
    partC: {
      title: 'Lab 25: Sequential ACL Rule Evaluation Lab',
      instructions: 'Evaluate an ordered list of ACL rules against incoming packet headers and predict whether each packet is Permitted or Denied.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'Rule 1: deny tcp 192.168.1.0 0.0.0.255 any eq 23. Rule 2: permit ip any any. Packet A: 192.168.1.50 -> 10.0.0.1 port 23. Packet B: 192.168.1.50 -> 10.0.0.1 port 80.',
        hints: ['Top-down processing', 'Rule 1 checks port 23', 'Rule 2 matches all other IP traffic'],
        solutionExplanation: 'Packet A matches Rule 1: DENIED (Telnet blocked). Packet B does not match Rule 1 (port 80 != 23), continues to Rule 2: PERMITTED.'
      }
    },
    partD: {
      day: 25,
      title: 'Day 25 ACL & Firewall Filtering Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q25-1',
          question: 'What rule exists invisibly at the end of every Cisco Access Control List?',
          type: 'multiple-choice',
          options: [
            'permit ip any any',
            'deny ip any any (Implicit Deny)',
            'log all traffic',
            'redirect to default gateway'
          ],
          correctAnswer: 1,
          explanation: 'Every ACL terminates with an invisible "implicit deny all" rule. Any packet that fails to match an explicit permit rule is dropped.'
        },
        {
          id: 'q25-2',
          question: 'Where should an Extended ACL typically be placed for optimal network efficiency?',
          type: 'multiple-choice',
          options: [
            'As close to the destination as possible',
            'As close to the traffic source as possible',
            'On the core backbone router only',
            'On the DNS server'
          ],
          correctAnswer: 1,
          explanation: 'Extended ACLs should be placed as close to the traffic source as possible so unwanted traffic is dropped before consuming bandwidth across intermediate links.'
        },
        {
          id: 'q25-3',
          question: 'What is the key difference between a stateless packet filter (standard ACL) and a stateful firewall?',
          type: 'multiple-choice',
          options: [
            'Stateless filters inspect encrypted payloads',
            'Stateful firewalls track the connection state in memory and automatically permit legitimate return traffic',
            'Stateless filters only run on Linux',
            'Stateful firewalls cannot filter by IP'
          ],
          correctAnswer: 1,
          explanation: 'Stateful firewalls maintain a state table tracking active TCP/UDP sessions, automatically permitting return traffic without requiring static inbound rules.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'Standard ACLs filter on Source IP only; Extended ACLs filter on Source, Dest, Protocol, and Port.',
        'ACLs are processed sequentially top-down; first match terminates evaluation.',
        'Every ACL ends with an implicit deny all.',
        'Extended ACLs should be placed close to the source; Standard ACLs close to destination.',
        'Stateful firewalls track session state and dynamically allow return traffic.'
      ],
      threeCommonMistakes: [
        'Putting a broad `permit any any` rule at the top of an ACL, rendering all subsequent rules useless.',
        'Forgetting that Standard ACLs placed near the source will inadvertently block all traffic from that host to other destinations.',
        'Neglecting to apply the ACL to the interface using `ip access-group <number> <in|out>`.'
      ],
      miniScenario: {
        scenario: 'An admin configures an ACL: `access-list 10 permit 192.168.10.0 0.0.0.255` and applies it inbound on the router interface. All employees in that subnet can connect, but servers in subnet `192.168.20.0` cannot communicate with anyone anymore.',
        question: 'Why are all other subnets blocked?',
        answer: 'The implicit deny at the end dropped all traffic from non-192.168.10.0 subnets.',
        explanation: 'Because ACL 10 only contains a single permit line for 192.168.10.0, any packet originating from another subnet hits the invisible `deny any` at the end.'
      },
      flashcardIds: ['fc-d25-1', 'fc-d25-2', 'fc-d25-3']
    }
  },

  26: {
    day: 26,
    title: 'Wireless Networking (802.11)',
    partA: {
      summary: 'IEEE 802.11 wireless networking enables mobile connectivity over radio frequencies. Security relies on robust authentication and encryption protocols, progressing from broken WEP to WPA2-PSK and modern WPA3-SAE.',
      sections: [
        {
          heading: 'Radio Frequencies & Wireless Bands',
          content: 'Wireless operates in unlicensed industrial, scientific, and medical (ISM) radio bands:',
          table: {
            headers: ['Band', 'Range & Propagation', 'Channel Capacity', 'Interference Risk'],
            rows: [
              ['2.4 GHz', 'Long range, penetrates walls easily', 'Only 3 non-overlapping channels (1, 6, 11)', 'High (microwaves, Bluetooth, neighbor APs)'],
              ['5 GHz', 'Shorter range, poor wall penetration', 'Up to 24 non-overlapping channels', 'Low (much higher bandwidth and capacity)'],
              ['6 GHz (Wi-Fi 6E / 7)', 'Shortest range, line-of-sight', 'Huge contiguous spectrum (1200 MHz)', 'Zero legacy device interference']
            ]
          }
        },
        {
          heading: 'WPA2 vs WPA3 Security Architecture',
          content: '- **WEP (Wired Equivalent Privacy)**: Completely broken. 24-bit IV allows cracking RC4 keys in under 60 seconds. Forbidden.\n- **WPA2 (802.11i)**: Uses AES-CCMP encryption. Vulnerable to offline dictionary attacks if the 4-way handshake is captured, and vulnerable to KRACK (Key Reinstallation Attack).\n- **WPA3**: Mandates **Simultaneous Authentication of Equals (SAE)** (Dragonfly handshake). Prevents offline dictionary attacks even with weak passwords and provides **Forward Secrecy**.'
        }
      ]
    },
    partB: {
      whyItExists: 'Physical cables restrict mobility. Wireless provides untethered connectivity for modern laptops, smartphones, and IoT sensors.',
      problemSolved: 'Eliminates wall cabling for mobile users and enables guest access across campuses.',
      behindTheScenes: 'Wireless is half-duplex shared medium. Devices cannot transmit and listen simultaneously, so they use **CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)** rather than Ethernet CSMA/CD.',
      commonMistakes: [
        'Using overlapping 2.4 GHz channels like 2, 3, or 4 (always use strictly 1, 6, or 11).',
        'Using WPA2-Personal with a simple dictionary password (easily cracked from captured handshakes).',
        'Hiding the SSID and believing it provides security (hidden SSIDs are trivially discovered with Wireshark/airmon-ng).'
      ],
      socCybersecurityRelevance: {
        title: 'Evil Twin APs & Deauthentication Attacks',
        description: 'An attacker sets up a rogue Wi-Fi Access Point broadcasting the exact same SSID as the corporate network ("Corporate-WiFi").\n1. Attacker sends spoofed 802.11 **Deauthentication Frames** to kick legitimate clients off the real AP.\n2. When clients reconnect, they connect to the attacker’s stronger rogue AP!\n3. Attacker captures credentials and inspects traffic.',
        investigationTip: 'Mitigation: Implement WPA3 or 802.11w (Protected Management Frames / PMF), which cryptographically signs deauthentication frames so attackers cannot spoof them!'
      }
    },
    partC: {
      title: 'Lab 26: Wireless Spectrum & 4-Way Handshake Lab',
      instructions: 'Select optimal non-overlapping channels in a crowded 2.4 GHz office and evaluate 802.11 frame captures.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'Three adjacent access points in an office currently run on channels 1, 2, and 6. AP 2 causes heavy packet collisions.',
        hints: ['Non-overlapping 2.4 GHz channels are 1, 6, 11', 'Change AP 2 to channel 11'],
        solutionExplanation: 'Channel 2 overlaps heavily with Channel 1. Reassigning the three APs to channels 1, 6, and 11 eliminates co-channel and adjacent-channel interference completely.'
      }
    },
    partD: {
      day: 26,
      title: 'Day 26 Wireless Security & Architecture Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q26-1',
          question: 'What are the three non-overlapping channels in the 2.4 GHz wireless spectrum in North America?',
          type: 'multiple-choice',
          options: ['Channels 1, 2, and 3', 'Channels 1, 6, and 11', 'Channels 2, 7, and 12', 'Channels 6, 12, and 18'],
          correctAnswer: 1,
          explanation: 'In the 2.4 GHz band, channels 1, 6, and 11 are spaced 25 MHz apart and do not overlap.'
        },
        {
          id: 'q26-2',
          question: 'What modern authentication mechanism does WPA3 use to eliminate offline dictionary password guessing attacks?',
          type: 'multiple-choice',
          options: [
            'RC4 stream cipher',
            'Simultaneous Authentication of Equals (SAE / Dragonfly handshake)',
            'Cleartext PSK',
            'WEP IV rotation'
          ],
          correctAnswer: 1,
          explanation: 'WPA3 replaces the Pre-Shared Key 4-way handshake with SAE (Simultaneous Authentication of Equals), providing forward secrecy and resisting offline password cracking.'
        },
        {
          id: 'q26-3',
          question: 'What 802.11 frame type is abused by attackers to forcibly disconnect clients from a legitimate Access Point without authentication?',
          type: 'multiple-choice',
          options: ['Beacon frame', 'Deauthentication frame', 'Probe request', 'RTS frame'],
          correctAnswer: 1,
          explanation: 'Unencrypted 802.11 deauthentication management frames can be spoofed by an attacker to boot victims off an AP.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'Wi-Fi (802.11) is a half-duplex shared medium using CSMA/CA.',
        '2.4 GHz has greater range but only 3 non-overlapping channels (1, 6, 11).',
        '5 GHz and 6 GHz provide significantly more spectrum and higher bandwidth.',
        'WPA3 uses SAE (Dragonfly) to protect against offline dictionary attacks.',
        'Protected Management Frames (802.11w) prevent deauthentication attacks.'
      ],
      threeCommonMistakes: [
        'Relying on hidden SSIDs or MAC address filtering for wireless security.',
        'Using overlapping channels (like channel 3) in the 2.4 GHz band.',
        'Deploying legacy WEP or WPA1 in production.'
      ],
      miniScenario: {
        scenario: 'A coffee shop customer notices their laptop suddenly lost Wi-Fi connection, reconnected, and prompted them to re-enter their Google password into a browser window.',
        question: 'What attack pattern is being carried out?',
        answer: 'Evil Twin Access Point with a captive portal phishing attack.',
        explanation: 'The attacker sent deauthentication frames to disconnect the victim, broadcasted a duplicate SSID, and used a fake captive portal to harvest credentials.'
      },
      flashcardIds: ['fc-d26-1', 'fc-d26-2', 'fc-d26-3']
    }
  },

  27: {
    day: 27,
    title: 'Network Management & Monitoring',
    partA: {
      summary: 'Centralized network management protocols (SSH, SNMP, Syslog, NTP) enable administrators to configure infrastructure securely, monitor device health telemetry, and aggregate forensic audit logs.',
      sections: [
        {
          heading: 'Core Management Protocol Suite',
          content: 'Essential protocols for operations and SOC telemetry:',
          table: {
            headers: ['Protocol', 'Port', 'Transport', 'Primary Purpose', 'Security Best Practice'],
            rows: [
              ['SSH (Secure Shell)', '22', 'TCP', 'Encrypted interactive command-line administration', 'Disable root password login; use public/private SSH keys'],
              ['SNMP (Simple Network Mgmt)', '161/162', 'UDP', 'Query device metrics (CPU, bandwidth, errors)', 'ALWAYS use SNMPv3 (encrypted); avoid v1/v2c plaintext community strings'],
              ['Syslog', '514', 'UDP / TLS', 'Centralized system event logging across all devices', 'Send logs to SIEM over TLS (port 6514) to prevent tampering'],
              ['NTP (Network Time Protocol)', '123', 'UDP', 'Clock synchronization across all enterprise systems', 'Use authenticated NTP servers to prevent timestamp spoofing']
            ]
          }
        },
        {
          heading: 'Syslog Severity Levels (RFC 5424)',
          content: 'Every syslog message is tagged with a severity level from 0 to 7:\n- **0: Emergency** (System unusable)\n- **1: Alert** (Immediate action required)\n- **2: Critical** (Critical conditions)\n- **3: Error** (Error conditions)\n- **4: Warning** (Warning conditions)\n- **5: Notice** (Normal but significant condition)\n- **6: Informational** (Informational messages, e.g. interface up/down)\n- **7: Debugging** (Detailed diagnostic output)'
        }
      ]
    },
    partB: {
      whyItExists: 'In a global network with 2,000 routers and switches, administrators cannot log into each device individually to check if a fan failed or an interface went down. Centralized telemetry brings all operational data into a single pane of glass.',
      problemSolved: 'Automated health alerting, forensic audit trails, and synchronized incident timelines.',
      behindTheScenes: 'SNMP organizes device parameters in a tree structure called the **Management Information Base (MIB)**. Each parameter is referenced by an **Object Identifier (OID)** (e.g. `1.3.6.1.2.1.1.1.0` for system description).',
      commonMistakes: [
        'Using SNMPv1 or SNMPv2c with default community strings `public` (read-only) or `private` (read-write!).',
        'Allowing devices to drift out of time synchronization by neglecting NTP.',
        'Using unencrypted Telnet (port 23) for switch management.'
      ],
      socCybersecurityRelevance: {
        title: 'Why NTP is Non-Negotiable in Digital Forensics',
        description: 'During a cyber incident investigation, the SOC correlates logs from the firewall, proxy, endpoint, and switch.',
        investigationTip: 'If the firewall clock is off by 4 minutes, you cannot prove whether the malware beacon occurred before or after the phishing email arrived! Kerberos authentication also fails if clocks drift by >5 minutes.'
      }
    },
    partC: {
      title: 'Lab 27: Syslog Severity & SNMP Telemetry Lab',
      instructions: 'Inspect incoming syslog alerts, categorize them by RFC 5424 severity, and identify security risks in SNMP v2c community strings.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'Analyze log: `%SYS-5-CONFIG_I: Configured from console by admin on vty0`. What is the severity level?',
        hints: ['Severity number is between %FACILITY and -SUBFACILITY', '%SYS-5-... means level 5'],
        solutionExplanation: 'Level 5 is "Notice" (Normal but significant condition). It records that an administrative configuration change occurred.'
      }
    },
    partD: {
      day: 27,
      title: 'Day 27 Network Management & Logging Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q27-1',
          question: 'Which version of SNMP introduces cryptographic authentication and encryption for message security?',
          type: 'multiple-choice',
          options: ['SNMPv1', 'SNMPv2c', 'SNMPv3', 'SNMPv4'],
          correctAnswer: 2,
          explanation: 'SNMPv3 provides cryptographic authentication (HMAC-SHA/MD5) and encryption (AES/DES) via the User-based Security Model (USM).'
        },
        {
          id: 'q27-2',
          question: 'Why is Network Time Protocol (NTP) critical for security operations and forensic incident response?',
          type: 'multiple-choice',
          options: [
            'NTP accelerates router packet switching speed',
            'NTP synchronizes clocks across all network systems so log timestamps can be correlated accurately',
            'NTP encrypts all user email',
            'NTP replaces the need for DNS'
          ],
          correctAnswer: 1,
          explanation: 'NTP ensures all network devices share identical timestamps, allowing SOC analysts to reconstruct an accurate chronological timeline of events across disparate logs.'
        },
        {
          id: 'q27-3',
          question: 'What is the Syslog severity level for a critical condition (Level 2)?',
          type: 'multiple-choice',
          options: ['0', '2', '5', '7'],
          correctAnswer: 1,
          explanation: 'RFC 5424 defines Level 2 as Critical (Level 0 Emergency, Level 1 Alert, Level 2 Critical, Level 3 Error).'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'SSH (port 22) provides encrypted remote administrative terminal access.',
        'SNMPv3 introduces encryption and authentication; v1/v2c are plaintext.',
        'Syslog organizes event logs across 8 severity levels (0 Emergency to 7 Debug).',
        'NTP synchronizes device clocks for forensic timestamp correlation.',
        'Never manage switches over cleartext Telnet or HTTP.'
      ],
      threeCommonMistakes: [
        'Leaving default SNMP community strings (`public`, `private`) enabled.',
        'Neglecting NTP configuration on firewalls and SIEM collectors.',
        'Transmitting Syslog messages unencrypted over the public Internet.'
      ],
      miniScenario: {
        scenario: 'An attacker conducts reconnaissance on a corporate network and runs `snmpwalk -v 2c -c public 10.0.0.1`. The router responds with the complete device hostname, firmware version, and list of all active network interfaces.',
        question: 'What configuration failure allowed this reconnaissance?',
        answer: 'Unprotected SNMPv2c running with the default `public` community string.',
        explanation: 'Default community strings allow unauthorized external users to query the MIB and harvest complete infrastructure intelligence. Upgrading to SNMPv3 with authPriv blocks this.'
      },
      flashcardIds: ['fc-d27-1', 'fc-d27-2', 'fc-d27-3']
    }
  },

  28: {
    day: 28,
    title: 'Troubleshooting Methodology & CLI',
    partA: {
      summary: 'Professional network troubleshooting relies on a structured 7-step methodology and mastery of command-line diagnostic utilities (ping, tracert, ipconfig, arp, nslookup, netstat) to isolate failures efficiently.',
      sections: [
        {
          heading: 'The 7-Step Structured Troubleshooting Model',
          content: 'CompTIA and Cisco standardized diagnostic sequence:\n1. **Identify the problem**: Gather symptoms, duplicate issue, question users, identify recent changes.\n2. **Establish a theory of probable cause**: Question the obvious; consider multiple factors.\n3. **Test the theory**: If confirmed, proceed; if not, formulate a new theory or escalate.\n4. **Establish a plan of action and implement the solution**: Determine potential side effects.\n5. **Verify full system functionality**: Test and implement preventive measures.\n6. **Document findings, actions, and outcomes**: Build knowledge base for future incidents.\n7. **Prevent recurrence**: Apply policy or config hardening.'
        },
        {
          heading: 'Troubleshooting Approaches',
          content: '- **Bottom-Up**: Start at Layer 1 Physical (cables, link lights) and work up to Layer 7. Best when hardware or physical changes occurred.\n- **Top-Down**: Start at Layer 7 Application (browser, software config) and work down. Best for application-specific errors.\n- **Divide-and-Conquer**: Start at Layer 3 Network (ping the default gateway). If ping works, Layers 1-3 are good, look at Layers 4-7. If ping fails, look at Layers 1-2. The fastest method!'
        }
      ]
    },
    partB: {
      whyItExists: 'Engineers who troubleshoot by random guessing waste hours rebooting machines and breaking working configurations. A structured approach guarantees you reach the root cause systematically in minutes.',
      problemSolved: 'Minimizes network downtime and avoids introducing secondary outages during incident triage.',
      behindTheScenes: 'Diagnostic command equivalents across operating systems:',
      commonMistakes: [
        'Rebooting routers before capturing diagnostic logs or state.',
        'Making multiple configuration changes at once (you won’t know which change solved or aggravated the issue!).',
        'Assuming user problem descriptions are technically precise without verifying symptoms independently.'
      ],
      socCybersecurityRelevance: {
        title: 'Host Incident Triage with CLI Diagnostics',
        description: 'When an endpoint is suspected of compromise, live CLI commands provide immediate ground truth without alerting the attacker.',
        investigationTip: 'Run `netstat -ano` (Windows) or `ss -tulpn` (Linux) to find foreign connections to port 4444 or unknown high ports. Correlate the PID to the running executable using Task Manager or `tasklist`!'
      }
    },
    partC: {
      title: 'Lab 28: CLI Diagnostic Terminal & Mystery Outage Solver',
      instructions: 'Use simulated terminal commands (`ping`, `tracert`, `arp`, `nslookup`, `netstat`) to diagnose an executive workstation outage.',
      type: 'cli-exercise',
      drillConfig: {
        scenario: 'Host has IP: 192.168.1.50. Ping 192.168.1.1 (Gateway) SUCCESS. Ping 8.8.8.8 SUCCESS. Ping google.com FAILS. What is the root cause?',
        hints: ['Pinging external IP 8.8.8.8 works', 'Domain resolution fails'],
        solutionExplanation: 'Because pinging 8.8.8.8 works, Layer 1, Layer 2, Layer 3, Default Gateway, and Internet WAN routing are all 100% operational. The failure to resolve `google.com` proves the root cause is a broken or unreachable DNS Server (UDP Port 53).'
      }
    },
    partD: {
      day: 28,
      title: 'Day 28 Troubleshooting Methodology Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q28-1',
          question: 'In the Divide-and-Conquer troubleshooting approach, what is typically the first diagnostic test performed?',
          type: 'multiple-choice',
          options: [
            'Reinstall the operating system',
            'Ping the Default Gateway (testing Layer 3 and below)',
            'Replace the motherboard',
            'Change the wireless channel'
          ],
          correctAnswer: 1,
          explanation: 'Pinging the Default Gateway tests Layers 1, 2, and 3 at the midpoint. If it succeeds, the issue is above Layer 3; if it fails, the issue is at or below Layer 3.'
        },
        {
          id: 'q28-2',
          question: 'If a computer can ping external IP 1.1.1.1, but fails to load `https://cloudflare.com` in a browser, what is the most probable fault?',
          type: 'multiple-choice',
          options: ['Defective Ethernet cable', 'DNS resolution failure', 'Dead router power supply', 'VLAN loop'],
          correctAnswer: 1,
          explanation: 'Successful IP ping proves routing and physical connectivity are fine. Inability to reach domain names points directly to DNS failure.'
        },
        {
          id: 'q28-3',
          question: 'Which CLI command displays active TCP connections, listening ports, and associated Process IDs (PIDs) on a Windows host?',
          type: 'multiple-choice',
          options: ['ipconfig /all', 'ping -t', 'netstat -ano', 'nslookup'],
          correctAnswer: 2,
          explanation: '`netstat -ano` lists all active connections and listening ports alongside the process ID (PID) owning each socket.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'The 7-step model provides a repeatable, systematic troubleshooting process.',
        'Divide-and-conquer starts at Layer 3 (ping default gateway) to split the problem in half.',
        'Ping tests Layer 3 reachability; traceroute uncovers intermediate hops.',
        'If pinging by IP works but by name fails, DNS is the root cause.',
        'Always document findings and change only one variable at a time.'
      ],
      threeCommonMistakes: [
        'Changing multiple network settings simultaneously.',
        'Assuming a failed ping always means a server is down (firewalls often block ICMP).',
        'Skipping verification of the fix after making changes.'
      ],
      miniScenario: {
        scenario: 'A user calls the helpdesk saying "the Wi-Fi is broken". The technician runs `ping 127.0.0.1` and it fails with an error.',
        question: 'What does a failure to ping the loopback address indicate?',
        answer: 'Corruption or failure of the local operating system TCP/IP stack.',
        explanation: 'The loopback address (127.0.0.1) is internal to the OS kernel. If loopback ping fails, the TCP/IP stack software is corrupted or disabled, irrespective of cables or Wi-Fi.'
      },
      flashcardIds: ['fc-d28-1', 'fc-d28-2', 'fc-d28-3']
    }
  },

  29: {
    day: 29,
    title: 'Networking for Cybersecurity & SOC Operations',
    partA: {
      summary: 'Synthesizes all 28 days of networking theory into active Security Operations Center (SOC) incident investigation, tracking a real-world phishing attack across packets, firewall logs, SIEM alerts, and endpoint sockets.',
      sections: [
        {
          heading: 'Anatomy of a Network Cyber Incident',
          content: 'Trace how an attacker breach unfolds across the networking stack:',
          diagram: `Step 1: Phishing Link Clicked -> DNS query for malicious domain (UDP 53)
Step 2: TLS Session Initiated -> TCP 3-way handshake to external IP (Port 443)
Step 3: Perimeter Firewall Traversal -> NAT translation logs outbound session
Step 4: Payload Delivery -> Encrypted HTTP GET downloads executable
Step 5: Lateral Movement -> Compromised host scans subnet on SMB Port 445 (Layer 2 ARP & broadcast)
Step 6: C2 Beaconing -> Reverse shell established to attacker listener on TCP Port 4444`
        },
        {
          heading: 'SOC Analyst Telemetry Cheat Sheet',
          content: 'Every network artifact provides unique evidence during an investigation:',
          table: {
            headers: ['Telemetry Source', 'Network Layer', 'Key Artifacts Captured', 'Investigative Value'],
            rows: [
              ['DNS Logs (Bro/Zeek)', 'Layer 7', 'Queried domain, record type, response IP, TTL', 'Identifies C2 domain, DGA patterns, DNS tunneling'],
              ['Firewall Egress Logs', 'Layer 3 & 4', 'Source IP, Dest IP, Dest Port, Action (Permit/Deny)', 'Detects unauthorized outbound connections and beacon intervals'],
              ['NetFlow / IPFIX', 'Layer 3 & 4', 'Flow volume, byte counts, duration, 5-tuple', 'Detects large data exfiltration and abnormal traffic spikes'],
              ['Switch CAM & Port Logs', 'Layer 2', 'Physical port, MAC address, 802.1X identity', 'Pinpoints the exact physical desk jack where rogue hardware is plugged in'],
              ['Endpoint Sockets (netstat)', 'Layer 4 & Host', 'Active sockets, remote IP, foreign port, Process PID', 'Identifies which malicious malware process spawned the connection']
            ]
          }
        }
      ]
    },
    partB: {
      whyItExists: 'You cannot analyze malware or triage SOC alerts without deeply understanding the networking protocols that attackers exploit to move data.',
      problemSolved: 'Bridges theoretical networking knowledge directly into real-world SOC threat hunting and incident response.',
      behindTheScenes: 'A SOC SIEM (Splunk, Microsoft Sentinel, Elastic) correlates thousands of events per second by matching the network **5-Tuple** (Source IP, Dest IP, Source Port, Dest Port, Protocol) across firewall logs, proxy logs, and host endpoint telemetry.',
      commonMistakes: [
        'Looking only at destination IP without noting the destination port.',
        'Assuming all traffic on port 443 is benign web browsing (attackers routinely hide C2 inside TLS on port 443).',
        'Ignoring internal broadcast spikes that signify lateral worm propagation.'
      ],
      socCybersecurityRelevance: {
        title: 'Walkthrough: Triaging a Suspicious Outbound Connection Alert',
        description: 'SIEM Alert: `High Severity - Outbound beaconing detected from Workstation 10.5.12.88 to 198.51.100.24:8080`.',
        investigationTip: 'Step 1: Check DNS logs: What domain resolved 198.51.100.24? Step 2: Check Firewall logs: What was the byte volume (exfiltration)? Step 3: Run `netstat -ano` on 10.5.12.88: What PID owns port 8080? Step 4: Isolate host VLAN!'
      }
    },
    partC: {
      title: 'Lab 29: SOC Incident Triage & PCAP Investigation Lab',
      instructions: 'Analyze simulated SIEM logs, firewall events, and Wireshark streams to reconstruct an attack timeline.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'Log 1: DNS query for update-microsoft.biz -> 203.0.113.88. Log 2: TCP connection on port 4444. Log 3: Workstation sends ARP sweeps across local /24 subnet.',
        hints: ['Port 4444 is Metasploit default', 'ARP sweeps mean lateral reconnaissance'],
        solutionExplanation: 'Timeline: 1) Phishing execution via typo-squatted domain `update-microsoft.biz`. 2) Reverse shell connected to attacker C2 on port 4444. 3) Attacker initiated internal network discovery using ARP scans.'
      }
    },
    partD: {
      day: 29,
      title: 'Day 29 Cybersecurity & SOC Networking Quiz',
      passingScore: 80,
      questions: [
        {
          id: 'q29-1',
          question: 'During a SOC investigation, why is correlating the ephemeral source port from host netstat output to firewall logs essential?',
          type: 'multiple-choice',
          options: [
            'It indicates the operating system edition',
            'It uniquely ties the outbound network session to a specific running software process ID (PID) on the endpoint',
            'It determines the physical cable type',
            'It proves the router is running OSPF'
          ],
          correctAnswer: 1,
          explanation: 'The ephemeral source port identifies the unique local socket, linking the firewall session directly to a specific Process ID (PID) in endpoint telemetry.'
        },
        {
          id: 'q29-2',
          question: 'An infected internal machine suddenly begins sending high-volume TCP SYN packets to port 445 on every consecutive IP in its local subnet. What activity is this?',
          type: 'multiple-choice',
          options: [
            'Normal web browsing',
            'Lateral movement reconnaissance scanning for SMB vulnerabilities (e.g. EternalBlue)',
            'DHCP lease renewal',
            'DNS zone transfer'
          ],
          correctAnswer: 1,
          explanation: 'Scanning port 445 (SMB) across consecutive local IPs is classic lateral movement reconnaissance attempting to propagate malware via SMB exploits.'
        },
        {
          id: 'q29-3',
          question: 'What network monitoring technology provides summarized flow telemetry (source/dest IP, ports, byte count) without storing full packet payloads?',
          type: 'multiple-choice',
          options: ['NetFlow / IPFIX', 'Full PCAP capture', 'Optical TDR', 'STP bridge ID'],
          correctAnswer: 0,
          explanation: 'NetFlow / IPFIX provides session summary metadata (like a phone bill) without the massive storage requirement of full packet captures.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'Cyberattacks traverse the entire networking stack from DNS up to application payloads.',
        'SIEM tools correlate events using the network 5-Tuple.',
        'Attackers frequently hide command-and-control (C2) traffic inside ports 80, 443, and 53.',
        'NetFlow provides lightweight session volume telemetry across enterprise backbones.',
        'Strong network fundamentals are the core superpower of high-performing SOC analysts.'
      ],
      threeCommonMistakes: [
        'Assuming encrypted HTTPS traffic cannot be analyzed (flow metadata, packet sizes, and timing reveal malicious beaconing).',
        'Failing to capture volatile host network sockets (`netstat`) before powering down an infected machine.',
        'Treating internal east-west network traffic as trusted.'
      ],
      miniScenario: {
        scenario: 'A SOC analyst spots an alert showing an internal accounting workstation sending 500 MB of data to an external IP at 3:00 AM over TCP Port 443. The company is closed at that hour.',
        question: 'What phase of the cyber attack lifecycle does this traffic most likely represent?',
        answer: 'Data Exfiltration phase.',
        explanation: 'High-volume outbound data transfer to an unfamiliar external IP during off-hours, disguised over HTTPS (port 443), strongly indicates unauthorized data exfiltration following a breach.'
      },
      flashcardIds: ['fc-d29-1', 'fc-d29-2', 'fc-d29-3']
    }
  },

  30: {
    day: 30,
    title: 'Final Assessment & Readiness Scorecard',
    partA: {
      summary: 'Day 30 Milestone: The comprehensive capstone examination evaluating mastery across all 30 days of networking fundamentals, CCNA core competencies, and SOC cybersecurity readiness.',
      sections: [
        {
          heading: 'Capstone Evaluation Domains',
          content: 'The 50-question comprehensive assessment covers six core domains:',
          table: {
            headers: ['Domain #', 'Domain Title', 'Weight', 'Core Competencies Evaluated'],
            rows: [
              ['Domain 1', 'Network Architecture & OSI / TCP-IP Models', '15%', '7 OSI layers, PDUs, encapsulation, L1-L4 devices, topology types'],
              ['Domain 2', 'Ethernet, MAC Addressing & Switching', '20%', 'Frame format, CAM tables, forwarding vs flooding, collision vs broadcast domains'],
              ['Domain 3', 'IPv4 Addressing, Subnetting & CIDR', '20%', 'Binary conversion, /24 to /30 calculation, host capacity, VLSM, Magic Number'],
              ['Domain 4', 'Transport Layer & Core Protocols', '15%', 'TCP 3-way handshake, flags, UDP, ports 20-3389, ARP, ICMP, DHCP, DNS'],
              ['Domain 5', 'VLANs, Trunking & IP Routing', '15%', '802.1Q tags, ROAS, SVIs, Longest Prefix Match, routing tables, static & OSPF'],
              ['Domain 6', 'Security, Management & Troubleshooting', '15%', 'ACLs, NAT/PAT, wireless WPA2/WPA3, Syslog, NTP, 7-step troubleshooting']
            ]
          }
        },
        {
          heading: 'Certification Readiness & Learning Path Progression',
          content: 'Upon scoring 80% or higher, the platform generates a personalized diagnostic readiness report recommending advanced next steps:\n- **CCNA Official Exam Preparation**: Layer 2 protocols (STP, EtherChannel), advanced OSPF, automation (Python, REST APIs).\n- **Cybersecurity & SOC Path**: Linux Fundamentals -> Wireshark Deep Packet Analysis -> Nmap Network Reconnaissance -> SOC Tier-1 Alert Triage -> Web/API Security.'
        }
      ]
    },
    partB: {
      whyItExists: 'Synthesizes 30 days of structured daily study into proven competence. Validates that the learner can think on their feet, calculate subnets under time pressure, and diagnose complex network outages.',
      problemSolved: 'Identifies remaining knowledge gaps and provides targeted revision recommendations before moving into advanced cyber training.',
      behindTheScenes: 'Your exam results are analyzed across all 6 domains to highlight specific strengths (e.g. 95% in Subnetting) and areas needing review (e.g. OSPF cost calculation).',
      commonMistakes: [
        'Rushing through subnetting questions without double-checking the block size math.',
        'Treating completion of Day 30 as the end of networking study (networking skills require regular drill practice to remain razor-sharp).'
      ],
      socCybersecurityRelevance: {
        title: 'Your Future in Cybersecurity & SOC Operations',
        description: 'Every cybersecurity tool—Wireshark, Snort, Suricata, Zeek, Splunk, Nmap, Metasploit, Burp Suite—relies on the networking fundamentals you mastered over these 30 days.',
        investigationTip: 'When you step into a SOC or technical interview, speak confidently about packet encapsulation, L2 vs L3 boundaries, TCP flags, and subnet boundaries.'
      }
    },
    partC: {
      title: 'Lab 30: Final Comprehensive Capstone Topology & Practical Verification',
      instructions: 'Navigate to the Final Assessment tab to complete the 50-question examination and generate your diagnostic readiness certificate.',
      type: 'interactive-drill',
      drillConfig: {
        scenario: 'Complete the 50-question capstone assessment covering all 30 days of study.',
        hints: ['Take your time on subnetting calculations', 'Remember Longest Prefix Match rules'],
        solutionExplanation: 'Upon completing the 50 questions, review your domain breakdown scorecard to identify areas for refresher study.'
      }
    },
    partD: {
      day: 30,
      title: 'Day 30 Final Milestone Capstone Quiz (Preview)',
      passingScore: 80,
      questions: [
        {
          id: 'q30-1',
          question: 'What is the primary rule routers use to select the winning path when multiple routes match a destination IP?',
          type: 'multiple-choice',
          options: ['Lowest Metric', 'Longest Prefix Match', 'Lowest Administrative Distance', 'First Route Configured'],
          correctAnswer: 1,
          explanation: 'Longest Prefix Match is the primary rule; it always takes precedence over administrative distance and metric.'
        },
        {
          id: 'q30-2',
          question: 'Which of the following describes the function of Port Address Translation (PAT)?',
          type: 'multiple-choice',
          options: [
            'Maps multiple private IP addresses to a single public IP using unique Layer 4 port numbers',
            'Encrypts wireless Wi-Fi frames with AES',
            'Assigns dynamic IP addresses to clients',
            'Separates broadcast domains on switches'
          ],
          correctAnswer: 0,
          explanation: 'PAT (NAT Overload) maps multiple internal private hosts to a single public IP address using distinct source port numbers.'
        },
        {
          id: 'q30-3',
          question: 'What happens to an Ethernet frame’s Source and Destination MAC addresses when it is routed across an intermediate router hop?',
          type: 'multiple-choice',
          options: [
            'They remain unchanged across all router hops',
            'The router strips the old frame and writes its own exit MAC as Source and the next-hop device MAC as Destination',
            'They are converted into IP addresses',
            'They are permanently deleted'
          ],
          correctAnswer: 1,
          explanation: 'MAC addresses are strictly local to each Layer 2 segment. Every router decapsulates the incoming frame and encapsulates the packet into a brand new Layer 2 frame with new local MAC addresses.'
        }
      ]
    },
    partE: {
      fiveKeyFacts: [
        'Congratulations on completing the 30-Day Networking Fundamentals curriculum!',
        'You have mastered OSI, TCP/IP, Ethernet, MAC learning, and IPv4 addressing.',
        'You have calculated /24 to /30 subnets using binary and Magic Numbers.',
        'You understand VLANs, 802.1Q trunks, ROAS, static routing, and OSPF.',
        'You understand DHCP, DNS, NAT, ACLs, wireless security, and SOC triage.'
      ],
      threeCommonMistakes: [
        'Stopping practice after finishing the course (run weekly subnetting and Wireshark drills!).',
        'Believing passing this course alone grants a CCNA certification (you are now primed to begin CCNA exam prep).',
        'Ignoring packet-level details during cyber investigations.'
      ],
      miniScenario: {
        scenario: 'You are in a job interview for a Junior SOC Analyst or Junior Network Engineer role. The interviewer asks: "Explain what happens from the moment I type google.com and hit Enter until the page renders."',
        question: 'How do you structure your answer?',
        answer: 'Walk through DNS resolution (local cache -> recursive resolver -> A record), TCP 3-way handshake on port 443, TLS cryptographic handshake, HTTP GET request, encapsulation down through IP (L3) and Ethernet (L2 with default gateway MAC via ARP), router forwarding via Longest Prefix Match, NAT translation, and server response decapsulation.',
        explanation: 'Providing this clear, structured layer-by-layer response demonstrates deep technical mastery that immediately sets you apart from candidate peers.'
      },
      flashcardIds: ['fc-d30-1', 'fc-d30-2', 'fc-d30-3']
    }
  }
};
