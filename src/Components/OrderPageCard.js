import React from "react";
import { View, Text, Dimensions } from "react-native";
import styled from "styled-components";
import CustomText from "./CustomText";
import { useAppData } from "../Context/AppContext";

// Get screen height
const { height: screenHeight } = Dimensions.get("window");

// Card height: 30% of screen height
const cardHeight = screenHeight * 0.245;

const OrderCard = styled.View`
  height: ${cardHeight}px;
  width: 95%;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  gap: 11%;
`;

const ButtonContainer = styled.TouchableOpacity`
  border: 1px solid #000;
  border-radius: 30px;
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

const OrderPageCard = ({ order, date, totalCost }) => {
  const { activeTab, setActiveTab, setActiveOrder, activeOrder } = useAppData();
  const status = order.status;

  const statusColorObject = {
    "Order Placed": "#0EA5E9", // blue-500
    Packing: "#FACC15", // yellow-400
    Shipped: "#8B5CF6", // purple-500
    "Out for Delivery": "#FB923C", // orange-400
    Delivered: "#16A34A", // green-600
  };

  return (
    <OrderCard>
      <CustomText
        style={{ fontSize: 18, color: "#a9a9a9", alignSelf: "flex-end" }}
      >
        {date}
      </CustomText>

      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <CustomText style={{ fontSize: 20, color: "#a9a9a9" }}>
          Order Id:{"  "}
        </CustomText>
        <CustomText
          numberOfLines={1}
          weight="600"
          style={{ fontSize: 20, color: "#000", width: "65%" }}
        >
          {order?._id}
        </CustomText>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <HorizontalContainer>
          <CustomText style={{ fontSize: 20, color: "#a9a9a9" }}>
            Products:{" "}
          </CustomText>
          <CustomText weight="600" style={{ fontSize: 20, color: "#000" }}>
            {order?.productInfo.length}
          </CustomText>
        </HorizontalContainer>

        <HorizontalContainer>
          <CustomText style={{ fontSize: 20, color: "#a9a9a9" }}>
            Total Amt:{" "}
          </CustomText>
          <CustomText weight="600" style={{ fontSize: 20, color: "#000" }}>
            ${parseInt(totalCost + 0.2 * totalCost)}
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
        <ButtonContainer
          onPress={() => {
            setActiveTab("OrderDetails");
            setActiveOrder(order);
          }}
        >
          <CustomText style={{ fontSize: 18 }}>Details</CustomText>
        </ButtonContainer>
        <CustomText
          weight="600"
          style={{ fontSize: 20, color: statusColorObject[status] }}
        >
          {status}
        </CustomText>
      </View>
    </OrderCard>
  );
};

export default OrderPageCard;
