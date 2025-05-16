import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../Screens/Mains/Homepage';
import Loginpage from '../Screens/Auth/Loginpage';
import Signuppage from '../Screens/Auth/Signuppage';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Signuppage" component={Signuppage} />
      <Stack.Screen name="Loginpage" component={Loginpage} />
      <Stack.Screen name="Homepage" component={Homepage} />
    </Stack.Navigator>
  );
};

export default AuthStack;
