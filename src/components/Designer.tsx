import React, { FC } from "react";

interface IProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

const Designer: FC<IProps> = () => {
  return <div>Designer</div>;
};

export default Designer;
