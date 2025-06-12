import React, { useEffect, useState } from "react";
import { Image, Text, ScrollView , ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import VerticalProductCard from "../../Components/VerticalProductCard";
import HeroImage from "../../../assets/fashionx-homepage-black.jpg";
import { getAllProducts } from "../../api/userApis";

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
  const [loading, setLoading] = useState(true);
  const [latestProducts, setLatestProducts] = useState([]);
  const getData = async () => {
    try {
      const response = await getAllProducts("asc");
      const length = response?.data.length;
      setLatestProducts(response.data.slice(length - 5, length));
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ height: 550 }}>
            <Image
              source={HeroImage}
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

          <View style={{ padding: 20, gap: 5 }}>
            <CustomText weight="700" style={{ fontSize: 38, color: "black" }}>
              Latest Arrivals
            </CustomText>
            {loading ? (
              <ActivityIndicator
                style={{marginTop: 20}}
                size={60}
                color={"#000"}
              />
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 20, paddingVertical: 10 }}
              >
                {latestProducts?.map((element, index) => {
                  return <VerticalProductCard key={index} element={element} />;
                })}
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Homepage;
