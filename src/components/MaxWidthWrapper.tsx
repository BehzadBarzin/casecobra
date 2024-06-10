import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const MaxWidthWrapper: FC<IProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-xl px-2.5 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
