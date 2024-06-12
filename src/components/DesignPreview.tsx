"use client";

import { Configuration } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Confetti from "react-dom-confetti";

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
  // Destructure the fields of the configuration from prop
  const { id, color, model, finish, material } = configuration;
  // ---------------------------------------------------------------------------
  // Confetti State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  useEffect(() => {
    setShowConfetti(true);
  }, []);
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
      {/* ------------------------------------------------------------------ */}
    </>
  );
};

export default DesignPreview;
