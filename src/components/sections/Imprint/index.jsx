import React from 'react';
import Section from '../../ui/section';
import Container from '../../ui/container';
import { Heading, Paragraph } from '../../ui/typography';
import siteConfig from '../../../config/site';

const Imprint = () => {
    return (
        <Section aria-labelledby="imprint-heading">
            <Container>
                <div className="max-w-prose md:mx-auto">
                    <h1
                        id="imprint-heading"
                        className="!mb-8 !text-balance !text-5xl/tight !font-bold md:!text-7xl/tight"
                    >
                        Imprint
                    </h1>
                    <address className="grid gap-y-16 not-italic">
                        <div>
                            <Heading>Details</Heading>
                            <Paragraph>
                                <span className="text-neutrals-100">LOREM ISPUM OÜ</span><br />
                                Lõrem 2a<br />
                                LOrem Ispum, India<br /><br />
                                CEO: Lorem Ispum
                            </Paragraph>
                        </div>
                        <div>
                            <Heading>Contact</Heading>
                            <Paragraph>
                                E-Mail: 
                                <a
                                    href={`mailto:${siteConfig.email}`}
                                    title="Hit me up"
                                    className="border-b border-current text-neutrals-100 transition-colors hover:text-primary"
                                >
                                    {siteConfig.email}
                                </a><br />
                                Phone number is given out on request.
                            </Paragraph>
                        </div>
                    </address>
                </div>
            </Container>
        </Section>
    )
}

export default Imprint;
