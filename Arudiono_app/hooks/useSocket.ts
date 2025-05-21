import { useEffect } from 'react';
import { socket } from '../config/socket';
import { Product } from '../types/product';

export function useSocket(onItemReceived: (item: Product) => void) {
  useEffect(() => {
    socket.on("new-item", onItemReceived);

    return () => {
      socket.off("new-item", onItemReceived);
    };
  }, []);
}
