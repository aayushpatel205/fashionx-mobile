import React, { useState } from "react";
import { View, TextInput } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Feather from "react-native-vector-icons/Feather";
import CustomText from "./CustomText";
import styled from "styled-components/native";

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom-width: 0.5px;
  border-bottom-color: #d3d3d3;
  background-color: #fff;
`;

const SearchContainer = styled.View`
  width: 100%;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom-width: 0.5px;
  border-bottom-color: #d3d3d3;
`;

const SearchInput = styled.TextInput`
  width: 100%;
  padding: 13px 18px;
  border-radius: 10px;
  background-color: #f0f0f0;
  color: #000;
  font-size: 16px;
`;

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    setSearchText("");
  };

  return (
    <>
      <Container>
        <FontAwesome6 name="bars-staggered" size={27} color="#333" />
        <CustomText weight="500" style={{ fontSize: 30, color: "black" }}>
          Fashion
          <CustomText weight="500" style={{ fontSize: 30, color: "grey" }}>
            X
          </CustomText>
        </CustomText>

        <Feather
          name={showSearch ? "x" : "search"}
          size={30}
          color="#333"
          onPress={toggleSearch}
        />
      </Container>

      {showSearch && (
        <SearchContainer>
          <SearchInput
            placeholder="Search products..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </SearchContainer>
      )}
    </>
  );
};

export default Navbar;
