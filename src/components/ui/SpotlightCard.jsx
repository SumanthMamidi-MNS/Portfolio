import { useRef } from 'react';

export default function SpotlightCard({ children, className = '', style = {}, spotColor }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
      style={spotColor ? { ...style, '--spot-color': spotColor } : style}
    >
      <div className="spotlight-overlay" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
