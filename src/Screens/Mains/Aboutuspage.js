import styled from "styled-components/native";
import CustomText from "../../Components/CustomText";
import AboutUsImage from "../../../assets/about-us-image.webp";

const Aboutuspage = () => {
  return (
    <Container>
      <BackgroundImage source={AboutUsImage} />
      <BlackOverlay />

      <ContentScroll
        contentContainerStyle={{
          padding: 24,
          paddingTop: 100,
          paddingBottom: 60,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Heading weight="600">About Us</Heading>
        <Paragraph>
          FashionX was born out of a passion for innovation and a desire to
          revolutionize the way people shop online.{"\n\n"}
          Our journey began with a simple idea: to provide a platform where
          customers can easily discover, explore, and purchase a wide range of
          products from the comfort of their homes.{"\n\n"}
          Since our inception, we've worked tirelessly to curate a diverse
          selection of high-quality products that cater to every taste and
          preference.{"\n\n"}
        </Paragraph>
        <Heading weight="600">Our Mission</Heading>
        <Paragraph>
          Our mission at FashionX is to empower customers with choice,
          convenience, and confidence. We're dedicated to providing a seamless
          shopping experience that exceeds expectations, from browsing and
          ordering to delivery and beyond.
        </Paragraph>
      </ContentScroll>
    </Container>
  );
};

export default Aboutuspage;

// Styled Components
const Container = styled.View`
  flex: 1;
  position: relative;
`;

const BackgroundImage = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
`;

const BlackOverlay = styled.View`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  height: 100%;
  width: 100%;
`;

const ContentScroll = styled.ScrollView`
  flex: 1;
`;

const Heading = styled(CustomText)`
  color: #fff;
  font-size: 45px;
  margin-bottom: 24px;
  text-align: center;
`;

const Paragraph = styled(CustomText)`
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 28px;
`;
