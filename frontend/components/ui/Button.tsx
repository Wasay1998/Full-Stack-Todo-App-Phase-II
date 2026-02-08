import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-yellow-500 text-black hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-500',
        destructive: 'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline: 'border border-yellow-500 bg-transparent hover:bg-yellow-500/10 hover:text-yellow-400 focus:ring-2 focus:ring-yellow-500',
        secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600',
        ghost: 'hover:bg-zinc-800 hover:text-yellow-400 dark:hover:bg-zinc-800 dark:hover:text-yellow-400',
        link: 'underline-offset-4 hover:underline text-zinc-900 dark:text-zinc-50',
      },
      size: {
        sm: 'h-9 px-3 rounded-md',
        md: 'h-10 py-2 px-4 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };