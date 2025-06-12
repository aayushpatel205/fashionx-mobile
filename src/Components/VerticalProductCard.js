import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import CustomText from "./CustomText";
import Feather from "react-native-vector-icons/Feather";
import { useAppData } from "../Context/AppContext";

const CardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  max-height: 340px;
  width: 175px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  flex-direction: column;
  gap: 5px;
`;

const ImageContainer = styled.View`
  height: 65%;
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
  display: flex;
  padding: 5px;
  gap: 5px;
  width: 92%;
  margin-top: 2px;
`;

const VerticalProductCard = ({ element }) => {
  const { setActiveTab , setActiveProduct } = useAppData();
  const handleIconPress = () => {
    console.log("Heart icon pressed!");
    // You can toggle favorite state or trigger animation here
  };

  return (
    <CardContainer
      onPress={() => {
        setActiveTab("Product");
        setActiveProduct(element);
      }}
    >
      <ImageContainer>
        <ProductImage source={{ uri: element?.imgUrl }} />
        <IconWrapper onPress={handleIconPress}>
          <Feather name="heart" size={20} color="#6e6e6e" />
        </IconWrapper>
      </ImageContainer>

      <DetailsContainer>
        <CustomText
          numberOfLines={2}
          weight="600"
          style={{ fontSize: 18, color: "#6e6e6e" }}
        >
          {element?.productName}
        </CustomText>
        <CustomText weight="700" style={{ fontSize: 22, color: "#1a1a1a" }}>
          $ {element?.price - 0.01}
        </CustomText>
      </DetailsContainer>
    </CardContainer>
  );
};

export default VerticalProductCard;
