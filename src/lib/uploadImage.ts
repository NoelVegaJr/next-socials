const uploadImage = async (image: any) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "codefork-blog");
  data.append("cloud_name", "dnqazzwfi");

  const response = await fetch(
    " https://api.cloudinary.com/v1_1/dnqazzwfi/image/upload",
    {
      method: "post",
      body: data,
    }
  );
  const cloudinaryData = await response.json();
  return cloudinaryData;
};

export default uploadImage;
