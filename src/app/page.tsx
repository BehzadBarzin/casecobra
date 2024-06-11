import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import Reviews from "@/components/Reviews";
import { homeFeatures, homeUserAvatars } from "@/constants";
import { CheckIcon, StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-slate-50">
      {/* Top Section------------------------------------------------------- */}
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-24 xl:gap-x-8 xl:pt-32">
          {/* Left Side----------------------------------------------------- */}
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* Snake Image----------------------------------------------- */}
              <div className="absolute -top-20 left-0 hidden w-28 lg:block">
                <Image
                  src="/snake-1.png"
                  width="112"
                  height="112"
                  alt="Snake"
                />
              </div>
              {/* Title Text------------------------------------------------ */}
              <h1 className="relative mt-16 w-fit text-balance text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                Your image on a{" "}
                <span className="bg-green-600 px-2 text-white">Custom</span>{" "}
                Phone Case
              </h1>
              {/* Subtitle Text--------------------------------------------- */}
              <p className="mt-8 max-w-prose text-balance text-center text-lg md:text-wrap lg:pr-10 lg:text-left">
                Capture your favorite memories with your own,{" "}
                <span className="font-semibold">on-of-one</span> phone case.
                CaseCobra allows you to protect your memories, not just your
                phone.
              </p>
              {/* List of features------------------------------------------ */}
              <ul className="mt-8 flex flex-col items-center space-y-2 text-left font-medium sm:items-start">
                <div className="space-y-2">
                  {homeFeatures.map((feature, idx) => (
                    <li
                      key={`feature-${idx}`}
                      className="flex items-center gap-1.5 text-left"
                    >
                      <CheckIcon className="h-5 w-5 shrink-0 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </div>
              </ul>
              {/* Users avatars--------------------------------------------- */}
              <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                <div className="flex -space-x-4">
                  {homeUserAvatars.map((avatar, idx) => (
                    <Image
                      key={`avatar-${idx}`}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                      src={avatar}
                      width="40"
                      height="40"
                      alt="Avatar"
                    />
                  ))}
                </div>
                {/* 5 Stars------------------------------------------------- */}
                <div className="flex flex-col items-center justify-between sm:items-start">
                  <div className="flex gap-0.5">
                    <StarFilledIcon className="h-4 w-4 text-green-600" />
                    <StarFilledIcon className="h-4 w-4 text-green-600" />
                    <StarFilledIcon className="h-4 w-4 text-green-600" />
                    <StarFilledIcon className="h-4 w-4 text-green-600" />
                    <StarFilledIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <p>
                    <span className="font-semibold">1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side---------------------------------------------------- */}
          <div className="col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:col-span-1 lg:mx-0 lg:mt-20">
            {/* Phone Image------------------------------------------------- */}
            <div className="relative md:max-w-xl">
              {/* Graphics 1 */}
              <Image
                src="/your-image.png"
                className="pointer-events-none absolute -top-20 left-56 hidden w-40 select-none sm:block lg:hidden lg:w-52 xl:block"
                width={160}
                height={160}
                alt="Your Image"
              />
              {/* Graphics 2 */}
              <Image
                src="/line.png"
                className="pointer-events-none absolute -bottom-6 -left-6 w-20 select-none"
                width={80}
                height={80}
                alt="Line"
              />
              {/* Sample Cover */}
              <Phone
                containerProps={{ className: "w-64" }}
                imageProps={{
                  src: "/testimonials/1.jpg",
                  alt: "Testimonial",
                  width: 256,
                  height: 256,
                }}
              />
            </div>
          </div>
          {/* -------------------------------------------------------------- */}
        </MaxWidthWrapper>
      </section>
      {/* /Top Section------------------------------------------------------ */}
      {/* Value Proposition------------------------------------------------- */}
      <section className="grainy-dark bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row">
            {/* What our customers say */}
            <h2 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl">
              What our{" "}
              <span className="relative px-2">
                customers{" "}
                <Icons.Underline className="pointer-events-none absolute inset-x-0 -bottom-6 hidden text-green-500 sm:block" />
              </span>{" "}
              say
            </h2>
            {/* Snake image */}
            <Image
              src="/snake-2.png"
              alt="Snake-2"
              className="order-0 lg:order-2"
              width={96}
              height={96}
            />
          </div>
        </MaxWidthWrapper>
        {/* Reviews--------------------------------------------------------- */}
        <div className="pt-16">
          <Reviews />
        </div>
        {/* ---------------------------------------------------------------- */}
      </section>
      {/* /Value Proposition------------------------------------------------ */}
    </div>
  );
}
