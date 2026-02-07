"""
WebSocket Server - Handles real-time commands from mobile client
Uses socket.io for reliable communication
"""
import socketio
import json
from aiohttp import web
from controllers import mouse, keyboard, system, browser, media

# Create Socket.IO server with CORS allowed
sio = socketio.AsyncServer(
    async_mode='aiohttp',
    cors_allowed_origins='*'
)
app = web.Application()
sio.attach(app)

connected_clients = set()

@sio.event
async def connect(sid, environ):
    """Handle client connection"""
    connected_clients.add(sid)
    print(f"✅ Client connected: {sid}")
    await sio.emit('connection_status', {'status': 'connected', 'message': 'Successfully connected to PC'}, room=sid)

@sio.event
async def disconnect(sid):
    """Handle client disconnection"""
    connected_clients.discard(sid)
    print(f"❌ Client disconnected: {sid}")

@sio.event
async def mouse_move(sid, data):
    """Handle mouse movement"""
    dx = data.get('dx', 0)
    dy = data.get('dy', 0)
    sensitivity = data.get('sensitivity', 1.5)
    mouse.move(dx, dy, sensitivity)

@sio.event
async def mouse_click(sid, data):
    """Handle mouse click"""
    button = data.get('button', 'left')
    if button == 'double':
        mouse.double_click()
    elif button == 'right':
        mouse.right_click()
    else:
        mouse.click(button)

@sio.event
async def mouse_scroll(sid, data):
    """Handle mouse scroll"""
    delta = data.get('delta', 0)
    mouse.scroll(delta)

@sio.event
async def keyboard_type(sid, data):
    """Handle typing text"""
    text = data.get('text', '')
    keyboard.type_text(text)

@sio.event
async def keyboard_key(sid, data):
    """Handle single key press"""
    key = data.get('key', '')
    keyboard.press_key(key)

@sio.event
async def keyboard_hotkey(sid, data):
    """Handle hotkey combination"""
    keys = data.get('keys', [])
    if keys:
        keyboard.hotkey(*keys)

# System controls
@sio.event
async def system_shutdown(sid, data):
    """Shutdown the computer"""
    await sio.emit('command_response', {'status': 'executing', 'command': 'shutdown'}, room=sid)
    system.shutdown()

@sio.event
async def system_restart(sid, data):
    """Restart the computer"""
    await sio.emit('command_response', {'status': 'executing', 'command': 'restart'}, room=sid)
    system.restart()

@sio.event
async def system_sleep(sid, data):
    """Put computer to sleep"""
    await sio.emit('command_response', {'status': 'executing', 'command': 'sleep'}, room=sid)
    system.sleep()

@sio.event
async def system_lock(sid, data):
    """Lock the computer"""
    system.lock()
    await sio.emit('command_response', {'status': 'executed', 'command': 'lock'}, room=sid)

@sio.event
async def volume_set(sid, data):
    """Set volume level"""
    level = data.get('level', 50)
    system.set_volume(level)
    await sio.emit('volume_update', {'level': level}, room=sid)

@sio.event
async def volume_up(sid, data):
    """Increase volume"""
    system.volume_up()
    level = system.get_volume()
    await sio.emit('volume_update', {'level': level}, room=sid)

@sio.event
async def volume_down(sid, data):
    """Decrease volume"""
    system.volume_down()
    level = system.get_volume()
    await sio.emit('volume_update', {'level': level}, room=sid)

@sio.event
async def volume_mute(sid, data):
    """Toggle mute"""
    system.mute()

@sio.event
async def volume_get(sid, data):
    """Get current volume"""
    level = system.get_volume()
    await sio.emit('volume_update', {'level': level}, room=sid)

# Browser controls
@sio.event
async def browser_search(sid, data):
    """Perform Google search"""
    query = data.get('query', '')
    browser.google_search(query)
    await sio.emit('command_response', {'status': 'executed', 'command': 'search', 'query': query}, room=sid)

@sio.event
async def browser_url(sid, data):
    """Open URL in browser"""
    url = data.get('url', '')
    browser.open_url(url)
    await sio.emit('command_response', {'status': 'executed', 'command': 'open_url', 'url': url}, room=sid)

@sio.event
async def browser_google(sid, data):
    """Open Google homepage"""
    browser.open_google()
    await sio.emit('command_response', {'status': 'executed', 'command': 'open_google'}, room=sid)

# Media controls
@sio.event
async def media_play_pause(sid, data):
    """Toggle play/pause"""
    media.play_pause()

@sio.event
async def media_next(sid, data):
    """Next track"""
    media.next_track()

@sio.event
async def media_prev(sid, data):
    """Previous track"""
    media.prev_track()

@sio.event
async def media_stop(sid, data):
    """Stop media"""
    media.stop()

# Presentation controls
@sio.event
async def slide_next(sid, data):
    """Next slide"""
    media.slide_next()

@sio.event
async def slide_prev(sid, data):
    """Previous slide"""
    media.slide_prev()

@sio.event
async def slideshow_start(sid, data):
    """Start slideshow"""
    from_current = data.get('from_current', False)
    if from_current:
        media.slideshow_start_current()
    else:
        media.slideshow_start()

@sio.event
async def slideshow_end(sid, data):
    """End slideshow"""
    media.slideshow_end()

@sio.event
async def page_up(sid, data):
    """Page Up"""
    media.page_up()

@sio.event
async def page_down(sid, data):
    """Page Down"""
    media.page_down()

def run_websocket_server(host='0.0.0.0', port=8765):
    """Start the WebSocket server"""
    print(f"🌐 WebSocket server starting on ws://{host}:{port}")
    web.run_app(app, host=host, port=port, print=None)

if __name__ == '__main__':
    run_websocket_server()
