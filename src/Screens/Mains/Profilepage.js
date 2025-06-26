import { useState } from "react";
import { View, Alert } from "react-native";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import Entypo from "react-native-vector-icons/Entypo";
import { useAppData } from "../../Context/AppContext";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useUserData } from "../../Context/UserContext";
import { launchImageLibrary } from "react-native-image-picker";
import { Button } from "../Auth/Loginpage";
import { uploadImage } from "../../services/imageUploadService";
import { updateProfilePicture } from "../../api/userApis";
import Toast from "react-native-toast-message";
const Profilepage = () => {
  const { setActiveTab } = useAppData();
  const { userData, setUserData } = useUserData();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUri, setImageUri] = useState(userData?.profilePicture);
  const [isLoading, setIsLoading] = useState(true);

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.7 }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        console.log("Response: ", response.assets[0]);
        const uri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        const source = { uri, type, name };
        setSelectedImage(source);
        setImageUri(uri);
      }
    });
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Toast.show({
        type: "errorToast",
        text1: "No image selected",
      });
    }
    try {
      const response = await uploadImage(selectedImage, "profile");
      const response2 = await updateProfilePicture(userData?.data.id, response);
      const updatedUserData = {
        ...userData,
        profilePicture: response,
      };
      setUserData(updatedUserData);
      setImageUri(null);
      Toast.show({
        type: "successToast",
        text1: "Profile Picture Updated",
      });
      setIsLoading(false);
    } catch (error) {
      Toast.show({
        type: "errorToast",
        text1: "Error uploading image",
      });
      setImageUri(null);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <CustomText weight="600" style={{ fontSize: 40, marginTop: 10 }}>
        My Profile
      </CustomText>

      <InnerContainer>
        <Touchable onPress={handleImagePick}>
          <ImageWrapper>
            {imageUri ? (
              <ProfileImage
                source={{
                  uri: imageUri || userData?.profilePicture,
                }}
                resizeMode="cover"
              />
            ) : (
              <FontAwesome name="user" size={45} color="#a9a9a9" />
            )}
          </ImageWrapper>
        </Touchable>
        <View style={{ width: "100%" }}>
          <CustomText
            numberOfLines={2}
            weight="600"
            style={{ fontSize: 26, width: "65%" }}
          >
            {userData?.data.name}
          </CustomText>
          <CustomText
            numberOfLines={2}
            weight="500"
            style={{ fontSize: 21, color: "#a9a9a9", width: "65%" }}
          >
            {userData?.data.email}
          </CustomText>
        </View>
      </InnerContainer>

      {selectedImage && (
        <ButtonRow>
          <Button style={{ width: "50%" }} onPress={handleUpload}>
            <CustomText
              weight="600"
              style={{ fontSize: 19, color: "white", textAlign: "center" }}
            >
              Upload Picture
            </CustomText>
          </Button>

          <Button
            style={{ backgroundColor: "#f5f5f5", width: "50%", height: 60 }}
            onPress={() => {
              setSelectedImage(null);
              setImageUri(
                userData?.profilePicture ? userData?.profilePicture : null
              );
            }}
          >
            <CustomText
              weight="600"
              style={{
                fontSize: 19,
                color: "black",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Remove Preview
            </CustomText>
          </Button>
        </ButtonRow>
      )}

      <OptionsContainer onPress={() => setActiveTab("MyOrders")}>
        <CustomText
          weight="600"
          style={{ fontSize: 27, height: 50, paddingHorizontal: 20 }}
        >
          My Orders
        </CustomText>
        <Entypo
          name="chevron-thin-right"
          size={25}
          color="#a9a9a9"
          style={{ marginBottom: 10 }}
        />
      </OptionsContainer>
      <OptionsContainer onPress={() => setActiveTab("PersonalDetails")}>
        <CustomText
          weight="600"
          style={{ fontSize: 27, height: 50, paddingHorizontal: 20 }}
        >
          Personal Details
        </CustomText>
        <Entypo
          name="chevron-thin-right"
          size={25}
          color="#a9a9a9"
          style={{ marginBottom: 10 }}
        />
      </OptionsContainer>
    </Container>
  );
};

export default Profilepage;

// Styled components
const Container = styled.View`
  flex: 1;
  padding: 10px 20px;
`;

const InnerContainer = styled.View`
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const ImageWrapper = styled.View`
  padding: 3px;
  height: 93px;
  width: 93px;
  border-radius: 60px;
  border: 3px solid #d3d3d3;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-vertical: 15px;
`;

const ProfileImage = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 60px;
`;

const OptionsContainer = styled.TouchableOpacity`
  border-bottom-width: 2px;
  border-bottom-color: #f5f5f5;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-bottom: 10px;
`;


