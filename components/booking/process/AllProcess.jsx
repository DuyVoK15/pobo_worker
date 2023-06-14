import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import BookingEmptyScreen from "../BookingEmptyScreen";
import { AuthContext } from "../../../context/AuthContext";
import { COLORS, SIZES } from "../../constants";
import { formatDateToVN } from "../../../utils/FormatDate";

const AllProcess = () => {
  const {
    userToken,
    getListBooking,
    bookingList,
    getPhotographerById,
    bookingData,
    countAllBooking,
  } = useContext(AuthContext);
  // const [bookingData, setBookingData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  });

  const fetchData = async () => {
    await getListBooking(userToken.accessToken);
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 10000000000); // Gọi fetchData mỗi 5 giây

    return () => {
      clearInterval(interval); // Hủy bỏ interval khi component bị unmount
    };
  }, []);

  useEffect(() => {
    fetchData(); // Lấy dữ liệu ban đầu khi component được render
  }, []);

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.textHeader}>
          Hiện có tất cả {countAllBooking} lịch hẹn{" "}
        </Text>
        {countAllBooking!==0 ? (
          <>
            {bookingData.map((booking, index) => (
              <View key={index} style={styles.containerRow}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={{ uri: booking.photographerData.avatarUrl }}
                    style={styles.avatar}
                  />
                </View>
                <View style={{ flex: 1.8 }}>
                  <Text style={styles.title}>
                    {booking.photographerData.name}
                  </Text>
                  <Text style={styles.title2}>{formatDateToVN(booking.startTime)}</Text>
                </View>
                <View style={{ flex: 1.4 }}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                      {booking.bookingStatus === "PENDING"
                        ? "Chờ"
                        : booking.bookingStatus === "CANCEL"
                        ? "Hủy"
                        : booking.bookingStatus === "DONE"
                        ? "Xong"
                        : booking.bookingStatus === "ACCEPT"
                        ? "Hẹn"
                        : ""}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        ) : (
          <BookingEmptyScreen />
        )}
      </View>
    </Animated.ScrollView>
  );
};

export default AllProcess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  textHeader: {
    fontSize: SIZES.large,
    fontStyle: "italic",
    marginTop: 10,
  },
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.boder40,
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  column: {
    flex: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  title2: {
    fontSize: SIZES.small,
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: COLORS.orange40,
    borderWidth: 2,
  },
  buttonText: {
    color: COLORS.orange40,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
