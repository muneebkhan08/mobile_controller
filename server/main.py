"""
PC Control Server - Main Entry Point
Runs both UDP Discovery and WebSocket servers
"""
import asyncio
import threading
from discovery import run_discovery_server, get_local_ip, get_hostname, WEBSOCKET_PORT
from websocket_server import run_websocket_server

def print_banner():
    """Print startup banner"""
    local_ip = get_local_ip()
    hostname = get_hostname()
    
    print("\n" + "="*50)
    print("   🖥️  PC CONTROL SERVER")
    print("="*50)
    print(f"\n   📍 IP Address: {local_ip}")
    print(f"   💻 Hostname: {hostname}")
    print(f"   🌐 WebSocket Port: {WEBSOCKET_PORT}")
    print(f"\n   📱 Connect from your phone:")
    print(f"      http://{local_ip}:3000")
    print("\n" + "="*50 + "\n")

def run_discovery_thread():
    """Run discovery server in a separate thread with its own event loop"""
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(run_discovery_server())

if __name__ == '__main__':
    print_banner()
    
    # Start discovery server in background thread
    discovery_thread = threading.Thread(target=run_discovery_thread, daemon=True)
    discovery_thread.start()
    
    # Run WebSocket server in main thread
    run_websocket_server()
