'use client';

import { useState, useCallback } from 'react';
import { useSocket } from '@/hooks/useSocket';
import TouchPad from '@/components/TouchPad';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import SystemControls from '@/components/SystemControls';
import MediaControls from '@/components/MediaControls';
import SearchPanel from '@/components/SearchPanel';

type TabType = 'touchpad' | 'keyboard' | 'system' | 'media' | 'search';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('touchpad');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [ipInput, setIpInput] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const { status, pcName, volume, connect, disconnect, emit } = useSocket();

  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting';

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  }, []);

  // Connection handlers
  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      setShowConnectModal(true);
    }
  };

  const handleDoConnect = () => {
    if (ipInput.trim()) {
      connect(ipInput.trim());
      setShowConnectModal(false);
      setIpInput('');
    }
  };

  // Mouse handlers
  const handleMouseMove = useCallback((dx: number, dy: number) => {
    emit('mouse_move', { dx, dy, sensitivity: 1.5 });
  }, [emit]);

  const handleLeftClick = useCallback(() => {
    emit('mouse_click', { button: 'left' });
  }, [emit]);

  const handleRightClick = useCallback(() => {
    emit('mouse_click', { button: 'right' });
  }, [emit]);

  const handleDoubleClick = useCallback(() => {
    emit('mouse_click', { button: 'double' });
  }, [emit]);

  const handleScroll = useCallback((delta: number) => {
    emit('mouse_scroll', { delta });
  }, [emit]);

  // Keyboard handlers
  const handleType = useCallback((text: string) => {
    emit('keyboard_type', { text });
    showToast('Text sent');
  }, [emit, showToast]);

  const handleKey = useCallback((key: string) => {
    emit('keyboard_key', { key });
  }, [emit]);

  const handleHotkey = useCallback((keys: string[]) => {
    emit('keyboard_hotkey', { keys });
  }, [emit]);

  // System handlers
  const handleShutdown = useCallback(() => {
    emit('system_shutdown', {});
    showToast('Shutdown command sent');
  }, [emit, showToast]);

  const handleRestart = useCallback(() => {
    emit('system_restart', {});
    showToast('Restart command sent');
  }, [emit, showToast]);

  const handleSleep = useCallback(() => {
    emit('system_sleep', {});
    showToast('Sleep command sent');
  }, [emit, showToast]);

  const handleLock = useCallback(() => {
    emit('system_lock', {});
    showToast('PC locked');
  }, [emit, showToast]);

  const handleVolumeChange = useCallback((level: number) => {
    emit('volume_set', { level });
  }, [emit]);

  const handleVolumeUp = useCallback(() => {
    emit('volume_up', {});
  }, [emit]);

  const handleVolumeDown = useCallback(() => {
    emit('volume_down', {});
  }, [emit]);

  const handleMute = useCallback(() => {
    emit('volume_mute', {});
  }, [emit]);

  // Media handlers
  const handlePlayPause = useCallback(() => {
    emit('media_play_pause', {});
  }, [emit]);

  const handleNext = useCallback(() => {
    emit('media_next', {});
  }, [emit]);

  const handlePrev = useCallback(() => {
    emit('media_prev', {});
  }, [emit]);

  const handleStop = useCallback(() => {
    emit('media_stop', {});
  }, [emit]);

  const handleSlideNext = useCallback(() => {
    emit('slide_next', {});
  }, [emit]);

  const handleSlidePrev = useCallback(() => {
    emit('slide_prev', {});
  }, [emit]);

  const handleSlideshowStart = useCallback((fromCurrent?: boolean) => {
    emit('slideshow_start', { from_current: fromCurrent });
    showToast(fromCurrent ? 'Slideshow from current' : 'Slideshow started');
  }, [emit, showToast]);

  const handleSlideshowEnd = useCallback(() => {
    emit('slideshow_end', {});
  }, [emit]);

  const handlePageUp = useCallback(() => {
    emit('page_up', {});
  }, [emit]);

  const handlePageDown = useCallback(() => {
    emit('page_down', {});
  }, [emit]);

  // Search handlers
  const handleSearch = useCallback((query: string) => {
    emit('browser_search', { query });
    showToast(`Searching: ${query}`);
  }, [emit, showToast]);

  const handleOpenUrl = useCallback((url: string) => {
    emit('browser_url', { url });
    showToast(`Opening: ${url}`);
  }, [emit, showToast]);

  const handleOpenGoogle = useCallback(() => {
    emit('browser_google', {});
    showToast('Opening Google');
  }, [emit, showToast]);

  const getConnectButtonText = () => {
    if (isConnecting) return '...';
    if (isConnected) return 'DISCONNECT';
    return 'CONNECT';
  };

  const getConnectButtonClass = () => {
    if (isConnecting) return 'connecting';
    if (isConnected) return 'connected';
    return 'disconnected';
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-title">
          <span className="header-icon">🖥️</span>
          <div>
            <span>PC Control</span>
            {pcName && <div className="pc-name">{pcName}</div>}
          </div>
        </div>
        <button
          className={`connect-btn ${getConnectButtonClass()}`}
          onClick={handleConnect}
        >
          {isConnecting && <span className="spinner" />}
          {getConnectButtonText()}
        </button>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* TouchPad Panel */}
        <div className={`panel ${activeTab === 'touchpad' ? 'active' : ''}`}>
          <TouchPad
            onMove={handleMouseMove}
            onLeftClick={handleLeftClick}
            onRightClick={handleRightClick}
            onDoubleClick={handleDoubleClick}
            onScroll={handleScroll}
            disabled={!isConnected}
          />
        </div>

        {/* Keyboard Panel */}
        <div className={`panel ${activeTab === 'keyboard' ? 'active' : ''}`}>
          <VirtualKeyboard
            onType={handleType}
            onKey={handleKey}
            onHotkey={handleHotkey}
            disabled={!isConnected}
          />
        </div>

        {/* System Panel */}
        <div className={`panel ${activeTab === 'system' ? 'active' : ''}`}>
          <SystemControls
            volume={volume}
            onShutdown={handleShutdown}
            onRestart={handleRestart}
            onSleep={handleSleep}
            onLock={handleLock}
            onVolumeChange={handleVolumeChange}
            onVolumeUp={handleVolumeUp}
            onVolumeDown={handleVolumeDown}
            onMute={handleMute}
            disabled={!isConnected}
          />
        </div>

        {/* Media Panel */}
        <div className={`panel ${activeTab === 'media' ? 'active' : ''}`}>
          <MediaControls
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrev={handlePrev}
            onStop={handleStop}
            onSlideNext={handleSlideNext}
            onSlidePrev={handleSlidePrev}
            onSlideshowStart={handleSlideshowStart}
            onSlideshowEnd={handleSlideshowEnd}
            onPageUp={handlePageUp}
            onPageDown={handlePageDown}
            disabled={!isConnected}
          />
        </div>

        {/* Search Panel */}
        <div className={`panel ${activeTab === 'search' ? 'active' : ''}`}>
          <SearchPanel
            onSearch={handleSearch}
            onOpenUrl={handleOpenUrl}
            onOpenGoogle={handleOpenGoogle}
            disabled={!isConnected}
          />
        </div>
      </main>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'touchpad' ? 'active' : ''}`}
          onClick={() => setActiveTab('touchpad')}
        >
          <span className="nav-tab-icon">🖱️</span>
          Mouse
        </button>
        <button
          className={`nav-tab ${activeTab === 'keyboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('keyboard')}
        >
          <span className="nav-tab-icon">⌨️</span>
          Keys
        </button>
        <button
          className={`nav-tab ${activeTab === 'system' ? 'active' : ''}`}
          onClick={() => setActiveTab('system')}
        >
          <span className="nav-tab-icon">⚡</span>
          System
        </button>
        <button
          className={`nav-tab ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          <span className="nav-tab-icon">🎵</span>
          Media
        </button>
        <button
          className={`nav-tab ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          <span className="nav-tab-icon">🔍</span>
          Search
        </button>
      </nav>

      {/* Connect Modal */}
      {showConnectModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 1000,
          }}
          onClick={() => setShowConnectModal(false)}
        >
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '16px',
              padding: '24px',
              width: '100%',
              maxWidth: '320px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Connect to PC</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '14px' }}>
              Enter the IP address shown in the PC Control server window.
            </p>
            <input
              type="text"
              className="text-input"
              placeholder="e.g., 192.168.1.100"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDoConnect()}
              style={{ width: '100%', marginBottom: '16px' }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="special-key"
                style={{ flex: 1 }}
                onClick={() => setShowConnectModal(false)}
              >
                Cancel
              </button>
              <button
                className="connect-btn disconnected"
                style={{ flex: 1 }}
                onClick={handleDoConnect}
                disabled={!ipInput.trim()}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`toast ${toast ? 'show' : ''}`}>
        {toast}
      </div>
    </div>
  );
}
