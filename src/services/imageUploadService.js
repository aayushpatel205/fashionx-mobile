import axios from "axios";
import {
  PRODUCT_UPLOAD_PRESET,
  PRODUCT_CLOUD_NAME,
  PROFILE_UPLOAD_PRESET,
  PROFILE_CLOUD_NAME,
} from "@env";

export const uploadImage = async (image, bucketName, userId = null) => {
  const formData = new FormData();

  formData.append("file", {
    uri: image.uri,
    type: image.type,
    name: image.name,
  });

  formData.append(
    "upload_preset",
    bucketName === "profile" ? PROFILE_UPLOAD_PRESET : PRODUCT_UPLOAD_PRESET
  );

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        bucketName === "profile" ? PROFILE_CLOUD_NAME : PRODUCT_CLOUD_NAME
      }/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
