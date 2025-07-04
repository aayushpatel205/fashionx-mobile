import { useState } from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Feather from "react-native-vector-icons/Feather";
import CustomText from "./CustomText";
import styled from "styled-components/native";
import { getProductBySearch } from "../api/userApis";
import { useAppData } from "../Context/AppContext";

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 26%;
  padding: 0px 15px 10px 15px;
  border-bottom-width: 0.5px;
  border-bottom-color: #d3d3d3;
  background-color: #fff;
  position: relative;
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

const Navbar = ({
  setAllProducts,
  showSearch,
  setShowSearch,
  searchText,
  setSearchText,
  setSidebarOpen,
}) => {
  const { activeTab, setActiveTab } = useAppData();

  const [loading, setLoading] = useState(false);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    setSearchText("");
  };
  // useEffect(() => {
  //   console.log(activeTab);
  // }, []);

  return (
    <>
      <Container>
        <FontAwesome6
          name="bars-staggered"
          size={27}
          color="#333"
          onPress={() => setSidebarOpen(true)}
        />
        <CustomText weight="500" style={{ fontSize: 30, color: "black" }}>
          Fashion
          <CustomText weight="500" style={{ fontSize: 30, color: "grey" }}>
            X
          </CustomText>
        </CustomText>

        {(activeTab === "Men" ||
          activeTab === "Women" ||
          activeTab === "Kids") && (
          <Feather
            style={{ position: "absolute", right: 15 , bottom: 15 }}
            name={showSearch ? "x" : "search"}
            size={30}
            color="#333"
            onPress={toggleSearch}
          />
        )}
      </Container>

      {showSearch && (
        <SearchContainer>
          <SearchInput
            placeholder="Search products..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => {
              if (!searchText) return;
              const getProductsBySearch = async () => {
                try {
                  const searchedProducts = [];
                  setLoading(true);
                  const response = await getProductBySearch(searchText);
                  response?.data.data.map((element) => {
                    return searchedProducts.push(element?.item);
                  });
                  setAllProducts(searchedProducts);
                  setLoading(false);
                } catch (error) {
                  console.log("Error: ", error);
                  setLoading(false);
                }
                setSearchText("");
              };
              getProductsBySearch();
            }}
            returnKeyType="search"
          />
        </SearchContainer>
      )}
    </>
  );
};

export default Navbar;
