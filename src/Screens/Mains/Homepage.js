import React from "react";
import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../../Components/CustomText";

const Homepage = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <CustomText weight="500" style={{ fontSize: 40, color: "red" }}>
            Homepage
          </CustomText>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Homepage;
