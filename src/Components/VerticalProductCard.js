import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import CustomText from "./CustomText";
import Feather from "react-native-vector-icons/Feather";

const CardContainer = styled.View`
  height: 300px;
  width: 175px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  flex-direction: column;
  gap: 5px;
`;

const ImageContainer = styled.View`
  height: 70%;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 2px;
  bottom: -10px;
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

const DetailsContainer = styled.View`
  height: 30%;
  display: flex;
  padding: 5px;
  gap: 3px;
  width: 92%;
`;

const VerticalProductCard = () => {
  const handleIconPress = () => {
    console.log("Heart icon pressed!");
    // You can toggle favorite state or trigger animation here
  };

  return (
    <CardContainer>
      <ImageContainer>
        <ProductImage source={require("../../assets/p_img8.png")} />
        <IconWrapper onPress={handleIconPress}>
          <Feather name="heart" size={20} color="#6e6e6e" />
        </IconWrapper>
      </ImageContainer>

      <DetailsContainer>
        <CustomText weight="600" style={{ fontSize: 18, color: "#6e6e6e" }}>
          Men's Round Neck T-Shirt
        </CustomText>
        <CustomText weight="700" style={{ fontSize: 22, color: "#1a1a1a" }}>
          $ 25.5
        </CustomText>
      </DetailsContainer>
    </CardContainer>
  );
};

export default VerticalProductCard;
