import ServiceCard from "../components/ServiceCard";
import { motion, useMotionValue } from "framer-motion";
import React from "react";

function ServiceGrid({ services }) {
  console.log(services, "services");
  const mousePositionX = useMotionValue(0);
  const mousePositionY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY }) {
    mousePositionX.set(clientX);
    mousePositionY.set(clientY);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group grid gap-6 lg:grid-cols-5"
    >
      {/** web application development */}
      <ServiceCard
        parentMousePositionX={mousePositionX}
        parentMousePositionY={mousePositionY}
        className="lg:col-span-2"
      >
        <div>
          <ServiceCard.Title>
            {services.webApplicationDevelopment.serviceTitle}
          </ServiceCard.Title>
          <ServiceCard.Price>
            {services.webApplicationDevelopment.servicePrice}
          </ServiceCard.Price>
          <ServiceCard.Description>
            {services.webApplicationDevelopment.serviceDescription}
          </ServiceCard.Description>
          <ServiceCard.List>
            {services.webApplicationDevelopment.serviceBenefits.map(
              (benifits, index) => {
                return (
                  <ServiceCard.List.BenefitListItem key={index}>
                    {benifits}
                  </ServiceCard.List.BenefitListItem>
                );
              }
            )}
            {services.webApplicationDevelopment.addons.map((addOn, index) => {
              return (
                <ServiceCard.List.AddonListItem key={index}>
                  {addOn.name}
                </ServiceCard.List.AddonListItem>
              );
            })}
          </ServiceCard.List>
        </div>
        <ServiceCard.CallToAction />
      </ServiceCard>
      {/** website development  */}
      <ServiceCard
        parentMousePositionX={mousePositionX}
        parentMousePositionY={mousePositionY}
        className="lg:col-span-3"
      >
        <div>
          <ServiceCard.Title>
            {services.webSiteDevelopment.serviceTitle}
          </ServiceCard.Title>
          <ServiceCard.Price>
            $ {services.webSiteDevelopment.servicePrice}
            <span className="text-xl font-normal">*</span>
          </ServiceCard.Price>
          <ServiceCard.Description>
            {services.webSiteDevelopment.serviceDescription}
          </ServiceCard.Description>
          <ServiceCard.List>
            {services.webSiteDevelopment.serviceBenefits.map(
              (benifits, index) => {
                return (
                  <ServiceCard.List.BenefitListItem key={index}>
                    {benifits}
                  </ServiceCard.List.BenefitListItem>
                );
              }
            )}
            {services.webSiteDevelopment.addons.map((addOn, index) => {
              return (
                <ServiceCard.List.AddonListItem key={index}>
                  {addOn.name}
                  <span className="text-neutrals-400">|</span> ${addOn.price}
                </ServiceCard.List.AddonListItem>
              );
            })}
          </ServiceCard.List>
        </div>
        <ServiceCard.Notice>
          * {services.webSiteDevelopment.notice}
        </ServiceCard.Notice>
        <ServiceCard.CallToAction />
      </ServiceCard>

      {/** shopify */}
      <ServiceCard
        parentMousePositionX={mousePositionX}
        parentMousePositionY={mousePositionY}
        className="lg:col-span-3"
      >
        <div>
          <ServiceCard.Title>{services.shopify.serviceTitle}</ServiceCard.Title>
          <ServiceCard.Price>
            ${services.shopify.servicePrice}
            <span className="text-xl font-normal">*</span>
          </ServiceCard.Price>
          <ServiceCard.Description>
            {services.shopify.serviceDescription}
          </ServiceCard.Description>
          <ServiceCard.List>
            {services.shopify.serviceBenefits.map((benifits, index) => {
              return (
                <ServiceCard.List.BenefitListItem key={index}>
                  {benifits}
                </ServiceCard.List.BenefitListItem>
              );
            })}

            {services.shopify.addons.map((addOn, index) => {
              return (
                <ServiceCard.List.AddonListItem key={index}>
                  {addOn.name}
                  <span className="text-neutrals-400">|</span> ${addOn.price}
                </ServiceCard.List.AddonListItem>
              );
            })}
          </ServiceCard.List>
          <ServiceCard.Notice>* {services.shopify.notice}</ServiceCard.Notice>
        </div>
        <ServiceCard.CallToAction />
        <svg
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          strokeWidth={0.05}
          aria-hidden
          className="pointer-events-none absolute end-0 top-1/2 h-64 w-64 -translate-y-1/2 max-md:start-1/2 max-md:-translate-x-1/2 max-md:opacity-80 md:h-72 md:w-72"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g transform="matrix(0.960994,0,0,0.960994,1.24809,1.24819)">
            <motion.path
              d="M60.113,59.74C60.113,59.703 53.173,12.843 53.137,12.485L53.137,12.484C53.09,12.201 52.859,11.984 52.573,11.957C52.348,11.92 47.403,11.581 47.403,11.581L43.633,7.811C43.293,7.435 42.541,7.545 42.257,7.623C42.22,7.623 41.505,7.848 40.335,8.228C39.198,4.938 37.185,1.922 33.639,1.922L33.336,1.922C32.32,0.605 31.076,0 30.026,0C21.77,0.037 17.836,10.333 16.592,15.594L10.822,17.364C9.052,17.928 8.987,17.969 8.749,19.657L3.882,57.175L40.35,64L60.113,59.74M33.631,22.887L33.64,22.89L31.186,30.132C29.703,29.414 28.082,29.028 26.434,28.999C22.586,28.999 22.398,31.411 22.398,32.017C22.398,35.315 31.034,36.581 31.034,44.35C31.034,50.46 27.149,54.38 21.934,54.38C15.674,54.38 12.467,50.495 12.467,50.495L14.132,44.945C14.132,44.945 17.412,47.775 20.205,47.775C20.236,47.776 20.268,47.777 20.299,47.777C21.654,47.777 22.769,46.662 22.769,45.307C22.769,45.3 22.769,45.292 22.769,45.285C22.769,40.945 15.679,40.758 15.679,33.667C15.679,27.705 19.977,21.897 28.613,21.897C32.007,21.947 33.631,22.887 33.631,22.887M29.795,2.269C30.172,2.277 30.539,2.395 30.85,2.608C28.19,3.846 25.378,6.974 24.172,13.235L19.127,14.781C20.55,10.03 23.87,2.26 29.792,2.26L29.795,2.269ZM32.245,4.562C32.848,6.34 33.128,8.212 33.071,10.089L33.071,10.429L26.696,12.392C27.944,7.732 30.246,5.43 32.245,4.562L32.245,4.562L32.246,4.562L32.245,4.562ZM38.313,8.86C37.396,9.163 36.35,9.465 35.223,9.805L35.223,9.125C35.256,7.428 35.002,5.738 34.471,4.126C36.319,4.41 37.561,6.483 38.314,8.859L38.313,8.86Z"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 8,
                repeatDelay: 1,
              }}
              filter="url(#glow)"
              className="fill-none stroke-success"
            />
            <path
              d="M60.113,59.74C60.113,59.703 53.173,12.843 53.137,12.485L53.137,12.484C53.09,12.201 52.859,11.984 52.573,11.957C52.348,11.92 47.403,11.581 47.403,11.581L43.633,7.811C43.293,7.435 42.541,7.545 42.257,7.623C42.22,7.623 41.505,7.848 40.335,8.228C39.198,4.938 37.185,1.922 33.639,1.922L33.336,1.922C32.32,0.605 31.076,0 30.026,0C21.77,0.037 17.836,10.333 16.592,15.594L10.822,17.364C9.052,17.928 8.987,17.969 8.749,19.657L3.882,57.175L40.35,64L60.113,59.74M33.631,22.887L33.64,22.89L31.186,30.132C29.703,29.414 28.082,29.028 26.434,28.999C22.586,28.999 22.398,31.411 22.398,32.017C22.398,35.315 31.034,36.581 31.034,44.35C31.034,50.46 27.149,54.38 21.934,54.38C15.674,54.38 12.467,50.495 12.467,50.495L14.132,44.945C14.132,44.945 17.412,47.775 20.205,47.775C20.236,47.776 20.268,47.777 20.299,47.777C21.654,47.777 22.769,46.662 22.769,45.307C22.769,45.3 22.769,45.292 22.769,45.285C22.769,40.945 15.679,40.758 15.679,33.667C15.679,27.705 19.977,21.897 28.613,21.897C32.007,21.947 33.631,22.887 33.631,22.887M29.795,2.269C30.172,2.277 30.539,2.395 30.85,2.608C28.19,3.846 25.378,6.974 24.172,13.235L19.127,14.781C20.55,10.03 23.87,2.26 29.792,2.26L29.795,2.269ZM32.245,4.562C32.848,6.34 33.128,8.212 33.071,10.089L33.071,10.429L26.696,12.392C27.944,7.732 30.246,5.43 32.245,4.562L32.245,4.562L32.246,4.562L32.245,4.562ZM38.313,8.86C37.396,9.163 36.35,9.465 35.223,9.805L35.223,9.125C35.256,7.428 35.002,5.738 34.471,4.126C36.319,4.41 37.561,6.483 38.314,8.859L38.313,8.86Z"
              className="fill-transparent stroke-neutrals-300"
            />
            <motion.path
              d="M60.113,59.74C60.113,59.703 53.173,12.843 53.137,12.485L53.137,12.484C53.09,12.201 52.859,11.984 52.573,11.957C52.348,11.92 47.403,11.581 47.403,11.581L43.633,7.811C43.293,7.435 42.541,7.545 42.257,7.623C42.22,7.623 41.505,7.848 40.335,8.228C39.198,4.938 37.185,1.922 33.639,1.922L33.336,1.922C32.32,0.605 31.076,0 30.026,0C21.77,0.037 17.836,10.333 16.592,15.594L10.822,17.364C9.052,17.928 8.987,17.969 8.749,19.657L3.882,57.175L40.35,64L60.113,59.74M33.631,22.887L33.64,22.89L31.186,30.132C29.703,29.414 28.082,29.028 26.434,28.999C22.586,28.999 22.398,31.411 22.398,32.017C22.398,35.315 31.034,36.581 31.034,44.35C31.034,50.46 27.149,54.38 21.934,54.38C15.674,54.38 12.467,50.495 12.467,50.495L14.132,44.945C14.132,44.945 17.412,47.775 20.205,47.775C20.236,47.776 20.268,47.777 20.299,47.777C21.654,47.777 22.769,46.662 22.769,45.307C22.769,45.3 22.769,45.292 22.769,45.285C22.769,40.945 15.679,40.758 15.679,33.667C15.679,27.705 19.977,21.897 28.613,21.897C32.007,21.947 33.631,22.887 33.631,22.887M29.795,2.269C30.172,2.277 30.539,2.395 30.85,2.608C28.19,3.846 25.378,6.974 24.172,13.235L19.127,14.781C20.55,10.03 23.87,2.26 29.792,2.26L29.795,2.269ZM32.245,4.562C32.848,6.34 33.128,8.212 33.071,10.089L33.071,10.429L26.696,12.392C27.944,7.732 30.246,5.43 32.245,4.562L32.245,4.562L32.246,4.562L32.245,4.562ZM38.313,8.86C37.396,9.163 36.35,9.465 35.223,9.805L35.223,9.125C35.256,7.428 35.002,5.738 34.471,4.126C36.319,4.41 37.561,6.483 38.314,8.859L38.313,8.86Z"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 5,
                duration: 4,
                delay: 1.5,
              }}
              filter="url(#glow)"
              className="fill-success/5 stroke-transparent"
            />
          </g>
        </svg>
      </ServiceCard>

      {/** custom */}
      <ServiceCard
        parentMousePositionX={mousePositionX}
        parentMousePositionY={mousePositionY}
        className="lg:col-span-2"
      >
        <div>
          <ServiceCard.Title>{services.custom.serviceTitle}</ServiceCard.Title>
          <ServiceCard.Price>{services.custom.servicePrice}</ServiceCard.Price>
          <ServiceCard.Description>
            {services.custom.serviceDescription}
            <br />
            <br />
          </ServiceCard.Description>
        </div>
        <ServiceCard.CallToAction />
      </ServiceCard>
    </div>
  );
}

export default ServiceGrid;
