'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TrackingPixel() {
  const pathname = usePathname();

  useEffect(() => {
    // Create tracking pixel image
    const img = new Image(1, 1);
    img.src = `/api/track?page=${encodeURIComponent(pathname)}&t=${Date.now()}`;
  }, [pathname]);

  return null; // This component doesn't render anything visible
}
