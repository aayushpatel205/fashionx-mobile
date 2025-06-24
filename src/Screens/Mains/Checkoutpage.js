import React, { useState, useEffect } from "react";
import CustomText from "../../Components/CustomText";
import { Image } from "react-native";
import styled from "styled-components/native";
import CreditCardInput from "../../Components/CreditCardInput";
import { CheckoutButton } from "./Cartpage";
import { getUserDetails } from "../../api/userApis";
import { useUserData } from "../../Context/UserContext";
import { useAppData } from "../../Context/AppContext";
import Toast from "react-native-toast-message";
import { addToOrder } from "../../api/userApis";

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
  const { userData, userCartData , setUserCartData } = useUserData();
  const { activeTab, setActiveTab } = useAppData();
  const [userDetails, setUserDetails] = useState();
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const totalAmount = userCartData?.reduce(
    (acc, item) => acc + (item.price * item.quantity || 0),
    0
  );
  const hasCompleteAddress = (address) => {
    return (
      address?.street && address?.city && address?.state && address?.zipcode
    );
  };

  console.log("usercartdata: ",userCartData)

  const handlePayment = async () => {
    try {
      // Basic regex for numbers only
      const cardNumberRegex = /^\d{16}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^\d{3}$/;

      if (!hasCompleteAddress(userDetails?.address)) {
        Toast.show({
          type: "errorToast",
          text1: "Please fill all address fields",
        });
        return;
      }

      if (
        !cardDetails?.number ||
        !cardDetails?.expiry ||
        !cardDetails?.cvv ||
        !cardDetails?.name
      ) {
        Toast.show({
          type: "errorToast",
          text1: "Please enter all card details",
        });
        return;
      }

      const cleanedCardNumber = cardDetails?.number.replace(/\D/g, "");
      // Card number validation
      if (!cardNumberRegex.test(cleanedCardNumber)) {
        Toast.show({
          type: "errorToast",
          text1: "Invalid card number format !!",
        });
        return;
      }

      // Expiry date format validation
      if (!expiryRegex.test(cardDetails?.expiry)) {
        Toast.show({
          type: "error",
          text1: "Invalid expiry date format !!",
          text2: "This is some something 👋",
        });
        return;
      }

      // Parse expiry date to check if it's in the future
      const [month, year] = cardDetails?.expiry.split("/").map(Number);
      const currentDate = new Date();
      const expiryDate = new Date(
        2000 + year,
        month - 1, // JS months are 0-based
        1
      );

      // Set to end of the expiry month
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      expiryDate.setDate(0); // last day of previous month

      if (expiryDate < currentDate) {
        Toast.show({
          type: "error",
          text1: "Your Card has expired !!",
          text2: "This is some something 👋",
        });
        return;
      }

      // CVV validation
      if (!cvvRegex.test(cardDetails?.cvv)) {
        Toast.show({
          type: "error",
          text1: "CVV should be 3 digits !!",
          text2: "This is some something 👋",
        });
        return;
      }

      const updatedUserData = {
        name: userData?.data.name,
        email: userData?.data.email,
        id: userData?.data.id,
      };
  
      // Call API to place order
      const response = await addToOrder(userData?.data, userCartData);
      Toast.show({
        type: "successToast",
        text1: "Order is placed successfully !!",
      });
      setActiveTab("PaymentResult");
    } catch (error) {
      console.log("The error is", error);
      Toast.show({
        type: "errorToast",
        text1: "Order couldn't be placed !!",
      });
    }
  };

  useEffect(() => {
    console.log("Card details changed: ", cardDetails);
  }, [cardDetails]);

  // Example data you’d pass in
  const recipient = {
    name: "Della Case",
    amount: 50,
    transactionId: "004672918",
    date: "July 8, 2019",
  };
  console.log("userData: ", userData);

  const getDetails = async () => {
    setLoading(true);
    try {
      const response = await getUserDetails(userData?.data.id, "personal");
      setLoading(false);
      setUserDetails(response?.user);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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

            {!loading ? (
              hasCompleteAddress(userDetails?.address) ? (
                <>
                  <CustomText weight="600" style={{ fontSize: 20 }}>
                    {userDetails?.firstName} {userDetails?.lastName}
                  </CustomText>

                  <CustomText style={{ fontSize: 18 }}>
                    {userDetails?.address.street}, {userDetails?.address.city}
                  </CustomText>
                  <CustomText style={{ fontSize: 18 }}>
                    {userDetails?.address.zipcode}, {userDetails?.address.state}
                  </CustomText>
                </>
              ) : (
                <CustomText style={{ fontSize: 20, color: "gray" }}>
                  No address found
                </CustomText>
              )
            ) : (
              <CustomText style={{ fontSize: 20, color: "gray" }}>
                Loading...
              </CustomText>
            )}
          </AddressView>
        </SectionContainer>

        {/* Card Details */}
        <SectionContainer>
          <CustomText weight="500" style={{ fontSize: 28 }}>
            Card Details
          </CustomText>
          <CreditCardInput
            cardDetails={cardDetails}
            setCardDetails={setCardDetails}
          />
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
              <CustomText style={{ fontSize: 18 }}>${totalAmount}.00</CustomText>
            </AmountRow>

            <AmountRow>
              <CustomText weight="600" style={{ fontSize: 18 }}>
                Delivery
              </CustomText>
              <CustomText style={{ fontSize: 18 }}>${totalAmount * 0.2}.00</CustomText>
            </AmountRow>

            <AmountRow>
              <CustomText weight="600" style={{ fontSize: 18 }}>
                Total
              </CustomText>
              <CustomText weight="600" style={{ fontSize: 20 }}>
                ${totalAmount + (totalAmount * 0.2)}.00
              </CustomText>
            </AmountRow>
          </TotalAmountView>
        </SectionContainer>
      </PageContainer>

      {/* Floating Checkout Button */}
      <CheckoutButton onPress={handlePayment}>
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
