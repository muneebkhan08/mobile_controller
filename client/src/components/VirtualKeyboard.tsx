'use client';

import { useState, KeyboardEvent } from 'react';

interface VirtualKeyboardProps {
    onType: (text: string) => void;
    onKey: (key: string) => void;
    onHotkey: (keys: string[]) => void;
    disabled?: boolean;
}

const SPECIAL_KEYS = [
    { label: 'Enter ↵', key: 'enter' },
    { label: 'Backspace ⌫', key: 'backspace' },
    { label: 'Tab ⇥', key: 'tab' },
    { label: 'Escape', key: 'escape' },
    { label: 'Space', key: 'space' },
    { label: '↑', key: 'up' },
    { label: '↓', key: 'down' },
    { label: '←', key: 'left' },
    { label: '→', key: 'right' },
    { label: 'Home', key: 'home' },
    { label: 'End', key: 'end' },
    { label: 'Delete', key: 'delete' },
];

const HOTKEYS = [
    { label: 'Copy', keys: ['ctrl', 'c'] },
    { label: 'Paste', keys: ['ctrl', 'v'] },
    { label: 'Cut', keys: ['ctrl', 'x'] },
    { label: 'Undo', keys: ['ctrl', 'z'] },
    { label: 'Redo', keys: ['ctrl', 'y'] },
    { label: 'Select All', keys: ['ctrl', 'a'] },
    { label: 'Save', keys: ['ctrl', 's'] },
    { label: 'Find', keys: ['ctrl', 'f'] },
];

export default function VirtualKeyboard({
    onType,
    onKey,
    onHotkey,
    disabled = false,
}: VirtualKeyboardProps) {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (text.trim()) {
            onType(text);
            setText('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className={`keyboard-container ${disabled ? 'disabled' : ''}`}>
            <div className="text-input-area">
                <input
                    type="text"
                    className="text-input"
                    placeholder="Type text to send..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                />
                <button
                    className="send-btn"
                    onClick={handleSubmit}
                    disabled={disabled || !text.trim()}
                >
                    ➤
                </button>
            </div>

            <div className="control-section">
                <div className="section-title">Special Keys</div>
                <div className="special-keys">
                    {SPECIAL_KEYS.map((key) => (
                        <button
                            key={key.key}
                            className="special-key"
                            onClick={() => onKey(key.key)}
                            disabled={disabled}
                        >
                            {key.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="control-section">
                <div className="section-title">Shortcuts</div>
                <div className="special-keys">
                    {HOTKEYS.map((hotkey) => (
                        <button
                            key={hotkey.label}
                            className="special-key"
                            onClick={() => onHotkey(hotkey.keys)}
                            disabled={disabled}
                        >
                            {hotkey.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
