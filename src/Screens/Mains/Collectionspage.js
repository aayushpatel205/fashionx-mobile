import { View, Image } from "react-native";
import CustomText from "../../Components/CustomText";
import { useAppData } from "../../Context/AppContext";
import styled from "styled-components";

const CategoryContainer = styled.TouchableOpacity`
  width: 88%;
  height: 22%;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  overflow: hidden;
  background-color: #fff;

  /* iOS shadow */
  shadow-color: #555555;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.8;
  shadow-radius: 18px;

  /* Android shadow */
  elevation: 5;

  margin-vertical: 16px;
`;

const TextView = styled.View`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Collectionspage = () => {
  const { setActiveTab } =
    useAppData();
  const categoryArray = [
    {
      category: "Men",
      image: require("../../../assets/about-us-image.avif"),
    },
    {
      category: "Women",
      image: require("../../../assets/women-style.jpg"),
    },
    {
      category: "Kids",
      image: require("../../../assets/kids-style.jpg"),
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        gap: 15,
        paddingVertical: 50,
      }}
    >
      {categoryArray?.map((element, index) => {
        return (
          <CategoryContainer
            key={index}
            onPress={() => {
              setActiveTab(element.category);
            }}
          >
            <View style={{ width: "50%", height: "100%" }}>
              <Image
                source={element.image}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </View>
            <TextView>
              <CustomText weight="600" style={{ fontSize: 35 }}>
                {element.category}
              </CustomText>
            </TextView>
          </CategoryContainer>
        );
      })}
    </View>
  );
};

export default Collectionspage;
