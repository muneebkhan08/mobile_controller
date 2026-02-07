"""
Media Controller - Handles media playback and presentation controls
"""
import pyautogui

pyautogui.FAILSAFE = False
pyautogui.PAUSE = 0

def play_pause():
    """Toggle play/pause for media"""
    pyautogui.press('playpause', _pause=False)

def next_track():
    """Skip to next track"""
    pyautogui.press('nexttrack', _pause=False)

def prev_track():
    """Go to previous track"""
    pyautogui.press('prevtrack', _pause=False)

def stop():
    """Stop media playback"""
    pyautogui.press('stop', _pause=False)

# Presentation controls
def slide_next():
    """Go to next slide (Right arrow or Page Down)"""
    pyautogui.press('right', _pause=False)

def slide_prev():
    """Go to previous slide (Left arrow or Page Up)"""
    pyautogui.press('left', _pause=False)

def slideshow_start():
    """Start slideshow from beginning (F5)"""
    pyautogui.press('f5', _pause=False)

def slideshow_start_current():
    """Start slideshow from current slide (Shift+F5)"""
    pyautogui.hotkey('shift', 'f5', _pause=False)

def slideshow_end():
    """End slideshow (Escape)"""
    pyautogui.press('escape', _pause=False)

def page_up():
    """Page Up key"""
    pyautogui.press('pageup', _pause=False)

def page_down():
    """Page Down key"""
    pyautogui.press('pagedown', _pause=False)
