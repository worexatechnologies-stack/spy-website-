import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  to?: string;
  href?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  to,
  href,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-poppins font-semibold rounded-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-logo-gold/35 disabled:opacity-50';

  const variants = {
    primary: 'bg-primary text-white hover:bg-logo-black shadow-[0_12px_28px_-18px_rgba(8,5,4,0.75)] hover:shadow-[0_16px_34px_-18px_rgba(8,5,4,0.9)]',
    secondary: 'bg-dark-brown text-white hover:bg-primary shadow-md',
    outline: 'border border-primary/25 text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/8',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
