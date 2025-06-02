import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import CartProductCard from "../../Components/CartProductCard";
import LinearGradient from "react-native-linear-gradient";

const PageWrapper = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  position: relative;
`;

const Container = styled(ScrollView)`
  flex: 1;
  padding: 10px 17px 15px 17px;
`;

const GradientOverlay = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  z-index: 1;
`;

const CheckoutButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 15px;
  left: 20px;
  right: 20px;
  background-color: #000;
  padding: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  z-index: 2;
`;

const Cartpage = () => {
  return (
    <PageWrapper>
      <Container contentContainerStyle={{ gap: 25, paddingBottom: 105 }}>
        <CustomText weight="600" style={{ fontSize: 40 }}>
          My Cart
        </CustomText>
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
      </Container>

      {/* White Gradient overlay */}
      <GradientOverlay
        colors={["transparent", "#f5f5f5", "#f5f5f5"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Checkout button */}
      <CheckoutButton onPress={() => console.log("Proceed to Checkout")}>
        <CustomText weight="600" style={{ fontSize: 20, color: "#fff" }}>
          Proceed to Checkout
        </CustomText>
      </CheckoutButton>
    </PageWrapper>
  );
};

export default Cartpage;
