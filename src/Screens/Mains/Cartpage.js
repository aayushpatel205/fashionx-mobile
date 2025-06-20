import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import CartProductCard from "../../Components/CartProductCard";
import LinearGradient from "react-native-linear-gradient";
import { useUserData } from "../../Context/UserContext";
import { useAppData } from "../../Context/AppContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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

export const CheckoutButton = styled(TouchableOpacity)`
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
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 10px;
  elevation: 5;
`;

const TotalAmountView = styled.View`
  height: 60px;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
`;

const Cartpage = () => {
  const { activeTab, setActiveTab } = useAppData();
  const { userCartData, setUserCartData } = useUserData();

  const totalAmount = userCartData?.reduce(
    (acc, item) => acc + (item.price * item.quantity || 0),
    0
  );

  return (
    <PageWrapper>
      <Container contentContainerStyle={{ gap: 25, paddingBottom: 105 }}>
        <CustomText weight="600" style={{ fontSize: 40 }}>
          My Cart
        </CustomText>
        {userCartData?.length === 0 ? (
          <View
            style={{
              width: "100%",
              marginTop: "50%",
              alignItems: "center",
              gap: 10,
            }}
          >
            <MaterialCommunityIcons
              name="cart-remove"
              size={50}
              color="#242424"
            />
            <CustomText weight="600" style={{ fontSize: 33 }}>
              The Cart is Empty
            </CustomText>
          </View>
        ) : (
          userCartData?.map((element, index) => {
            return <CartProductCard key={index} element={element} />;
          })
        )}

        {userCartData?.length !== 0 && (
          <TotalAmountView>
            <CustomText weight="600" style={{ fontSize: 20, color: "#a9a9a9" }}>
              Total Amount:{"  "}
            </CustomText>
            <CustomText weight="600" style={{ fontSize: 20, color: "#000" }}>
              ${totalAmount}
            </CustomText>
          </TotalAmountView>
        )}
      </Container>

      {/* White Gradient overlay */}
      <GradientOverlay
        colors={["transparent", "#f5f5f5", "#f5f5f5"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Checkout button */}
      {userCartData?.length !== 0 && (
        <CheckoutButton onPress={() => setActiveTab("Checkout")}>
          <CustomText weight="600" style={{ fontSize: 20, color: "#fff" }}>
            Proceed to Checkout - ${totalAmount}
          </CustomText>
        </CheckoutButton>
      )}
    </PageWrapper>
  );
};

export default Cartpage;
