import { cn } from '../../lib/utils';
import { forwardRef } from 'react';

const Label = forwardRef(
    ({ children, htmlFor, className, ...props }, ref) => (
        <label
            ref={ref}
            htmlFor={htmlFor}
            className={cn(
                'mb-2 block text-sm/none uppercase text-neutrals-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                className,
            )}
            {...props}
        >
            {children}
        </label>
    ),
);
Label.displayName = 'Label';

export default Label;