import React from "react";
import Section from "../../ui/section";
import Container from "../../ui/container";
import { Caption, Heading, Paragraph } from "../../ui/typography";
import Button from "../../ui/button";
import MatrixBackground from "../../MatrixBackground";
import siteConfig from "../../../config/site";
const SourceCode = () => {
  return (
    <Section id="source-code" aria-labelledby="sourcecode-heading" hasBorderTop>
      <MatrixBackground visible="true" />
      <Container>
        <div className="flex h-full flex-col items-center justify-center text-center">
          <Caption id="sourcecode-heading">Source code</Caption>
          <Heading>Explore the Code</Heading>
          <Paragraph>
            Delve into the source code of this project and uncover its inner
            workings. Gain insights into its structure and functionality.
            Satisfy your curiosity and discover the magic behind the scenes.
            <span className="text-neutrals-100">Feel the power of code!</span>
          </Paragraph>
          <Button
            as="a"
            href={siteConfig.links.github}
            rel="noreferrer"
            target="_blank"
            foreground="error"
            className="mt-8"
          >
            Show me
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default SourceCode;
