import React from "react";
import { cn } from "../../lib/utils";

const initialsOf = (name = "") =>
  name
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

export const ThumbnailPlaceholder = ({ name, className }) => (
  <div
    aria-hidden="true"
    className={cn(
      "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutrals-700 via-neutrals-800 to-neutrals-900",
      className
    )}
  >
    <span className="text-5xl font-bold tracking-wider text-neutrals-400/80">
      {initialsOf(name)}
    </span>
  </div>
);

/**
 * Renders the first loadable image from `sources`, advancing on load error,
 * and falls back to an initials placeholder when none load.
 * Fills its (relatively positioned) parent.
 */
const Thumbnail = ({ sources = [], alt, className, eager = false }) => {
  const [index, setIndex] = React.useState(0);
  const src = sources[index];

  if (!src) return <ThumbnailPlaceholder name={alt} />;

  return (
    <>
      <ThumbnailPlaceholder name={alt} />
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => setIndex((i) => i + 1)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-top",
          className
        )}
      />
    </>
  );
};

export default Thumbnail;
