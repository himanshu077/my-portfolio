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
      className="group relative min-w-[20rem]"
      ref={ref}
    >
      {() => (
        <>
          <Listbox.Button
            className="flex w-full items-center justify-between rounded-sm border border-neutrals-600 bg-radial-highlight px-4 py-2 text-sm text-neutrals-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center justify-between w-full">
              <span>{selectedFilter}</span>
              {selectedFilter !== "All" && (
                <Icons.Close
                  aria-hidden
                  className="text-xs text-neutrals-300 mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFilter("All");
                  }}
                />
              )}
            </span>
            <Icons.ChevronDown
              aria-hidden
              className="size-4 transition-transform duration-200 group-data-[headlessui-state='open']:-scale-y-100"
            />
          </Listbox.Button>
          <AnimatePresence>
            {isOpen && (
              <Listbox.Options
                static
                as={motion.ul}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-2 w-full rounded-sm border border-neutrals-600 bg-neutrals-900/90 px-2 py-2 drop-shadow-lg backdrop-blur-md focus:outline-none supports-[backdrop-filter]:bg-neutrals-900/60"
              >
                {projectTagFilters.map((projectTagFilter) => (
                  <Listbox.Option
                    key={projectTagFilter}
                    as={Fragment}
                    value={projectTagFilter}
                  >
                    {({ active, selected }) => (
                      <li
                        className={cx(
                          "flex justify-between items-center w-full cursor-pointer rounded-sm p-2 text-sm transition-all",
                          selected && !active ? "text-neutrals-50" : "",
                          active
                            ? "bg-primary text-neutrals-50"
                            : "text-neutrals-300"
                        )}
                      >
                        {projectTagFilter}
                        {selected && <Icons.Check color="white" />}
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
