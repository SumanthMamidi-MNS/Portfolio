export default function DotGrid({ theme = 'dark', className = '' }) {
  return (
    <div
      className={`absolute inset-0 dot-grid pointer-events-none ${className}`}
      style={{ opacity: theme === 'light' ? 0.4 : 0.6 }}
      aria-hidden="true"
    />
  );
}
