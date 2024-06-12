"use client";

import { Configuration } from "@prisma/client";
import React, { FC } from "react";

interface IProps {
  configuration: Configuration;
}

const DesignPreview: FC<IProps> = ({ configuration }) => {
  return <div>{configuration.id}</div>;
};

export default DesignPreview;
