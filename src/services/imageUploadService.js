import axios from "axios";
import Constants from "expo-constants";

const PRODUCT_UPLOAD_PRESET =
  Constants.manifest.extra.PRODUCT_UPLOAD_PRESET ||
  process.env.PRODUCT_UPLOAD_PRESET;
const PRODUCT_CLOUD_NAME =
  Constants.manifest.extra.PRODUCT_CLOUD_NAME || process.env.PRODUCT_CLOUD_NAME;
const PROFILE_UPLOAD_PRESET =
  Constants.manifest.extra.PROFILE_UPLOAD_PRESET ||
  process.env.PROFILE_UPLOAD_PRESET;
const PROFILE_CLOUD_NAME =
  Constants.manifest.extra.PROFILE_CLOUD_NAME || process.env.PROFILE_CLOUD_NAME;

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
