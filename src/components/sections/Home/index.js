import React, { useContext } from "react";
import Hero from "../Hero";
import About from "../About";
import Work from "../Work";
import Services from "../Services";
import CustomerStories from "../CustomerStories";
import Contact from "../Contact";
import SourceCode from "../SourceCode";
import { PortfolioContext } from "../../../context/protfolioContext";

const Home = () => {
  const projectData = useContext(PortfolioContext);
  return (
    <>
      <Hero />
      {projectData?.website?.enable_section.about && <About />}
      {projectData?.website?.enable_section.work && <Work />}
      {projectData?.website?.enable_section.services && <Services />}
      {projectData?.website?.enable_section.customerStories && (
        <CustomerStories />
      )}
      {projectData?.website?.enable_section.contact && <Contact />}
      {projectData?.website?.enable_section.sourceCode && <SourceCode />}
    </>
  );
};
export default Home;
