'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  state?: 'default' | 'logged';
  variant?: 'filled' | 'outlined';
  icon?: ReactNode;
  children: ReactNode;
}

export default function Button({
  state = 'default',
  variant = 'filled',
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'flex h-12 items-center justify-center gap-2 rounded-[10px] px-6 text-base font-normal tracking-tight transition-colors';

  const variantClasses = {
    filled: {
      default:
        'bg-gradient-to-r from-[#2b7fff] to-[#9810fa] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]',
      logged:
        'bg-[#00bc7d] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]',
    },
    outlined: {
      default: 'border border-[#cad5e2] bg-transparent text-[#314158]',
      logged: 'border border-[#cad5e2] bg-transparent text-[#314158]',
    },
  };

  const classes =
    `${baseClasses} ${variantClasses[variant][state]} ${className}`.trim();

  return (
    <button className={classes} {...props}>
      {icon && <span className="size-5">{icon}</span>}
      {children}
    </button>
  );
}
