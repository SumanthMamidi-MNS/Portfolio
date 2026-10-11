import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  ...props
}) {
  const Tag = href ? motion.a : motion.button;
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <Tag
      href={href}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${variantClass} ${className} select-none cursor-pointer no-underline`}
      {...props}
    >
      {children}
    </Tag>
  );
}
