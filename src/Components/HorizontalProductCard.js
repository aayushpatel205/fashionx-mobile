import React from "react";
import styled from "styled-components/native";
import { Image, View } from "react-native";
import CustomText from "./CustomText";
import Feather from "react-native-vector-icons/Feather";

const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  z-index: 100;
  right: 15px;
  bottom: -5px;
  background-color: #fff;
  padding: 8px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 10px;
  elevation: 2;
`;
const Container = styled.View`
  position: relative;
  width: 92%;
  z-index: -10;
  /* border: 1px solid #d3d3d3; */
  height: 125px;
  border-radius: 20px;
  overflow: hidden;
  flex-direction: row;
  background-color: #fff;
`;

const InnerContainer = styled.View`
  width: "70%";
  height: "100%";
  padding: 15px 10px;
  flex-direction: column;
  gap: 10px;
`;

const HorizontalProductCard = () => {
  return (
    <View style={{ position: "relative", alignItems: "center" , width: "100%"}}>
      <Container>
        <View style={{ width: "30%", height: "100%", borderWidth: 1 }}>
          <Image
            source={require("../../assets/test-fashion-image.webp")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <InnerContainer>
          <View style={{ flexDirection: "column", gap: 5 }}>
            <CustomText weight="600" style={{ fontSize: 18 }}>
              Men's Round Neck T-Shirt
            </CustomText>
            <CustomText weight="500" style={{ fontSize: 16, color: "grey" }}>
              Category:{" "}
              <CustomText weight="500" style={{ fontSize: 16, color: "#000" }}>
                Topwear
              </CustomText>
            </CustomText>
          </View>

          <CustomText weight="600" style={{ fontSize: 20 }}>
            $ 25.5
          </CustomText>
        </InnerContainer>
      </Container>
      <IconWrapper>
        <Feather name="heart" size={20} color="#6e6e6e" />
      </IconWrapper>
    </View>
  );
};

export default HorizontalProductCard;
