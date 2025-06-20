import React from "react";
import { View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "../../Components/CustomText";
import { Button } from "../Auth/Loginpage";

export default function PaymentResultPage({ // assuming react-navigation stack
  recipientName,
  amount,
  transactionId,
  date,
}) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <PageContainer>
        <CardWrapper>
          <IconCircle>
            <MaterialIcons name="check" size={48} color="#fff" />
          </IconCircle>

          <CustomText weight="600" style={{ fontSize: 32 }}>
            Payment Successful
          </CustomText>

          <View style={{ alignItems: "center", gap: 10 }}>
            <CustomText weight="600" style={{ fontSize: 27 }}>
              $ 450.00
            </CustomText>
            <CustomText weight="600" style={{ fontSize: 27 }}>
              Aayush Patel
            </CustomText>
          </View>

          <View style={{ alignItems: "center", gap: 10 , marginTop: 15}}>
            <CustomText style={{fontSize: 20}}>Transaction ID: {transactionId}</CustomText>
            <CustomText style={{fontSize: 20}}>Date: {date}</CustomText>
          </View>

          <Button style={{ width: "100%" }} onPress={() => navigation.navigate("Home")}>
            <CustomText style={{ color: "#fff", fontSize: 20 }}>Continue Shopping</CustomText>
          </Button>
        </CardWrapper>
      </PageContainer>
    </ScrollView>
  );
}

// Styled components
const PageContainer = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

const CardWrapper = styled.View`
  width: 85%;
  background-color: #fff;
  border-radius: 20px;
  gap: 15px;
  padding: 30px 20px;
  align-items: center;
`;

const IconCircle = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: green;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
