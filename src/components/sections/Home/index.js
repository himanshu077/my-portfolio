import React from "react";
import Hero from "../Hero";
import About from "../About";
import Work from "../Work";
import Services from "../Services";
import CustomerStories from "../CustomerStories";
import Contact from "../Contact";
import SourceCode from "../SourceCode";
import { usePortfolio } from "../../../context/protfolioContext";

const Home = () => {
  const { portfolioData } = usePortfolio();
  return (
    <>
      <Hero />
      {portfolioData?.website?.enable_section.about && <About />}
      {portfolioData?.website?.enable_section.work && <Work />}
      {portfolioData?.website?.enable_section.services && <Services />}
      {portfolioData?.website?.enable_section.customerStories && (
        <CustomerStories />
      )}
      {portfolioData?.website?.enable_section.contact && <Contact />}
      {portfolioData?.website?.enable_section.sourceCode && <SourceCode />}
    </>
  );
};
export default Home;
