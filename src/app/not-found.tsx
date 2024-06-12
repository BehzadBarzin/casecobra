import { CrossCircledIcon } from "@radix-ui/react-icons";
import React from "react";

const FUCK = () => {
  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <CrossCircledIcon className="h-10 w-10 text-red-500" />
        <h3 className="text-3xl font-semibold">404</h3>
        <p>You seem to be lost</p>
      </div>
    </div>
  );
};

export default FUCK;
