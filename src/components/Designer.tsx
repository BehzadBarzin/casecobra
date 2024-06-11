"use client";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import NextImage from "next/image";
import React, { FC } from "react";
import { Rnd } from "react-rnd";
import HandleComponent from "./HandleComponent";

interface IProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

const Designer: FC<IProps> = ({ configId, imageUrl, imageDimensions }) => {
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    <div className="relative mb-20 mt-20 grid grid-cols-1 pb-20 lg:grid-cols-3">
      {/* Configure Image--------------------------------------------------- */}
      <div className="relative col-span-2 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        {/* Phone Template */}
        <div className="pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50">
          <AspectRatio
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <NextImage
              fill
              alt="phone template image"
              src="/phone-template.png"
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          {/* -------------------------------------------------------------- */}
          {/* Gray-out areas that are not in the case (basically grays around the phone template image) */}
          <div className="absolute inset-0 bottom-px left-[3px] right-[3px] top-px z-40 rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          {/* -------------------------------------------------------------- */}
          {/* Case Color preview */}
          {/* Basically colors the inside of our phone template image */}
          <div
            className={cn(
              "absolute inset-0 bottom-px left-[3px] right-[3px] top-px rounded-[32px]",
              `bg-red-500`, // This value will depend on user's choice
            )}
          />
          {/* -------------------------------------------------------------- */}
        </div>
        {/* User's Image---------------------------------------------------- */}
        {/* RND to enable the user to drag the image around */}
        <Rnd
          default={{
            x: 150,
            y: 205,
            height: imageDimensions.height / 4,
            width: imageDimensions.width / 4,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            // Update image
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;

            // Update image
          }}
          className="absolute z-20 border-[3px] border-dashed border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          {/* Image */}
          <div className="relative h-full w-full">
            <NextImage
              src={imageUrl}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
        {/* ---------------------------------------------------------------- */}
      </div>
      {/* ------------------------------------------------------------------ */}
      {/* Configure the Case------------------------------------------------ */}
      <div></div>
      {/* ------------------------------------------------------------------ */}
    </div>
  );
};

export default Designer;
