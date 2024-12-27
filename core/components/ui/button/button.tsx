import { Slot } from '@radix-ui/react-slot';
import { Loader2 as Spinner } from 'lucide-react';
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

import { cn } from '~/lib/utils';

interface Props extends ComponentPropsWithRef<'button'> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'subtle';
}

const Button = forwardRef<ElementRef<'button'>, Props>(
  (
    {
      asChild = false,
      children,
      className,
      variant = 'primary',
      loading,
      loadingText,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          'relative flex w-full items-center justify-center text-base leading-6 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:border-gray-400 !text-white bg-[#AD1A2E] h-[60px] text-[18px] font-[700] uppercase py-[1.5rem] px-[1rem] max-w-[480px]',
          variant === 'primary' &&
          'text-white hover:border-secondary hover:bg-[#931627] disabled:bg-gray-400 disabled:hover:border-gray-400 disabled:hover:bg-gray-400 bg-[#AD1A2E]',
          variant === 'secondary' &&
          'bg-transparent text-primary hover:border-secondary hover:bg-[#931627] hover:bg-opacity-10 hover:text-secondary disabled:text-gray-400 disabled:hover:border-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400 bg-[#AD1A2E]',
          variant === 'subtle' &&
          'border-none bg-transparent text-primary hover:bg-[#931627] hover:bg-opacity-10 hover:text-secondary disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400 bg-[#AD1A2E]',
          className,
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <>
            <span className="absolute z-10 flex h-full w-full items-center justify-center">
              <Spinner aria-hidden="true" className="animate-spin" />
              <span className="sr-only">{loadingText}</span>
            </span>
            <span className="invisible flex items-center">{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button };
