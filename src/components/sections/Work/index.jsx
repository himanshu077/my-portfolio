import React from "react";
import Container from "../../ui/container";
import { Caption, Heading } from "../../ui/typography";
// import ProjectCarousel from "../../ProjectCarousle";
import Section from "../../ui/section";
import { usePortfolio } from "../../../context/protfolioContext";
import AllRepos from "../AllRepos";

const Work = () => {
  const { portfolioData, repos } = usePortfolio();

  const activeProjects = portfolioData.activeProjects;
  const projects = portfolioData.projects;

  const sortedProjects = React.useMemo(() => {
    const activeProjectsCopy = [...activeProjects];

    const enabledSortedProjects = activeProjectsCopy.filter(
      (project) => project.enabled
    );
    enabledSortedProjects.sort((a, b) => a.order - b.order);

    const enabledSortedProjectNames = enabledSortedProjects.map(
      (project) => project.name
    );

    const combinedProjects = [...(repos ?? []), ...(projects ?? [])];
    const allProjects = [];

    for (const project of enabledSortedProjectNames) {
      const proj = combinedProjects.find((item) => item.name === project);
      if (proj) {
        allProjects.push({
          ...proj,
          localInfo: activeProjectsCopy.find((item) => item.name === project),
        });
      }
    }
    return allProjects;
  }, [projects, activeProjects, repos]);

  return (
    <Section
      id="work"
      aria-labelledby="work-heading"
      hasBorderTop
      hasGlowEffect
      className="lg:border-t-0.5 lg:border-neutrals-600 lg:before:hidden lg:after:hidden"
    >
      <Container className="mb-8">
        <div className="flex flex-col items-center text-center">
          <Caption id="work-heading">Work</Caption>
          <Heading>Dig into my universe</Heading>
        </div>
      </Container>
      {/* <ProjectCarousel idle="client" projects={sortedProjects} /> */}
      <AllRepos idle="client" projects={sortedProjects} />
    </Section>
  );
};

export default Work;
