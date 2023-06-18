// import { useNavigation } from "@react-navigation/native";
// import { StyleSheet, View, Text, Image } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

import { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import {  icons, images , } from "../constants";
import { StatusBar } from "react-native";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { SHADOWS, loadCustomFonts, COLORS, SIZES } from "../constants/theme";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDateToVN } from "../../utils/FormatDate";
import { Modal } from "react-native";
import { RadioButton } from "react-native-paper";
import {
  ButtonConfirmCategory,
  ButtonConfuseCategory,
} from "../../styles/ButtonStyle";
import { RefreshControl } from "react-native";
const HomeScreen = ({ navigation }) => {
  const {
    getUserInfo,
    getUserById,
    getListBooking,
    updateBookingStatus,
    countAllBooking,
  } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [listBooking, setListBooking] = useState([]);
  const [status, setStatus] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingAfterUpdate, setBookingAfterUpdate] = "";
  const fetchData = async () => {
    await getUserInfo();
    const userInfo = await AsyncStorage.getItem("userInfo");
    setUserInfo(JSON.parse(userInfo));
    const data = await getListBooking();
    setListBooking(data);
  };

  useEffect(() => {
    fetchData();

    const loadFonts = async () => {
      await loadCustomFonts();
      // Các tài nguyên đã tải xong, bạn có thể làm gì đó khác ở đây
    };

    loadFonts();
  }, []);

  const handleNavigateToPackageShootingCreate = () => {
    navigation.push("PackageShootingCreate");
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleUpdateStatus = async (id, bookingStatus) => {
    const data = await updateBookingStatus(id, bookingStatus);
    handleCloseModal();
    setBookingAfterUpdate(data);
  };

  // Reload data
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} />
      <LinearGradient
        colors={["#FFBEA8", "#FF4100"]} // Define your gradient colors
        start={{ x: 0, y: 0 }} // Gradient start point (top left corner)
        end={{ x: 1, y: 1 }} // Gradient end point (bottom right corner)
        style={styles.viewHeader}
      >
        <Text
          style={{ marginBottom: 20, marginLeft: 20, fontSize: SIZES.large }}
        >
          Xin chào,{" "}
          <Text style={{ fontSize: SIZES.xLarge, fontWeight: 500 }}>
            {userInfo?.name}
          </Text>
        </Text>
        <View style={styles.containerRow}>
          <View style={[{ flex: 1 }, styles.viewImage]}>
            <Image
              style={styles.avatar}
              source={{ uri: userInfo?.avatarUrl }}
            />
          </View>

          <View style={{ flex: 5 }}>
            <Text style={styles.text1}>Thu nhập hiện tại</Text>
            <Text style={styles.text2}>
              {userInfo?.balance}
              <Text style={styles.textCurrency}> VNĐ</Text>
            </Text>
          </View>
          {/* <TouchableOpacity
            onPress={console.log("HAHAHA" + JSON.stringify(userInfo))}
          ></TouchableOpacity> */}
          <View style={styles.viewIcon}>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.viewBody}>
        <View style={styles.viewTextBody1}>
          <Text style={[{ flex: 1 }, styles.textBody1]}>Lịch hẹn của bạn</Text>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.textBody2}>
              {countAllBooking ? countAllBooking : "0"}
            </Text>
          </View>
          <TouchableOpacity
            style={{ justifyContent: "center", marginRight: 20 }}
          >
            <Text style={styles.textBody3}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.cardContainer}>
            {listBooking.map((booking, index) => (
              <View style={styles.cardContent} key={booking.id}>
                <View style={styles.cardRow}>
                  <View style={{ flex: 1 }}>
                    <Image
                      style={{
                        height: 46,
                        width: 46,
                        backgroundColor: "#000",
                        borderRadius: 10,
                      }}
                      source={{ uri: booking?.userData?.avatarUrl }}
                    />
                  </View>
                  <View style={{ flex: 4, justifyContent: "flex-start" }}>
                    <Text style={{ fontSize: SIZES.large, fontWeight: 500 }}>
                      {booking?.userData?.name}
                    </Text>
                    <Text style={{ fontSize: SIZES.small, fontWeight: 500 }}>
                      {booking?.address}
                    </Text>
                  </View>
                  <View style={styles.status}>
                    <Text style={styles.textStatus}>
                      {booking?.bookingStatus === "PENDING"
                        ? "Đang chờ"
                        : booking.bookingStatus === "CANCEL"
                        ? "Đã hủy"
                        : booking.bookingStatus === "DONE"
                        ? "Hoàn thành"
                        : booking.bookingStatus === "ACCEPT"
                        ? "Đang hẹn"
                        : "Chờ"}
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
                      {formatDateToVN(booking.startTime)}
                    </Text>
                  </View>

                  {booking.bookingStatus === "ACCEPT" ? (
                    <>
                      <View>
                        <TouchableOpacity
                          style={styles.bookingStatus}
                          onPress={() => handleOpenModal()}
                        >
                          <Text
                            style={{
                              fontSize: SIZES.small,
                              color: "#FFF",
                              fontWeight: 700,
                            }}
                          >
                            Hoàn thành
                          </Text>
                        </TouchableOpacity>

                        <Modal
                          visible={modalVisible}
                          animationType="fade"
                          transparent
                        >
                          <View style={styles.modalBackground}>
                            <View style={styles.modalContent}>
                              <Text style={styles.textQuestion}>
                                Bạn có chắc chắn với quyết định này?
                              </Text>
                              <View style={styles.containerRow}>
                                <TouchableOpacity
                                  style={ButtonConfirmCategory.buttonConfirm}
                                  onPress={() =>
                                    handleUpdateStatus(booking.id, "DONE")
                                  }
                                >
                                  <Text
                                    style={
                                      ButtonConfirmCategory.buttonConfirmText
                                    }
                                  >
                                    Xác nhận
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={ButtonConfuseCategory.buttonConfuse}
                                  onPress={handleCloseModal}
                                >
                                  <Text
                                    style={
                                      ButtonConfuseCategory.buttonConfuseText
                                    }
                                  >
                                    Quay lại
                                  </Text>
                                </TouchableOpacity>
                              </View>

                              <TouchableOpacity
                                style={styles.closeButton}
                                onPress={handleCloseModal}
                              >
                                <Text style={styles.closeButtonText}>x</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
                      </View>
                    </>
                  ) : booking.bookingStatus === "PENDING" ? (
                    <>
                      <View>
                        <TouchableOpacity
                          style={styles.bookingStatus}
                          onPress={() => handleOpenModal()}
                        >
                          <Text
                            style={{
                              fontSize: SIZES.small,
                              color: "#FFF",
                              fontWeight: 700,
                            }}
                          >
                            Chấp nhận
                          </Text>
                        </TouchableOpacity>

                        <Modal
                          visible={modalVisible}
                          animationType="fade"
                          transparent
                        >
                          <View style={styles.modalBackground}>
                            <View style={styles.modalContent}>
                              <Text style={styles.textQuestion}>
                                Bạn có chắc chắn với quyết định này?
                              </Text>
                              <View style={styles.containerRow}>
                                <TouchableOpacity
                                  style={ButtonConfirmCategory.buttonConfirm}
                                  onPress={() =>
                                    handleUpdateStatus(booking.id, "ACCEPT")
                                  }
                                >
                                  <Text
                                    style={
                                      ButtonConfirmCategory.buttonConfirmText
                                    }
                                  >
                                    Xác nhận
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={ButtonConfuseCategory.buttonConfuse}
                                  onPress={handleCloseModal}
                                >
                                  <Text
                                    style={
                                      ButtonConfuseCategory.buttonConfuseText
                                    }
                                  >
                                    Quay lại
                                  </Text>
                                </TouchableOpacity>
                              </View>

                              <TouchableOpacity
                                style={styles.closeButton}
                                onPress={handleCloseModal}
                              >
                                <Text style={styles.closeButtonText}>x</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
                      </View>

                      {/* HỦY */}
                      <View>
                        <TouchableOpacity
                          style={styles.dueTime}
                          onPress={() => handleOpenModal()}
                        >
                          <Text
                            style={{
                              fontSize: SIZES.small,
                              color: COLORS.orange40,
                              fontWeight: 700,
                            }}
                          >
                            Hủy
                          </Text>
                        </TouchableOpacity>

                        <Modal
                          visible={modalVisible}
                          animationType="fade"
                          transparent
                        >
                          <View style={styles.modalBackground}>
                            <View style={styles.modalContent}>
                              <Text style={styles.textQuestion}>
                                Bạn có chắc chắn với quyết định này?
                              </Text>
                              <View style={styles.containerRow}>
                                <TouchableOpacity
                                  style={ButtonConfirmCategory.buttonConfirm}
                                  onPress={() =>
                                    handleUpdateStatus(booking.id, "CANCEL")
                                  }
                                >
                                  <Text
                                    style={
                                      ButtonConfirmCategory.buttonConfirmText
                                    }
                                  >
                                    Xác nhận
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={ButtonConfuseCategory.buttonConfuse}
                                  onPress={handleCloseModal}
                                >
                                  <Text
                                    style={
                                      ButtonConfuseCategory.buttonConfuseText
                                    }
                                  >
                                    Quay lại
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <TouchableOpacity
                                style={styles.closeButton}
                                onPress={handleCloseModal}
                              >
                                <Text style={styles.closeButtonText}>x</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
                      </View>
                    </>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={{ height: 188 }}></View>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 16,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 100,
          }}
          onPress={() => handleNavigateToPackageShootingCreate()}
        >
          <Image
            source={require("../../assets/PackageShooting.png")}
            style={{ width: 70, height: 70 }}
          />
        </TouchableOpacity>
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
  scrollViewContent: {},
  cardContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: 400,
    marginTop: 20,
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
  status: {
    height: 25,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "green",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  textStatus: {
    color: "green",
    fontSize: SIZES.small,
  },
  underline: {
    height: 5,
    backgroundColor: "lightgrey",
  },
  dueTime: {
    width: "auto",
    borderWidth: 3,
    borderRadius: 10,
    borderColor: COLORS.orange40,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 5,
    alignItems: "center",
  },
  bookingStatus: {
    width: "auto",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: COLORS.orange40,
    backgroundColor: COLORS.orange40,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 5,
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  textQuestion: {
    fontSize: SIZES.large,
    marginBottom: 20,
    fontWeight: "bold",

    textAlign: "center",
  },
  modalContent: {
    backgroundColor: "white",
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 15,
  },
  closeButtonText: {
    fontSize: 30,
    fontWeight: 500,
    color: "black",
  },
  containerRadioButton: {
    backgroundColor: COLORS.orange10,
    width: 300,
    borderRadius: 10,
    marginVertical: 5,
  },
  labelStyle: {
    fontSize: SIZES.large,
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
