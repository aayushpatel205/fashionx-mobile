import { View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "../../Components/CustomText";
import { Button } from "../Auth/Loginpage";
import { useAppData } from "../../Context/AppContext";
import { useUserData } from "../../Context/UserContext";

const getDateSuffix = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// Format today's date
const getFormattedDate = () => {
  const today = new Date();
  const day = today.getDate();
  const suffix = getDateSuffix(day);
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  return `${day}${suffix} ${month}, ${year}`;
};

export default function PaymentResultPage() {
  const { setActiveTab } = useAppData();
  const { userCartData, userData , setUserCartData } = useUserData();
  const totalAmount = userCartData?.reduce(
    (acc, item) => acc + (item.price * item.quantity || 0),
    0
  );

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
              $ {totalAmount}
            </CustomText>
            <CustomText weight="600" style={{ fontSize: 27 }}>
              {userData?.data.name}
            </CustomText>
          </View>

          <View style={{ alignItems: "center", gap: 10, marginTop: 15 }}>
            <CustomText style={{ fontSize: 20 }}>
              Date: {getFormattedDate()}
            </CustomText>
          </View>

          <Button
            style={{ width: "100%" }}
            onPress={() => {
              setActiveTab("Home");
              setUserCartData([]);
            }}
          >
            <CustomText weight="600" style={{ color: "#fff", fontSize: 21 }}>
              Continue Shopping
            </CustomText>
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
