import React, { useState, useEffect } from "react";
import { View, ScrollView , ActivityIndicator } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import CustomText from "../../Components/CustomText";
import { useAppData } from "../../Context/AppContext";
import OrderPageCard from "../../Components/OrderPageCard";
import { getUserOrders } from "../../api/userApis";
import { useUserData } from "../../Context/UserContext";

const MyOrdersPage = () => {
  const { activeTab, setActiveTab } = useAppData();
  const { userData } = useUserData();
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const convertIntoDate = (dateStr) => {
    const date = new Date(dateStr);
    function getOrdinal(num) {
      if (num > 3 && num < 21) return "th";
      switch (num % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getUTCFullYear();

    const formattedDate = `${day}${getOrdinal(day)} ${month}, ${year}`;
    return formattedDate;
  };

  const getMyOrders = async () => {
    try {
      const response = await getUserOrders(userData?.data.id);
      console.log("Order recieved: ", response);
      setUserOrders(response.orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, [userData]);

  if (loading) {
      return (
        <ActivityIndicator style={{ marginTop: 100 }} size={65} color={"#000"} />
      );
    }

  return (
    <ScrollView
      style={{ flex: 1, padding: 10, backgroundColor: "#f5f5f5" }}
      contentContainerStyle={{ paddingBottom: 35 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: "18%" }}>
        <Entypo
          name="chevron-small-left"
          size={45}
          color={"#000"}
          onPress={() => {
            setActiveTab("Profile");
          }}
        />
        <CustomText weight="600" style={{ fontSize: 35 }}>
          My Orders
        </CustomText>
      </View>

      <View style={{ alignItems: "center", marginTop: 20, gap: 30 }}>
        {userOrders?.map((element, index) => {
          const totalCost = element.productInfo.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          // totalQuantity using reduce
          const totalQuantity = element.productInfo.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          const date = convertIntoDate(element?.createdAt);
          return <OrderPageCard key={index} order={element} date={date} totalCost={totalCost} totalQuantity={totalQuantity}/>;
        })}
      </View>
    </ScrollView>
  );
};

export default MyOrdersPage;
