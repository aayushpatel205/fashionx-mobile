import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import { useAppData } from "../../Context/AppContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import CustomText from "../../Components/CustomText";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import VerticalProductCard from "../../Components/VerticalProductCard";
import Feather from "react-native-vector-icons/Feather";
import { getProductByCategory } from "../../api/userApis";
import noProductImg from "../../../assets/no-product.jpg";
import { RefreshControl } from "react-native";

const ScrollCategory = styled(Pressable)`
  padding: 7px 20px;
  background-color: #000;
  border-radius: 25px;
  max-width: 45%;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  elevation: 4; /* Android shadow */
  shadow-color: #000; /* iOS shadow */
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
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

const Dynamiccollectionspage = ({
  allProducts,
  setAllProducts,
  showSearch,
  setShowSearch,
}) => {
  const { activeTab } = useAppData();
  const [filters, setFilters] = useState({
    category: [activeTab],
    subCategory: [],
  });
  const categoryArray = ["Topwear", "Bottomwear", "Winterwear"];
  // const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Low to High");
  const [refreshing, setRefreshing] = useState(false);

  const params = {
    "Low to High": "asc",
    "High to Low": "desc",
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const categoryString = filters.category.join(",");
      let subCategoryString = filters.subCategory.join(",");
      if (!subCategoryString || subCategoryString.length === 0) {
        subCategoryString = "Topwear,Bottomwear,Winterwear";
      }

      const response = await getProductByCategory(
        categoryString,
        subCategoryString,
        params[sortBy]
      );
      setAllProducts(response.data);
    } catch (error) {
      console.log("Error while refreshing: ", error);
    } finally {
      setRefreshing(false);
      setShowSearch(false);
    }
  };

  useEffect(() => {
    const categoryString = filters.category.join(",");
    let subCategoryString = filters.subCategory.join(",");
    if (!subCategoryString || subCategoryString.length === 0) {
      subCategoryString = "Topwear,Bottomwear,Winterwear";
    }

    const getProductsByCategory = async () => {
      try {
        const response = await getProductByCategory(
          categoryString,
          subCategoryString,
          params[sortBy]
        );
        setAllProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getProductsByCategory();
  }, [filters.category, filters.subCategory]);

  useEffect(() => {
    const sortedProducts = [...allProducts].sort((a, b) => {
      if (sortBy === "Low to High") {
        return a.price - b.price;
      } else if (sortBy === "High to Low") {
        return b.price - a.price;
      }
    });
    setAllProducts(sortedProducts);
  }, [sortBy]);
  const handleCategoryPress = (element) => {
    if (filters.subCategory.includes(element)) {
      setFilters({
        ...filters,
        subCategory: filters.subCategory.filter((item) => item !== element),
      });
    } else {
      setFilters({
        ...filters,
        subCategory: [...filters.subCategory, element],
      });
    }
  };

  if (loading) {
    return (
      <ActivityIndicator style={{ marginTop: 100 }} size={60} color={"#000"} />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <CategoryView>
          <View>
            {!showSearch && (
              <CustomText weight="600" style={{ fontSize: 40 }}>
                {activeTab}
              </CustomText>
            )}

            {!showSearch && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: "row",
                  gap: 10,
                  paddingVertical: 5,
                }}
              >
                {categoryArray.map((element, index) => (
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
                    {filters.subCategory.includes(element) && (
                      <Feather name="check" size={21} color={"#fff"} />
                    )}
                  </ScrollCategory>
                ))}
              </ScrollView>
            )}
          </View>

          <View
            style={{
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

            <Pressable
              onPress={() => {
                setSortBy(
                  sortBy === "Low to High" ? "High to Low" : "Low to High"
                );
              }}
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <FontAwesome6
                name={
                  sortBy === "Low to High"
                    ? "arrow-down-short-wide"
                    : "arrow-up-short-wide"
                }
                size={23}
                color="black"
              />

              <CustomText weight="500" style={{ fontSize: 17 }}>
                Price:{" "}
                {sortBy === "Low to High"
                  ? "Lowest to Highest"
                  : "Highest to Lowest"}
              </CustomText>
            </Pressable>
          </View>
        </CategoryView>

        <ScrollView
          contentContainerStyle={{
            paddingTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 15,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 20,
            ...(allProducts?.length === 0 && { marginVertical: "45%" }), // apply only if no products
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {allProducts?.length === 0 ? (
            <View style={{ width: "100%", alignItems: "center", gap: 10 }}>
              <CustomText weight="600" style={{ fontSize: 30 }}>
                No products found
              </CustomText>
              <Image source={noProductImg} style={{ height: 70, width: 70 }} />
            </View>
          ) : (
            allProducts?.map((element, index) => (
              <VerticalProductCard element={element} key={index} />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dynamiccollectionspage;
