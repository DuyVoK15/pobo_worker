import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { COLORS, SIZES } from "../constants";
import { createStackNavigator } from "@react-navigation/stack";
import RatingScreen from "./top-navigation/RatingScreen";
import AnalysScreen from "./top-navigation/AnalysScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const StatisticScreen = () => {
  //   const headerTitle = () => {
  //     return (
  //       <Text style={{ fontWeight: "bold", fontSize: SIZES.large }}>
  //         Thông tin phân tích
  //       </Text>
  //     );
  //   };
  //   const CustomTabBar = () => {
  //     return (
  //       <View style={{ alignItems: "center", paddingTop: 20 }}>
  //         <Text style={{ fontWeight: "bold", fontSize: 18 }}>
  //           Tiêu đề đặt chính
  //         </Text>
  //       </View>
  //     );
  //   };
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.viewHeader}>
        <Text style={styles.headerTitle}>Thông tin phân tích</Text>
      </View>
      <Tab.Navigator
        style={{ marginTop: 0 }}
        tabBarPosition="top"
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: "white" }, // Chỉnh màu nền của tab bar
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: 14,
            textTransform: "none",
          }, // Chỉnh màu chữ của tab
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.orange50,
            height: 5,
          }, // Chỉnh màu dấu chỉ dẫn hiện tại
          tabBarActiveTintColor: COLORS.orange50,
        })}
      >
        <Tab.Screen
          name="RatingScreen"
          component={RatingScreen}
          options={{ tabBarLabel: "Đánh giá" }}
        />
        <Tab.Screen
          name="AnalysScreen"
          component={AnalysScreen}
          options={{ tabBarLabel: "Phân tích" }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default StatisticScreen;

const styles = StyleSheet.create({
  viewHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: Platform.OS === "ios" ? 30 : 0,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: SIZES.large,
  },
});
