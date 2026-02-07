# PC Control - Connection Guide

## How It Works

```
📱 Phone (Browser)          🌐 Internet          💻 Your PC
      ↓                         ↓                    ↓
 Opens deployed app    ←→    Vercel hosting    
      ↓                                              ↓
 Connects via WebSocket  ←────────────────────→  Python Server
      ↓                    (Local WiFi only)         ↓
 Sends commands      ─────────────────────────→  Controls PC
```

---

## Step-by-Step Connection

### 1. Start the PC Server

On your PC, open PowerShell/Terminal and run:

```powershell
cd e:\Projects\PC-Control\server
python main.py
```

You'll see:
```
==================================================
   🖥️  PC CONTROL SERVER
==================================================

   📍 IP Address: 10.4.15.87      ← YOUR PC'S IP
   💻 Hostname: powerX
   🌐 WebSocket Port: 8765

==================================================
```

**Keep this terminal open!** The server must be running.

---

### 2. Open the App on Your Phone

1. On your phone, open the browser
2. Go to your Vercel deployed URL (e.g., `https://mobile-controller.vercel.app`)

---

### 3. Connect to Your PC

1. Tap the **CONNECT** button (top right)
2. Enter your PC's IP address (shown in the server terminal, e.g., `10.4.15.87`)
3. Tap **Connect**

---

## Requirements

| Requirement | Details |
|------------|---------|
| **Same Network** | Phone and PC must be on same WiFi or phone connected to PC's hotspot |
| **Server Running** | Python server must be running on PC |
| **Firewall** | Windows Firewall must allow port **8765** |

---

## Troubleshooting

### "Connection Failed"
- **Check IP**: Make sure you entered the correct IP from the server terminal
- **Same Network**: Ensure phone and PC are on the same WiFi
- **Server Running**: The Python server must be running

### "Controls Not Working"
- Check if the server terminal shows: `✅ Client connected`
- If not, the connection isn't established

### Firewall (First Time Setup)
If Windows asks about firewall when starting the server:
- Click **Allow access** for both Private and Public networks

Or manually allow:
1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Add Python and allow it on Private networks

---

## Quick Reference

| Action | What to Do |
|--------|-----------|
| **Start Server** | `python main.py` in server folder |
| **Stop Server** | Press `Ctrl+C` in terminal |
| **Find PC IP** | Look at server startup message |
| **Connect Phone** | Open app → CONNECT → Enter IP |
