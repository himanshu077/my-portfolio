import React, {useContext} from 'react'
import Container from '../../ui/container'
import { cn, formatDateWithDay } from '../../../lib/utils'
import { Caption } from '../../ui/typography'
import SanityImage from '../../ui/sanity-image'
import { PortfolioContext } from '../../../context/protfolioContext'
import { blogPosts } from './Data'
const Blog = () => {
    const projectData = useContext(PortfolioContext);
    console.log(projectData, "data in blog")
    return (
      <section
        id="blog"
        aria-labelledby="blog-heading"
        className={cn(
          "relative z-10 w-full bg-neutrals-900 py-32 flex flex-col items-center justify-center min-h-screen",
          "after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:mx-auto after:h-full after:w-full after:max-w-7xl after:bg-[radial-gradient(40.23%_36.93%_at_50%_0%,rgba(105,25,255,0.04)_0%,rgba(105,25,255,0)_100%,rgba(105,25,255,0)_100%),radial-gradient(32.98%_20.96%_at_50%_32.36%,rgba(105,25,255,0.08)_0%,rgba(105,25,255,0)_100%)]"
        )}
      >
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="relative sm:ms-[calc(2rem+1px)] md:ms-[calc(3.5rem+1px)] lg:ms-[max(calc(14.5rem+1px),calc(100%-48rem))]">
              <Caption id="blog-heading">Blog</Caption>
              <h1 className="mb-4 text-balance text-3xl/tight font-bold text-neutrals-50 md:text-5xl/tight">
                Daiy Blogs
              </h1>
              <p className="mb-11 max-w-prose text-base/relaxed text-neutrals-300 lg:mb-14">
                Welcome to my portfolio blog! Explore my latest thoughts,
                projects, and experiences in tech and beyond. From coding
                tutorials to design insights, I share valuable content to
                inspire and inform. Dive in and discover what's new!
              </p>
            </div>
            <div className="relative sm:ms-[calc(2rem+1px)] md:ms-[calc(3.5rem+1px)] lg:ms-[max(calc(14.5rem+1px),calc(100%-48rem))]">
              <div className="absolute bottom-0 end-full top-3 me-7 hidden w-[0.5px] bg-neutrals-700 sm:block md:me-[3.25rem]"></div>
              <div className="flex flex-col gap-y-12">
                {projectData?.blogPosts?.map((blogPost, i) => (
                  <article className="!relative">
                    <a
                      href={`/blog/${blogPost.slug.current}`}
                      aria-label={`Show ${blogPost.title} blog post`}
                      className="group !flex !items-center"
                    >
                      <div
                        className={cn(
                          "pointer-events-none absolute end-full top-2 me-6 h-[calc(100%-0.5rem)] md:me-12",
                          i === blogPosts.length - 1 &&
                            "via-neutrals-transparent bg-gradient-to-t from-neutrals-900 via-transparent to-transparent"
                        )}
                      >
                        <div className="pointer-events-auto h-2.5 w-2.5 rounded-full border-[1.5px] border-neutrals-400 bg-neutrals-900 lg:sticky lg:top-[100px]" />
                      </div>
                      <div className="relative">
                        <div className="mb-8 mt-10 w-full overflow-hidden rounded-md border-0.5 border-neutrals-50/40 lg:mt-0">
                          <SanityImage
                            src={blogPost.poster}
                            alt="Lorem"
                            maxWidth={1024}
                            className="w-full"
                          />
                        </div>
                        <h2 className="mb-4 text-balance text-xl/tight font-bold text-neutrals-50 md:text-3xl/tight">
                          {blogPost.title}
                        </h2>
                        <p className="text-pretty text-sm/relaxed text-neutrals-300 md:text-base/relaxed">
                          {blogPost.excerpt}
                        </p>
                        <p className="pointer-events-none absolute top-0 h-full max-lg:start-0 lg:end-full lg:me-[calc(6.5rem+1px)]">
                          <time
                            dateTime="2023-08-07T10:30:00.000Z"
                            className="pointer-events-auto whitespace-nowrap text-sm/none text-neutrals-300 lg:sticky lg:top-24"
                          >
                            {formatDateWithDay(blogPost.date)}
                          </time>
                        </p>
                      </div>
                      <div className="absolute -inset-3 -z-10 rounded-md transition-colors group-hover:bg-neutrals-800/40 md:-inset-6" />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
}

export default Blog
