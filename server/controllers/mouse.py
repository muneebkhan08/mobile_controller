"""
Mouse Controller - Handles mouse movement, clicks, and scroll
"""
import pyautogui

# Disable fail-safe (moving mouse to corner won't stop script)
pyautogui.FAILSAFE = False
# Set minimum pause between pyautogui commands for performance
pyautogui.PAUSE = 0

def move(dx: float, dy: float, sensitivity: float = 1.5):
    """Move mouse cursor relative to current position"""
    pyautogui.moveRel(dx * sensitivity, dy * sensitivity, _pause=False)

def click(button: str = 'left'):
    """Perform a mouse click"""
    pyautogui.click(button=button, _pause=False)

def double_click():
    """Perform a double click"""
    pyautogui.doubleClick(_pause=False)

def scroll(delta: int):
    """Scroll the mouse wheel (positive = up, negative = down)"""
    pyautogui.scroll(delta, _pause=False)

def drag(dx: float, dy: float):
    """Drag mouse (hold left button and move)"""
    pyautogui.drag(dx, dy, _pause=False)

def right_click():
    """Perform a right click"""
    pyautogui.rightClick(_pause=False)
