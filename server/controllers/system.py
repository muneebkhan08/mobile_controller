"""
System Controller - Handles power, volume, and system commands
"""
import subprocess
import os

# Windows volume control
try:
    from ctypes import cast, POINTER
    from comtypes import CLSCTX_ALL
    from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
    
    def get_volume_interface():
        devices = AudioUtilities.GetSpeakers()
        interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
        return cast(interface, POINTER(IAudioEndpointVolume))
    
    VOLUME_AVAILABLE = True
except ImportError:
    VOLUME_AVAILABLE = False

def shutdown():
    """Shutdown the computer"""
    subprocess.run(['shutdown', '/s', '/t', '0'], shell=True)

def restart():
    """Restart the computer"""
    subprocess.run(['shutdown', '/r', '/t', '0'], shell=True)

def sleep():
    """Put computer to sleep"""
    subprocess.run(['rundll32.exe', 'powrprof.dll,SetSuspendState', '0', '1', '0'], shell=True)

def lock():
    """Lock the computer"""
    subprocess.run(['rundll32.exe', 'user32.dll,LockWorkStation'], shell=True)

def get_volume() -> int:
    """Get current volume level (0-100)"""
    if VOLUME_AVAILABLE:
        volume = get_volume_interface()
        return int(volume.GetMasterVolumeLevelScalar() * 100)
    return 50

def set_volume(level: int):
    """Set volume level (0-100)"""
    if VOLUME_AVAILABLE:
        volume = get_volume_interface()
        volume.SetMasterVolumeLevelScalar(level / 100.0, None)

def mute():
    """Toggle mute"""
    if VOLUME_AVAILABLE:
        volume = get_volume_interface()
        current_mute = volume.GetMute()
        volume.SetMute(not current_mute, None)

def volume_up(step: int = 5):
    """Increase volume by step"""
    current = get_volume()
    set_volume(min(100, current + step))

def volume_down(step: int = 5):
    """Decrease volume by step"""
    current = get_volume()
    set_volume(max(0, current - step))
