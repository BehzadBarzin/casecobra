"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Phone from "./Phone";
import Image from "next/image";

// =============================================================================
// Helpers

// Showcase Phone Case Photos
const PHONES = [
  "/showcases/1.jpg",
  "/showcases/2.jpg",
  "/showcases/3.jpg",
  "/showcases/4.jpg",
  "/showcases/5.jpg",
  "/showcases/6.jpg",
];

// Split an array into an array of arrays of length `numParts`.
function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
}

// =============================================================================
// Single Showcase Component

interface ShowcaseProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

function Showcase({ imgSrc, className, ...props }: ShowcaseProps) {
  // ---------------------------------------------------------------------------
  // All possible animation delays
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];
  // ---------------------------------------------------------------------------
  // Choose a random animation delay
  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];
  // ---------------------------------------------------------------------------
  return (
    <div
      className={cn(
        "animate-fade-in flex items-center justify-center opacity-0",
        className,
      )}
      style={{ animationDelay, animationDuration: "1s" }}
      {...props}
    >
      {/* Phone Card */}
      <div className="rounded-[2.25rem] bg-white p-6 shadow-xl shadow-slate-900/5">
        <Phone
          imageProps={{
            src: imgSrc,
            width: 256,
            height: 256,
            alt: "User Case",
          }}
        />
      </div>
    </div>
  );
}

// =============================================================================
// Showcase Column Component

function ShowcaseColumn({
  showcases,
  className,
  showcaseClassName,
  msPerPixel = 0,
}: {
  showcases: string[];
  className?: string;
  showcaseClassName?: (showcaseIndex: number) => string;
  msPerPixel?: number;
}) {
  // ---------------------------------------------------------------------------
  // Used to know when component is resized to set the height state
  const columnRef = useRef<HTMLDivElement | null>(null);
  // ---------------------------------------------------------------------------
  // Current height of the column
  const [columnHeight, setColumnHeight] = useState(0);
  // ---------------------------------------------------------------------------
  // Calculate how many milliseconds each column should take to move across the screen
  const duration = `${columnHeight * msPerPixel}ms`;
  console.log(duration);
  // ---------------------------------------------------------------------------
  // Execute on first render
  useEffect(() => {
    if (!columnRef.current) return;
    // Create an observer to detect when the element resizes
    const resizeObserver = new window.ResizeObserver(() => {
      // Set the height of the column
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });
    // Attach the observer to watch for resized on the column DOM element
    resizeObserver.observe(columnRef.current);
    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  // ---------------------------------------------------------------------------
  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {/* Concatenated showcases and map over them */}
      {showcases.concat(showcases).map((imgSrc, showcaseIndex) => (
        // Return Single Showcase Component (per showcase)
        <Showcase
          key={showcaseIndex}
          className={showcaseClassName?.(showcaseIndex % showcases.length)}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  );
}

// =============================================================================
// Showcases Grid Component

function ShowcaseGrid() {
  // ---------------------------------------------------------------------------
  // Used to know when component is in view
  const containerRef = useRef<HTMLDivElement | null>(null);
  // ---------------------------------------------------------------------------
  // Using a hook that allows us to know when the component is in view
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  // ---------------------------------------------------------------------------
  // Split Showcases into 3 columns

  // Split the PHONES to 3 arrays
  const columns = splitArray(PHONES, 3);

  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);
  // ---------------------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {/* If in view, render Showcase columns */}
      {isInView ? (
        <>
          {/* Column 1 */}
          {/* If we only have 1 column (on mobile) we'll show all Showcases (that's why the logic is complicated below) */}
          <ShowcaseColumn
            showcases={[...column1, ...column3.flat(), ...column2]}
            showcaseClassName={(showcaseIndex) =>
              cn({
                "md:hidden":
                  showcaseIndex >= column1.length + column3[0].length,
                "lg:hidden": showcaseIndex >= column1.length,
              })
            }
            msPerPixel={10}
          />
          {/* Column 2 */}
          <ShowcaseColumn
            showcases={[...column2, ...column3[1]]}
            className="hidden md:block"
            showcaseClassName={(showcaseIndex) =>
              showcaseIndex >= column2.length ? "lg:hidden" : ""
            }
            msPerPixel={15} // This column moves faster
          />
          {/* Column 3 */}
          <ShowcaseColumn
            showcases={column3.flat()}
            className="hidden md:block"
            msPerPixel={10}
          />
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
    </div>
  );
}

// =============================================================================
// Showcases Section Component

export default function Showcases() {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      {/* Arrow Graphic----------------------------------------------------- */}
      <Image
        aria-hidden="true"
        src="/what-people-are-buying.png"
        className="absolute -left-32 top-1/3 hidden select-none xl:block"
        width={150}
        height={150}
        alt="What People Are Buying"
      />
      {/* Showcases Grid------------------------------------------------------ */}
      <ShowcaseGrid />
    </MaxWidthWrapper>
  );
}
