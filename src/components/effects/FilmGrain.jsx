import { useEffect, useState } from 'react';

export default function FilmGrain() {
  const [noiseUrl, setNoiseUrl] = useState('');

  useEffect(() => {
    // Generate a 128x128 repeating noise texture dynamically on canvas
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(128, 128);
    const data = imgData.data;
    
    // Fill canvas with grey noise
    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(Math.random() * 255);
      data[i] = val;     // R
      data[i+1] = val;   // G
      data[i+2] = val;   // B
      data[i+3] = 15;    // Very subtle opacity (~5.8%)
    }
    
    ctx.putImageData(imgData, 0, 0);
    setNoiseUrl(canvas.toDataURL());
  }, []);

  if (!noiseUrl) return null;

  return (
    <div
      className="pointer-events-none fixed -inset-[10%] z-[30] select-none"
      style={{
        backgroundImage: `url(${noiseUrl})`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
        animation: 'grain 8s steps(10) infinite',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
