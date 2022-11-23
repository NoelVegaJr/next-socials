import * as React from "react";
import Image from "next/image";

interface IAvatarProps {
  className: string;
}

const Avatar: React.FunctionComponent<IAvatarProps> = ({
  className,
}: IAvatarProps) => {
  return (
    <div className={`${className} relative`}>
      <Image
        src="/profile.jpg"
        alt="profile image"
        className="rounded-full"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default Avatar;
