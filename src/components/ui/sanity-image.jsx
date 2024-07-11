import { forwardRef } from 'react';

const SanityImage = forwardRef(
  (
    {
      src,
      alt,
      isAboveTheFold = false,
      ...props
    },
    ref,
  ) => (
    <img
      src={src}
      alt={alt}
      loading={isAboveTheFold ? 'eager' : 'lazy'}
      decoding={isAboveTheFold ? 'sync' : 'async'}
      ref={ref}
      {...props}
    />
  ),
);

export default SanityImage;
