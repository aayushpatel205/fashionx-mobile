import { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components";
import CustomText from "./CustomText";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useUserData } from "../Context/UserContext";
import { userUpdateDetails } from "../api/userApis";

// Get screen height
const { height: screenHeight } = Dimensions.get("window");

// Card height: 25% of screen height
const cardHeight = screenHeight * 0.165;

const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  width: 100%;
  height: ${130}px;
  border-radius: 15px;
  overflow: hidden;
  flex-direction: row;
  background-color: #fff;
  margin-bottom: 15px;
`;

const InnerContainer = styled.View`
  width: 70%;
  height: 100%;
  padding: 15px;
  flex-direction: column;
  gap: 12%;
`;

const DropdownMenu = styled.View`
  position: absolute;
  top: 15px;
  right: 7px;
  background-color: #fff;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  elevation: 5;
  z-index: 10;
`;

const DropdownOption = styled.TouchableOpacity`
  padding: 10px 15px;
  border-bottom-width: ${(props) => (props.last ? "0px" : "1px")};
  border-bottom-color: #ddd;
`;

const CartProductCard = ({ element }) => {
  const { userCartData, setUserCartData, userData, wishlistIdArray } = useUserData();
  const [quantity, setQuantity] = useState(element?.quantity);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setUserCartData(
      userCartData.map((item) => {
        if (
          item._id === element._id &&
          item.selectedSize === element.selectedSize
        ) {
          return { ...item, quantity: Number(quantity) };
        }
        return item;
      })
    );
  }, [quantity]);

  const handleAddToFavourites = async () => {
    const response = await userUpdateDetails({
      user_id: userData?.data.id,
      product: element,
      isWishlist: true,
    });
    wishlistIdArray.push(element?._id);
    console.log("Added to Favourites");
    setShowDropdown(false);
  };

  const handleDeleteFromCart = () => {
    setUserCartData(
      userCartData.filter(
        (item) =>
          !(
            item._id === element._id &&
            item.selectedSize === element.selectedSize
          )
      )
    );
    setShowDropdown(false);
  };

  return (
    <Container onPress={() => setShowDropdown(!showDropdown)}>
      <View style={{ width: "30%", height: "100%" }}>
        <Image
          source={{ uri: element?.imgUrl }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <InnerContainer>
        <CustomText
          numberOfLines={1}
          weight="600"
          style={{ fontSize: 18, width: "90%" }}
        >
          {element.productName}
        </CustomText>

        <CustomText weight="500" style={{ fontSize: 16, color: "grey" }}>
          Size:{" "}
          <CustomText weight="500" style={{ fontSize: 16, color: "#000" }}>
            {element?.selectedSize}
          </CustomText>
        </CustomText>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <FontAwesome6
              name="circle-plus"
              size={30}
              color="#000"
              onPress={() => setQuantity(quantity + 1)}
            />
            <CustomText weight="600" style={{ fontSize: 21, color: "#000" }}>
              {quantity}
            </CustomText>
            <FontAwesome6
              name="circle-minus"
              size={30}
              color="#000"
              onPress={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            />
          </View>

          <CustomText weight="600" style={{ fontSize: 21, color: "#000" }}>
            $ {element?.price}
          </CustomText>
        </View>
      </InnerContainer>

      <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={22}
          color="#808080"
          style={{ position: "absolute", right: 5, top: 13 }}
        />
      </TouchableOpacity>

      {/* Dropdown menu */}
      {showDropdown && (
        <DropdownMenu>
          <DropdownOption onPress={handleDeleteFromCart} last>
            <CustomText weight="500" style={{ fontSize: 16, color: "#ff0000" }}>
              Delete from Cart
            </CustomText>
          </DropdownOption>
        </DropdownMenu>
      )}
    </Container>
  );
};

export default CartProductCard;
