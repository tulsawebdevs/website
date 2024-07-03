/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { LoaderCircleIcon } from 'lucide-react';
import { cn } from './utils.ts';

const spinnerVariants = 'w-16 h-16 rounded-full animate-spin';

type LoadingSpinnerProps = {
  className?: string;
} & React.HTMLAttributes<SVGSVGElement>;

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
