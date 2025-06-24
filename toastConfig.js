import { Text, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

const toastConfig = {
  successToast: ({ text1 }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 60,
        backgroundColor: "#1c1c1c", // black background
        borderRadius: 8,
        paddingHorizontal: 16,
      }}
    >
      {/* Green circular icon */}
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 16,
          backgroundColor: "#28a745",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 12,
        }}
      >
        <Entypo name="check" size={20} color="#fff" />
      </View>

      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {text1}
      </Text>
    </View>
  ),

  errorToast: ({ text1 }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 60,
        backgroundColor: "#1c1c1c", // black background
        borderRadius: 8,
        paddingHorizontal: 16,
      }}
    >
      {/* Red circular icon */}
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 16,
          backgroundColor: "#dc3545",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 12,
        }}
      >
        <Entypo name="cross" size={20} color="#fff" />
      </View>

      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {text1}
      </Text>
    </View>
  ),
};

export default toastConfig;
