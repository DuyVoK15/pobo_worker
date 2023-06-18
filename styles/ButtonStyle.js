import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../components/constants";

export const ButtonStyle = StyleSheet.create({
  buttonContainer: {
    marginTop: 40,
  },
  buttonSignup: {
    paddingVertical: 21,
    paddingHorizontal: 20,
    width: 350,
    alignItems: "center",
    backgroundColor: "#FE5D26",
    textColor: "#0D0D12",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonSignupText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export const ButtonContinue = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
  },
  buttonContinue: {
    paddingVertical: 21,
    paddingHorizontal: 20,
    width: 350,
    alignSelf: "center",
    backgroundColor: "#FE5D26",
    textColor: "#0D0D12",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContinueText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export const ButtonSelectCategory = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
  },
  buttonSelect: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: 360,
    alignSelf: "center",
    backgroundColor: COLORS.orange30,
    textColor: "#0D0D12",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonSelectText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export const ButtonConfirmCategory = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
  },
  buttonConfirm: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: COLORS.orange50,
    width: 150,
    alignSelf: "center",
    backgroundColor: COLORS.orange50,
    textColor: "#0D0D12",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonConfirmText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export const ButtonConfuseCategory = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
  },
  buttonConfuse: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    width: 150,
    borderWidth: 2,
    borderColor: COLORS.orange50,
    alignSelf: "center",
    backgroundColor: "white",
   
    borderRadius: 10,
    marginTop: 10,
  },
  buttonConfuseText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.orange50,
  },
});

