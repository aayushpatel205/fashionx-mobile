import { ScrollView, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import CustomText from "../../Components/CustomText";
import HorizontalProductCard from "../../Components/HorizontalProductCard";
import { useAppData } from "../../Context/AppContext";

const OrderDetails = () => {
  const { setActiveTab, activeOrder } = useAppData();
  const status = activeOrder.status;

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

  const date = convertIntoDate(activeOrder?.createdAt);

  const statusColorObject = {
    "Order Placed": "#0EA5E9", // blue-500
    Packing: "#FACC15", // yellow-400
    Shipped: "#8B5CF6", // purple-500
    "Out for Delivery": "#FB923C", // orange-400
    Delivered: "#16A34A", // green-600
  };
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
            setActiveTab("MyOrders");
          }}
        />
        <CustomText weight="600" style={{ fontSize: 32 }}>
          Order Details
        </CustomText>
      </View>

      <View style={{ padding: 15, gap: 15 , marginTop: 5}}>
        <CustomText
          style={{ fontSize: 21, color: "#a9a9a9", alignSelf: "flex-end" }}
        >
          {date}
        </CustomText>

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <CustomText style={{ fontSize: 22, color: "#a9a9a9" }}>
            Id:{" "}
          </CustomText>
          <CustomText
            weight="600"
            style={{ fontSize: 22, color: "#000", marginTop: 2 }}
          >
            {activeOrder?._id}
          </CustomText>
        </View>

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <CustomText style={{ fontSize: 22, color: "#a9a9a9" }}>
            Status:{" "}
          </CustomText>
          <CustomText
            weight="600"
            style={{
              fontSize: 22,
              color: statusColorObject[status],
              marginTop: 2,
            }}
          >
            {status}
          </CustomText>
        </View>

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <CustomText style={{ fontSize: 22, color: "#a9a9a9" }}>
            Products:{" "}
          </CustomText>
          <CustomText
            weight="600"
            style={{ fontSize: 22, color: "#000", marginTop: 2 }}
          >
            {activeOrder.productInfo.length}
          </CustomText>
        </View>
        <View style={{ gap: 25, marginTop: 10 }}>
          {activeOrder?.productInfo.map((item) => {
            return <HorizontalProductCard element={item} key={item._id} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetails;
