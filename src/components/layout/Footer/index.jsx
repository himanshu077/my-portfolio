import React from "react";
// import { useState } from 'react';
import Container from "../../ui/container";
// import Image from '../../ui/image';
// import Mark from "../../../assets/Images/logos/Mark.svg"
import Icons from "../../ui/icons";
import { useContext } from "react";
import { PortfolioContext } from "../../../context/protfolioContext";
import { cn } from "../../../lib/utils";

// const secondaryLinks = [
//   {
//     label: 'Imprint',
//     href: '/imprint',
//   },
// ];

// const socials = [
//   {
//     label: 'View GitHub profile',
//     href: siteConfig.links.github,
//     icon: Icons.GitHub,
//   },
//   {
//     label: 'View Instagram profile',
//     href: siteConfig.links.instagram,
//     icon: Icons.Facebook,
//   },
//   {
//     label: 'View LinkedIn profile',
//     href: siteConfig.links.linkedin,
//     icon: Icons.LinkedIn,
//   },
//   {
//     label: 'View Behance profile',
//     href: siteConfig.links.behance,
//     icon: Icons.UpWork,
//   },
//   {
//     label: 'Join Discord community',
//     href: siteConfig.links.discord,
//     icon: Icons.Discord,
//   },
// ];

function Footer() {
  const { portfolioData } = useContext(PortfolioContext);
  // const [currentYear] = useState(() => new Date().getFullYear());

  let socials = [
    {
      label: portfolioData.socials?.github?.label,
      href: portfolioData.socials?.github?.url,
      icon: Icons.GitHub,
    },
    {
      label: portfolioData.socials?.facebook?.label,
      href: portfolioData.socials?.facebook?.url,
      icon: Icons.Facebook,
    },
    {
      label: portfolioData.socials?.linkedin?.label,
      href: portfolioData.socials?.linkedin?.url,
      icon: Icons.LinkedIn,
    },
    {
      label: portfolioData.socials?.upwork?.label,
      href: portfolioData.socials?.upwork?.url,
      icon: Icons.UpWork,
    },
  ];

  const primaryLinks = [
    {
      label: "About",
      href: "/#about",
      enable: portfolioData?.website?.enable_section.about,
    },
    {
      label: "Work",
      href: "/#work",
      enable: portfolioData?.website?.enable_section.work,
    },
    {
      label: "Customer Stories",
      href: "/#stories",
      enable: portfolioData?.website?.enable_section.about,
    },
    {
      label: "Contact",
      href: "/#contact",
      enable: portfolioData?.website?.enable_section.contact,
    },
    {
      label: "Source code",
      href: "/#source-code",
      enable: portfolioData?.website?.enable_section.soucrCode,
    },
    {
      label: "Services",
      href: "/#services",
      enable: portfolioData?.website?.enable_section.service,
    },
    {
      label: "Blog",
      href: "/blog",
      enable: portfolioData?.website?.enable_section.blogs,
    },
  ];

  return (
    <footer
      aria-label="Primary"
      className="relative z-10 w-full border-t-0.5 border-neutrals-600  bg-neutrals-900 py-3"
    >
      <Container>
        {/* <div className="flex justify-center py-12">
          <a
            href="/"
            title="Navigate home"
            data-astro-prefetch
          >
            <Image
              src={Mark}
              alt="Lorem Ispum"
              className="h-16 w-16"
            />
          </a>
        </div> */}
        {/* <hr className="h-px border-0 bg-gradient-to-r from-transparent via-neutrals-600 to-transparent" /> */}
        <nav
          aria-label="Primary"
          className="flex flex-wrap justify-center gap-6 py-12"
        >
          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-astro-prefetch
              // className="text-sm uppercase text-neutrals-300 transition-colors hover:text-neutrals-50 focus-visible:text-neutrals-50"
              className={cn(
                "text-sm uppercase text-neutrals-300 transition-colors hover:text-neutrals-50 focus-visible:text-neutrals-50",
                !link.enable && "hidden"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <hr className="h-px border-0 bg-gradient-to-r from-transparent via-neutrals-600 to-transparent" />
        <div className="grid grid-cols-1 items-center justify-center gap-6 py-12 lg:grid-cols-3">
          <nav
            aria-label="Secondary"
            className="flex flex-wrap justify-center gap-6 lg:order-last lg:justify-end"
          >
            {/* {secondaryLinks.map((link) => (
              <a
                key={link.href}
                className="text-xs uppercase text-neutrals-300 transition-colors hover:text-neutrals-50 focus-visible:text-neutrals-50"
                href={link.href}
                data-astro-prefetch
              >
                {link.label}
              </a>
            ))} */}
          </nav>
          <ul
            aria-label="Socials"
            className="flex flex-wrap justify-center gap-2"
          >
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  title={label}
                  aria-label={label}
                  rel="noreferrer"
                  target="_blank"
                  className="text-neutrals-300 transition-colors hover:text-neutrals-50 focus-visible:text-neutrals-50"
                >
                  <Icon aria-hidden className="size-7" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex justify-center lg:order-first lg:justify-start">
            {/* <small className="text-xs text-neutrals-300">&copy; {currentYear} LOREM ISPUM</small> */}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
