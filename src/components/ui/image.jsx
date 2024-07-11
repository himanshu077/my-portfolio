
import { forwardRef } from 'react';

const Image = forwardRef(
    ({ src, width, height, alt, isAboveTheFold = false, ...props }, ref) => (
        <img
            src={src}
            width={width}
            height={height}
            alt={alt}
            loading={isAboveTheFold ? 'eager' : 'lazy'}
            decoding="async"
            ref={ref}
            {...props}
        />
    ),
);

export default Image;
