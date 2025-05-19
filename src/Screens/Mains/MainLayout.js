import React, { useState } from "react";
import { View, Text } from "react-native";
import Navbar from "../../Components/Navbar";
import TabNavigation from "../../Components/TabNavigation";
import styled from "styled-components/native";
import { Screen } from "react-native-screens";
import Signuppage from "../Auth/Signuppage";
import Homepage from "./Homepage";
import Favouritespage from "./Favouritespage";
import Cartpage from "./Cartpage";

const MainContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const renderScreen = () => {
    switch (activeTab) {
      case "Home":
        return <Homepage />;
      case "Favourites":
        return <Favouritespage />;
      case "Cart":
        return <Cartpage />;
      case "Profile":
        return <Text>Profile Screen Content</Text>;
      default:
        return <Text>Home Screen Content</Text>;
    }
  };

  return (
    <MainContainer>
      <Navbar />
      <ContentContainer>{renderScreen()}</ContentContainer>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </MainContainer>
  );
};

export default MainLayout;
