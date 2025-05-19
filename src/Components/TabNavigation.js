import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: "Home", icon: "home" },
    { name: "Favourites", icon: "heart" },
    { name: "Cart", icon: "shopping-cart" },
    { name: "Profile", icon: "user" },
  ];

  return (
    <TabBar>
      {tabs.map((tab, index) => (
        <TabItem key={index} onPress={() => setActiveTab(tab.name)}>
          <FontAwesome
            name={tab.icon}
            size={25}
            color={activeTab === tab.name ? "#000" : "#bbb"}
          />
          <TabLabel active={activeTab === tab.name}>{tab.name}</TabLabel>
        </TabItem>
      ))}
    </TabBar>
  );
};

export default TabNavigation;

// Styled Components

const TabBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 0px 30px 0px;
  border-top-width: 1px;
  border-color: #eaeaea;
  background-color: #fff;
`;

const TabItem = styled.TouchableOpacity`
  align-items: center;
`;

const TabLabel = styled.Text`
  font-size: 14px;
  margin-top: 4px;
  color: ${(props) => (props.active ? "#000" : "#d3d3d3")};
`;
