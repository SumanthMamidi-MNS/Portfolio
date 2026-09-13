import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Button({ children, variant = 'primary', href, onClick, className = '', ...props }) {
  const Tag = href ? 'a' : 'button';
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const [ripples, setRipples] = useState([]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    // Magnetic pull — nudge up to ±10px
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e) => {
    // Ripple effect
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const id = Date.now();
      const rx = e.clientX - rect.left;
      const ry = e.clientY - rect.top;
      setRipples(prev => [...prev, { id, x: rx, y: ry }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
    }
    if (onClick) onClick(e);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className="inline-flex relative"
    >
      <Tag
        href={href}
        onClick={handleClick}
        className={`${variantClass} ${className} relative overflow-hidden`}
        {...props}
      >
        {/* Shimmer sweep on hover */}
        <span className="shimmer-sweep" aria-hidden="true" />

        {children}

        {/* Click ripples */}
        {ripples.map(r => (
          <span
            key={r.id}
            className="btn-ripple"
            style={{ left: r.x, top: r.y }}
            aria-hidden="true"
          />
        ))}
      </Tag>
    </motion.div>
  );
}
