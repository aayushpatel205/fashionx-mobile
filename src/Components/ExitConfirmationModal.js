import { Modal } from "react-native";
import styled from "styled-components/native";
import CustomText from "./CustomText";

export default function ExitConfirmationModal({
  visible,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <ModalContainer>
          <CustomText style={{ fontSize: 20, marginBottom: 30 }}>
            Are you sure you want to exit?
          </CustomText>
          <ButtonRow>
            <Button style={{ backgroundColor: "#a9a9a9" }} onPress={onCancel}>
              <CustomText weight="600" style={{ color: "#fff", fontSize: 18 }}>
                Cancel
              </CustomText>
            </Button>
            <Button onPress={onConfirm}>
              <CustomText weight="600" style={{ color: "#fff", fontSize: 18 }}>
                Exit
              </CustomText>
            </Button>
          </ButtonRow>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

// Styled Components

const Button = styled.TouchableOpacity`
  background-color: #000;
  padding: 10px;
  width: 35%;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  background-color: #fff;
  border-radius: 12px;
  padding: 24px 20px;
  width: 80%;
  align-items: center;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;


