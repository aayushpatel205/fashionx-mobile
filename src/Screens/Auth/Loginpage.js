import React from "react";
import { TextInput, View } from "react-native";
import CustomText from "../../Components/CustomText";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";

const InputBox = styled.TextInput`
  background-color: #fff;
  padding: 15px;
  font-size: 17px;
`;

const Button = styled.TouchableOpacity`
  background-color: #000;
  padding: 14px;
  border-radius: 30px;
  align-items: center;
  margin-top: 20px;
`;
const Loginpage = ({navigation}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 10 }}>
          <Ionicons name="chevron-back" size={40} color="black" />

          <View
            style={{
              padding: 20,
              marginTop: 40,
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
              />

              <InputBox
                placeholder="Enter password..."
                keyboardType="visible-password"
              />

              <CustomText
                onPress={() => navigation.navigate("Signuppage")}
                weight="500"
                style={{ fontSize: 16, color: "black", alignSelf: "flex-end" }}
              >
                Don't have an account?
              </CustomText>
            </View>

            <Button onPress={() => navigation.navigate("Homepage")}>
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
