"""
Keyboard Controller - Handles typing and key presses
"""
import pyautogui

pyautogui.FAILSAFE = False
pyautogui.PAUSE = 0

def type_text(text: str):
    """Type a string of text"""
    pyautogui.typewrite(text, interval=0.02, _pause=False)

def press_key(key: str):
    """Press a single key (e.g., 'enter', 'escape', 'tab')"""
    pyautogui.press(key, _pause=False)

def hotkey(*keys):
    """Press a key combination (e.g., 'ctrl', 'c' for copy)"""
    pyautogui.hotkey(*keys, _pause=False)

def key_down(key: str):
    """Hold a key down"""
    pyautogui.keyDown(key, _pause=False)

def key_up(key: str):
    """Release a held key"""
    pyautogui.keyUp(key, _pause=False)

# Special key mappings for common actions
SPECIAL_KEYS = {
    'backspace': 'backspace',
    'enter': 'enter',
    'tab': 'tab',
    'escape': 'escape',
    'space': 'space',
    'up': 'up',
    'down': 'down',
    'left': 'left',
    'right': 'right',
    'pageup': 'pageup',
    'pagedown': 'pagedown',
    'home': 'home',
    'end': 'end',
    'delete': 'delete',
    'f5': 'f5',  # Slideshow start
    'f11': 'f11',  # Fullscreen
}
