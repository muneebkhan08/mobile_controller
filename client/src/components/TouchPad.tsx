'use client';

import { useState, useRef, useCallback, TouchEvent } from 'react';

interface TouchPadProps {
    onMove: (dx: number, dy: number) => void;
    onLeftClick: () => void;
    onRightClick: () => void;
    onDoubleClick: () => void;
    onScroll: (delta: number) => void;
    disabled?: boolean;
}

export default function TouchPad({
    onMove,
    onLeftClick,
    onRightClick,
    onDoubleClick,
    onScroll,
    disabled = false,
}: TouchPadProps) {
    const [isActive, setIsActive] = useState(false);
    const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
    const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
    const lastTapRef = useRef<number>(0);
    const twoFingerStartRef = useRef<number | null>(null);

    const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
        if (disabled) return;

        const touch = e.touches[0];
        lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
        setIsActive(true);
        setTouchPos({ x: touch.clientX, y: touch.clientY });

        // Handle two-finger touch for scrolling
        if (e.touches.length === 2) {
            twoFingerStartRef.current = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        }
    }, [disabled]);

    const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
        if (disabled || !lastTouchRef.current) return;
        e.preventDefault();

        // Two-finger scroll
        if (e.touches.length === 2 && twoFingerStartRef.current !== null) {
            const currentY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            const deltaY = twoFingerStartRef.current - currentY;
            if (Math.abs(deltaY) > 10) {
                onScroll(deltaY > 0 ? -3 : 3);
                twoFingerStartRef.current = currentY;
            }
            return;
        }

        // Single finger move
        const touch = e.touches[0];
        const dx = touch.clientX - lastTouchRef.current.x;
        const dy = touch.clientY - lastTouchRef.current.y;

        if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
            onMove(dx, dy);
            lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
            setTouchPos({ x: touch.clientX, y: touch.clientY });
        }
    }, [disabled, onMove, onScroll]);

    const handleTouchEnd = useCallback((e: TouchEvent<HTMLDivElement>) => {
        if (disabled) return;

        setIsActive(false);
        twoFingerStartRef.current = null;

        // Detect tap for click
        if (lastTouchRef.current) {
            const now = Date.now();
            const timeSinceLastTap = now - lastTapRef.current;

            // Double tap detection
            if (timeSinceLastTap < 300) {
                onDoubleClick();
                lastTapRef.current = 0;
            } else {
                lastTapRef.current = now;
                // Single tap - trigger left click after short delay if no double tap
                setTimeout(() => {
                    if (Date.now() - lastTapRef.current >= 250 && lastTapRef.current !== 0) {
                        // Only click if user didn't start moving
                    }
                }, 300);
            }
        }

        lastTouchRef.current = null;
    }, [disabled, onDoubleClick]);

    return (
        <div className="touchpad-container">
            <div
                className={`touchpad ${disabled ? 'disabled' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <span className="touchpad-hint">
                    {disabled ? '⚡ Connect to control' : '👆 Swipe to move cursor'}
                </span>
                <div
                    className={`touchpad-active ${isActive ? 'show' : ''}`}
                    style={{
                        left: touchPos.x - 30,
                        top: touchPos.y - 30,
                    }}
                />
            </div>

            <div className="mouse-buttons">
                <button
                    className="mouse-btn"
                    onClick={onLeftClick}
                    disabled={disabled}
                >
                    Left Click
                </button>
                <button
                    className="mouse-btn"
                    onClick={onRightClick}
                    disabled={disabled}
                >
                    Right Click
                </button>
            </div>
        </div>
    );
}
