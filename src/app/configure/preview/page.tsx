import DesignPreview from "@/components/DesignPreview";
import { db } from "@/db";
import { notFound } from "next/navigation";
import React, { FC } from "react";

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const page: FC<IProps> = async ({ searchParams }) => {
  // ---------------------------------------------------------------------------
  // Get config id from search params
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  // ---------------------------------------------------------------------------
  // Get configuration from database
  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration) {
    return notFound();
  }
  // ---------------------------------------------------------------------------
  return <DesignPreview configuration={configuration} />;
};

export default page;
