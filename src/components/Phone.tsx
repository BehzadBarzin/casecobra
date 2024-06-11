import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { FC, HTMLAttributes } from "react";

interface IProps {
  dark?: boolean;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  imageProps: ImageProps;
}

const Phone: FC<IProps> = ({ dark = false, containerProps, imageProps }) => {
  const {
    src,
    alt,
    width,
    height,
    className: imageClassName,
    ...otherImageProps
  } = imageProps;

  return (
    <div
      className={cn(
        "pointer-events-none relative z-50 overflow-hidden",
        containerProps?.className,
      )}
      {...containerProps}
    >
      {/* Phone Template Image */}
      <Image
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        className={"pointer-events-none z-50 select-none"}
        alt="Phone Template"
        width={width}
        height={height}
      />
      {/* Cover Image (shown behind Phone Template) */}
      <div className="absolute inset-0 -z-10">
        <Image
          className={cn("min-h-full object-cover", imageClassName)}
          src={src}
          alt={alt}
          width={width}
          height={height}
          {...otherImageProps}
        />
      </div>
    </div>
  );
};

export default Phone;
