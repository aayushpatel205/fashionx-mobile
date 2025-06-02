import { View, Text } from "react-native";
import ActionSheet from "react-native-actions-sheet";
function ExampleSheet() {
  return (
    <View>
      <ActionSheet isModal={false}>
        <Text>Hello World</Text>
      </ActionSheet>
    </View>
  );
}

export default ExampleSheet;
