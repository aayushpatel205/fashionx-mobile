import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  View,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import VerticalProductCard from "../../Components/VerticalProductCard";
import HeroImage from "../../../assets/fashionx-homepage-black.jpg";
import { getAllProducts, getUserDetails } from "../../api/userApis";
import { useUserData } from "../../Context/UserContext";
import Toast from "react-native-toast-message";

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
  const { userData, setWishlistIdArray } = useUserData();
  const [loading, setLoading] = useState(true);
  const [latestProducts, setLatestProducts] = useState([]);
  const getData = async () => {
    try {
      const response = await getAllProducts("asc");
      const length = response?.data.length;
      setLatestProducts(response.data.slice(length - 5, length));
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: "errorToast",
        text1: "Error fetching products",
      });
      setLoading(false);
    }
  };

  const getWishlistData = async () => {
    try {
      const category = "wishlist";
      const response = await getUserDetails(userData?.data.id, category);
      setLoading(false);
      const idArray = response?.userWishlist.map((item) => item._id);
      setWishlistIdArray(idArray);
    } catch (error) {
      Toast.show({
        type: "errorToast",
        text1: "Error fetching favourites",
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Do you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true; // prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    getData();
    getWishlistData();
    return () => backHandler.remove(); // cleanup
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
                style={{ marginTop: 20 }}
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
