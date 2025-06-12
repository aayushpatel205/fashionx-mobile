import React from "react";
import { View , Text } from "react-native";
import styled from "styled-components";
import CustomText from "./CustomText";
import { useAppData } from "../Context/AppContext";

const OrderCard = styled.View`
  height: 200px;
  width: 95%;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  gap: 12px;
`;

const ButtonContainer = styled.TouchableOpacity`
  border: 1px solid #000;
  border-radius: 20px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  align-items: center;
  justify-content: center;
`;

const HorizontalContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const OrderPageCard = () => {
    const {activeTab , setActiveTab} = useAppData();
  return (
    <OrderCard>
      <CustomText
        style={{ fontSize: 18, color: "#a9a9a9", alignSelf: "flex-end" }}
      >
        15th Jan , 2025
      </CustomText>

      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <CustomText style={{ fontSize: 20, color: "#a9a9a9" }}>
          Order Id:{" "}
        </CustomText>
        <CustomText weight="600" style={{ fontSize: 20, color: "#000" }}>
          12345aghaghkhkgwwhkg
        </CustomText>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <HorizontalContainer>
          <CustomText style={{ fontSize: 20, color: "#a9a9a9" }}>
            Quantity:{" "}
          </CustomText>
          <CustomText weight="600" style={{ fontSize: 20, color: "#000" }}>
            4
          </CustomText>
        </HorizontalContainer>

        <HorizontalContainer>
          <CustomText style={{ fontSize: 20, color: "#a9a9a9" }}>
            Total Amt:{" "}
          </CustomText>
          <CustomText weight="600" style={{ fontSize: 20, color: "#000" }}>
            $112
          </CustomText>
        </HorizontalContainer>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ButtonContainer onPress={() => setActiveTab("OrderDetails")}>
          <CustomText style={{ fontSize: 18 }}>Details</CustomText>
        </ButtonContainer>
        <CustomText weight="600" style={{ fontSize: 20, color: "green" }}>
          Delivered
        </CustomText>
      </View>
    </OrderCard>
  );
};

export default OrderPageCard;
