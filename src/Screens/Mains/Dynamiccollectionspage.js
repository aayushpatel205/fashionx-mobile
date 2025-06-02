import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { useAppData } from "../../Context/AppContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import CustomText from "../../Components/CustomText";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import VerticalProductCard from "../../Components/VerticalProductCard";
import Feather from "react-native-vector-icons/Feather";


const ScrollCategory = styled(Pressable)`
  padding: 7px 20px;
  background-color: #000;
  border-radius: 25px;
  max-width: 45%;
  flex-direction: row;
  gap: 5px;
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

const Dynamiccollectionspage = () => {
  const { activeTab } = useAppData();
  const categoryArray = ["TopWear", "BottomWear", "Winterwear"];
  const [activeCategory, setActiveCategory] = useState(["TopWear"]);

  const handleCategoryPress = (element) => {
    if (activeCategory.includes(element)) {
      setActiveCategory(activeCategory.filter((item) => item !== element));
      return;
    } else {
      setActiveCategory([...activeCategory, element]);
      return;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <CategoryView>
          <View>
            <CustomText weight="600" style={{ fontSize: 40 }}>
              {activeTab}
            </CustomText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "row",
                gap: 10,
                paddingVertical: 5,
              }}
            >
              {categoryArray?.map((element, index) => {
                return (
                  <ScrollCategory
                    key={index}
                    onPress={() => handleCategoryPress(element)}
                  >
                    <CustomText
                      weight="600"
                      style={{ fontSize: 17, color: "#fff" }}
                    >
                      {element}
                    </CustomText>
                    {activeCategory.includes(element) && (
                      <Feather name="check" size={21} color={"#fff"} />
                    )}
                  </ScrollCategory>
                );
              })}
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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Ionicons name="filter-outline" size={23} color="black" />
              <CustomText weight="500" style={{ fontSize: 17 }}>
                Filters
              </CustomText>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
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

        <ScrollView
          contentContainerStyle={{
            padding: 20,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <VerticalProductCard />
          <VerticalProductCard />
          <VerticalProductCard />
          <VerticalProductCard />
          <VerticalProductCard />
          <VerticalProductCard />
          <VerticalProductCard />
          <VerticalProductCard />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dynamiccollectionspage;
