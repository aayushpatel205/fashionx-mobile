import React from "react";
import { ScrollView, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import CustomText from "../../Components/CustomText";
import HorizontalProductCard from "../../Components/HorizontalProductCard";
import { useAppData } from "../../Context/AppContext";


const OrderDetails = () => {
  const {activeTab , setActiveTab} = useAppData();
  return (
    <ScrollView
      style={{ flex: 1, padding: 10, backgroundColor: "#f5f5f5" }}
      contentContainerStyle={{ paddingBottom: 25 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: "15%" }}>
        <Entypo
          name="chevron-small-left"
          size={45}
          color={"#000"}
          onPress={() => {
            setActiveTab("Profile");
          }}
        />
        <CustomText weight="600" style={{ fontSize: 32 }}>
          Order Details
        </CustomText>
      </View>

      <View style={{ padding: 15, gap: 15 }}>
        <CustomText
          style={{ fontSize: 20, color: "#a9a9a9", alignSelf: "flex-end" }}
        >
          15th Jan , 2025
        </CustomText>

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <CustomText style={{ fontSize: 22, color: "#a9a9a9" }}>
            Order Id:{" "}
          </CustomText>
          <CustomText
            weight="600"
            style={{ fontSize: 22, color: "#000", marginTop: 2 }}
          >
            12345aghaghkhkgwwhkg
          </CustomText>
        </View>

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <CustomText style={{ fontSize: 22, color: "#a9a9a9" }}>
            Status:{" "}
          </CustomText>
          <CustomText
            weight="600"
            style={{ fontSize: 22, color: "green", marginTop: 2 }}
          >
            Delivered
          </CustomText>
        </View>

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <CustomText style={{ fontSize: 22, color: "#a9a9a9" }}>
            No of Items:{" "}
          </CustomText>
          <CustomText
            weight="600"
            style={{ fontSize: 22, color: "#000", marginTop: 2 }}
          >
            3
          </CustomText>
        </View>
        <View style={{ gap: 25 }}>
          <HorizontalProductCard />
          <HorizontalProductCard />
          <HorizontalProductCard />
          <HorizontalProductCard />
          <HorizontalProductCard />
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetails;
