import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, View } from "react-native";
import CustomText from "./CustomText";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { getUserDetails } from "../api/userApis";
import { deleteFromWishlist } from "../api/userApis";
import { userUpdateDetails } from "../api/userApis";
import { useUserData } from "../Context/UserContext";
import { useAppData } from "../Context/AppContext";
import Toast from "react-native-toast-message";

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

const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
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

const HorizontalProductCard = ({ element, userWishlist, setUserWishlist }) => {
  const { userData, setWishlistIdArray, wishlistIdArray } = useUserData();
  const [isFavourite, setIsFavourite] = useState(false);
  const { activeTab, setActiveTab, setActiveProduct } = useAppData();
  console.log(activeTab);

  useEffect(() => {
    wishlistIdArray.includes(element?._id)
      ? setIsFavourite(true)
      : setIsFavourite(false);
  }, []);
  const toggleFavourite = async () => {
    try {
      if (isFavourite) {
        const response = await deleteFromWishlist(
          userData?.data.id,
          element?._id
        );
        setWishlistIdArray((prev) => prev.filter((id) => id !== element?._id));
        setUserWishlist((prev) =>
          prev.filter((item) => item?._id !== element?._id)
        );

        Toast.show({
          type: "errorToast",
          text1: "Removed from favourites",
        });
      } else {
        const response = await userUpdateDetails({
          user_id: userData?.data.id,
          product: element,
          isWishlist: true,
        });
        Toast.show({
          type: "successToast",
          text1: "Added to favourites",
        });
        setWishlistIdArray([...wishlistIdArray, element?._id]);
        setUserWishlist([...userWishlist, element]);
      }
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ position: "relative", alignItems: "center", width: "100%" }}>
      <Container
        onPress={() => {
          setActiveTab("Product");
          setActiveProduct(element);
        }}
      >
        <View style={{ width: "30%", height: "100%" }}>
          <Image
            source={{ uri: element?.imgUrl }}
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
              {element?.productName}
            </CustomText>
            <CustomText weight="500" style={{ fontSize: 17, color: "grey" }}>
              Category:{" "}
              <CustomText weight="500" style={{ fontSize: 17, color: "#000" }}>
                {element?.category}
              </CustomText>
            </CustomText>
          </View>

          <View style={{ flexDirection: "row", gap: "35%" }}>
            <CustomText weight="600" style={{ fontSize: 20 }}>
              $ {element?.price}.00
            </CustomText>

            {activeTab === "OrderDetails" && (
              <CustomText
                weight="600"
                style={{ fontSize: 20, color: "#a9a9a9" }}
              >
                Qty:{" "}
                <CustomText weight="600" style={{ color: "#000" }}>
                  {element?.quantity}
                </CustomText>
              </CustomText>
            )}
          </View>
        </InnerContainer>
      </Container>

      {activeTab !== "OrderDetails" && (
        <IconWrapper onPress={toggleFavourite}>
          <FontAwesome6
            name={isFavourite ? "heart" : "heart"}
            solid={isFavourite}
            size={20}
            color={isFavourite ? "red" : "#6e6e6e"}
          />
        </IconWrapper>
      )}
    </View>
  );
};

export default HorizontalProductCard;
