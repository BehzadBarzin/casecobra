"use client";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import NextImage from "next/image";
import React, { FC } from "react";
import { Rnd } from "react-rnd";
import HandleComponent from "./HandleComponent";
import { ScrollArea } from "./ui/scroll-area";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validator";

type TOptions = {
  color: (typeof COLORS)[number];
  model: (typeof MODELS.options)[number];
  material: (typeof MATERIALS.options)[number];
  finish: (typeof FINISHES.options)[number];
};

interface IProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

const Designer: FC<IProps> = ({ configId, imageUrl, imageDimensions }) => {
  // ---------------------------------------------------------------------------
  // Options State
  const [options, setOptions] = useState<TOptions>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });
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
              `bg-${options.color.tw}`, // This value will depend on user's choice
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
      <div className="col-span-full flex h-[37.5rem] w-full flex-col bg-white lg:col-span-1">
        <ScrollArea className="relative flex-1 overflow-auto">
          {/* Bottom Gradient----------------------------------------------- */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white"
          />
          {/* Config Options------------------------------------------------ */}
          <div className="px-8 pb-12 pt-8">
            {/* Title------------------------------------------------------- */}
            <h2 className="text-3xl font-bold tracking-tight">
              Customize your case
            </h2>
            {/* Separator--------------------------------------------------- */}
            <div className="my-6 h-px w-full bg-zinc-200" />
            {/* ------------------------------------------------------------ */}
            <div className="relative mt-4 flex h-full flex-col justify-between">
              <div className="flex flex-col gap-6">
                {/* Color--------------------------------------------------- */}

                {/* Model--------------------------------------------------- */}
                {/* Material------------------------------------------------ */}
                {/* -------------------------------------------------------- */}
              </div>
            </div>
            {/* ------------------------------------------------------------ */}
          </div>
        </ScrollArea>
        {/* Price + Submit-------------------------------------------------- */}
        <div className="h-16 w-full bg-white px-8"></div>
        {/* ---------------------------------------------------------------- */}
      </div>
      {/* ------------------------------------------------------------------ */}
    </div>
  );
};

export default Designer;
