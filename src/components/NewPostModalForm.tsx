import * as React from "react";
import NewPostForm from "./NewPostForm";

interface INewPostModalFormProps {
  userId: string;
}

const NewPostModalForm: React.FunctionComponent<INewPostModalFormProps> = ({
  userId,
}) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <NewPostForm userId={userId} />
    </div>
  );
};

export default NewPostModalForm;
