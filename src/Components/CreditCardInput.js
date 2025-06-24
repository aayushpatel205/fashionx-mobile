import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View, Image } from "react-native";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import masterCardLogo from "../../assets/mastercard-logo.png";

// Gradient wrapper for the card
const CardWrapper = styled(LinearGradient).attrs({
  colors: ["#000000", "#0f0f0f", "#1c1c1c", "#2a2a2a", "#3a3a3a", "#434343"],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  width: 100%;
  aspect-ratio: 1.6;
  border-radius: 16px;
  padding: 20px;
  align-self: center;

  /* iOS Shadow */
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 8px;
  }
  shadow-opacity: 0.6;
  shadow-radius: 14px;

  /* Android Shadow */
  elevation: 18;
`;

const Field = styled.TextInput`
  color: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SmallField = styled(Field)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
`;

const Column = styled.View`
  width: 48%;
`;

const CreditCardInput = ({ cardDetails, setCardDetails }) => {
  const formatCardNumber = (number) => {
    // Remove non-digits, then add a space every 4 digits
    const cleaned = number.replace(/\D/g, "").slice(0, 16); // max 16 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardDetails({ ...cardDetails, number: formatted });
  };

  // Limit cardholder name to 12 characters
  const handleNameChange = (text) => {
    setCardDetails({ ...cardDetails, name: text.slice(0, 12) });
  };

  // Limit CVV to 3 digits
  const handleCvvChange = (text) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 3);
    setCardDetails({ ...cardDetails, cvv: cleaned });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <CardWrapper>
        <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
          <Field
            style={{ width: "80%", fontSize: 21 }}
            placeholder="Enter Card Number..."
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={cardDetails?.number}
            onChangeText={formatCardNumber}
            maxLength={19} // 16 digits + 3 spaces = 19
          />
          <Image
            style={{ height: 30, width: 55, marginBottom: 15 }}
            source={masterCardLogo}
          />
        </View>

        <Field
          style={{ fontSize: 23 }}
          placeholder="Enter Name"
          placeholderTextColor="#ccc"
          value={cardDetails?.name.toUpperCase()}
          onChangeText={handleNameChange}
          maxLength={15}
        />

        <Row>
          <Column>
            <SmallField
              style={{ fontSize: 20 }}
              placeholder="MM/YY"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              value={cardDetails?.expiry}
              onChangeText={(text) => {
                // Remove all non-digits
                let cleaned = text.replace(/\D/g, "");

                // Limit to 4 digits (MMYY)
                if (cleaned.length > 4) cleaned = cleaned.slice(0, 4);

                // Add slash after 2 digits
                let formatted = cleaned;
                if (cleaned.length >= 3) {
                  formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
                }

                setCardDetails({ ...cardDetails, expiry: formatted });
              }}
              maxLength={5}
            />
          </Column>

          <Column>
            <SmallField
              style={{ fontSize: 20 }}
              placeholder="123"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              secureTextEntry
              value={cardDetails?.cvv}
              onChangeText={handleCvvChange}
              maxLength={3}
            />
          </Column>
        </Row>
      </CardWrapper>
    </KeyboardAvoidingView>
  );
};

export default CreditCardInput;
