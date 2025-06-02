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

const MainContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const MainLayout = () => {
  const { activeTab, setActiveTab } = useAppData();

  const renderScreen = () => {
  const dynamicTabs = ["Mens", "Women", "Kids"];

  if (dynamicTabs.includes(activeTab)) {
    return <Dynamiccollectionspage />;
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
      return <Productpage/>
    default:
      return "Hiiii";
  }
};

  return (
    <MainContainer>
      <Navbar />
      <ContentContainer>{renderScreen()}</ContentContainer>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </MainContainer>
  );
};

export default MainLayout;
