import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import CartProductCard from "../../Components/CartProductCard";
import { Colors } from "react-native/Libraries/NewAppScreen";

const PageWrapper = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  position: relative;
`;

const Container = styled(ScrollView)`
  flex: 1;
  padding: 10px 17px 15px 17px;
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
`;

const Cartpage = () => {
  return (
    <PageWrapper>
      <Container contentContainerStyle={{ gap: 20, paddingBottom: 105 }}>
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

      <CheckoutButton onPress={() => console.log("Proceed to Checkout")}>
        <CustomText weight="600" style={{ fontSize: 20, color: "#fff" }}>
          Proceed to Checkout
        </CustomText>
      </CheckoutButton>
    </PageWrapper>
  );
};

export default Cartpage;
