import React from "react";
import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../../Components/CustomText";
import styled from "styled-components/native";
import Navbar from "../../Components/Navbar";
import TabNavigation from "../../Components/TabNavigation";
// <FontAwesome name="bars" size={30} color="#333" />


const Container = styled.View`
  flex: 1;
`;

const Homepage = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 , backgroundColor: "#fff"}}>
        <Container>
          <Navbar/>
          <TabNavigation/>
          {/* <CustomText weight="500" style={{ fontSize: 40, color: "red" }}>
            Homepage
          </CustomText> */}
        </Container>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Homepage;
