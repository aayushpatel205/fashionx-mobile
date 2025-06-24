import React from "react";
import { View, Text } from "react-native";
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

const OrderPageCard = ({ order, date, totalCost, totalQuantity }) => {
  const { activeTab, setActiveTab, setActiveOrder, activeOrder } = useAppData();
  const status = order.status;

  const statusColorObject = {
    "Order Placed": "#0EA5E9", // blue-500
    Packing: "#FACC15", // yellow-400
    Shipped: "#8B5CF6", // purple-500
    "Out for Delivery": "#FB923C", // orange-400
    Delivered: "#16A34A", // green-600
  };

  // let statusColor = "bg-blue-500";
  // if (status === "Packing") {
  //   statusColor = "bg-yellow-400";
  // } else if (status === "Shipped") {
  //   statusColor = "bg-purple-500";
  // } else if (status === "Out for Delivery") {
  //   statusColor = "bg-orange-400";
  // } else if (status === "Delivered") {
  //   statusColor = "bg-green-600";
  // }
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
            Quantity:{" "}
          </CustomText>
          <CustomText weight="600" style={{ fontSize: 20, color: "#000" }}>
            {totalQuantity}
          </CustomText>
        </HorizontalContainer>

        <HorizontalContainer>
          <CustomText style={{ fontSize: 20, color: "#a9a9a9" }}>
            Total Amt:{" "}
          </CustomText>
          <CustomText weight="600" style={{ fontSize: 20, color: "#000" }}>
            ${totalCost}
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
