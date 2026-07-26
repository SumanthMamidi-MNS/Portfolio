import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', href, onClick, className = '', ...props }) {
  const Tag = href ? 'a' : 'button';
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className="inline-flex"
    >
      <Tag
        href={href}
        onClick={onClick}
        className={`${variantClass} ${className}`}
        {...props}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
