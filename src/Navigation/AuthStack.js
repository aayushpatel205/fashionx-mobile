import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "../Screens/Mains/Homepage";
import Loginpage from "../Screens/Auth/Loginpage";
import Signuppage from "../Screens/Auth/Signuppage";
import MainLayout from "../Screens/Mains/MainLayout";
import Favouritespage from "../Screens/Mains/Favouritespage";
import Cartpage from "../Screens/Mains/Cartpage";
import Collectionspage from "../Screens/Mains/Collectionspage";
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Mainlayout" component={MainLayout} />
      <Stack.Screen name="Signuppage" component={Signuppage} />
      <Stack.Screen name="Loginpage" component={Loginpage} />
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="Favouritespage" component={Favouritespage} />
      <Stack.Screen name="Cartpage" component={Cartpage} />
      <Stack.Screen name="Collectionpage" component={Collectionspage} />
    </Stack.Navigator>
  );
};

export default AuthStack;
