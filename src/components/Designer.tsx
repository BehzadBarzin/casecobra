"use client";

import { cn, formatPrice } from "@/lib/utils";
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
import { Label } from "./ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

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
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }));
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {/* Map over colors */}
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        key={color.label}
                        value={color}
                        className={({ active, checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-transparent p-0.5 focus:outline-none focus:ring-0 active:outline-none active:ring-0",
                            {
                              [`border-${color.tw}`]: active || checked,
                            },
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            "h-8 w-8 rounded-full border border-black border-opacity-10",
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                {/* Model--------------------------------------------------- */}
                <div className="relative flex w-full flex-col gap-3">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {options.model.label}
                        <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            "flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100",
                            {
                              "bg-zinc-100":
                                model.label === options.model.label,
                            },
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }));
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              model.label === options.model.label
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* Material and Finishes----------------------------------- */}
                {/* Map over both 'materia'l and 'finish' */}
                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    // A radio group for either 'material' or 'finish'
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) => {
                        setOptions((prev) => ({
                          ...prev,
                          // name: 'material' | 'finish'
                          [name]: val,
                        }));
                      }}
                    >
                      {/* Label: 'Material' | 'Finish' */}
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>
                      {/* Options (of either 'material' or 'finish') */}
                      <div className="mt-3 space-y-4">
                        {selectableOptions.map((option) => (
                          <RadioGroup.Option
                            key={option.value}
                            value={option}
                            className={({ active, checked }) =>
                              cn(
                                "relative block cursor-pointer rounded-lg border-2 border-zinc-200 bg-white px-6 py-4 shadow-sm outline-none ring-0 focus:outline-none focus:ring-0 sm:flex sm:justify-between",
                                {
                                  "border-primary": active || checked,
                                },
                              )
                            }
                          >
                            <span className="flex items-center">
                              <span className="flex flex-col text-sm">
                                <RadioGroup.Label
                                  className="font-medium text-gray-900"
                                  as="span"
                                >
                                  {option.label}
                                </RadioGroup.Label>

                                {option.description ? (
                                  <RadioGroup.Description
                                    as="span"
                                    className="text-gray-500"
                                  >
                                    <span className="block sm:inline">
                                      {option.description}
                                    </span>
                                  </RadioGroup.Description>
                                ) : null}
                              </span>
                            </span>

                            <RadioGroup.Description
                              as="span"
                              className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                            >
                              {/* Display option's price */}
                              <span className="font-medium text-gray-900">
                                {formatPrice(option.price / 100)}
                              </span>
                            </RadioGroup.Description>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  ),
                )}
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
