import React from "react";
import { View } from "react-native";
import VerticalProductCard from "../../Components/VerticalProductCard";

const Profilepage = () => {
  return (
    <View style={{ flex: 1, padding: 20, flexDirection: "row", gap: 20 , flexWrap: "wrap"}}>
      <VerticalProductCard />
      <VerticalProductCard />
      <VerticalProductCard />
      <VerticalProductCard />
      <VerticalProductCard />
      <VerticalProductCard />
      <VerticalProductCard />
      <VerticalProductCard />
    </View>
  );
};

export default Profilepage;
