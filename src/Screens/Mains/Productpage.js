import React, { useRef, useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import VerticalProductCard from "../../Components/VerticalProductCard";
import { useAppData } from "../../Context/AppContext";
import { getProductByCategory } from "../../api/userApis";
import { useUserData } from "../../Context/UserContext";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { deleteFromWishlist, userUpdateDetails } from "../../api/userApis";
import { CheckoutButton } from "./Cartpage";


const Productpage = ({ showSearch, setShowSearch }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [selectedSize, setSelectedSize] = useState("S");
  const { activeTab, setActiveTab, activeProduct, setActiveProduct } =
    useAppData();
  const { userData, userCartData, setUserCartData, wishlistIdArray } =
    useUserData();
  const [relatedProducts, setRelatedProducts] = useState([]);
  // const actionSheetRef = useRef<ActionSheet>null;
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const scrollRef = useRef(null);

  console.log("activeProduct: ", activeProduct?._id);

  const getRelatedProducts = async () => {
    let newResponse = await getProductByCategory(
      activeProduct?.category,
      activeProduct?.subCategory,
      "asc"
    );
    // console.log(newResponse.data);
    newResponse = newResponse?.data
      .filter((item) => item._id !== activeProduct?._id)
      .slice(0, 5);
    setRelatedProducts(newResponse);
  };

  const handleIconPress = async () => {
    console.log("Heart icon pressed!");
    try {
      if (isFavourite) {
        const response = await deleteFromWishlist(
          userData?.data.id,
          activeProduct?._id
        );
        wishlistIdArray.filter((id) => id !== activeProduct?._id);
        console.log("Is removed !!", response);
      } else {
        const response = await userUpdateDetails({
          user_id: userData?.data.id,
          product: activeProduct,
          isWishlist: true,
        });
        wishlistIdArray.push(activeProduct?._id);
        // console.log("Is added !!", response);
      }
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.log(error);
    }
    // You can toggle favorite state or trigger animation here
  };

  useEffect(() => {
    wishlistIdArray.includes(activeProduct?._id)
      ? setIsFavourite(true)
      : setIsFavourite(false);
  }, [activeProduct]);

  useEffect(() => {
    if (activeProduct) {
      getRelatedProducts();
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [activeProduct]);

  return (
    <Wrapper>
      <Container ref={scrollRef}>
        <Header>
          <Entypo
            name="chevron-small-left"
            size={40}
            color={"#000"}
            onPress={() => {
              setActiveTab(activeProduct?.category);
            }}
          />
          <Title weight="700" numberOfLines={1}>
            {activeProduct?.productName}
          </Title>
        </Header>

        <ProductImageContainer>
          <StyledImage source={{ uri: activeProduct?.imgUrl }} />
          <IconWrapper>
            <FontAwesome6
              onPress={handleIconPress}
              name={isFavourite ? "heart" : "heart"}
              solid={isFavourite}
              size={23}
              color={isFavourite ? "red" : "#6e6e6e"}
            />
          </IconWrapper>
        </ProductImageContainer>

        <Content>
          <Row>
            <View
              style={{
                width: "100%",
                position: "relative",
                flexDirection: "row",
                gap: 30,
                alignItems: "center",
              }}
            >
              <SizeButton onPress={() => setShowSizeDropdown((prev) => !prev)}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 15,
                    alignItems: "center",
                  }}
                >
                  <CustomText style={{ fontSize: 18 }}>Size:</CustomText>
                  <CustomText weight="600" style={{ fontSize: 18 }}>
                    {selectedSize}
                  </CustomText>
                </View>
                <Entypo
                  name={
                    showSizeDropdown ? "chevron-small-up" : "chevron-small-down"
                  }
                  size={35}
                  color={"#000"}
                />
              </SizeButton>

              {showSizeDropdown && (
                <DropdownOverlay>
                  {sizes.map((size) => (
                    <SizeOption
                      key={size}
                      onPress={() => {
                        setSelectedSize(size);
                        setShowSizeDropdown(false);
                      }}
                    >
                      <CustomText style={{ fontSize: 18 }}>{size}</CustomText>
                    </SizeOption>
                  ))}
                </DropdownOverlay>
              )}

              {/* <IconWrapper>
                <FontAwesome6
                  name={isFavourite ? "heart" : "heart"}
                  solid={isFavourite}
                  size={20}
                  color={isFavourite ? "red" : "#6e6e6e"}
                />
              </IconWrapper> */}
            </View>
          </Row>

          <Row>
            <ProductName weight="700">{activeProduct?.productName}</ProductName>
            <Price weight="700">$ {activeProduct?.price - 0.01}</Price>
          </Row>
          <Description>
            {activeProduct?.productDescription
              ? activeProduct?.productDescription
              : "No description available"}
          </Description>
        </Content>

        <View style={{ marginVertical: 20, paddingHorizontal: 20, gap: 15 }}>
          <CustomText weight="700" style={{ fontSize: 30 }}>
            Related Products
          </CustomText>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            {relatedProducts?.map((item, index) => {
              return <VerticalProductCard element={item} key={index} />;
            })}
          </View>
        </View>
      </Container>

      <ButtonWrapper>
        <Gradient colors={["#ffffff80", "#ffffff00"]}>
          <CartButton
            onPress={() => {
              if (
                userCartData?.some(
                  (item) =>
                    item._id === activeProduct?._id &&
                    item.selectedSize === selectedSize
                )
              ) {
                setUserCartData(
                  userCartData?.map((item) => {
                    if (
                      item._id === activeProduct?._id &&
                      item.selectedSize === selectedSize
                    ) {
                      return {
                        ...item,
                        quantity: item.quantity + 1,
                      };
                    }
                    return item;
                  })
                );
              } else {
                setUserCartData([
                  ...(userCartData || []), // Ensure it's an array before spreading
                  { ...activeProduct, selectedSize, quantity: 1 },
                ]);
              }
            }}
          >
            <ButtonText weight="700" style={{ fontSize: 20 }}>
              Add to Cart
            </ButtonText>
          </CartButton>
        </Gradient>
      </ButtonWrapper>
      {/* <ActionSheet ref={actionSheetRef}>
        <Text>Hi, I am here.</Text>
      </ActionSheet> */}
    </Wrapper>
  );
};

export default Productpage;

const IconWrapper = styled.TouchableOpacity`
  height: 42px;
  width: 42px;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 5;
  /* position: absolute;
  z-index: 100;
  right: 0px;
  bottom: -5px; */
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

const DropdownOverlay = styled.View`
  position: absolute;
  top: 45px;
  width: 37%;
  border: 1px solid #d3d3d3;
  border-radius: 7px;
  background-color: #fff;
  z-index: 10;
  elevation: 6;
`;

const SizeOption = styled.TouchableOpacity`
  padding: 10px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

SizeOption.defaultProps = {
  activeOpacity: 0.7,
};

const SizeButton = styled.TouchableOpacity`
  height: 40px;
  width: 37%;
  border: 1px solid #d3d3d3;
  border-radius: 7px;
  padding: 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

// Styled Components
const Wrapper = styled.View`
  flex: 1;
`;

const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 65, // enough to safely clear the floating button
  },
})`
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;
  gap: 7%;
`;

const Title = styled(CustomText)`
  font-size: 20px;
  width: 75%;
`;

const ProductImageContainer = styled.View`
  height: 470px;
  position: relative;
`;

const StyledImage = styled.Image`
  height: 100%;
  width: 100%;
`;

const Content = styled.View`
  padding: 15px;
  gap: 15px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProductName = styled(CustomText)`
  font-size: 26px;
  width: 72%;
`;

const Price = styled(CustomText)`
  font-size: 26px;
`;

const Description = styled(CustomText)`
  font-size: 20px;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;

const Gradient = styled(LinearGradient)`
  border-radius: 50px;
  padding: 3px;
`;

const CartButton = styled(TouchableOpacity)`
  background-color: #000;
  width: 300px;
  height: 60px;
  padding-vertical: 14px;
  padding-horizontal: 50px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 10px;
  elevation: 5;
`;

const ButtonText = styled(CustomText)`
  color: #fff;
  font-size: 18px;
`;
