import * as React from 'react';
import { cn } from './utils.ts';
import { LoaderCircleIcon } from 'lucide-react';

const spinnerVariants = 'w-16 h-16 rounded-full animate-spin';

interface LoadingSpinnerProps extends React.HTMLAttributes<SVGSVGElement> {
  className?: string;
}

const LoadingSpinner = React.forwardRef<SVGSVGElement, LoadingSpinnerProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <LoaderCircleIcon
        ref={ref}
        className={cn(spinnerVariants, className)}
        {...rest}
      />
    );
  },
);

LoadingSpinner.displayName = 'LoadingSpinner';

export { LoadingSpinner };
