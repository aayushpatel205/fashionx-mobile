import React, { useRef } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import HeroImage from "../../../assets/test-fashion-image.webp";
import VerticalProductCard from "../../Components/VerticalProductCard";
import { useAppData } from "../../Context/AppContext";
import { SheetManager } from "react-native-actions-sheet";
import { SheetProvider } from "react-native-actions-sheet";

const Productpage = () => {
  const { setActiveTab } = useAppData();
  // const actionSheetRef = useRef<ActionSheet>null;
  return (
      <Wrapper>
        <Container>
          <Header>
            <Entypo
              name="chevron-small-left"
              size={40}
              color={"#000"}
              onPress={() => {
                setActiveTab("Mens");
              }}
            />
            <Title weight="700">Round Neck T-Shirt</Title>
          </Header>

          <ProductImageContainer>
            <StyledImage source={HeroImage} />
          </ProductImageContainer>

          <Content>
            <Row>
              <SizeButton onPress={() => SheetManager.show("example-sheet")}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 15,
                    alignItems: "center",
                  }}
                >
                  <CustomText style={{ fontSize: 18 }}>Size:</CustomText>
                  <CustomText weight="600" style={{ fontSize: 18 }}>
                    M
                  </CustomText>
                </View>
                <Entypo name="chevron-small-down" size={35} color={"#000"} />
              </SizeButton>
            </Row>
            <Row>
              <ProductName weight="700">Round Neck T-Shirt</ProductName>
              <Price weight="700">$ 25.5</Price>
            </Row>
            <Description>
              Short dress in soft cotton jersey with decorative buttons down the
              front and a wide, frill-trimmed square neckline with concealed
              elastication. Elasticated seam under the bust and short puff
              sleeves with a small frill trim.
            </Description>

            <Description>
              Short dress in soft cotton jersey with decorative buttons down the
              front and a wide, frill-trimmed square neckline with concealed
              elastication. Elasticated seam under the bust and short puff
              sleeves with a small frill trim.
            </Description>

            <Description>
              Short dress in soft cotton jersey with decorative buttons down the
              front and a wide, frill-trimmed square neckline with concealed
              elastication. Elasticated seam under the bust and short puff
              sleeves with a small frill trim.
            </Description>
          </Content>

          <View style={{ padding: 20, gap: 15 }}>
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
              <VerticalProductCard />
              <VerticalProductCard />
              <VerticalProductCard />
              <VerticalProductCard />
              <VerticalProductCard />
              <VerticalProductCard />
              <VerticalProductCard />
              <VerticalProductCard />
            </View>
          </View>
        </Container>

        <ButtonWrapper>
          <Gradient colors={["#ffffff80", "#ffffff00"]}>
            <CartButton>
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

const SizeButton = styled.TouchableOpacity`
  height: 40px;
  width: 37%;
  border: 1px solid #d3d3d3;
  border-radius: 7px;
  padding: 0px 15px;
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
  contentContainerStyle: {
    paddingBottom: 75, // enough to safely clear the floating button
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
`;

const Price = styled(CustomText)`
  font-size: 26px;
`;

const Description = styled(CustomText)`
  font-size: 17px;
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
  elevation: 5;
`;

const ButtonText = styled(CustomText)`
  color: #fff;
  font-size: 18px;
`;
