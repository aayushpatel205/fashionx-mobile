import React from "react";
import HorizontalProductCard from "./HorizontalProductCard";
import { View, Image } from "react-native";
import styled from "styled-components";
import CustomText from "./CustomText";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Container = styled.View`
  width: 100%;
  height: 125px;
  border-radius: 20px;
  overflow: hidden;
  flex-direction: row;
  background-color: #fff;
`;

const InnerContainer = styled.View`
  width: "70%";
  height: "100%";
  padding: 15px;
  flex-direction: column;
  gap: 10px;
`;

const CartProductCard = () => {
  return (
    <Container>
      <View style={{ width: "30%", height: "100%", borderWidth: 1 }}>
        <Image
          source={require("../../assets/test-fashion-image.webp")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <InnerContainer>
        <CustomText weight="600" style={{ fontSize: 18 }}>
          Men's Round Neck T-Shirt
        </CustomText>

        <CustomText weight="500" style={{ fontSize: 16, color: "grey" }}>
          Size:{" "}
          <CustomText weight="500" style={{ fontSize: 16, color: "#000" }}>
            L
          </CustomText>
        </CustomText>

        <View
          style={{
            width: "80%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <FontAwesome6 name="circle-plus" size={30} color="#000" />
            <CustomText weight="600" style={{ fontSize: 21, color: "#000" }}>
              1
            </CustomText>
            <FontAwesome6 name="circle-minus" size={30} color="#000" />
          </View>

          <CustomText weight="600" style={{ fontSize: 21, color: "#000" }}>
            $ 25
          </CustomText>
        </View>
      </InnerContainer>
      <MaterialCommunityIcons
        name="dots-vertical"
        size={25}
        color="#000"
        style={{ position: "absolute", right: 5, top: 13 }}
      />
    </Container>
  );
};

export default CartProductCard;
