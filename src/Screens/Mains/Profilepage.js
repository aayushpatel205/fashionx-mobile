import React from "react";
import { View, Image } from "react-native";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import Entypo from "react-native-vector-icons/Entypo";
import { useAppData } from "../../Context/AppContext";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useUserData } from "../../Context/UserContext";

const Profilepage = () => {
  const { activeTab, setActiveTab } = useAppData();
  const { userData, setUserData } = useUserData();
  console.log(userData);
  return (
    <Container>
      <CustomText weight="600" style={{ fontSize: 40, marginTop: 10 }}>
        My Profile
      </CustomText>

      <InnerContainer>
        <ImageWrapper>
          {userData?.data.profilePicture ? (
            <ProfileImage
              source={require("../../../assets/test-fashion-image.webp")}
              resizeMode="cover"
            />
          ) : (
            <FontAwesome name="user" size={45} color="#a9a9a9" />
          )}
        </ImageWrapper>
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

const OptionsContainer = styled.TouchableOpacity`
  border-bottom-width: 2px;
  border-bottom-color: #f5f5f5;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

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

const ImageWrapper = styled.View`
  padding: 4px;
  height: 90px;
  width: 90px;
  border-radius: 60px;
  border: 3px solid #d3d3d3;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-vertical: 15px;
`;

const ProfileImage = styled.Image`
  height: 95%;
  width: 90%;
  border-radius: 60px;
`;
