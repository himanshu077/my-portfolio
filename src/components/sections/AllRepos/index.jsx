import React, { useMemo } from "react";
import { extractName } from "../../../lib/utils";
import { appEnvs } from "../../../lib/env";
import ProjectCard from "./ProjectCard";
import { paginator } from "../../../lib/paginator";
import Button from "../../ui/button";
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
        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {(paginatedProject || []).map((project, index) => {
            if (project.default_branch) {
              return (
                <ProjectCard
                  key={project.id}
                  id={project.name}
                  name={extractName(project.name)}
                  image={`https://raw.githubusercontent.com/${appEnvs.REACT_APP_GITHUB_USERNAME}/${project.name}/main/logo.png`}
                  createdAt={project.created_at}
                  tags={project.topics}
                  // isDisabled={!filteredProjects.includes(project)}
                />
              );
            }

            return (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                image={project.poster.src}
                createdAt={project.date}
                tags={project.tags}
                // isDisabled={!filteredProjects.includes(project)}
              />
            );
          })}
        </div>
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
