import * as React from "react";
import NewPostForm from "./NewPostForm";

interface INewPostModalFormProps {}

const NewPostModalForm: React.FunctionComponent<
  INewPostModalFormProps
> = ({}) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <NewPostForm />
    </div>
  );
};

export default NewPostModalForm;
