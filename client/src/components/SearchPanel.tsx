'use client';

import { useState, KeyboardEvent } from 'react';

interface SearchPanelProps {
    onSearch: (query: string) => void;
    onOpenUrl: (url: string) => void;
    onOpenGoogle: () => void;
    disabled?: boolean;
}

export default function SearchPanel({
    onSearch,
    onOpenUrl,
    onOpenGoogle,
    disabled = false,
}: SearchPanelProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [urlInput, setUrlInput] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
            setSearchQuery('');
        }
    };

    const handleOpenUrl = () => {
        if (urlInput.trim()) {
            onOpenUrl(urlInput.trim());
            setUrlInput('');
        }
    };

    const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleUrlKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleOpenUrl();
        }
    };

    return (
        <div className={`search-container ${disabled ? 'disabled' : ''}`}>
            <div className="control-section">
                <div className="section-title">Google Search</div>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search on Google..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        disabled={disabled}
                    />
                    <button
                        className="search-btn"
                        onClick={handleSearch}
                        disabled={disabled || !searchQuery.trim()}
                    >
                        🔍
                    </button>
                </div>
            </div>

            <div className="control-section">
                <div className="section-title">Open URL</div>
                <div className="search-box">
                    <input
                        type="url"
                        className="search-input"
                        placeholder="Enter URL (e.g., youtube.com)"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={handleUrlKeyDown}
                        disabled={disabled}
                    />
                    <button
                        className="search-btn"
                        onClick={handleOpenUrl}
                        disabled={disabled || !urlInput.trim()}
                    >
                        🌐
                    </button>
                </div>
            </div>

            <div className="control-section">
                <div className="section-title">Quick Actions</div>
                <div className="quick-actions">
                    <button className="quick-action" onClick={onOpenGoogle} disabled={disabled}>
                        <span className="quick-action-icon">🔍</span>
                        <span className="quick-action-label">Open Google</span>
                    </button>
                    <button
                        className="quick-action"
                        onClick={() => onOpenUrl('youtube.com')}
                        disabled={disabled}
                    >
                        <span className="quick-action-icon">📺</span>
                        <span className="quick-action-label">YouTube</span>
                    </button>
                    <button
                        className="quick-action"
                        onClick={() => onOpenUrl('gmail.com')}
                        disabled={disabled}
                    >
                        <span className="quick-action-icon">✉️</span>
                        <span className="quick-action-label">Gmail</span>
                    </button>
                    <button
                        className="quick-action"
                        onClick={() => onOpenUrl('github.com')}
                        disabled={disabled}
                    >
                        <span className="quick-action-icon">💻</span>
                        <span className="quick-action-label">GitHub</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
