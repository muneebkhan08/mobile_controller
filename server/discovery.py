"""
UDP Discovery Server - Allows mobile devices to find PC on the network
"""
import socket
import json
import asyncio

DISCOVERY_PORT = 5555
WEBSOCKET_PORT = 8765

def get_local_ip():
    """Get the local IP address of this machine"""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # Doesn't need to be reachable
        s.connect(('10.255.255.255', 1))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

def get_hostname():
    """Get the hostname of this machine"""
    return socket.gethostname()

async def run_discovery_server():
    """Run UDP discovery server that responds to broadcast messages"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind(('', DISCOVERY_PORT))
    sock.setblocking(False)
    
    local_ip = get_local_ip()
    hostname = get_hostname()
    
    print(f"🔍 UDP Discovery server listening on port {DISCOVERY_PORT}")
    print(f"📍 Local IP: {local_ip}")
    print(f"💻 Hostname: {hostname}")
    
    loop = asyncio.get_event_loop()
    
    while True:
        try:
            data, addr = await loop.run_in_executor(None, sock.recvfrom, 1024)
            message = data.decode('utf-8')
            
            if message == 'PC_CONTROL_DISCOVER':
                response = json.dumps({
                    'type': 'PC_CONTROL_RESPONSE',
                    'ip': local_ip,
                    'port': WEBSOCKET_PORT,
                    'hostname': hostname
                })
                sock.sendto(response.encode('utf-8'), addr)
                print(f"📱 Discovery request from {addr[0]} - responded with IP: {local_ip}")
        except Exception as e:
            await asyncio.sleep(0.1)

if __name__ == '__main__':
    asyncio.run(run_discovery_server())
