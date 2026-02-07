"""
Browser Controller - Handles URL opening and Google search
"""
import webbrowser
import urllib.parse

def open_url(url: str):
    """Open a URL in the default browser"""
    # Add protocol if missing
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    webbrowser.open(url)

def google_search(query: str):
    """Perform a Google search"""
    encoded_query = urllib.parse.quote(query)
    search_url = f'https://www.google.com/search?q={encoded_query}'
    webbrowser.open(search_url)

def open_google():
    """Open Google homepage"""
    webbrowser.open('https://www.google.com')
