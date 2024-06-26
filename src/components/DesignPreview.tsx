"use client";

import { Configuration } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Confetti from "react-dom-confetti";
import { COLORS, MODELS } from "@/validators/option-validator";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { cn, formatPrice } from "@/lib/utils";
import Phone from "./Phone";
import LoginModal from "./LoginModal";
import { createCheckoutSession } from "@/app/configure/preview/actions";
import { useMutation } from "@tanstack/react-query";

interface IProps {
  configuration: Configuration;
}

const DesignPreview: FC<IProps> = ({ configuration }) => {
  // ---------------------------------------------------------------------------
  // To display toast messages
  const { toast } = useToast();
  // ---------------------------------------------------------------------------
  // To navigate to different pages
  const router = useRouter();
  // ---------------------------------------------------------------------------
  // Get the currently logged in user
  const { user } = useKindeBrowserClient();
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Destructure the fields of the configuration from prop
  const { id, color, model, finish, material } = configuration;
  // ---------------------------------------------------------------------------
  // Get the Tailwind color class for the selected color
  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color,
  )?.tw;

  // Get the label of the selected model
  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model,
  )!;
  // Calculate total price
  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate")
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Confetti State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  useEffect(() => {
    setShowConfetti(true);
  }, []);
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Handle Checkout
  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession, // Server action to create order and stripe checkout session
    onSuccess: ({ url, status }) => {
      if (url) {
        // Use navigation router to navigate to payment page (stripe)
        router.push(url);
      } else if (status === 403) {
        toast({
          title: "Forbidden",
          description: "Stripe returned status code 403 (Forbidden).",
          variant: "destructive",
        });
      }
    },
    onError: (error, { configId }, context) => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle checkout button click
  const handleCheckout = () => {
    if (user) {
      // create payment session
      createPaymentSession({ configId: id });
    } else {
      // need to log in
      // Save current config in localStorage
      // when user logs in, we redirect them to /auth-callback which checks localStorage and redirects to correct page if it exists
      localStorage.setItem("configurationId", id);
      // Open login modal
      setIsLoginModalOpen(true);
    }
  };
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* Confetti---------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none justify-center overflow-hidden"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>
      {/* Login Modal------------------------------------------------------- */}
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
      {/* Review Configuration---------------------------------------------- */}
      <div className="mt-20 flex flex-col items-center text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:grid md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 md:row-span-2 md:row-end-2 lg:col-span-3">
          <Phone
            containerProps={{ className: cn(`bg-${tw}`) }}
            imageProps={{
              src: configuration.croppedImageUrl!,
              // fill: true,
              width: 150,
              height: 150,
              alt: "User Image",
            }}
          />
        </div>

        <div className="mt-6 sm:col-span-9 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {modelLabel} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <CheckIcon className="h-4 w-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>

        <div className="text-base sm:col-span-12 md:col-span-9">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 list-inside list-disc text-zinc-700">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 list-inside list-disc text-zinc-700">
                <li>High-quality, durable material</li>
                <li>Scratch- and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>

          {/* Price Details------------------------------------------------- */}
          <div className="mt-8">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                {/* Base Price---------------------------------------------- */}
                <div className="mt-2 flex items-center justify-between py-1">
                  <p className="text-gray-600">Base price</p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>
                {/* Textured Finish Price----------------------------------- */}
                {finish === "textured" ? (
                  <div className="mt-2 flex items-center justify-between py-1">
                    <p className="text-gray-600">Textured finish</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                    </p>
                  </div>
                ) : null}
                {/* Polycarbonate Price------------------------------------- */}
                {material === "polycarbonate" ? (
                  <div className="mt-2 flex items-center justify-between py-1">
                    <p className="text-gray-600">Soft polycarbonate material</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                    </p>
                  </div>
                ) : null}
                {/* Divider------------------------------------------------- */}
                <div className="my-2 h-px bg-gray-200" />
                {/* Total Price--------------------------------------------- */}
                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900">Order total</p>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>
            {/* Checkout Button--------------------------------------------- */}
            <div className="mt-8 flex justify-end pb-12">
              <Button
                onClick={() => handleCheckout()}
                className="px-4 sm:px-6 lg:px-8"
              >
                Check out <ArrowRightIcon className="ml-1.5 inline h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* /Price Details------------------------------------------------ */}
        </div>
      </div>
      {/* ------------------------------------------------------------------ */}
    </>
  );
};

export default DesignPreview;
