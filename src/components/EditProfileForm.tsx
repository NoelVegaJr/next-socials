import * as React from "react";
import { useRef, useState } from "react";
import { trpc } from "../lib/trpc";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faX } from "@fortawesome/free-solid-svg-icons";
import uploadImage from "../lib/uploadImage";

interface IEditProfileFormProps {
  user: any;
  close: () => void;
}

const EditProfileForm: React.FunctionComponent<IEditProfileFormProps> = ({
  user,
  close,
}) => {
  const utils = trpc.useContext();
  const updateProfile = trpc.user.updateUserProfile.useMutation({
    onSuccess: () => {
      utils.user.getUserByUsername.invalidate();
    },
  });
  const [name, setName] = useState<string>(user.name);
  const [bio, setBio] = useState<string>(user.bio);
  const [website, setWebsite] = useState<string>(user.website);
  const [hoveringOverAvatar, setHoveringOverAvatar] = useState(false);
  const inputAvatar = useRef<HTMLInputElement>(null);
  const inputBanner = useRef<HTMLInputElement>(null);
  const [avatarFilePath, setAvatarFilePath] = useState<File | null>();

  const handleUpdateProfile = async () => {
    updateProfile.mutate({ userId: user.id, name, bio, website });

    await uploadImage(avatarFilePath);
    close();
  };

  return (
    <div className="bg-white rounded-2xl pb-8">
      <form onSubmit={handleUpdateProfile} className="p-1">
        <div className="flex items-center justify-between mb-4 px-4 py-3">
          <div className="flex items-center gap-8">
            <button
              onClick={close}
              className="w-8 h-8 transition-all duration-300 hover:bg-slate-200 rounded-full"
            >
              <FontAwesomeIcon icon={faX} />
            </button>
            <p className="font-bold text-xl">Edit Profile</p>
          </div>
          <button
            type="submit"
            className="self-start bg-black hover:bg-black/80 transition-all duration-300 text-white px-4 py-1 rounded-3xl font-semibold"
          >
            Save
          </button>
        </div>
        <div>
          <div className="bg-slate-600 w-full h-40 relative">
            <input
              type="file"
              id="file"
              onChange={(e) => setAvatarFilePath(e.target.files![0])}
              ref={inputBanner}
              style={{ display: "none" }}
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={() => inputBanner.current?.click()}
              type="button"
              className="absolute top-14 left-48  w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-800/60  grid place-content-center transition-all duration-300"
            >
              <FontAwesomeIcon icon={faCamera} className="text-white  " />
            </button>
          </div>
          <div className="mb-8 flex justify-between relative">
            <div className="absolute -top-14 left-4 p-1 bg-white rounded-full">
              <Avatar src={user.image} className="w-28 h-28 " />
              <input
                type="file"
                id="file"
                onChange={(e) => setAvatarFilePath(e.target.files![0])}
                ref={inputAvatar}
                style={{ display: "none" }}
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={() => inputAvatar.current?.click()}
                type="button"
                className="absolute top-9 left-9 w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-800/60  grid place-content-center transition-all duration-300"
              >
                <FontAwesomeIcon icon={faCamera} className="text-white  " />
              </button>
            </div>

            <div className="w-full h-12"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="border rounded p-1 px-4">
            <p className="text-black text-xs">Name</p>
            <input
              type="text"
              className="w-full outline-none bg-transparent text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="border rounded p-1 px-4">
            <p className="text-black text-xs">Bio</p>
            <input
              type="text"
              className="w-full outline-none bg-transparent text-black"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="border rounded p-1 px-4">
            <p className="text-black text-xs">Website</p>
            <input
              type="text"
              className="w-full outline-none bg-transparent text-black"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
