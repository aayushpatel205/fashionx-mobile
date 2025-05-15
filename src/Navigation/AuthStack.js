import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../Screens/Mains/Homepage';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Homepage" component={Homepage} />
    </Stack.Navigator>
  );
};

export default AuthStack;
