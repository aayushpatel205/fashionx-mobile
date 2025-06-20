import React, { useState, useEffect } from "react";
import CustomText from "../../Components/CustomText";
import { Image } from "react-native";
import styled from "styled-components/native";
import CreditCardInput from "../../Components/CreditCardInput";
import { CheckoutButton } from "./Cartpage";
import { getUserDetails } from "../../api/userApis";
import { useUserData } from "../../Context/UserContext";
import { useAppData } from "../../Context/AppContext";

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

const AddressView = styled.View`
  position: relative;
  min-height: 150px;
  background-color: #fff;
  width: 100%;
  padding: 20px;
  gap: 5px;
  border-radius: 12px;
  justify-content: center;
`;

const InputBox = styled.TextInput`
  background-color: #fff;
  padding: 15px;
  font-size: 17px;
  border-radius: 10px;
  width: 85%;
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

// const CheckoutButton = styled.TouchableOpacity`
//   bottom: 15px;
//   left: 20px;
//   right: 20px;
//   width: 90%;
//   background-color: #000;
//   padding: 16px;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50px;
//   z-index: 2;
// `;

const Checkoutpage = () => {
  const { userData } = useUserData();
  const { activeTab, setActiveTab } = useAppData();
  const [userDetails, setUserDetails] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  // Example data you’d pass in
  const recipient = {
    name: "Della Case",
    amount: 50,
    transactionId: "004672918",
    date: "July 8, 2019",
  };
  console.log("userData: ", userData);

  const getDetails = async () => {
    const response = await getUserDetails(userData?.data.id, "personal");
    setUserDetails(response?.user);
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <PageWrapper>
      <PageContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, gap: 10 }}
      >
        <CustomText weight="600" style={{ fontSize: 40 }}>
          Checkout
        </CustomText>

        {/* Shipping Address */}
        <SectionContainer>
          <CustomText weight="500" style={{ fontSize: 28 }}>
            Shipping Address
          </CustomText>
          <AddressView>
            <CustomText
              onPress={() => setActiveTab("PersonalDetails")}
              weight="600"
              style={{ position: "absolute", right: 15, top: 15, fontSize: 18 }}
            >
              Edit
            </CustomText>
            <CustomText weight="600" style={{ fontSize: 20 }}>
              {userDetails?.firstName} {userDetails?.lastName}
            </CustomText>
            <CustomText style={{ fontSize: 18 }}>
              {userDetails?.address.street}, {userDetails?.address.city}
            </CustomText>
            <CustomText style={{ fontSize: 18 }}>
              {userDetails?.address.zipcode}, {userDetails?.address.state}
            </CustomText>
          </AddressView>
        </SectionContainer>

        {/* Card Details */}
        <SectionContainer>
          <CustomText weight="500" style={{ fontSize: 28 }}>
            Card Details
          </CustomText>
          <CreditCardInput />
        </SectionContainer>

        {/* Order Summary */}
        <SectionContainer>
          <CustomText weight="500" style={{ fontSize: 28 }}>
            Order Summary
          </CustomText>
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
      <CheckoutButton onPress={() => {
        setActiveTab("PaymentResult");
      }}>
        <CustomText weight="600" style={{ fontSize: 20, color: "#fff" }}>
          Pay Now - $470
        </CustomText>
      </CheckoutButton>
      {/* <PaymentSuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        recipientName={recipient.name}
        amount={recipient.amount}
        transactionId={recipient.transactionId}
        date={recipient.date}
      /> */}
    </PageWrapper>
  );
};

export default Checkoutpage;
