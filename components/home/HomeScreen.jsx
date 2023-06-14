// import { useNavigation } from "@react-navigation/native";
// import { StyleSheet, View, Text, Image } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import {  icons, images , } from "../constants";
import { StatusBar } from "react-native";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { SHADOWS, loadCustomFonts, COLORS, SIZES } from "../constants/theme";
const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const loadFonts = async () => {
      await loadCustomFonts();
      // Các tài nguyên đã tải xong, bạn có thể làm gì đó khác ở đây
    };

    loadFonts();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} />
      <LinearGradient
        colors={["#FFBEA8", "#FF4100"]} // Define your gradient colors
        start={{ x: 0, y: 0 }} // Gradient start point (top left corner)
        end={{ x: 1, y: 1 }} // Gradient end point (bottom right corner)
        style={styles.viewHeader}
      >
        <View style={styles.containerRow}>
          <View style={[{ flex: 1 }, styles.viewImage]}>
            <Image style={styles.avatar} />
          </View>

          <View style={{ flex: 5 }}>
            <Text style={styles.text1}>Thu nhập hiện tại</Text>
            <Text style={styles.text2}>
              220.000.000<Text style={styles.textCurrency}>VNĐ</Text>
            </Text>
          </View>

          <View style={styles.viewIcon}>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.viewBody}>
        <View style={styles.viewTextBody1}>
          <Text style={[{ flex: 1 }, styles.textBody1]}>Lịch hẹn của bạn</Text>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.textBody2}>4</Text>
          </View>
          <TouchableOpacity
            style={{ justifyContent: "center", marginRight: 20 }}
          >
            <Text style={styles.textBody3}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.cardContainer}>
            <View style={styles.cardContent}>
              <View style={styles.cardRow}>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{
                      height: 46,
                      width: 46,
                      backgroundColor: "#000",
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View style={{ flex: 5, justifyContent: "flex-start" }}>
                  <Text style={{ fontSize: SIZES.large, fontWeight: 500 }}>
                    Cao Minh Tuệ
                  </Text>
                  <Text style={{ fontSize: SIZES.small, fontWeight: 500 }}>
                    Quận 9
                  </Text>
                </View>
              </View>

              <View style={styles.underline}></View>

              <View style={styles.cardRow}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: "#808089",
                      fontWeight: "bold",
                    }}
                  >
                    10:00 - 12:30 am
                  </Text>
                </View>
                <View style={styles.dueTime}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: COLORS.orange40,
                      fontWeight: 700,
                    }}
                  >
                    Sắp đến giờ
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardRow}>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{
                      height: 46,
                      width: 46,
                      backgroundColor: "#000",
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View style={{ flex: 5, justifyContent: "flex-start" }}>
                  <Text style={{ fontSize: SIZES.large, fontWeight: 500 }}>
                    Cao Minh Tuệ
                  </Text>
                  <Text style={{ fontSize: SIZES.small, fontWeight: 500 }}>
                    Quận 9
                  </Text>
                </View>
              </View>

              <View style={styles.underline}></View>

              <View style={styles.cardRow}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: "#808089",
                      fontWeight: "bold",
                    }}
                  >
                    10:00 - 12:30 am
                  </Text>
                </View>
                <View style={styles.dueTime}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: COLORS.orange40,
                      fontWeight: 700,
                    }}
                  >
                    Sắp đến giờ
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardRow}>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{
                      height: 46,
                      width: 46,
                      backgroundColor: "#000",
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View style={{ flex: 5, justifyContent: "flex-start" }}>
                  <Text style={{ fontSize: SIZES.large, fontWeight: 500 }}>
                    Cao Minh Tuệ
                  </Text>
                  <Text style={{ fontSize: SIZES.small, fontWeight: 500 }}>
                    Quận 9
                  </Text>
                </View>
              </View>

              <View style={styles.underline}></View>

              <View style={styles.cardRow}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: "#808089",
                      fontWeight: "bold",
                    }}
                  >
                    10:00 - 12:30 am
                  </Text>
                </View>
                <View style={styles.dueTime}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: COLORS.orange40,
                      fontWeight: 700,
                    }}
                  >
                    Sắp đến giờ
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardRow}>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{
                      height: 46,
                      width: 46,
                      backgroundColor: "#000",
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View style={{ flex: 5, justifyContent: "flex-start" }}>
                  <Text style={{ fontSize: SIZES.large, fontWeight: 500 }}>
                    Cao Minh Tuệ
                  </Text>
                  <Text style={{ fontSize: SIZES.small, fontWeight: 500 }}>
                    Quận 9
                  </Text>
                </View>
              </View>

              <View style={styles.underline}></View>

              <View style={styles.cardRow}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: "#808089",
                      fontWeight: "bold",
                    }}
                  >
                    10:00 - 12:30 am
                  </Text>
                </View>
                <View style={styles.dueTime}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: COLORS.orange40,
                      fontWeight: 700,
                    }}
                  >
                    Sắp đến giờ
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardRow}>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{
                      height: 46,
                      width: 46,
                      backgroundColor: "#000",
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View style={{ flex: 5, justifyContent: "flex-start" }}>
                  <Text style={{ fontSize: SIZES.large, fontWeight: 500 }}>
                    Cao Minh Tuệ
                  </Text>
                  <Text style={{ fontSize: SIZES.small, fontWeight: 500 }}>
                    Quận 9
                  </Text>
                </View>
              </View>

              <View style={styles.underline}></View>

              <View style={styles.cardRow}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: "#808089",
                      fontWeight: "bold",
                    }}
                  >
                    10:00 - 12:30 am
                  </Text>
                </View>
                <View style={styles.dueTime}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: COLORS.orange40,
                      fontWeight: 700,
                    }}
                  >
                    Sắp đến giờ
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardRow}>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{
                      height: 46,
                      width: 46,
                      backgroundColor: "#000",
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View style={{ flex: 5, justifyContent: "flex-start" }}>
                  <Text style={{ fontSize: SIZES.large, fontWeight: 500 }}>
                    Cao Minh Tuệ
                  </Text>
                  <Text style={{ fontSize: SIZES.small, fontWeight: 500 }}>
                    Quận 9
                  </Text>
                </View>
              </View>

              <View style={styles.underline}></View>

              <View style={styles.cardRow}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: "#808089",
                      fontWeight: "bold",
                    }}
                  >
                    10:00 - 12:30 am
                  </Text>
                </View>
                <View style={styles.dueTime}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: COLORS.orange40,
                      fontWeight: 700,
                    }}
                  >
                    Sắp đến giờ
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardRow}>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{
                      height: 46,
                      width: 46,
                      backgroundColor: "#000",
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View style={{ flex: 5, justifyContent: "flex-start" }}>
                  <Text style={{ fontSize: SIZES.large, fontWeight: 500 }}>
                    Cao Minh Tuệ
                  </Text>
                  <Text style={{ fontSize: SIZES.small, fontWeight: 500 }}>
                    Quận 9
                  </Text>
                </View>
              </View>

              <View style={styles.underline}></View>

              <View style={styles.cardRow}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: "#808089",
                      fontWeight: "bold",
                    }}
                  >
                    10:00 - 12:30 am
                  </Text>
                </View>
                <View style={styles.dueTime}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: COLORS.orange40,
                      fontWeight: 700,
                    }}
                  >
                    Sắp đến giờ
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  viewHeader: {
    backgroundColor: COLORS.orange30,
    height: 120,
    width: "100%",
    justifyContent: "flex-end",
  },
  containerRow: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  viewImage: {
    marginLeft: 20,
  },
  avatar: {
    width: 42,
    height: 42,
    backgroundColor: "#000",
    borderRadius: 100,
  },
  text1: {
    fontSize: SIZES.small,
    color: "white",
  },
  text2: {
    fontSize: SIZES.large,
    color: "white",
  },
  textCurrency: {
    fontSize: SIZES.small,
  },
  viewIcon: {
    justifyContent: "center",
    marginRight: 20,
  },
  viewBody: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },
  viewTextBody1: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  textBody1: {
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: SIZES.large,
  },
  textBody2: {
    fontSize: SIZES.large,
    color: "grey",
  },
  textBody3: {
    fontSize: SIZES.medium,
    color: "grey",
  },
  scrollViewContent: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: 400,
    marginTop: 20
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    ...SHADOWS.beauty,
    elevation: 5,
  },
  cardRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  underline: {
    height: 5,
    backgroundColor: "lightgrey",
  },
  dueTime: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: COLORS.orange40,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 5,
  },
  // //   circleSuccessIcon: {
  // //     width: 280,
  // //     height: 280,
  // //   },
  // //   successIcon: {
  // //     width: 125,
  // //     height: 90,
  // //     position: "absolute",
  // //   },
  // //   imageContainer: {
  // //     justifyContent: "center",
  // //     alignItems: "center",
  // //   },
  // avatarDuy: {
  //   width: 250,
  //   height: 200,
  // },
  // buttonSignin: {
  //   paddingVertical: 21,
  //   paddingHorizontal: 20,
  //   width: 300,
  //   alignSelf: "center",
  //   backgroundColor: "#FE5D26",
  //   borderRadius: 10,
  //   marginTop: 200,
  // },
  // buttonSigninText: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   color: "#0D0D12",
  // },
});
export default HomeScreen;
