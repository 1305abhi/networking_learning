import { CliCommandScenario } from '../types';

export const CLI_COMMANDS: CliCommandScenario[] = [
  {
    command: 'ping',
    syntaxGuide: 'ping <target-ip or domain> [-t] [-n count] (Windows) / ping -c count (Linux)',
    description: 'Sends ICMP Echo Requests to test Layer 3 reachability and measure round-trip latency.',
    os: 'Both',
    sampleOutput: `Pinging 8.8.8.8 with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=14ms TTL=117
Reply from 8.8.8.8: bytes=32 time=13ms TTL=117
Reply from 8.8.8.8: bytes=32 time=15ms TTL=117
Reply from 8.8.8.8: bytes=32 time=14ms TTL=117

Ping statistics for 8.8.8.8:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 13ms, Maximum = 15ms, Average = 14ms`,
    socUsage: 'Used during incident triage to verify if a suspect C2 IP or host is responsive, or testing firewall isolation.'
  },
  {
    command: 'tracert / traceroute',
    syntaxGuide: 'tracert -d <ip> (Windows) / traceroute -n <ip> (Linux)',
    description: 'Discovers the router path and hop count by sending packets with incrementing IP TTL values.',
    os: 'Both',
    sampleOutput: `Tracing route to dns.google [8.8.8.8]
over a maximum of 30 hops:

  1     1 ms     1 ms     1 ms  192.168.1.1 [Default Gateway]
  2     9 ms     8 ms     8 ms  10.240.0.1 [ISP Gateway]
  3    12 ms    11 ms    11 ms  72.14.215.85
  4    13 ms    14 ms    13 ms  108.170.248.65
  5    14 ms    13 ms    14 ms  8.8.8.8

Trace complete.`,
    socUsage: 'Identifies unexpected route paths, routing loops, or determining which perimeter router/firewall is dropping traffic.'
  },
  {
    command: 'ipconfig / ip addr',
    syntaxGuide: 'ipconfig /all (Windows) / ip addr show or ip a (Linux)',
    description: 'Displays current IP addresses, subnet masks, default gateway, DHCP server, DNS servers and MAC address.',
    os: 'Both',
    sampleOutput: `Ethernet adapter vEthernet (Default Switch):
   Connection-specific DNS Suffix  . : corp.internal
   Description . . . . . . . . . . . : Hyper-V Virtual Ethernet Adapter
   Physical Address. . . . . . . . . : 00-15-5D-4A-32-1B
   DHCP Enabled. . . . . . . . . . . : Yes
   IPv4 Address. . . . . . . . . . . : 192.168.1.45(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
   DHCP Server . . . . . . . . . . . : 192.168.1.1
   DNS Servers . . . . . . . . . . . : 1.1.1.1, 8.8.8.8`,
    socUsage: 'First host triage step: confirm if machine has an IP or fell back to 169.254.x.x (APIPA), check for rogue DNS servers.'
  },
  {
    command: 'arp -a / ip neigh',
    syntaxGuide: 'arp -a (Windows) / ip neigh show (Linux)',
    description: 'Displays the local ARP cache table mapping IP addresses to physical MAC addresses.',
    os: 'Both',
    sampleOutput: `Interface: 192.168.1.45 --- 0x4
  Internet Address      Physical Address      Type
  192.168.1.1           00-50-56-c0-00-08     dynamic
  192.168.1.25          a4-83-e7-11-22-33     dynamic
  192.168.1.255         ff-ff-ff-ff-ff-ff     static
  224.0.0.22            01-00-5e-00-00-16     static
  224.0.0.251           01-00-5e-00-00-fb     static`,
    socUsage: 'Critical for detecting ARP Spoofing: check if two distinct IP addresses share the identical MAC address.'
  },
  {
    command: 'nslookup / dig',
    syntaxGuide: 'nslookup domain [dns-server] (Windows) / dig @dns-server domain (Linux)',
    description: 'Queries DNS servers to resolve domain names to IP addresses or inspect DNS records (A, AAAA, MX, TXT).',
    os: 'Both',
    sampleOutput: `Server:  one.one.one.one
Address:  1.1.1.1

Non-authoritative answer:
Name:    github.com
Addresses:  140.82.121.3
          140.82.121.4`,
    socUsage: 'Tests whether domain resolution is functioning, checks if internal DNS is resolving malicious C2 domains.'
  },
  {
    command: 'netstat / ss',
    syntaxGuide: 'netstat -ano (Windows) / ss -tulpn (Linux)',
    description: 'Displays active TCP connections, listening ports, and the corresponding Process ID (PID).',
    os: 'Both',
    sampleOutput: `Active Connections

  Proto  Local Address          Foreign Address        State           PID
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       844
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4
  TCP    192.168.1.45:49821     140.82.121.3:443       ESTABLISHED     12380
  TCP    192.168.1.45:51234     198.51.100.24:4444     ESTABLISHED     4912`,
    socUsage: 'The gold standard host artifact: finding reverse shells (e.g. port 4444) and identifying which process (PID) is connecting out.'
  }
];
