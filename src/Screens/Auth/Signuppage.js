import React from "react";
import {
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
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

const Signuppage = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
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
                    Sign Up
                  </CustomText>

                  <View
                    style={{
                      flexDirection: "column",
                      gap: 20,
                      marginTop: 25,
                    }}
                  >
                    <InputBox
                      placeholder="Enter name..."
                      keyboardType="default"
                    />
                    <InputBox
                      placeholder="Enter email..."
                      keyboardType="email-address"
                    />
                    <InputBox
                      placeholder="Enter password..."
                      secureTextEntry
                    />

                    <CustomText
                      onPress={() => navigation.navigate("Loginpage")}
                      weight="500"
                      style={{
                        fontSize: 16,
                        color: "black",
                        alignSelf: "flex-end",
                      }}
                    >
                      Already have an account?
                    </CustomText>
                  </View>

                  <Button>
                    <CustomText
                      weight="500"
                      style={{ fontSize: 20, color: "#fff" }}
                    >
                      Sign Up
                    </CustomText>
                  </Button>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Signuppage;
