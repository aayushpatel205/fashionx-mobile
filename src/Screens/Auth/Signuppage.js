import { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import CustomText from "../../Components/CustomText";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import Toast from "react-native-toast-message";
import { userSignUp } from "../../api/userApis";

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

const Signuppage = ({ navigation }) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  return (
    <>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
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
                <View
                  style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 10 }}
                >
                  <View
                    style={{
                      padding: 20,
                      marginTop: 40,
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <CustomText
                      weight="600"
                      style={{ fontSize: 45, color: "black" }}
                    >
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
                        value={userDetails?.name}
                        onChangeText={(text) =>
                          setUserDetails({
                            ...userDetails,
                            name: text,
                          })
                        }
                      />
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
                          onPress={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                          name={
                            isPasswordVisible ? "eye-sharp" : "eye-off-sharp"
                          }
                          size={25}
                          color="black"
                        />
                      </PasswordView>

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

                    <Button
                      onPress={async () => {
                        try {
                          if (
                            !userDetails.name ||
                            !userDetails.email ||
                            !userDetails.password
                          ) {
                            Toast.show({
                              type: "errorToast",
                              text1: "Please fill all fields",
                            });
                            return;
                          }

                          if (!emailRegex.test(userDetails.email)) {
                            Toast.show({
                              type: "errorToast",
                              text1: "Please enter a valid email",
                            });
                            setUserDetails({
                              name: "",
                              email: "",
                              password: "",
                            });
                            return;
                          }
                          const response = await userSignUp(
                            userDetails.name,
                            userDetails.email,
                            userDetails.password
                          );
                          setUserDetails({ name: "", email: "", password: "" });
                          Toast.show({
                            type: "successToast",
                            text1: response.data.message,
                          });
                          navigation.navigate("Loginpage");
                        } catch (error) {
                          Toast.show({
                            type: "successToast",
                            text1: error.response.data.message
                          });
                        }
                      }}
                    >
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
    </>
  );
};

export default Signuppage;
