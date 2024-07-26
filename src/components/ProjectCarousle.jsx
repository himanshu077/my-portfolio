import Container from "./ui/container";
import Icons from "./ui/icons";
import { clamp, cn, extractName } from "../lib/utils";
import { Listbox } from "@headlessui/react";
import { cx } from "class-variance-authority";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { appEnvs } from "../lib/env";
import ProjectSlide from "./ProjectSlide";
import { usePortfolio } from "../context/protfolioContext";

function ProjectFiltersSelect({ selectedFiltersState, projectTagFilters }) {
  const [selectedFilters, setSelectedFilters] = selectedFiltersState;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Listbox
      as="div"
      value={selectedFilters}
      onChange={(newSelectedFilters) => {
        if (newSelectedFilters.length !== 0) {
          if (newSelectedFilters[newSelectedFilters.length - 1] === "All") {
            setSelectedFilters(["All"]);
          } else if (selectedFilters.includes("All")) {
            setSelectedFilters([
              newSelectedFilters[newSelectedFilters.length - 1],
            ]);
          } else {
            setSelectedFilters(newSelectedFilters);
          }
        }
        setIsOpen(false);
      }}
      multiple
      className="group relative min-w-[20rem]"
    >
      {() => (
        <>
          <Listbox.Button
            className="flex w-full items-center justify-between rounded-sm border border-neutrals-600 bg-radial-highlight px-4 py-2 text-sm text-neutrals-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {(selectedFilters ?? [])
              .sort(
                (a, b) =>
                  projectTagFilters.indexOf(a) - projectTagFilters.indexOf(b)
              )
              .map((selectedFilter) => selectedFilter)
              .join(", ")}
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
                          "cursor-pointer rounded-sm p-2 text-sm transition-all",
                          selected && !active ? "text-neutrals-50" : "",
                          active
                            ? "bg-primary text-neutrals-50"
                            : "text-neutrals-300"
                        )}
                      >
                        {projectTagFilter}
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

const CAROUSEL_SLIDES_GAP = 24;

function ProjectCarousel({ projects = [] }) {
  const carouselWrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [carouselSlideWidth, setCarouselSlideWidth] = useState(0);
  const [maxScrollWidth, setMaxScrollWidth] = useState(0);
  const scrollPosition = useMotionValue(0);
  const scrollProgress = useTransform(
    scrollPosition,
    [0, maxScrollWidth],
    ["0%", "100%"]
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const { portfolioData } = usePortfolio();
  const categories =
    portfolioData && portfolioData.categories
      ? portfolioData.categories.filter((category) => category.enabled)
      : [];
  const projectTagFilters = categories.map((category) => category.name);
  // const wildcardFilter = 'Web Development';
  const [selectedFilters, setSelectedFilters] = useState(["All"]);
  const updateCarouselConstraints = useCallback(() => {
    if (
      !carouselWrapperRef.current ||
      !carouselRef.current ||
      !carouselRef.current.firstElementChild
    )
      return;

    setCarouselWidth(carouselWrapperRef.current.offsetWidth);
    setCarouselSlideWidth(carouselRef.current.firstElementChild.offsetWidth);
    setMaxScrollWidth(
      carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
    );
  }, []);

  useEffect(() => {
    updateCarouselConstraints();

    window.addEventListener("resize", updateCarouselConstraints);
    window.addEventListener("orientationchange", updateCarouselConstraints);

    return () => {
      window.removeEventListener("resize", updateCarouselConstraints);
      window.removeEventListener(
        "orientationchange",
        updateCarouselConstraints
      );
    };
  }, [updateCarouselConstraints]);

  function updateCurrentSlide(latestScrollPosition) {
    setCurrentSlide(
      clamp(
        0,
        Math.round(
          latestScrollPosition / (carouselSlideWidth + CAROUSEL_SLIDES_GAP)
        ),
        projects.length - 1
      )
    );
  }

  useMotionValueEvent(scrollPosition, "change", updateCurrentSlide);

  function scrollToSlide(slideIndex) {
    if (!carouselRef.current) return;

    carouselRef.current.scrollTo({
      left: slideIndex * (carouselSlideWidth + CAROUSEL_SLIDES_GAP),
      behavior: "smooth",
    });
  }

  function scrollToPreviousSlide() {
    scrollToSlide(currentSlide - 1);
  }

  function scrollToNextSlide() {
    scrollToSlide(currentSlide + 1);
  }

  const handleScroll = useCallback(
    (event) => {
      scrollPosition.set(event.currentTarget.scrollLeft);
    },
    [scrollPosition]
  );

  const handleMouseDown = useCallback((event) => {
    const isMainMouseButtonClicked = event.button === 0;

    if (isMainMouseButtonClicked) {
      setDragStart({
        scrollX: event.currentTarget.scrollLeft,
        pointerX: event.clientX,
      });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (carouselRef.current && dragStart) {
        const distanceX = event.clientX - dragStart.pointerX;

        carouselRef.current.scrollTo({
          left: dragStart.scrollX - distanceX,
        });
        if (!isDragging) setIsDragging(true);
      }
    },
    [dragStart, isDragging]
  );

  return (
    <div ref={carouselWrapperRef} className="mt-4 w-full">
      <Container>
        <div className="flex items-center justify-center">
          <ProjectFiltersSelect
            selectedFiltersState={[selectedFilters, setSelectedFilters]}
            projectTagFilters={projectTagFilters}
          />
        </div>
      </Container>
      <div className="relative py-8">
        <div
          aria-label="Carousel Controls"
          className="pointer-events-none absolute top-1/2 z-10 flex w-full -translate-y-1/2 justify-between px-4 lg:px-8"
        >
          <button
            type="button"
            onClick={scrollToPreviousSlide}
            title="Previous project slide"
            aria-controls="project-carousel"
            disabled={currentSlide === 0}
            className="pointer-events-auto aspect-square h-fit rounded-full border border-neutrals-600 bg-neutrals-900/90 p-4 text-neutrals-100 drop-shadow-md backdrop-blur-md disabled:cursor-not-allowed disabled:opacity-50 supports-[backdrop-filter]:bg-neutrals-900/50"
          >
            <Icons.ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={scrollToNextSlide}
            title="Next project slide"
            aria-controls="project-carousel"
            disabled={currentSlide === projects.length - 1}
            className="pointer-events-auto aspect-square h-fit rounded-full border border-neutrals-600 bg-neutrals-900/90 p-4 text-neutrals-100 drop-shadow-md backdrop-blur-md disabled:cursor-not-allowed disabled:opacity-50 supports-[backdrop-filter]:bg-neutrals-900/50"
          >
            <Icons.ChevronRight className="size-5" />
          </button>
        </div>
        <div className="h-[calc(clamp(18rem,42vmin,26rem)*3/2)] touch-none select-none overflow-hidden">
          <ul
            ref={carouselRef}
            id="project-carousel"
            aria-label="Project Carousel"
            onScroll={handleScroll}
            onMouseDownCapture={handleMouseDown}
            onMouseUpCapture={handleMouseUp}
            onMouseMoveCapture={handleMouseMove}
            className={cn(
              "grid auto-cols-min grid-flow-col gap-x-6 overflow-x-auto pe-[calc(50vw-(clamp(18rem,42vmin,26rem)+1.5rem)/2)] ps-[calc(50vw-clamp(18rem,42vmin,26rem)/2-7px)]",
              isDragging && "cursor-grabbing"
            )}
          >
            {(projects || []).map((project, index) => {
              if (project.default_branch) {
                return (
                  <ProjectSlide
                    key={project.id}
                    id={project.name}
                    name={extractName(project.name)}
                    image={`https://raw.githubusercontent.com/${appEnvs.REACT_APP_GITHUB_USERNAME}/${project.name}/main/logo.png`}
                    createdAt={project.created_at}
                    tags={project.topics}
                    index={index}
                    currentIndex={currentSlide}
                    // isDisabled={!filteredProjects.includes(project)}
                    isDisabled={false}
                    isDragging={isDragging}
                    carouselWidth={carouselWidth}
                    scrollPosition={scrollPosition}
                  />
                );
              }

              return (
                <ProjectSlide
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  image={project.poster.src}
                  createdAt={project.date}
                  tags={project.tags}
                  index={index}
                  currentIndex={currentSlide}
                  // isDisabled={!filteredProjects.includes(project)}
                  isDisabled={false}
                  isDragging={isDragging}
                  carouselWidth={carouselWidth}
                  scrollPosition={scrollPosition}
                />
              );
            })}
            {/* {repos.map((repo, index) => (
              <ProjectSlide
                key={repo.id}
                id={repo.name}
                name={extractName(repo.name)}
                image={`https://raw.githubusercontent.com/${appEnvs.REACT_APP_GITHUB_USERNAME}/${repo.name}/main/logo.png`}
                createdAt={repo.created_at}
                tags={repo.topics}
                index={index}
                currentIndex={currentSlide}
                // isDisabled={!filteredProjects.includes(project)}
                isDisabled={false}
                isDragging={isDragging}
                carouselWidth={carouselWidth}
                scrollPosition={scrollPosition}
              />
            ))}
            {projects.map((project, index) => (
              <ProjectSlide
                key={project.id}
                id={project.id}
                name={project.name}
                image={project.image}
                createdAt={project.date}
                tags={project.tags}
                index={index}
                currentIndex={currentSlide}
                // isDisabled={!filteredProjects.includes(project)}
                isDisabled={false}
                isDragging={isDragging}
                carouselWidth={carouselWidth}
                scrollPosition={scrollPosition}
              />
            ))} */}
          </ul>
        </div>
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          Project {currentSlide + 1} of {projects.length}
        </p>
      </div>
      <Container>
        <div className="h-px w-full bg-gradient-to-r from-neutrals-600/60 via-neutrals-600 to-neutrals-600/60">
          <motion.div
            style={{ width: scrollProgress }}
            className="h-full bg-gradient-to-r from-neutrals-100/30 via-neutrals-100 to-neutrals-100/30"
          />
        </div>
      </Container>
    </div>
  );
}

export default ProjectCarousel;
