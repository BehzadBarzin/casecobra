import Designer from "@/components/Designer";
import { db } from "@/db";
import { notFound } from "next/navigation";
import React, { FC } from "react";

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const page: FC<IProps> = async ({ searchParams }) => {
  // Get the ?id=<value> from url
  const { id } = searchParams;
  // If id wasn't passed, or wasn't a string return 404
  if (!id || typeof id !== "string") {
    return notFound();
  }
  // ---------------------------------------------------------------------------
  // Get the configuration from database
  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  // If configuration doesn't exist, return 404
  if (!configuration) {
    return notFound();
  }
  // ---------------------------------------------------------------------------
  // Get image info from configuration
  const { imageUrl, width, height } = configuration;
  // ---------------------------------------------------------------------------
  return (
    <Designer
      configId={configuration.id}
      imageDimensions={{ width, height }}
      imageUrl={imageUrl}
    />
  );
};

export default page;
