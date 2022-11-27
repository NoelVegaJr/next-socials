import * as React from "react";
import { useState } from "react";
import { trpc } from "../lib/trpc";
import Avatar from "./Avatar";

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

  const handleUpdateProfile = () => {
    updateProfile.mutate({ userId: user.id, name, bio, website });
    close();
  };

  return (
    <div className="bg-white text-white rounded-lg p-4">
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-8 flex justify-between">
          <button>
            <Avatar src={user.image} className="w-32 h-32" />
          </button>
          <button
            type="submit"
            className="self-start bg-blue-500 hover:bg-blue-600 text-white px-6 py-1 rounded-3xl font-semibold"
          >
            Save
          </button>
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
