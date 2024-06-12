"use client";

import { base64ToBlob, cn, formatPrice } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import NextImage from "next/image";
import React, { FC, useRef } from "react";
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
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { BASE_PRICE } from "@/config/products";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  saveConfig as _saveConfig,
  TSaveConfigArgs,
} from "@/app/configure/design/actions";
import { useEdgeStore } from "@/lib/edgestore";
import { uploadDone } from "@/app/api/edgestore/[...edgestore]/actions";

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
  // To show toast message
  const { toast } = useToast();
  // ---------------------------------------------------------------------------
  // To navigate
  const router = useRouter();
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Options State
  const [options, setOptions] = useState<TOptions>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Image Dimension State
  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });
  // Image Position State
  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Refs to keep track of the phone template and the canvas to crop the final image
  const phoneTemplateRef = useRef<HTMLDivElement>(null); // Phone Template
  const containerRef = useRef<HTMLDivElement>(null); // Container where user can configure the image inside
  // ---------------------------------------------------------------------------
  // Upload Logic
  const { edgestore, state } = useEdgeStore();

  async function startUpload(file: File, configId: string) {
    // Upload to edgeStore
    try {
      const res = await edgestore.publicFiles.upload({
        file,
      });

      // Call server action to handle uploaded file
      await uploadDone(res.url, configId);
    } catch (error) {
      toast({
        title: "Something went wrong while uploading.",
        variant: "destructive",
      });
    }
  }
  // ---------------------------------------------------------------------------
  // Save Image Configs
  async function saveImageConfiguration() {
    try {
      // -----------------------------------------------------------------------
      // Get the current position and size of the phone template
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneTemplateRef.current!.getBoundingClientRect();
      // -----------------------------------------------------------------------
      // Get the current position of the container
      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();
      // -----------------------------------------------------------------------
      // Crop Image
      // Create a canvas, draw the user image and crop the final image
      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      // Todo: TEMP: Canvas doesn't set the background to transparent so we match it with the color of the case
      ctx!.fillStyle = options.color.rgb;
      ctx?.fillRect(0, 0, canvas.width, canvas.height);

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height,
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      // Start Cropped Image Upload
      // Sending config id so that the server knows that the image belongs to a certain config
      await startUpload(file, configId);
      // -----------------------------------------------------------------------
    } catch (err) {
      toast({
        title: "Something went wrong",
        description:
          "There was a problem saving your config, please try again.",
        variant: "destructive",
      });
    }
  }
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // React Query to save configs
  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: TSaveConfigArgs) => {
      // Simultaneously save the image and the config (using server action)
      await Promise.all([saveImageConfiguration(), _saveConfig(args)]);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    <div className="relative mb-20 mt-20 grid grid-cols-1 pb-20 lg:grid-cols-3">
      {/* Configure Image--------------------------------------------------- */}
      <div
        ref={containerRef}
        className="relative col-span-2 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {/* Phone Template */}
        <div className="pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50">
          <AspectRatio
            ref={phoneTemplateRef}
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
            x: renderedPosition.x,
            y: renderedPosition.y,
            height: renderedDimension.height,
            width: renderedDimension.width,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            // Update image dimensions
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)), // 'ref.style.height' for example: "100px" so we slice it to get "100"
              width: parseInt(ref.style.width.slice(0, -2)), // 'ref.style.width' for example: "100px" so we slice it to get "100"
            });
            // Update image position
            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            // Update image position
            const { x, y } = data;
            setRenderedPosition({ x, y });
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
        <div className="h-16 w-full bg-white px-8">
          {/* Divider------------------------------------------------------- */}
          <div className="h-px w-full bg-zinc-200" />
          {/* -------------------------------------------------------------- */}
          <div className="flex h-full w-full items-center justify-end">
            <div className="flex w-full items-center gap-6">
              {/* Price----------------------------------------------------- */}
              <p className="whitespace-nowrap font-medium">
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                    100,
                )}
              </p>
              {/* Button---------------------------------------------------- */}
              <Button
                size="sm"
                className="w-full"
                disabled={isPending}
                onClick={() => {
                  // Use React Query mutation to save the configs
                  saveConfig({
                    configId,
                    color: options.color.value,
                    finish: options.finish.value,
                    material: options.material.value,
                    model: options.model.value,
                  });
                }}
              >
                Continue
                <ArrowRightIcon className="ml-1.5 inline h-4 w-4" />
              </Button>
              {/* ---------------------------------------------------------- */}
            </div>
          </div>
        </div>
        {/* ---------------------------------------------------------------- */}
      </div>
      {/* ------------------------------------------------------------------ */}
    </div>
  );
};

export default Designer;
