import * as React from "react";
import Image from "next/image";

interface IBannerProps {
  className: string;
  src?: string | null;
}

const Banner: React.FunctionComponent<IBannerProps> = ({
  className,
  src,
}: IBannerProps) => {
  return (
    <div className={`${className} relative`}>
      <Image
        src={src ?? "/defaultBanner.png"}
        alt="profile image"
        className=""
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default Banner;
