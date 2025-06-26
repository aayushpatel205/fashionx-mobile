import { useEffect, useState } from "react";
import styled from "styled-components/native";
import CustomText from "./CustomText";
import { useAppData } from "../Context/AppContext";
import { userUpdateDetails, deleteFromWishlist } from "../api/userApis";
import { useUserData } from "../Context/UserContext";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Toast from "react-native-toast-message";
import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const CardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  max-height: 340px;
  width: ${screenWidth * 0.42}px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  flex-direction: column;
  gap: 5px;
`;

const ImageContainer = styled.View`
  height: 210px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 2px;
  bottom: -10px;
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

const DetailsContainer = styled.View`
  display: flex;
  padding: 5px;
  gap: 5px;
  width: 92%;
  margin-top: 2px;
`;

const VerticalProductCard = ({ element }) => {
  const { userData, wishlistIdArray } = useUserData();
  const [isFavourite, setIsFavourite] = useState();
  const { setActiveTab, setActiveProduct } = useAppData();

  useEffect(() => {
    wishlistIdArray.includes(element?._id)
      ? setIsFavourite(true)
      : setIsFavourite(false);
  }, []);

  const handleIconPress = async () => {
    try {
      if (isFavourite) {
        const response = await deleteFromWishlist(
          userData?.data.id,
          element?._id
        );
        wishlistIdArray.filter((id) => id !== element?._id);
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
        wishlistIdArray.push(element?._id);
        Toast.show({
          type: "successToast",
          text1: "Added to favourites",
        });
      }
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardContainer
      onPress={() => {
        setActiveTab("Product");
        setActiveProduct(element);
      }}
    >
      <ImageContainer>
        <ProductImage source={{ uri: element?.imgUrl }} />
        <IconWrapper onPress={handleIconPress}>
          <FontAwesome6
            name={isFavourite ? "heart" : "heart"}
            solid={isFavourite}
            size={20}
            color={isFavourite ? "red" : "#6e6e6e"}
          />
        </IconWrapper>
      </ImageContainer>

      <DetailsContainer>
        <CustomText
          numberOfLines={2}
          weight="600"
          style={{ fontSize: 18, color: "#6e6e6e" }}
        >
          {element?.productName}
        </CustomText>
        <CustomText weight="700" style={{ fontSize: 22, color: "#1a1a1a" }}>
          $ {element?.price - 0.01}
        </CustomText>
      </DetailsContainer>
    </CardContainer>
  );
};

export default VerticalProductCard;
