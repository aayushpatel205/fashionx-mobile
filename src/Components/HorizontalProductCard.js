import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, View } from "react-native";
import CustomText from "./CustomText";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { getUserDetails } from "../api/userApis";
import { deleteFromWishlist } from "../api/userApis";
import { userUpdateDetails } from "../api/userApis";

const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  z-index: 100;
  right: 0px;
  bottom: -5px;
  background-color: #fff;
  padding: 8px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 10px;
  elevation: 2;
`;

const Container = styled.View`
  position: relative;
  width: 100%;
  z-index: -10;
  height: 125px;
  border-radius: 15px;
  overflow: hidden;
  flex-direction: row;
  background-color: #fff;
`;

const InnerContainer = styled.View`
  width: 70%;
  height: 100%;
  padding: 15px 10px;
  flex-direction: column;
  gap: 10px;
`;

const HorizontalProductCard = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const getWishlistData = async () => {
    const category = "wishlist";
    const response = await getUserDetails(userData?.data.id, category);
    const productIDArray = response?.data.userWishlist.map((item) => item._id);
    // setWishlistData(response?.data.userWishlist);
    productIDArray.includes(id) ? setIsFavourite(true) : setIsFavourite(false);
  };

  useEffect(() => {
    getWishlistData();
  }, []);
  const toggleFavourite = async () => {
    try {
      // if (isFavourite) {
      //   const response = await deleteFromWishlist(
      //     userData?.data.id,
      //     productData?._id
      //   );
      //   console.log("Is removed !!", response);
      // } else {
      //   const response = await userUpdateDetails({
      //     user_id: userData?.data.id,
      //     product: productData,
      //     isWishlist: true,
      //   });
      //   console.log("Is added !!", response);
      // }
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.log(error);
    }
    // setIsFavourite(!isFavourite);
  };

  return (
    <View style={{ position: "relative", alignItems: "center", width: "100%" }}>
      <Container>
        <View style={{ width: "30%", height: "100%", borderWidth: 1 }}>
          <Image
            source={require("../../assets/test-fashion-image.webp")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <InnerContainer>
          <View style={{ flexDirection: "column", gap: 10 }}>
            <CustomText
              numberOfLines={1}
              weight="600"
              style={{ fontSize: 18, width: "96%" }}
            >
              Men's Round Neck T-Shirt egjjhgghjghg
            </CustomText>
            <CustomText weight="500" style={{ fontSize: 16, color: "grey" }}>
              Category:{" "}
              <CustomText weight="500" style={{ fontSize: 16, color: "#000" }}>
                Topwear
              </CustomText>
            </CustomText>
          </View>

          <View style={{ flexDirection: "row", gap: "20%" }}>
            <CustomText weight="600" style={{ fontSize: 20 }}>
              $ 25.5
            </CustomText>
            <CustomText weight="600" style={{ fontSize: 20 }}>
              <CustomText style={{ color: "#a9a9a9" }}>Qty:</CustomText> 4
            </CustomText>
          </View>
        </InnerContainer>
      </Container>

      <IconWrapper onPress={toggleFavourite}>
        <FontAwesome6
          name={isFavourite ? "heart" : "heart"}
          solid={isFavourite}
          size={20}
          color={isFavourite ? "red" : "#6e6e6e"}
        />
      </IconWrapper>
    </View>
  );
};

export default HorizontalProductCard;
