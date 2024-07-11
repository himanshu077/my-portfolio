import { cn } from "../../lib/utils";

export const Caption = ({ children, className, ...props }) => {
    return (
        <h2
            className={cn(
                '!relative !mb-4 !inline-block !overflow-hidden !text-pretty !rounded-full !border-0.5 !border-primary/30 !bg-primary/10 !px-4 !py-1 !font-medium !uppercase !text-primary !backdrop-blur-sm after:!absolute after:!inset-0 after:!animate-shiny-badge-slide after:!bg-primary/10 max-md:!text-sm',
                className,
            )}
            {...props}
        >
            {children}
        </h2>
    )
}

export const Paragraph = ({ children, className, ...props }) => {
    return (
        <p
            className={cn('!max-w-prose !text-base/relaxed !text-neutrals-300', className)}
            {...props}
        >
            {children}
        </p>
    )
}

export const Heading = ({ children, className, ...props }) => {
    return (
        <p
            className={cn('!mb-4 !text-balance !text-3xl/tight !font-bold !text-neutrals-50 md:!text-5xl/tight', className)}
            {...props}
        >
            {children}
        </p>
    )
}
