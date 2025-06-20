import React, { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import HorizontalProductCard from "../../Components/HorizontalProductCard";
import { useUserData } from "../../Context/UserContext";
import { getUserDetails } from "../../api/userApis";

const ScrollCategory = styled.View`
  padding: 7px 20px;
  background-color: #000;
  border-radius: 25px;
  max-width: 45%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CategoryView = styled.View`
  padding: 10px 20px 15px 20px;
  background-color: #fff;
  z-index: 10;
  border-bottom-width: 0.5px;
  border-bottom-color: #d3d3d3;
  flex-direction: column;
  gap: 10px;
`;

const ProductScrollView = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
  bounces: true,
  decelerationRate: "fast",
  contentContainerStyle: {
    gap: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 45,
    paddingHorizontal: 20,
  },
}))``;

const Favouritespage = () => {
  const [userWishlist, setUserWishlist] = useState([]);
  const { userData, wishlistIdArray, setWishlistIdArray } = useUserData();
  const [loading, setLoading] = useState(true);

  const getWishlistData = async () => {
    try {
      const category = "wishlist";
      const response = await getUserDetails(userData?.data.id, category);
      console.log("response: ", response);
      setLoading(false);
      console.log("The wishlist is: ", response?.userWishlist);
      setUserWishlist(response?.userWishlist);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlistData();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator style={{ marginTop: 100 }} size={60} color={"#000"} />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <CategoryView>
        <View>
          <CustomText weight="600" style={{ fontSize: 40 }}>
            Favourites
          </CustomText>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              gap: 10,
              paddingVertical: 5,
            }}
          >
            <ScrollCategory>
              <CustomText weight="600" style={{ fontSize: 17, color: "#fff" }}>
                TopWear
              </CustomText>
            </ScrollCategory>

            <ScrollCategory>
              <CustomText weight="600" style={{ fontSize: 17, color: "#fff" }}>
                BottomWear
              </CustomText>
            </ScrollCategory>

            <ScrollCategory>
              <CustomText weight="600" style={{ fontSize: 17, color: "#fff" }}>
                Winterwear
              </CustomText>
            </ScrollCategory>
          </ScrollView>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="filter-outline" size={23} color="black" />
            <CustomText weight="500" style={{ fontSize: 17 }}>
              Filters
            </CustomText>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <FontAwesome6
              name="arrow-down-short-wide"
              size={23}
              color="black"
            />
            <CustomText weight="500" style={{ fontSize: 17 }}>
              Price: Lowest to Highest
            </CustomText>
          </View>
        </View>
      </CategoryView>

      <ProductScrollView>
        {userWishlist.map((item) => (
          <HorizontalProductCard
            setUserWishlist={setUserWishlist}
            element={item}
            userWishlist={userWishlist}
            key={item._id}
          />
        ))}
      </ProductScrollView>
    </View>
  );
};

export default Favouritespage;
