import React from "react";
import Section from "../../ui/section";
import Container from "../../ui/container";
import { Caption, Heading, Paragraph } from "../../ui/typography";
import ContactForm from "../../ContactForm";

const Contact = () => {
  return (
    <Section
      id="contact"
      aria-labelledby="contact-heading"
      hasBorderTop
      hasGlowEffect
      className="lg:after:hidden"
    >
      <Container>
        <div className="flex h-full w-full flex-col lg:relative lg:flex-row">
          <div className="basis-full self-start lg:sticky lg:top-24">
            <Caption id="contact-heading">Contact</Caption>
            <Heading>Got a problem to solve?</Heading>
            <Paragraph>
              Ready to bring your vision to life? Let's collaborate to craft
              your dream website, enhance your digital presence, or create
              captivating content. Reach out today to get started!
            </Paragraph>
          </div>
          <div className="mt-10 basis-full lg:ms-10 lg:mt-0 xl:ms-20">
            <ContactForm visible={true} />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;
