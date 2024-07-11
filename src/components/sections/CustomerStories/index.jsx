import React, { useContext } from "react";
import Section from "../../ui/section";
import Container from "../../ui/container";
import { Caption, Heading, Paragraph } from "../../ui/typography";
import TestimonialCards from "../../TestimonialCards";
import StarsBackground from "../../StarsBackground";
import { PortfolioContext } from "../../../context/protfolioContext";

const CustomerStories = () => {
    const portfolioData = useContext(PortfolioContext);
    const customerStoriesData = portfolioData && portfolioData.testimonials ? portfolioData.testimonials.filter(testimonial => testimonial.enabled) : [];

    return (
        <Section
            id="stories"
            aria-labelledby="stories-heading"
            hasBorderTop
            hasGlowEffect
        >
            <StarsBackground visible="client" />
            <Container>
                <div className="!mb-16 !flex !flex-col !items-center !text-center">
                    <Caption id="stories-heading">Customer Stories</Caption>
                    <Heading> Trusted by the kindest clients </Heading>
                    <Paragraph>
                        Here&apos;s a glimpse into the heartfelt experiences of my incredible clients.<br />
                        Your trust fuels my passion.
                    </Paragraph>
                </div>
            </Container>
            <div className="mask-inline-faded group !flex !w-full overflow-x-hidden">
                <ul className="group-hover:play-state-paused motion-reduce:play-state-paused !flex animate-marquee">
                    {customerStoriesData.map(testimonial => (
                        <TestimonialCards key={testimonial.id} testimonial={testimonial}/>
                    ))}
                </ul>
                <ul
                    aria-hidden="true"
                    className="group-hover:play-state-paused motion-reduce:play-state-paused !flex animate-marquee"
                >
                    {customerStoriesData.map(testimonial => (
                        <TestimonialCards key={testimonial.id} testimonial={testimonial} />
                    ))}
                </ul>
            </div>
        </Section>
    );
};

export default CustomerStories;
