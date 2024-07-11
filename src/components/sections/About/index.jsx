import React, { useContext } from 'react';
import AboutImage from "../../../assets/Images/about-img.png"
import { Caption, Paragraph } from '../../ui/typography';
import TypingHeading from '../../TypingHeading';
import Image from '../../ui/image';
import { PortfolioContext } from '../../../context/protfolioContext';

const About = () => {
    const portfolioData = useContext(PortfolioContext);
    const aboutData = portfolioData && portfolioData.website;

    return (
        <section
            id="about"
            aria-labelledby='about-heading'
            className="relative z-10 w-full bg-neutrals-900"
        >
            <div className="relative flex min-h-screen w-full items-center max-lg:flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,min(91.666667%/2,40rem))_minmax(0,min(91.666667%/2,40rem))_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,min(80%/2,40rem))_minmax(0,min(80%/2,40rem))_minmax(0,1fr)]">
                <div className='absolute lg:w-[28vw] lg:h-[66vh] md:w-[60vw] md:h[60vh] mt-10 w-[70vw] h-[80vw] bg-[#6919FF] mb-96 lg:mb-0 lg:ml-24 rounded-xl z-10 rotate-[-1.55deg]'></div>
                <Image
                    src={AboutImage}
                    alt="about image"
                    className="max-h-screen lg:w-[30vw] lg:h-[66vh] md:w-[60vw] md:h[60vh] w-[70vw] h-[80vw] rounded-xl lg:ml-48 md:ml-24 ml-[12vw] rotate-[6.52deg] xl:mt-48 mt-24 bg-neutrals-800 object-cover object-center lg:col-start-1 lg:col-end-3 z-20"
                />
                <div className="w-full py-28 max-lg:mx-auto max-lg:w-11/12 max-lg:max-w-7xl lg:ps-10 xl:ps-20">
                    <Caption id="about-heading">About</Caption>
                    <TypingHeading
                        visible="client"
                        headings={aboutData ? aboutData.landing_page.about.heading : []}
                    />
                    <Paragraph>
                        {aboutData ? aboutData.landing_page.about.description : ""}
                    </Paragraph>
                </div>
            </div>
        </section >
    )
}

export default About;
