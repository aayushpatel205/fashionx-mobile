import { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import CustomText from "../../Components/CustomText";
import styled from "styled-components";
import { userUpdate, getUserDetails } from "../../api/userApis";
import { useUserData } from "../../Context/UserContext";
import Toast from "react-native-toast-message";

const InputBox = styled.TextInput`
  background-color: #fff;
  padding: 15px;
  font-size: 17px;
  border-radius: 10px;
`;

const UpdateDetailsButton = styled.TouchableOpacity`
  position: absolute;
  width: 76%;
  bottom: 15px;
  left: 12%;
  background-color: #000;
  padding: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  z-index: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 10px;
  elevation: 5;
`;

const inputArray = [
  {
    label: "First Name",
    placeholder: "Enter first name...",
    type: "default",
    key: "firstName",
  },
  {
    label: "Last Name",
    placeholder: "Enter last name...",
    type: "default",
    key: "lastName",
  },
  {
    label: "Phone Number",
    placeholder: "Enter phone number...",
    type: "numeric",
    key: "phoneNumber",
  },
  {
    label: "Street",
    placeholder: "Enter street...",
    type: "default",
    key: "street",
  },
  { label: "City", placeholder: "Enter city...", type: "default", key: "city" },
  {
    label: "State",
    placeholder: "Enter state...",
    type: "default",
    key: "state",
  },
  {
    label: "Zipcode",
    placeholder: "Enter zipcode",
    type: "numeric",
    key: "zipcode",
  },
];

const Personaldetailspage = () => {
  const { userData } = useUserData();
  const [userDetails, setUserDetails] = useState({
    id: userData?.data.id,
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phoneNumber: "",
  });

  const [refreshing, setRefreshing] = useState(false); // state for pull-to-refresh

  const getDetails = async () => {
    try {
      const response = await getUserDetails(userData?.data.id, "personal");
      setUserDetails((prev) => ({
        ...prev,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.message.email,
        street: response.user.address.street,
        city: response.user.address.city,
        state: response.user.address.state,
        zipcode: response.user.address.zipcode,
        phoneNumber: response.user.phoneNumber,
      }));
    } catch (error) {
      Toast.show({
        type: "errorToast",
        text1: "Error fetching details",
      });
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleInputChange = (key, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getDetails();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5", width: "100%" }}>
      <ScrollView
        contentContainerStyle={{ padding: 15, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CustomText weight="600" style={{ fontSize: 35 }}>
          Personal Details
        </CustomText>

        <View style={{ gap: 25, marginTop: 25 }}>
          {inputArray.map((element, index) => (
            <View key={index} style={{ gap: 5 }}>
              <CustomText weight="600" style={{ fontSize: 25 }}>
                {element.label}
              </CustomText>
              <InputBox
                placeholder={element.placeholder}
                keyboardType={element.type}
                value={userDetails[element.key]}
                onChangeText={(text) => handleInputChange(element.key, text)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <UpdateDetailsButton
        onPress={async () => {
          try {
            const response = await userUpdate(userDetails);
            console.log(response.message);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <CustomText weight="600" style={{ fontSize: 20, color: "#fff" }}>
          Update Details
        </CustomText>
      </UpdateDetailsButton>
    </View>
  );
};

export default Personaldetailspage;
