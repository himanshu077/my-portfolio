import React from 'react'
import pageNotFoundImage from "../../../assets/Images/PageNotFound.svg"
import Section from '../../ui/section'
import Container from '../../ui/container'
import { Caption, Heading, Paragraph } from '../../ui/typography'
import Icons from '../../ui/icons'
import Image from '../../ui/image'

const NotFound = () => {
    return (
        <Section aria-labelledby="page-not-found-heading">
            <Container>
                <div class="relative z-10 flex flex-col items-center text-center">
                    <div
                        aria-hidden="true"
                        class="relative select-none text-[12rem] font-bold text-neutrals-50 before:absolute before:inset-0 before:start-0.5 before:animate-glitch-1 before:bg-neutrals-900 before:content-['404'] before:[clip:rect(85px,550px,140px,0)] after:absolute after:inset-0 after:-start-0.5 after:animate-glitch-2 after:bg-neutrals-900 after:content-['404'] after:[clip:rect(24px,550px,90px,0)] before:motion-reduce:animate-none after:motion-reduce:animate-none lg:text-[16rem]"
                    >
                        404
                    </div>
                    <Caption id="page-not-found-heading">Page not found</Caption>
                    <Heading>Whoops! Nothing here</Heading>
                    <Paragraph>Let&apos;s rewind in time and get you...</Paragraph>
                    <a
                        href="/"
                        class="group mt-3 flex -translate-x-3 items-center text-lg text-neutrals-50 transition-all duration-300 hover:translate-x-0 hover:text-primary focus-visible:translate-x-0 focus-visible:text-primary"
                    >
                        <Icons.ChevronRight
                            aria-hidden="true"
                            className="me-1 size-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                        />
                        <span
                            class="border-b-[0.5px] border-b-neutrals-50 group-hover:border-transparent group-focus-visible:border-transparent"
                        >
                            back home
                        </span>
                    </a>
                </div>
                <Image
                    src={pageNotFoundImage}
                    alt=""
                    aria-hidden="true"
                    class="absolute inset-0 top-1/2 w-full -translate-y-1/2 select-none opacity-40"
                />
            </Container>
        </Section>
    )
}

export default NotFound
