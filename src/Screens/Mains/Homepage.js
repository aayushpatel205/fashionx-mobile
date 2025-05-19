import React, { useState } from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import Navbar from "../../Components/Navbar";
import TabNavigation from "../../Components/TabNavigation";

const Container = styled.View`
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const renderScreen = () => {
    switch (activeTab) {
      case "Home":
        return <Text>Home Screen Content</Text>;
      case "Favourites":
        return <Text>Favourites Screen Content</Text>;
      case "Cart":
        return <Text>Cart Screen Content</Text>;
      case "Profile":
        return <Text>Profile Screen Content</Text>;
      default:
        return <Text>Home Screen Content</Text>;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <Text>HHJHIIILILY</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Homepage;
