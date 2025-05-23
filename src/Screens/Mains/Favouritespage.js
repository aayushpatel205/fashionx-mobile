import React from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import HorizontalProductCard from "../../Components/HorizontalProductCard";

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
  },
}))``;

const Favouritespage = () => {
  return (
    <View style={{ flex: 1 , backgroundColor: "#f5f5f5" }}>
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
        <HorizontalProductCard />
        <HorizontalProductCard />
        <HorizontalProductCard />
        <HorizontalProductCard />
        <HorizontalProductCard />
        <HorizontalProductCard />
      </ProductScrollView>
    </View>
  );
};

export default Favouritespage;
