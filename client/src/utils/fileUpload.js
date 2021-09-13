export const checkDocument = (file) => {
  let err = "";
  if (!file) {
    return (err = "File does not exist.");
  }
  //?1 mb
  if (file.size > 3 * 1024 * 1024) {
    return (err = "File size must be less than 5 Mb.");
  }

  if (file.type !== "application/pdf" && file.type !== "application/msword") {
    return (err = "File must be pdf or msword.");
  }

  return err;
};

export const fileUpload = async (additionalDocs) => {
  let fileArr = [];
  for (const item of additionalDocs) {
    const formData = new FormData();

    formData.append("file", item);

    formData.append("upload_preset", "message_media");
   formData.append("cloud_name", "dilnawh17");

    const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    fileArr.push({ public_id: data.public_id, url: data.secure_url, fileName: data.original_filename });
  }
  return fileArr;
};

export default fileUpload;
