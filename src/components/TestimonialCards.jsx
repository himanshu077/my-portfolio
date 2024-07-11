import React from "react"
import Image from "./ui/image"
import { defaultAvatarImage } from "../lib/utils"


const TestimonialCards = ({testimonial}) => {
    return (

<li
  className="relative me-8 h-full w-[32rem] max-w-[80vw] flex-[0_0_auto] rounded-lg border border-neutrals-200/20 bg-radial-highlight p-4 md:p-8"
>
  <article className="flex h-full flex-col justify-between gap-y-2">
    <blockquote className="max-w-prose text-sm/relaxed text-neutrals-200 lg:text-base/relaxed">
      &quot;{testimonial.quote}&quot;
    </blockquote>
    <div className="mt-6 flex items-center">
      <div className="me-3 flex">
        <div
          className="bg-shiny-frame h-10 w-10 overflow-hidden rounded-full border border-transparent"
        >
          <Image
            alt={testimonial.name}
            className="h-full w-full"
            
            src={testimonial.avatar || defaultAvatarImage}
          />
        </div>
      </div>
      <div>
        <cite>
          <h3 className="lg:text-md mb-0.5 not-italic">{testimonial.name}</h3>
        </cite>
        <p className="text-xs text-neutrals-200 lg:text-sm">{testimonial.designation}</p>
      </div>
    </div>
  </article>
</li>
    )
}

export default TestimonialCards