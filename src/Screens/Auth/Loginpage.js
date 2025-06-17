import React, { useState } from "react";
import { TextInput, View } from "react-native";
import CustomText from "../../Components/CustomText";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import { userLogin } from "../../api/userApis";
import Toast from "react-native-toast-message";
import { useUserData } from "../../Context/UserContext";

const PasswordView = styled.View`
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 15px;
  align-items: center;
  border-radius: 10px;
`;

const InputBox = styled.TextInput`
  background-color: #fff;
  padding: 15px;
  font-size: 17px;
  border-radius: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: #000;
  padding: 14px;
  border-radius: 30px;
  align-items: center;
  margin-top: 20px;
`;
const Loginpage = ({ navigation }) => {
  const {userData , setUserData} = useUserData();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 10 }}>
          <View
            style={{
              padding: 20,
              marginTop: 50,
              flexDirection: "column",
              gap: 10,
            }}
          >
            <CustomText weight="600" style={{ fontSize: 45, color: "black" }}>
              Login
            </CustomText>

            <View
              style={{
                flexDirection: "column",
                gap: 20,
                marginTop: 25,
              }}
            >
              <InputBox
                placeholder="Enter email..."
                keyboardType="email-address"
                value={userDetails?.email}
                onChangeText={(text) =>
                  setUserDetails({
                    ...userDetails,
                    email: text,
                  })
                }
              />
              <PasswordView>
                <InputBox
                  style={{ width: "93%" }}
                  placeholder="Enter password..."
                  secureTextEntry={!isPasswordVisible}
                  value={userDetails?.password}
                  onChangeText={(text) =>
                    setUserDetails({
                      ...userDetails,
                      password: text,
                    })
                  }
                />
                <Ionicons
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  name={isPasswordVisible ? "eye-sharp" : "eye-off-sharp"}
                  size={25}
                  color="black"
                />
              </PasswordView>

              <CustomText
                onPress={() => navigation.navigate("Signuppage")}
                weight="500"
                style={{ fontSize: 16, color: "black", alignSelf: "flex-end" }}
              >
                Don't have an account?
              </CustomText>
            </View>

            <Button
              onPress={async () => {
                try {
                  if (!userDetails.email || !userDetails.password) {
                    alert("Please enter email and password");
                    return;
                  }
                  if (!emailRegex.test(userDetails.email)) {
                    alert("Please enter valid email");
                    setUserDetails({ email: "", password: "" });
                    return;
                  }
                  const response = await userLogin(
                    userDetails.email,
                    userDetails.password
                  );
                  setUserData({
                    ...userData,
                    isVerified: true,
                    data: {
                      name: response.data.user.name,
                      email: response.data.user.email,
                      token: response.data.token,
                      id: response.data.user._id,
                    },
                    profilePicture: response?.data.user.profilePicture,
                  });
                  alert(response?.data?.message);
                  navigation.replace("Mainlayout");
                } catch (error) {
                  alert(error?.response?.data?.message);
                }
              }}
            >
              <CustomText weight="500" style={{ fontSize: 20, color: "#fff" }}>
                Login
              </CustomText>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Loginpage;
