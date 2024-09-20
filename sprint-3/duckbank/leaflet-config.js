'use client'
import { useEffect } from 'react';
import L from 'leaflet';

export function useLeafletConfig() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: '/assets/logo/LogoDuckBank2.png',
        iconRetinaUrl: '/assets/logo/LogoDuckBank2.png',
        shadowUrl: '/assets/logo/LogoDuckBank2.png'
      });
    }
  }, []);
}
