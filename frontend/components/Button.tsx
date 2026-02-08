'use client';

import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline' | 'link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'inline-flex justify-center items-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-primary/50',
    secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground focus:ring-secondary/50',
    destructive: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground focus:ring-destructive/50',
    ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-accent/50',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground focus:ring-accent/50',
    link: 'underline-offset-4 hover:underline text-primary'
  };

  const sizes = {
    sm: 'text-sm py-2 px-3 rounded-md',
    md: 'text-sm py-2.5 px-4 rounded-lg',
    lg: 'text-base py-3 px-5 rounded-xl'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};