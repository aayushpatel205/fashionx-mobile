import axios from "axios";
import {
  PRODUCT_UPLOAD_PRESET,
  PRODUCT_CLOUD_NAME,
  PROFILE_UPLOAD_PRESET,
  PROFILE_CLOUD_NAME,
} from "@env";

console.log(
  "The ENV Variables are: ",
  PRODUCT_UPLOAD_PRESET,
  PRODUCT_CLOUD_NAME,
  PROFILE_UPLOAD_PRESET,
  PROFILE_CLOUD_NAME
);

export const uploadImage = async (image, bucketName, userId = null) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append(
    "upload_preset",
    bucketName === "profile" ? PROFILE_UPLOAD_PRESET : PRODUCT_UPLOAD_PRESET
  );
  formData.append(
    "cloud_name",
    bucketName === "profile" ? PROFILE_CLOUD_NAME : PRODUCT_CLOUD_NAME
  );

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        bucketName === "profile" ? PROFILE_CLOUD_NAME : PRODUCT_CLOUD_NAME
      }/image/upload`,
      formData
    );
    console.log("From cloudinary: ", response.data);
    // return response.data.secure_url;
  } catch (error) {
    throw error;
  }
};
