import React, { useState , useContext } from 'react'
import Container from '../../ui/container'
import { cn } from '../../../lib/utils'
import Button from '../../ui/button';
import MobileNavigation from '../MobileNavigation';
import useScrollThreshold from '../../../hooks/use-scroll-threshold';
import { PortfolioContext } from "../../../context/protfolioContext";

const GRACE_THRESHOLD = 12;

const Header = () => {
    const projectData = useContext(PortfolioContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isScrollThresholdPassed } = useScrollThreshold({ threshold: GRACE_THRESHOLD });

    const isBackgroundShown = isScrollThresholdPassed || isMobileMenuOpen;

    const links = [
      {
        label: "About",
        href: "/#about",
        enable: projectData?.website?.enable_section.about,
      },
      {
        label: "Work",
        href: "/#work",
        enable: projectData?.website?.enable_section.work,
      },
      {
        label: "Services",
        href: "/#services",
        enable: projectData?.website?.enable_section.services,
      },
    ];
    return (
      <header aria-label="Primary" className="fixed top-0 z-40 w-full">
        <Container>
          <div
            className={cn(
              "mt-4 rounded-full border-0.5 p-2 transition-colors duration-500",
              isBackgroundShown
                ? "border-neutrals-600 bg-neutrals-900/90 backdrop-blur-md supports-[backdrop-filter]:bg-neutrals-900/50"
                : "border-transparent bg-transparent"
            )}
          >
            <div className="grid grid-cols-3">
              <div className="flex items-center lg:hidden">
                <MobileNavigation.Toggle
                  isOpen={isMobileMenuOpen}
                  onIsOpenChange={setIsMobileMenuOpen}
                  isBackgroundShown={isBackgroundShown}
                />
              </div>
              <nav
                aria-label="Primary"
                className="ms-4 hidden items-center gap-x-6 lg:flex"
              >
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-astro-prefetch
                    // className="relative flex h-full items-center p-1 text-sm uppercase text-neutrals-50 after:absolute after:inset-x-0 after:bottom-[12.25%] after:h-px after:scale-x-0 after:bg-gradient-to-r after:from-transparent after:via-neutrals-200 after:to-transparent after:transition-transform hover:after:-scale-x-100 focus-visible:after:-scale-x-100"
                    className={cn("relative flex h-full items-center p-1 text-sm uppercase text-neutrals-50 after:absolute after:inset-x-0 after:bottom-[12.25%] after:h-px after:scale-x-0 after:bg-gradient-to-r after:from-transparent after:via-neutrals-200 after:to-transparent after:transition-transform hover:after:-scale-x-100 focus-visible:after:-scale-x-100", !link.enable && "hidden")}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center justify-center">
                <a
                  href="/"
                  title="Navigate home"
                  data-astro-prefetch
                  className="hover:animate-jiggle"
                >
                  <h1 className="h-3.5 md:h-4 lg:text-xl text-sm lg:font-extrabold font-semibold lg:mb-4 mb-7 ">
                    <span className="lg:font-black font-bold lg:text-2xl text-base ">
                      Himanshu
                    </span>{" "}
                    Kumar
                  </h1>
                </a>
              </div>
              <div className="flex items-center justify-end">
                <Button
                  as="a"
                  href="/#contact"
                  size="small"
                  isGhost
                  className="rounded-full"
                >
                  Hit me up
                </Button>
              </div>
            </div>
          </div>
        </Container>
        <MobileNavigation
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          links={links}
        />
        <MobileNavigation.Overlay
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </header>
    );
}

export default Header
