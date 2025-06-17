import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import TabNavigation from "../../Components/TabNavigation";
import styled from "styled-components/native";
import Homepage from "./Homepage";
import Favouritespage from "./Favouritespage";
import Cartpage from "./Cartpage";
import Profilepage from "./Profilepage";
import { useAppData } from "../../Context/AppContext";
import Collectionspage from "./Collectionspage";
import Aboutuspage from "./Aboutuspage";
import Dynamiccollectionspage from "./Dynamiccollectionspage";
import Productpage from "./Productpage";
import MyOrdersPage from "./MyOrdersPage";
import OrderDetails from "./OrderDetails";
import Personaldetailspage from "./Personaldetailspage";
import Sidebar from "../../Components/Sidebar";
import { StatusBar } from "react-native";
import Checkoutpage from "./Checkoutpage";

const MainContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeTab, setActiveTab } = useAppData();
  const [allProducts, setAllProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const renderScreen = () => {
    useEffect(() => {
      if (activeTab === "Product") {
        setShowSearch(false);
      }
    }, [activeTab]);

    const dynamicTabs = ["Men", "Women", "Kids"];

    if (dynamicTabs.includes(activeTab)) {
      return (
        <Dynamiccollectionspage
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
        />
      );
    }

    switch (activeTab) {
      case "Home":
        return <Homepage />;
      case "Favourites":
        return <Favouritespage />;
      case "Cart":
        return <Cartpage />;
      case "Profile":
        return <Profilepage />;
      case "Collections":
        return <Collectionspage />;
      case "AboutUs":
        return <Aboutuspage />;
      case "Product":
        return (
          <Productpage showSearch={showSearch} setShowSearch={setShowSearch} />
        );
      case "MyOrders":
        return <MyOrdersPage />;
      case "OrderDetails":
        return <OrderDetails />;
      case "PersonalDetails":
        return <Personaldetailspage />;
      case "Checkout":
        return <Checkoutpage />;
      default:
        return null;
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <MainContainer>
        <Navbar
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          searchText={searchText}
          setSearchText={setSearchText}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <ContentContainer>{renderScreen()}</ContentContainer>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </MainContainer>
      <Sidebar visible={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default MainLayout;
