import { motion } from 'framer-motion';

const blobs = [
  {
    color: 'rgba(99, 102, 241, 0.22)',
    size: 600,
    initial: { x: -100, y: -80 },
    animate: { x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.9, 1] },
    duration: 20,
  },
  {
    color: 'rgba(139, 92, 246, 0.15)',
    size: 500,
    initial: { x: '60%', y: '30%' },
    animate: { x: ['60%', '50%', '70%', '60%'], y: ['30%', '50%', '20%', '30%'], scale: [1, 1.1, 1.3, 1] },
    duration: 26,
  },
  {
    color: 'rgba(245, 158, 11, 0.10)',
    size: 400,
    initial: { x: '20%', y: '70%' },
    animate: { x: ['20%', '30%', '10%', '20%'], y: ['70%', '60%', '80%', '70%'], scale: [1, 0.9, 1.1, 1] },
    duration: 22,
  },
];

export default function GradientMesh({ className = '' }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          animate={blob.animate}
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: blob.color,
            filter: `blur(${Math.round(blob.size * 0.22)}px)`,
            left: blob.initial.x,
            top: blob.initial.y,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
