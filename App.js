import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/Navigation/AuthStack";
import { AppContextProvider } from "./src/Context/AppContext";
import {
  useFonts,
  Outfit_100Thin,
  Outfit_200ExtraLight,
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_800ExtraBold,
  Outfit_900Black,
} from "@expo-google-fonts/outfit";

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit_100Thin,
    Outfit_200ExtraLight,
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
    Outfit_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <AppContextProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </AppContextProvider>
  );
}
