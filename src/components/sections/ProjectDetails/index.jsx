import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../ui/container";
import Button from "../../ui/button";
import Icons from "../../ui/icons";
import { formatDate, extractName } from "../../../lib/utils";
import { usePortfolio } from "../../../context/protfolioContext";
import Badge from "../../ui/badge";
import ReadMe from "../../../components/Readme";
import { fetchMarkDownFile } from "../../../lib/markdown";

const ProjectDetails = () => {
  const { id } = useParams();
  const {
    portfolioData,
    repo: githubRepo,
    setRepo,
    fetchSingleRepo,
  } = usePortfolio();
  const project =
    portfolioData && portfolioData.projects
      ? portfolioData.projects.find((project) => project.id === id)
      : [];

  const isJsonProject = !!project;

  const [loading, setLoading] = useState(true);
  const [markdown, setMarkdown] = useState(null);

  useEffect(() => {
    if (id && !isJsonProject) {
      setLoading(true);
      fetchSingleRepo(id).finally(() => setLoading(false));
    }
    return () => {
      setRepo(null);
    };
  }, [isJsonProject, id, fetchSingleRepo, setRepo]);

  const repo = { ...(githubRepo ?? {}) };

  if (!loading && isJsonProject) {
    repo.name = project.name;
    repo.description = project.description;
    repo.html_url = project.project_link;
    repo.homepage = project.live_link;
    repo.topics = project.tags;
    repo.created_at = project.date;
    repo.technologies = project.technologies;
    repo.markdown = "README.md";
  }

  useEffect(() => {
    if (project?.id) {
      setLoading(true);
      fetchMarkDownFile(project.id)
        .then((md) => {
          setMarkdown(md);
        })
        .finally(() => setLoading(false));
    }
  }, [project?.id]);

  return (
    <div>
      <section
        aria-labelledby="project-details-heading"
        className="relative flex min-h-screen w-full bg-neutrals-900 py-[14vh] after:absolute after:inset-0 after:h-full after:w-full after:bg-gradient-to-t after:from-neutrals-900 after:to-neutrals-900/60"
        key={repo?.id}
      >
        {/* <Image
            alt={repo.image}
            loading="eager"
            decoding="sync"
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={repo.image}
          /> */}
        <Container>
          {!loading && Object.keys(repo).length > 0 && (
            <div className="relative z-10 flex h-full flex-col">
              <Link
                to="/#work"
                className="group absolute start-0 top-0 flex items-center justify-center transition-opacity hover:opacity-80 focus-visible:opacity-80"
              >
                <Icons.ArrowLongLeft
                  aria-hidden
                  className="me-2 size-6 transition-transform duration-300 group-hover:-translate-x-1 group-focus-visible:-translate-x-1 lg:h-7 lg:w-7"
                />{" "}
                Back to projects
              </Link>
              <time
                dateTime={repo.created_at}
                className="mt-12 mb-4 text-xs uppercase text-neutrals-50/90 lg:text-sm"
              >
                {formatDate(repo.created_at)}
              </time>
              <h1
                id="project-details-heading"
                className="mb-4 text-balance text-4xl font-bold lg:text-6xl capitalize"
              >
                {extractName(repo.name)}
              </h1>
              <p className="mb-4 max-w-prose text-pretty text-sm/relaxed text-neutrals-50/90 md:text-base/relaxed">
                {repo.description}
              </p>
              {repo.technologies && Array.isArray(repo.technologies) && (
                <p className="flex flex-col text-xs text-neutrals-50/90 lg:text-sm mb-6">
                  <span className="inline-block text-lg font-bold">
                    Tech Stack
                  </span>
                  <span className="font-medium text-base">
                    {repo.technologies.join(" | ")}
                  </span>
                </p>
              )}
              {repo.topics && Array.isArray(repo.topics) && (
                <div className="flex gap-2 flex-wrap cursor-default capitalize">
                  {(repo.topics ?? []).map((tag, idx) => (
                    <Badge key={`tag__${idx}`} text={tag} />
                  ))}
                </div>
              )}
              <div className="flex gap-x-4 mt-8 mb-2">
                {repo.html_url && (
                  <Button
                    as="a"
                    href={repo.html_url}
                    rel="noreferrer"
                    target="_blank"
                    size="small"
                    isGhost
                  >
                    <Icons.GitHub aria-hidden className="size-5 me-2" /> View
                    Source Code
                  </Button>
                )}
                {repo.homepage && (
                  <Button
                    as="a"
                    href={repo.homepage}
                    rel="noreferrer"
                    target="_blank"
                    size="small"
                  >
                    <Icons.Eye aria-hidden className="size-5 me-2" /> View
                    Project
                  </Button>
                )}
              </div>
              <hr className="mb-8 mt-4 h-px border-0 bg-gradient-to-r from-neutrals-50/40 to-transparent" />
              <div className="flex gap-4">
                {(Object.keys(repo).length > 0 || markdown) && (
                  <ReadMe
                    repo={repo.name}
                    branch={repo.default_branch}
                    fileName="README.md"
                    markdown={markdown}
                  />
                )}
              </div>
            </div>
          )}
          {/* {project?.image_gallery && project?.image_gallery?.length > 0 && (
              <a
                href="#project-gallery"
                title="See project breakdown"
                aria-label="See project breakdown"
                className="absolute inset-x-0 bottom-[3vh] z-10 mx-auto w-fit animate-bounce"
              >
                <Icons.ArrowDownCircle className="size-9" />
              </a>
            )} */}
        </Container>
        {/* {project?.image_gallery?.length > 0 && (
            <section
              id="project-gallery"
              aria-label="Project Gallery"
              className="bg-neutrals-900"
            >
              <div className="mx-auto max-w-7xl">
                {project.image_gallery.map((image, index) => (
                  <Image
                    key={index}
                    alt={image.alt}
                    src={image.src}
                    className="w-full"
                  />
                ))}
              </div>
            </section>
          )} */}
      </section>
      {/* {projects.map((project) => (
        <section
          aria-labelledby="project-details-heading"
          className="relative flex min-h-screen w-full bg-neutrals-900 py-[14vh] after:absolute after:inset-0 after:h-full after:w-full after:bg-gradient-to-t after:from-neutrals-900 after:to-neutrals-900/60"
          key={project.id}
        >
          <Image
            alt={project?.poster?.alt || project?.image}
            loading="eager"
            decoding="sync"
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={project?.poster?.src || project?.image}
          />
          <Container>
            <div className="relative z-10 flex h-full flex-col justify-end">
              <a
                href="/#work"
                data-astro-prefetch
                className="group absolute start-0 top-0 flex items-center justify-center transition-opacity hover:opacity-80 focus-visible:opacity-80"
              >
                <Icons.ArrowLongLeft
                  aria-hidden
                  className="me-2 size-6 transition-transform duration-300 group-hover:-translate-x-1 group-focus-visible:-translate-x-1 lg:h-7 lg:w-7"
                />{" "}
                Back to projects
              </a>
              <time
                dateTime={project.date}
                className="mb-4 text-xs uppercase text-neutrals-50/90 lg:text-sm"
              >
                {formatDate(project.date)}
              </time>
              <h1
                id="project-details-heading"
                className="mb-4 text-balance text-4xl font-bold lg:text-6xl"
              >
                {project.name}
              </h1>
              <p className="mb-8 max-w-prose text-pretty text-sm/relaxed text-neutrals-50/90 md:text-base/relaxed">
                {project.description}
              </p>
              {project.tags && Array.isArray(project.tags) && (
                <p className="text-xs text-neutrals-50/90 lg:text-sm">
                  {project.tags.join(", ")}
                </p>
              )}
              {project.technologies && Array.isArray(project.technologies) && (
                <p className="text-xs text-neutrals-50/90 lg:text-sm">
                  Technologies Used :-{" "}
                  <span>{project.technologies.join(", ")}</span>
                </p>
              )}
              <hr className="mb-8 mt-4 h-px border-0 bg-gradient-to-r from-neutrals-50/40 to-transparent" />
              <div className="flex gap-x-4">
                {project.live_link && (
                  <Button
                    as="a"
                    href={project.live_link}
                    rel="noreferrer"
                    target="_blank"
                    size="small"
                  >
                    <Icons.Eye aria-hidden className="size-5 me-2" /> View
                    Project
                  </Button>
                )}
                {project.project_link && (
                  <Button
                    as="a"
                    href={project.project_link}
                    rel="noreferrer"
                    target="_blank"
                    size="small"
                    isGhost
                  >
                    <Icons.GitHub aria-hidden className="size-5 me-2" /> View
                    Source Code
                  </Button>
                )}
              </div>
            </div>
            {project?.image_gallery && project?.image_gallery?.length > 0 && (
              <a
                href="#project-gallery"
                title="See project breakdown"
                aria-label="See project breakdown"
                className="absolute inset-x-0 bottom-[3vh] z-10 mx-auto w-fit animate-bounce"
              >
                <Icons.ArrowDownCircle className="size-9" />
              </a>
            )}
          </Container>
          {project?.image_gallery?.length > 0 && (
            <section
              id="project-gallery"
              aria-label="Project Gallery"
              className="bg-neutrals-900"
            >
              <div className="mx-auto max-w-7xl">
                {project.image_gallery.map((image, index) => (
                  <Image
                    key={index}
                    alt={image.alt}
                    src={image.src}
                    className="w-full"
                  />
                ))}
              </div>
            </section>
          )}
        </section>
      ))} */}
    </div>
  );
};

export default ProjectDetails;
