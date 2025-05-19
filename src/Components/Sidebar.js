import React, { useRef } from "react";
import { Dimensions, TouchableOpacity, Animated } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "./CustomText";

const { width, height } = Dimensions.get("window");

const SidebarContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  height: ${height}px;
  width: ${width * 0.6}px;
  background-color: #020403;
  padding: 40px 20px 20px 20px;
  z-index: 999;
  flex-direction: column;
  gap: 30px;
`;

// Backdrop overlay (Animated)
const Backdrop = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  height: ${height}px;
  width: ${width}px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 998;
`;

const MenuItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-left: 15px;
`;

const MenuIcon = styled(Icon)`
  color: #fff;
  font-size: 24px;
  margin-right: 20px;
`;

const LogoutButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
  margin-left: 15px;
`;

const Sidebar = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-width * 0.9)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width * 0.9,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <>
      {visible && (
        <Backdrop style={{ opacity: backdropOpacity }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
        </Backdrop>
      )}

      <SidebarContainer style={{ transform: [{ translateX: slideAnim }] }}>
        <Ionicons
          name="close"
          size={30}
          color="#fff"
          style={{ marginLeft: -10 }}
          onPress={() => onClose()}
        />

        <MenuItem
          onPress={() => {
            onClose();
          }}
        >
          <MenuIcon name="folder-multiple-outline" />
          <CustomText weight="600" style={{ fontSize: 21, color: "#fff" }}>
            Collections
          </CustomText>
        </MenuItem>

        <MenuItem
          onPress={() => {
            onClose();
          }}
        >
          <MenuIcon name="information-outline" />
          <CustomText weight="600" style={{ fontSize: 21, color: "#fff" }}>
            About Us
          </CustomText>
        </MenuItem>

        <MenuItem
          onPress={() => {
            onClose();
          }}
        >
          <MenuIcon name="clipboard-list-outline" />
          <CustomText weight="600" style={{ fontSize: 21, color: "#fff" }}>
            My Orders
          </CustomText>
        </MenuItem>

        <LogoutButton
          onPress={() => {
            onClose();
          }}
        >
          <MenuIcon name="logout" />
          <CustomText weight="600" style={{ fontSize: 21, color: "#fff" }}>
            Logout
          </CustomText>
        </LogoutButton>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
