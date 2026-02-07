'use client';

interface MediaControlsProps {
    onPlayPause: () => void;
    onNext: () => void;
    onPrev: () => void;
    onStop: () => void;
    onSlideNext: () => void;
    onSlidePrev: () => void;
    onSlideshowStart: (fromCurrent?: boolean) => void;
    onSlideshowEnd: () => void;
    onPageUp: () => void;
    onPageDown: () => void;
    disabled?: boolean;
}

export default function MediaControls({
    onPlayPause,
    onNext,
    onPrev,
    onStop,
    onSlideNext,
    onSlidePrev,
    onSlideshowStart,
    onSlideshowEnd,
    onPageUp,
    onPageDown,
    disabled = false,
}: MediaControlsProps) {
    return (
        <div className={`media-container ${disabled ? 'disabled' : ''}`}>
            <div className="control-section">
                <div className="section-title">Media Playback</div>
                <div className="media-buttons">
                    <button className="media-btn" onClick={onPrev} disabled={disabled}>
                        ⏮
                    </button>
                    <button className="media-btn" onClick={onStop} disabled={disabled}>
                        ⏹
                    </button>
                    <button className="media-btn large" onClick={onPlayPause} disabled={disabled}>
                        ⏯
                    </button>
                    <button className="media-btn" onClick={onNext} disabled={disabled}>
                        ⏭
                    </button>
                </div>
            </div>

            <div className="control-section">
                <div className="section-title">Presentation Controls</div>
                <div className="slide-controls">
                    <button className="slide-btn" onClick={onSlidePrev} disabled={disabled}>
                        <span className="slide-btn-icon">◀</span>
                        Previous
                    </button>
                    <button className="slide-btn" onClick={() => onSlideshowStart(false)} disabled={disabled}>
                        <span className="slide-btn-icon">▶️</span>
                        Start (F5)
                    </button>
                    <button className="slide-btn" onClick={onSlideNext} disabled={disabled}>
                        <span className="slide-btn-icon">▶</span>
                        Next
                    </button>
                </div>
                <div className="slide-controls" style={{ marginTop: '12px' }}>
                    <button className="slide-btn" onClick={() => onSlideshowStart(true)} disabled={disabled}>
                        <span className="slide-btn-icon">⏩</span>
                        Current (Shift+F5)
                    </button>
                    <button className="slide-btn" onClick={onSlideshowEnd} disabled={disabled}>
                        <span className="slide-btn-icon">✖</span>
                        End (Esc)
                    </button>
                </div>
            </div>

            <div className="control-section">
                <div className="section-title">Page Navigation</div>
                <div className="page-controls">
                    <button className="page-btn" onClick={onPageUp} disabled={disabled}>
                        ⬆️ Page Up
                    </button>
                    <button className="page-btn" onClick={onPageDown} disabled={disabled}>
                        ⬇️ Page Down
                    </button>
                </div>
            </div>
        </div>
    );
}
