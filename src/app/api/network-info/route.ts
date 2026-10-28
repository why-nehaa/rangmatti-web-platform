import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  const interfaces = os.networkInterfaces();
  const addresses: string[] = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      // Skip internal (i.e. 127.0.0.1) and non-ipv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }

  // Prefer Wi-Fi or primary LAN IP over Hyper-V / WSL virtual switches if possible
  const primaryIp =
    addresses.find((ip) => ip.startsWith('10.') || ip.startsWith('192.168.')) ||
    addresses[0] ||
    '127.0.0.1';

  return NextResponse.json({
    success: true,
    primaryIp,
    addresses,
    port: 3000,
  });
}
