import React from "react";
import CustomText from "../../Components/CustomText";
import { Image } from "react-native";
import styled from "styled-components/native";

const PageContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const PageWrapper = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const SectionContainer = styled.View`
  gap: 15px;
  margin-bottom: 20px;
`;

const TitleText = styled(CustomText)`
  font-size: 40px;
  font-weight: 700;
`;

const SectionTitle = styled(CustomText)`
  font-size: 27px;
  font-weight: 600;
`;

const AddressView = styled.View`
  min-height: 150px;
  background-color: #fff;
  width: 100%;
  padding: 20px;
  gap: 5px;
  border-radius: 10px;
  justify-content: center;
`;

const InputBox = styled.TextInput`
  background-color: #fff;
  padding: 15px;
  font-size: 17px;
  border-radius: 10px;
  width: 85%;
`;

const CardRow = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding-right: 10px;
`;

const TotalAmountView = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  gap: 10px;
`;

const AmountRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const FullInputBox = styled(InputBox)`
  width: 100%;
`;

const CheckoutButton = styled.TouchableOpacity`
  bottom: 15px;
  left: 20px;
  right: 20px;
  width: 90%;
  background-color: #000;
  padding: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  z-index: 2;
`;

const Checkoutpage = () => {
  return (
    <PageWrapper>
      <PageContainer showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, gap: 10 }}>
        <CustomText weight="600" style={{ fontSize: 40 }}>
          Checkout
        </CustomText>

        {/* Shipping Address */}
        <SectionContainer>
          <SectionTitle>Shipping Address</SectionTitle>
          <AddressView>
            <CustomText weight="600" style={{ fontSize: 20 }}>
              John Doe
            </CustomText>
            <CustomText style={{ fontSize: 18 }}>
              3 Newbridge Courtyard, Los Angeles Lakers Ground
            </CustomText>
            <CustomText style={{ fontSize: 18 }}>
              Chino Hills, 392002, United States
            </CustomText>
          </AddressView>
        </SectionContainer>

        {/* Card Details */}
        <SectionContainer>
          <SectionTitle>Card Details</SectionTitle>

          <CardRow>
            <InputBox
              keyboardType="numeric"
              placeholder="Enter card number..."
            />
            <Image
              source={require("../../../assets/mastercard-logo.png")}
              style={{ height: 28, width: 35 }}
            />
          </CardRow>

          <FullInputBox
            keyboardType="numeric"
            placeholder="Expiry date (MM/YY)"
          />
          <FullInputBox keyboardType="numeric" placeholder="CVV" />
        </SectionContainer>

        {/* Order Summary */}
        <SectionContainer>
          <SectionTitle>Order Summary</SectionTitle>

          <TotalAmountView>
            <AmountRow>
              <CustomText weight="600" style={{ fontSize: 18 }}>
                Subtotal
              </CustomText>
              <CustomText style={{ fontSize: 18 }}>$450.00</CustomText>
            </AmountRow>

            <AmountRow>
              <CustomText weight="600" style={{ fontSize: 18 }}>
                Delivery
              </CustomText>
              <CustomText style={{ fontSize: 18 }}>$20.00</CustomText>
            </AmountRow>

            <AmountRow>
              <CustomText weight="600" style={{ fontSize: 18 }}>
                Total
              </CustomText>
              <CustomText weight="600" style={{ fontSize: 20 }}>
                $470.00
              </CustomText>
            </AmountRow>
          </TotalAmountView>
        </SectionContainer>
      </PageContainer>

      {/* Floating Checkout Button */}
      <CheckoutButton onPress={() => console.log("Checkout Pressed")}>
        <CustomText weight="600" style={{ fontSize: 20, color: "#fff" }}>
          Pay Now - $470
        </CustomText>
      </CheckoutButton>
    </PageWrapper>
  );
};

export default Checkoutpage;
