import { PortEntry } from '../types';

export const COMMON_PORTS: PortEntry[] = [
  {
    port: 20,
    protocol: 'TCP',
    name: 'FTP-Data',
    description: 'File Transfer Protocol (Data channel). Used to transfer file payloads.',
    socAlertRisk: 'Cleartext protocol. Transmits file contents in plaintext; easily intercepted by network sniffers.',
    defaultPlaintext: true
  },
  {
    port: 21,
    protocol: 'TCP',
    name: 'FTP-Control',
    description: 'File Transfer Protocol (Command channel). Used for authentication and commands.',
    socAlertRisk: 'Cleartext authentication. Usernames and passwords sent in plaintext. SOC should flag external FTP logins.',
    defaultPlaintext: true
  },
  {
    port: 22,
    protocol: 'TCP',
    name: 'SSH / SFTP',
    description: 'Secure Shell for encrypted remote terminal access, SFTP and port forwarding.',
    socAlertRisk: 'Brute-force target. High-volume inbound connection attempts from foreign IPs usually indicate automated bot attacks.',
    defaultPlaintext: false
  },
  {
    port: 23,
    protocol: 'TCP',
    name: 'Telnet',
    description: 'Legacy unencrypted terminal emulation protocol.',
    socAlertRisk: 'Severe risk. Zero encryption. Credentials and commands are visible to anyone on the wire. Should be disabled everywhere.',
    defaultPlaintext: true
  },
  {
    port: 25,
    protocol: 'TCP',
    name: 'SMTP',
    description: 'Simple Mail Transfer Protocol. Used for server-to-server email forwarding.',
    socAlertRisk: 'Open mail relays, spam distribution, business email compromise (BEC). Plaintext unless upgraded via STARTTLS.',
    defaultPlaintext: true
  },
  {
    port: 53,
    protocol: 'TCP/UDP',
    name: 'DNS',
    description: 'Domain Name System. Resolves domain names to IP addresses (UDP default, TCP for zone transfers and >512 byte responses).',
    socAlertRisk: 'Primary vector for command-and-control (C2) beaconing, DNS tunneling (data exfiltration), and cache poisoning.',
    defaultPlaintext: true
  },
  {
    port: 67,
    protocol: 'UDP',
    name: 'DHCP-Server',
    description: 'Dynamic Host Configuration Protocol server listening port.',
    socAlertRisk: 'Rogue DHCP servers on local segments answering client requests with malicious gateway/DNS settings.',
    defaultPlaintext: true
  },
  {
    port: 68,
    protocol: 'UDP',
    name: 'DHCP-Client',
    description: 'Dynamic Host Configuration Protocol client receiving port.',
    socAlertRisk: 'DHCP starvation attacks exhausting the address pool by flooding spoofed MAC requests.',
    defaultPlaintext: true
  },
  {
    port: 69,
    protocol: 'UDP',
    name: 'TFTP',
    description: 'Trivial File Transfer Protocol. UDP-based, no authentication, used for boot files and firmware.',
    socAlertRisk: 'No authentication or encryption. Any device on the LAN can request or overwrite boot images if exposed.',
    defaultPlaintext: true
  },
  {
    port: 80,
    protocol: 'TCP',
    name: 'HTTP',
    description: 'HyperText Transfer Protocol for unencrypted World Wide Web traffic.',
    socAlertRisk: 'Plaintext web traffic vulnerable to eavesdropping, cookie theft, and session hijacking. Egress traffic must be inspected.',
    defaultPlaintext: true
  },
  {
    port: 110,
    protocol: 'TCP',
    name: 'POP3',
    description: 'Post Office Protocol version 3 for email retrieval from a mail server.',
    socAlertRisk: 'Cleartext protocol. User passwords and email contents transmitted unencrypted unless POP3S (port 995) is used.',
    defaultPlaintext: true
  },
  {
    port: 123,
    protocol: 'UDP',
    name: 'NTP',
    description: 'Network Time Protocol for clock synchronization across network devices.',
    socAlertRisk: 'NTP amplification DDoS attacks (monlist command), time-skew attacks breaking Kerberos authentication and log forensics.',
    defaultPlaintext: true
  },
  {
    port: 143,
    protocol: 'TCP',
    name: 'IMAP',
    description: 'Internet Message Access Protocol for multi-client synchronized email management.',
    socAlertRisk: 'Plaintext protocol by default. Use IMAPS on port 993 instead.',
    defaultPlaintext: true
  },
  {
    port: 161,
    protocol: 'UDP',
    name: 'SNMP',
    description: 'Simple Network Management Protocol for device health queries and configuration.',
    socAlertRisk: 'Default "public" and "private" community strings in SNMP v1/v2c allow attackers to extract full device configs & passwords.',
    defaultPlaintext: true
  },
  {
    port: 389,
    protocol: 'TCP',
    name: 'LDAP',
    description: 'Lightweight Directory Access Protocol for enterprise user and directory querying.',
    socAlertRisk: 'Cleartext directory querying exposing Active Directory structure and account credentials. LDAPS (port 636) required.',
    defaultPlaintext: true
  },
  {
    port: 443,
    protocol: 'TCP',
    name: 'HTTPS',
    description: 'HyperText Transfer Protocol Secure (HTTP over TLS/SSL) with authenticated encryption.',
    socAlertRisk: 'Malware disguises C2 communication and exfiltration inside encrypted TLS sessions, requiring SSL/TLS decryption inspection.',
    defaultPlaintext: false
  },
  {
    port: 445,
    protocol: 'TCP',
    name: 'SMB',
    description: 'Server Message Block for file and printer sharing in Windows networks.',
    socAlertRisk: 'Extremely high lateral movement risk. Exploited by WannaCry (EternalBlue), PsExec, Pass-the-Hash. Must NEVER be exposed to Internet.',
    defaultPlaintext: false
  },
  {
    port: 514,
    protocol: 'UDP',
    name: 'Syslog',
    description: 'Standard protocol for transmitting system logs and audit trails to a central SIEM.',
    socAlertRisk: 'UDP syslog is spoofable and unencrypted. Attackers can inject fake audit logs or flood the SIEM.',
    defaultPlaintext: true
  },
  {
    port: 3389,
    protocol: 'TCP',
    name: 'RDP',
    description: 'Remote Desktop Protocol for Windows graphical remote desktop administration.',
    socAlertRisk: 'Number one ransomware entry vector when exposed to public Internet. Constant brute-force targets; requires MFA and VPN.',
    defaultPlaintext: false
  }
];
