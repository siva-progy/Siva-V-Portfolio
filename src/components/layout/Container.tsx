import { cn } from "@/lib/utils";

type ContainerWidth = "prose" | "content" | "wide" | "full";

const widthClass: Record<ContainerWidth, string> = {
  prose: "max-w-[720px]",
  content: "max-w-[1080px]",
  wide: "max-w-[1280px]",
  full: "max-w-[1536px]",
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
  as?: React.ElementType;
}

/**
 * Centered content container with the symmetric page padding
 * defined in the design system: clamp(1.25rem, 5vw, 4rem).
 */
export function Container({
  width = "wide",
  as: Tag = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-[clamp(1.25rem,5vw,4rem)]",
        widthClass[width],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
