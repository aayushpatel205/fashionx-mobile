import ActionSheet, { registerSheet } from "react-native-actions-sheet";
import ExampleSheet from "./Components/ExampleSheet.js";

registerSheet("example-sheet", function () {
  return (
    <View>
      <ActionSheet>
        <View>
          <Text>Example Sheet</Text>
        </View>
      </ActionSheet>
    </View>
  );
});

export {};
