import React, { useMemo } from "react";
import { extractName } from "../../../lib/utils";
import { getThumbnailSources } from "../../../lib/thumbnails";
import ProjectCard from "./ProjectCard";
import { paginator } from "../../../lib/paginator";
import Button from "../../ui/button";
import Container from "../../ui/container";
import ProjectFilters from "./ProjectFilters";
import { usePortfolio } from "../../../context/protfolioContext";
import { filterProjectsByCategory } from "./categoryFilter";

const AllRepos = ({ projects = [] }) => {
  const { portfolioData } = usePortfolio();
  const [page, setPage] = React.useState(1);
  const [paginatedProject, setPaginatedProjects] = React.useState([]);

  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const categories = portfolioData.categories.map((category) => category.name);

  const filteredProjects = useMemo(() => {
    return filterProjectsByCategory(projects, selectedFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter, projects]);

  React.useEffect(() => {
    if (page === 1) {
      setPaginatedProjects(paginator(filteredProjects, page));
    } else {
      setPaginatedProjects((prev) => [
        ...prev,
        ...paginator(filteredProjects, page),
      ]);
    }
  }, [filteredProjects, page, selectedFilter]);

  return (
    <>
      <div className="flex items-center justify-center">
        <ProjectFilters
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          projectTagFilters={categories}
          setPage={setPage}
        />
      </div>
      {(paginatedProject || []).length > 0 ? (
        <Container>
          <ul className="grid grid-cols-1 gap-6 mt-10 mb-5 sm:grid-cols-2 lg:grid-cols-3">
          {(paginatedProject || []).map((project) => {
            const isGithubRepo = Boolean(project.default_branch);
            return (
              <ProjectCard
                key={project.id}
                id={isGithubRepo ? project.name : project.id}
                name={isGithubRepo ? extractName(project.name) : project.name}
                sources={getThumbnailSources(project)}
                description={project.description}
                createdAt={isGithubRepo ? project.created_at : project.date}
                tags={isGithubRepo ? project.topics : project.tags}
              />
            );
          })}
          </ul>
        </Container>
      ) : (
        <div className="absolute top-[75%] flex items-center justify-center w-full text-neutrals-400">
          No projects found for this category
        </div>
      )}

      {filteredProjects.length === paginatedProject.length ? null : (
        <div className="w-full flex items-center justify-center">
          <Button
            rel="noreferrer"
            target="_blank"
            foreground="error"
            className="mt-8"
            onClick={() => setPage((p) => p + 1)}
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default AllRepos;
