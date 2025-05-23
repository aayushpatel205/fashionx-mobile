import React, { useState } from "react";
import { Image, Text, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import VerticalProductCard from "../../Components/VerticalProductCard";

const Overlay = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const TextStyle = styled(CustomText)`
  font-size: 60px;
  color: #fff;
`;

const Homepage = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 550 }}>
            <Image
              source={require("../../../assets/fashionx-homepage-black.jpg")}
              style={{ height: "100%", width: "100%" }}
            />
            <Overlay />
            <View
              style={{
                flexDirection: "column",
                position: "absolute",
                bottom: "0%",
                left: "5%",
              }}
            >
              <TextStyle weight="700">Discover</TextStyle>
              <TextStyle weight="700">Your</TextStyle>
              <TextStyle weight="700">Style.</TextStyle>
            </View>
          </View>

          <View style={{ padding: 20 , gap: 5 }}>
            <CustomText weight="700" style={{ fontSize: 35, color: "black" }}>
              Latest Arrivals
            </CustomText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 20, paddingVertical: 10 }}
            >
              <VerticalProductCard />
              <VerticalProductCard />
              <VerticalProductCard />
              <VerticalProductCard />
              <VerticalProductCard />
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Homepage;
