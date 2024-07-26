import React from "react";
import { cx } from "class-variance-authority";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn, formatDate } from "../../../lib/utils";
import Badge from "../../ui/badge";

const ProjectCard = ({
  id,
  name,
  image,
  tags = [],
  createdAt,
  isDisabled = false,
}) => {
  return (
    <motion.li
      key={id}
      aria-labelledby={`project-item-${id}-heading`}
      className="relative aspect-[2/3] w-[clamp(18rem,42vmin,26rem)] overflow-hidden rounded-md  border border-neutrals-50/30"
    >
      <Link
        to={`/project/${id}`}
        className={cx(
          "group block h-full w-full rounded-md"
        )}
        draggable={false}
      >
        <article
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-neutrals-900/50 p-4 text-center opacity-0 backdrop-blur-sm transition-opacity duration-300",
            !isDisabled &&
              "group-hover:opacity-100 group-focus-visible:opacity-100"
          )}
        >
          <div className="overflow-hidden">
            <time
              dateTime={createdAt}
              className="block translate-y-full text-xs uppercase text-neutrals-50/90 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0"
            >
              {formatDate(createdAt)}
            </time>
          </div>
          <div className="overflow-hidden">
            <h3
              id={`project-item-${id}-heading`}
              className="translate-y-full text-2xl font-bold transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 lg:text-4xl capitalize"
            >
              {name}
            </h3>
          </div>
          {tags?.length > 0 && (
            <div className="overflow-hidden flex flex-wrap justify-center gap-2 mt-3">
              {tags.map((tag, idx) => (
                <Badge key={`tag__${idx}`} text={tag} />
              ))}
            </div>
          )}
        </article>
        <motion.img
          src={image || ""}
          alt={name || ""}
          loading="lazy"
          decoding="async"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover transition-[transform,opacity,filter] duration-700 ",
            isDisabled
              ? "opacity-20 grayscale"
              : "group-hover:scale-105 group-focus-visible:scale-105"
          )}
        />
      </Link>
    </motion.li>
  );
};

export default ProjectCard;
