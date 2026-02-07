'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface UseSocketReturn {
    status: ConnectionStatus;
    pcName: string | null;
    volume: number;
    connect: (ip: string, port?: number) => void;
    disconnect: () => void;
    emit: (event: string, data?: Record<string, unknown>) => void;
}

export function useSocket(): UseSocketReturn {
    const socketRef = useRef<Socket | null>(null);
    const [status, setStatus] = useState<ConnectionStatus>('disconnected');
    const [pcName, setPcName] = useState<string | null>(null);
    const [volume, setVolume] = useState(50);

    const connect = useCallback((ip: string, port: number = 8765) => {
        if (socketRef.current?.connected) {
            return;
        }

        setStatus('connecting');

        const socket = io(`http://${ip}:${port}`, {
            transports: ['websocket'],
            timeout: 5000,
            reconnection: true,
            reconnectionAttempts: 3,
            reconnectionDelay: 1000,
        });

        socket.on('connect', () => {
            setStatus('connected');
            console.log('Connected to PC');
        });

        socket.on('disconnect', () => {
            setStatus('disconnected');
            setPcName(null);
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            setStatus('disconnected');
        });

        socket.on('connection_status', (data: { status: string; message?: string }) => {
            if (data.status === 'connected') {
                setStatus('connected');
            }
        });

        socket.on('volume_update', (data: { level: number }) => {
            setVolume(data.level);
        });

        socketRef.current = socket;
    }, []);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            setStatus('disconnected');
            setPcName(null);
        }
    }, []);

    const emit = useCallback((event: string, data: Record<string, unknown> = {}) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit(event, data);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    return {
        status,
        pcName,
        volume,
        connect,
        disconnect,
        emit,
    };
}

// Discovery hook for finding PCs on the network
export function useDiscovery() {
    const [isSearching, setIsSearching] = useState(false);
    const [foundPCs, setFoundPCs] = useState<Array<{ ip: string; hostname: string; port: number }>>([]);

    // For web, we'll use manual IP entry since UDP broadcast isn't available in browsers
    // The auto-discovery would require a native app or browser extension

    const searchNetwork = useCallback(async () => {
        // This is a placeholder - in a real app, you'd need a helper service
        // For now, we'll just prompt for manual IP
        setIsSearching(true);
        setTimeout(() => setIsSearching(false), 1000);
    }, []);

    return {
        isSearching,
        foundPCs,
        searchNetwork,
    };
}
