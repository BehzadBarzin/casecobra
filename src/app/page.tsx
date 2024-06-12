import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import Showcases from "@/components/Showcases";
import { buttonVariants } from "@/components/ui/button";
import { homeFeatures, homeFeatures2, homeUserAvatars } from "@/constants";
import {
  ArrowRightIcon,
  CheckIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50 ">
      {/* Top Section------------------------------------------------------- */}
      <section>
        <MaxWidthWrapper className="pb-6 pt-10 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-24 xl:gap-x-8 xl:pt-32">
          {/* Left Side----------------------------------------------------- */}
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* Logo Image------------------------------------------------ */}
              <div className="absolute -top-20 left-0 hidden w-28 lg:block">
                <Image
                  src="/logo.png"
                  width="112"
                  height="112"
                  alt="logo"
                />
              </div>
              {/* Title Text------------------------------------------------ */}
              <h1 className="relative mt-16 w-fit text-balance text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                Your image on a{" "}
                <span className="bg-main px-2 text-white">Custom</span>{" "}
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
                      <CheckIcon className="h-5 w-5 shrink-0 text-main" />
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
                    <StarFilledIcon className="h-4 w-4 text-main" />
                    <StarFilledIcon className="h-4 w-4 text-main" />
                    <StarFilledIcon className="h-4 w-4 text-main" />
                    <StarFilledIcon className="h-4 w-4 text-main" />
                    <StarFilledIcon className="h-4 w-4 text-main" />
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
                imageProps={{
                  src: "/showcases/1.jpg",
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
        {/* Heading + Reviews----------------------------------------------- */}
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          {/* Heading------------------------------------------------------- */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row">
            {/* What our customers say */}
            <h2 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl">
              What our{" "}
              <span className="relative px-2">
                customers{" "}
                <Icons.Underline className="pointer-events-none absolute inset-x-0 -bottom-6 hidden text-main sm:block" />
              </span>{" "}
              say
            </h2>
            {/* logo image */}
            <Image
              src="/logo.png"
              alt="logo"
              className="order-0 lg:order-2"
              width={96}
              height={96}
            />
          </div>
          {/* User Reviews-------------------------------------------------- */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* User Review 1----------------------------------------------- */}
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mb-2 flex gap-0.5">
                <StarFilledIcon className="h-5 w-5 fill-green-600 text-main" />
                <StarFilledIcon className="h-5 w-5 fill-green-600 text-main" />
                <StarFilledIcon className="h-5 w-5 fill-green-600 text-main" />
                <StarFilledIcon className="h-5 w-5 fill-green-600 text-main" />
                <StarFilledIcon className="h-5 w-5 fill-green-600 text-main" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  {'"'}The case feels durable and I even got a compliment on the
                  design. Had the case for two and a half months now and{" "}
                  <span className="bg-slate-800 p-0.5 text-white">
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it.{'"'}
                </p>
              </div>
              <div className="mt-2 flex gap-4">
                <Image
                  className="h-12 w-12 rounded-full object-cover"
                  src="/users/user-1.png"
                  width="40"
                  height="40"
                  alt="Avatar"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Jonathan</p>
                  <div className="flex items-center gap-1.5 text-zinc-600">
                    <CheckIcon className="h-4 w-4 stroke-[3px] text-main" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
            {/* User Review 2----------------------------------------------- */}
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="mb-2 flex gap-0.5">
                <StarFilledIcon className="h-5 w-5 fill-green-600 text-main" />
                <StarFilledIcon className="h-5 w-5 fill-green-600 text-main" />
                <StarFilledIcon className="h-5 w-5 fill-green-600 text-main" />
                <StarFilledIcon className="h-5 w-5 fill-green-600 text-main" />
                <StarFilledIcon className="h-5 w-5 fill-green-600 text-main" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  {'"'}I usually keep my phone together with my keys in my
                  pocket and that led to some pretty heavy scratchmarks on all
                  of my last phone cases. This one, besides a barely noticeable
                  scratch on the corner,{" "}
                  <span className="bg-slate-800 p-0.5 text-white">
                    looks brand new after about half a year
                  </span>
                  . I dig it.{'"'}
                </p>
              </div>
              <div className="mt-2 flex gap-4">
                <Image
                  className="h-12 w-12 rounded-full object-cover"
                  src="/users/user-4.jpg"
                  width="40"
                  height="40"
                  alt="Avatar"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Josh</p>
                  <div className="flex items-center gap-1.5 text-zinc-600">
                    <CheckIcon className="h-4 w-4 stroke-[3px] text-main" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------------------------------------------------ */}
          </div>
          {/* -------------------------------------------------------------- */}
        </MaxWidthWrapper>
        {/* Showcases------------------------------------------------------- */}
        <div className="pt-16">
          <Showcases />
        </div>
        {/* ---------------------------------------------------------------- */}
      </section>
      {/* /Value Proposition------------------------------------------------ */}
      {/* Call to Action---------------------------------------------------- */}
      <section>
        <MaxWidthWrapper className="py-24">
          {/* Heading------------------------------------------------------- */}
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl">
                Upload your photo and get{" "}
                <span className="relative bg-main px-2 text-white">
                  your own case
                </span>{" "}
                now
              </h2>
            </div>
          </div>
          {/* Case + Image-------------------------------------------------- */}
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex grid-cols-2 flex-col items-center gap-40 md:grid">
              {/* Arrow----------------------------------------------------- */}
              {/* Points right on small devices, right on large */}
              <Image
                src="/arrow.png"
                className="absolute left-1/2 top-[25rem] z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 md:top-1/2 md:rotate-0"
                width={96}
                height={96}
                alt="Arrow"
              />
              {/* Image----------------------------------------------------- */}
              <div className="relative h-80 w-full max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 md:h-full md:justify-self-end lg:rounded-2xl">
                <Image
                  src="/horse.jpg"
                  className="h-full w-full rounded-md bg-white object-cover shadow-2xl ring-1 ring-gray-900/10"
                  width={320}
                  height={320}
                  alt="Your Image"
                  objectFit="cover"
                />
              </div>
              {/* Phone Case------------------------------------------------ */}
              <Phone
                imageProps={{
                  src: "/horse_phone.jpg",
                  width: 256,
                  height: 256,
                  alt: "Your Phone",
                }}
              />
            </div>
          </div>
          {/* Features + Button--------------------------------------------- */}
          <ul className="mx-auto mt-12 w-fit max-w-prose space-y-2 sm:text-lg">
            {/* List of features-------------------------------------------- */}
            {homeFeatures2.map((feature, idx) => (
              <li key={`feature-2-${idx}`} className="w-fit">
                <CheckIcon className="mr-1.5 inline h-5 w-5 text-main" />
                {feature}
              </li>
            ))}
            {/* Button------------------------------------------------------ */}
            <div className="flex justify-center">
              <Link
                className={buttonVariants({
                  size: "lg",
                  className: "mx-auto mt-8",
                })}
                href="/configure/upload"
              >
                Create your case now
                <ArrowRightIcon className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
            {/* ------------------------------------------------------------ */}
          </ul>
          {/* -------------------------------------------------------------- */}
        </MaxWidthWrapper>
      </section>
      {/* /Call to Action--------------------------------------------------- */}
    </div>
  );
}
