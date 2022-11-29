import * as React from "react";
import Image from "next/image";

interface IAvatarProps {
  className: string;
  src?: string | null;
}

const Avatar: React.FunctionComponent<IAvatarProps> = ({
  className,
  src,
}: IAvatarProps) => {
  return (
    <div className={`${className} relative rounded-full`}>
      <Image
        src={src ?? "/profile.jpg"}
        alt="profile image"
        className="rounded-full"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default Avatar;
