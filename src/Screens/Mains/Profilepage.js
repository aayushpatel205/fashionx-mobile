import React from "react";
import { View, Image } from "react-native";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import Entypo from "react-native-vector-icons/Entypo";

const Profilepage = () => {
  return (
    <Container>
      <CustomText weight="600" style={{ fontSize: 40 }}>
        My Profile
      </CustomText>

      <InnerContainer>
        <ImageWrapper>
          <ProfileImage
            source={require("../../../assets/test-fashion-image.webp")}
            resizeMode="cover"
          />
        </ImageWrapper>
        <View>
          <CustomText weight="600" style={{ fontSize: 28 }}>
            Aayush Patel
          </CustomText>
          <CustomText weight="500" style={{ fontSize: 22, color: "#a9a9a9" }}>
            aayush@gmail.com
          </CustomText>
        </View>
      </InnerContainer>

      <View
        style={{
          borderBottomWidth: 0.5,
          borderColor: "#d3d3d3",
          flexDirection: 'row',
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 15
        }}
      >
        <CustomText weight="600" style={{ fontSize: 27, height: 50 ,
          paddingHorizontal: 20
        }}>
          My Orders
        </CustomText>
        <Entypo name="chevron-thin-right" size={25} color="#a9a9a9" style={{marginBottom: 10}}/>
      </View>
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

const ImageWrapper = styled.View`
  padding: 4px;
  height: 95px;
  width: 95px;
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
