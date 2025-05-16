import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: 'home' },
    { name: 'Favourites', icon: 'heart' },
    { name: 'Cart', icon: 'shopping-cart' },
    { name: 'Profile', icon: 'user' },
  ];

  return (
    <Container>
      <Screen>
        <Text style={{ fontSize: 24, color: '#000' }}>{activeTab} Screen</Text>
      </Screen>

      <TabBar>
        {tabs.map((tab, index) => (
          <TabItem key={index} onPress={() => setActiveTab(tab.name)}>
            <FontAwesome
              name={tab.icon}
              size={25}
              color={activeTab === tab.name ? '#000' : '#bbb'}
            />
            <TabLabel active={activeTab === tab.name}>{tab.name}</TabLabel>
          </TabItem>
        ))}
      </TabBar>
    </Container>
  );
};

export default TabNavigation;

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Screen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 0;
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
  color: ${(props) => (props.active ? '#000' : '#d3d3d3')};
`;

