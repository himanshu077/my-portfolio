import Icons from "../../ui/icons";
import { Listbox } from "@headlessui/react";
import { cx } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useState, useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";

function ProjectFilters({
  selectedFilter,
  setSelectedFilter,
  setPage,
  projectTagFilters = [],
}) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  const handleOutsideClick = () => setIsOpen(false);

  useClickOutside(ref, handleOutsideClick);

  const selectedCount = projectTagFilters.find(
    (option) => option.name === selectedFilter
  )?.count;

  return (
    <Listbox
      as="div"
      value={[selectedFilter]}
      onChange={(newSelectedFilters) => {
        setPage(1);
        setSelectedFilter(newSelectedFilters.reverse()[0]);
        setIsOpen(false);
      }}
      multiple
      className="group relative w-full max-w-[22rem]"
      ref={ref}
    >
      {() => (
        <>
          <Listbox.Button
            className={cx(
              "flex w-full touch-manipulation items-center justify-between gap-2 rounded-lg border border-neutrals-600 bg-radial-highlight px-4 py-2.5 text-sm text-neutrals-100",
              "transition-[border-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
              "hover:border-neutrals-500 active:scale-[0.97]",
              "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              selectedFilter !== "All" && "pr-12"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate">{selectedFilter}</span>
              {typeof selectedCount === "number" && (
                <span className="shrink-0 rounded-full bg-neutrals-50/10 px-2 py-0.5 text-xs tabular-nums text-neutrals-300">
                  {selectedCount}
                </span>
              )}
            </span>
            <Icons.ChevronDown
              aria-hidden
              className="size-4 shrink-0 text-neutrals-300 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none group-data-[headlessui-state='open']:rotate-180"
            />
          </Listbox.Button>
          {selectedFilter !== "All" && (
            <button
              type="button"
              aria-label="Clear filter"
              className="absolute right-9 top-1/2 -translate-y-1/2 touch-manipulation rounded p-1.5 text-neutrals-400 transition-colors duration-150 hover:text-neutrals-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              onClick={() => {
                setPage(1);
                setSelectedFilter("All");
                setIsOpen(false);
              }}
            >
              <Icons.Close aria-hidden className="size-4" />
            </button>
          )}
          <AnimatePresence initial={false}>
            {isOpen && (
              <Listbox.Options
                static
                as={motion.ul}
                style={{ transformOrigin: "top" }}
                initial={{ opacity: 0, transform: "translateY(-8px) scale(0.97)" }}
                animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                exit={{ opacity: 0, transform: "translateY(-4px) scale(0.98)" }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="absolute z-20 mt-2 max-h-80 w-full overflow-y-auto scrollbar-stylized rounded-lg border border-neutrals-600 bg-neutrals-900/95 p-1.5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl focus:outline-none"
              >
                {projectTagFilters.map((projectTagFilter) => (
                  <Listbox.Option
                    key={projectTagFilter.name}
                    as={Fragment}
                    value={projectTagFilter.name}
                  >
                    {({ active, selected }) => (
                      <li
                        className={cx(
                          "flex w-full cursor-pointer items-center justify-between gap-3 rounded-sm px-2.5 py-2 text-sm",
                          active && "bg-neutrals-50/10",
                          selected ? "text-neutrals-50" : "text-neutrals-200"
                        )}
                      >
                        <span className="truncate">{projectTagFilter.name}</span>
                        <span className="flex shrink-0 items-center gap-2">
                          <span className="text-xs tabular-nums text-neutrals-400">
                            {projectTagFilter.count}
                          </span>
                          <Icons.Check
                            aria-hidden
                            className={cx(
                              "size-4 text-primary",
                              selected ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </span>
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </AnimatePresence>
        </>
      )}
    </Listbox>
  );
}

export default ProjectFilters;
