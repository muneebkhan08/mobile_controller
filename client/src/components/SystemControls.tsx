'use client';

interface SystemControlsProps {
    volume: number;
    onShutdown: () => void;
    onRestart: () => void;
    onSleep: () => void;
    onLock: () => void;
    onVolumeChange: (level: number) => void;
    onVolumeUp: () => void;
    onVolumeDown: () => void;
    onMute: () => void;
    disabled?: boolean;
}

export default function SystemControls({
    volume,
    onShutdown,
    onRestart,
    onSleep,
    onLock,
    onVolumeChange,
    onVolumeUp,
    onVolumeDown,
    onMute,
    disabled = false,
}: SystemControlsProps) {
    const handleShutdown = () => {
        if (window.confirm('Are you sure you want to shutdown the PC?')) {
            onShutdown();
        }
    };

    const handleRestart = () => {
        if (window.confirm('Are you sure you want to restart the PC?')) {
            onRestart();
        }
    };

    return (
        <div className={`system-container ${disabled ? 'disabled' : ''}`}>
            <div className="control-section">
                <div className="section-title">Power Controls</div>
                <div className="power-buttons">
                    <button className="power-btn danger" onClick={handleShutdown} disabled={disabled}>
                        <span className="power-btn-icon">⏻</span>
                        <span className="power-btn-label">Shutdown</span>
                    </button>
                    <button className="power-btn warning" onClick={handleRestart} disabled={disabled}>
                        <span className="power-btn-icon">🔄</span>
                        <span className="power-btn-label">Restart</span>
                    </button>
                    <button className="power-btn" onClick={onSleep} disabled={disabled}>
                        <span className="power-btn-icon">😴</span>
                        <span className="power-btn-label">Sleep</span>
                    </button>
                    <button className="power-btn" onClick={onLock} disabled={disabled}>
                        <span className="power-btn-icon">🔒</span>
                        <span className="power-btn-label">Lock</span>
                    </button>
                </div>
            </div>

            <div className="control-section">
                <div className="section-title">Volume Control</div>
                <div className="volume-control">
                    <button className="volume-btn" onClick={onVolumeDown} disabled={disabled}>
                        🔉
                    </button>
                    <input
                        type="range"
                        className="volume-slider"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => onVolumeChange(parseInt(e.target.value))}
                        disabled={disabled}
                    />
                    <span className="volume-level">{volume}%</span>
                    <button className="volume-btn" onClick={onVolumeUp} disabled={disabled}>
                        🔊
                    </button>
                </div>
                <button
                    className="special-key"
                    onClick={onMute}
                    disabled={disabled}
                    style={{ marginTop: '12px', width: '100%' }}
                >
                    🔇 Mute / Unmute
                </button>
            </div>
        </div>
    );
}
