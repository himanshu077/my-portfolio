import React, { useContext } from "react";
import Section from "../../ui/section";
import Container from "../../ui/container";
import { Caption, Heading, Paragraph } from "../../ui/typography";
import ServiceGrid from "../../ServiceGrid";
import { PortfolioContext } from "../../../context/protfolioContext";

const Services = () => {
  const projectData = useContext(PortfolioContext);
  return (
    <Section
      id="services"
      aria-labelledby="services-heading"
      hasBorderTop
      hasGlowEffect
    >
      <Container>
        <div className="mb-16 flex flex-col items-center text-center">
          <Caption id="services-heading">Services</Caption>
          <Heading>Elevate Your Digital Presence</Heading>
          <Paragraph>
            Welcome to our services! We offer tailored solutions to elevate your
            online presence. Trust our dedicated team to exceed your
            expectations and help you achieve your digital goals with
            confidence.
            <span className="text-neutrals-100">
              With our expertise, expect results beyond your expectations.
            </span>
          </Paragraph>
        </div>
        <ServiceGrid visible="client" services={projectData?.services} />
      </Container>
    </Section>
  );
};

export default Services;
