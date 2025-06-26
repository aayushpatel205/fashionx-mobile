import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import Ionicons from "react-native-vector-icons/Ionicons";
import HorizontalProductCard from "../../Components/HorizontalProductCard";
import { useUserData } from "../../Context/UserContext";
import { getUserDetails } from "../../api/userApis";
import Toast from "react-native-toast-message";

const CategoryView = styled.View`
  padding: 10px 20px 10px 20px;
  background-color: #fff;
  z-index: 10;
  border-bottom-width: 0.5px;
  border-bottom-color: #d3d3d3;
  flex-direction: column;
  gap: 10px;
`;

const ProductScrollView = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
  bounces: true,
  decelerationRate: "fast",
  contentContainerStyle: {
    gap: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 45,
    paddingHorizontal: 20,
  },
}))``;

const Favouritespage = () => {
  const [userWishlist, setUserWishlist] = useState([]);
  const { userData } = useUserData();
  const [loading, setLoading] = useState(true);

  const getWishlistData = async () => {
    try {
      const category = "wishlist";
      const response = await getUserDetails(userData?.data.id, category);
      setLoading(false);
      setUserWishlist(response?.userWishlist);
    } catch (error) {
      Toast.show({
        type: "errorToast",
        text1: "Error fetching favourites",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlistData();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator style={{ marginTop: 100 }} size={60} color={"#000"} />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <CategoryView>
        <View>
          <CustomText weight="600" style={{ fontSize: 40 }}>
            Favourites
          </CustomText>
        </View>
      </CategoryView>

      <ProductScrollView>
        {userWishlist.length > 0 ? (
          userWishlist?.map((item) => (
            <HorizontalProductCard
              setUserWishlist={setUserWishlist}
              element={item}
              userWishlist={userWishlist}
              key={item._id}
            />
          ))
        ) : (
          <View style={{ gap: 15, alignItems: "center", marginTop: "40%" }}>
            <Ionicons name="heart-dislike-outline" size={90} color="#000" />
            <CustomText style={{ fontSize: 30, color: "#000" }}>
              No favourites yet
            </CustomText>
          </View>
        )}
      </ProductScrollView>
    </View>
  );
};

export default Favouritespage;
