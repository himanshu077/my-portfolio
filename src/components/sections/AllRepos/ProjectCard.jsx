import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn, formatDate } from "../../../lib/utils";
import Thumbnail from "../../ui/thumbnail";

const MAX_TAGS = 3;

const ProjectCard = ({
  id,
  name,
  sources,
  description,
  tags = [],
  createdAt,
  isDisabled = false,
}) => {
  const visibleTags = tags.slice(0, MAX_TAGS);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <motion.li
      aria-labelledby={`project-item-${id}-heading`}
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-neutrals-600/60 bg-neutrals-800/60",
        "transition-[border-color,translate,scale] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        "hover:-translate-y-1 hover:border-primary/70",
        "active:translate-y-0 active:scale-[0.97] active:duration-150",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:opacity-0 after:shadow-[0_12px_40px_-12px_rgba(105,25,255,0.45)]",
        "after:transition-opacity after:duration-300 hover:after:opacity-100 motion-reduce:after:transition-none",
        "focus-within:border-primary/70",
        isDisabled && "opacity-40 grayscale"
      )}
    >
      <Link
        to={`/project/${id}`}
        draggable={false}
        className="flex h-full flex-col overflow-hidden rounded-xl outline-none"
      >
        <div className="relative aspect-video w-full overflow-hidden border-b border-neutrals-600/60 bg-neutrals-900">
          <Thumbnail
            key={sources.join("|")}
            sources={sources}
            alt={name}
            className="outline outline-1 -outline-offset-1 outline-[oklch(1_0_0_/_0.1)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-105 group-focus-visible:scale-105"
          />
          {createdAt && (
            <time
              dateTime={createdAt}
              className="absolute left-3 top-3 rounded-full bg-neutrals-900/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-neutrals-200 backdrop-blur"
            >
              {formatDate(createdAt)}
            </time>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3
            id={`project-item-${id}-heading`}
            className="text-lg font-semibold capitalize leading-snug text-neutrals-50 transition-colors group-hover:text-primary"
          >
            {name}
          </h3>
          {description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-neutrals-300">
              {description}
            </p>
          )}
          {visibleTags.length > 0 && (
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {visibleTags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-neutrals-600/70 bg-neutrals-700/50 px-2 py-0.5 text-xs text-neutrals-200"
                >
                  {tag}
                </li>
              ))}
              {hiddenCount > 0 && (
                <li className="rounded-md border border-transparent px-2 py-0.5 text-xs tabular-nums text-neutrals-400">
                  +{hiddenCount}
                </li>
              )}
            </ul>
          )}
        </div>
      </Link>
    </motion.li>
  );
};

export default ProjectCard;
