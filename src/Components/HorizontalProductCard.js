import React from "react";
import styled from "styled-components/native";
import { Image, View } from "react-native";
import CustomText from "./CustomText";

const HorizontalProductCard = () => {
  const Container = styled.View`
    width: 92%;
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
  return (
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
      {/* <Image source={require("../../assets/test-fashion-image.webp")} style={{ width: "25%", height: "100%", objectFit: "fill" , resizeMode: "contain"}} /> */}
    </Container>
  );
};

export default HorizontalProductCard;
