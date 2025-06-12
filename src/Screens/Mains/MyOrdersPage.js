import React from "react";
import { View, ScrollView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import CustomText from "../../Components/CustomText";
import { useAppData } from "../../Context/AppContext";
import OrderPageCard from "../../Components/OrderPageCard";

const MyOrdersPage = () => {
  const { activeTab, setActiveTab } = useAppData();

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
        <OrderPageCard />
        <OrderPageCard />
        <OrderPageCard />
        <OrderPageCard />
        <OrderPageCard />
      </View>
    </ScrollView>
  );
};

export default MyOrdersPage;
