import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import ButtonStyle from "../../styles/ButtonStyle";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES } from "../constants";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { Icon } from "./IconProfile";
import Spinner from "react-native-loading-spinner-overlay";

const UserProfile = ({ navigation }) => {
  const imageVoDien =
    "https://toigingiuvedep.vn/wp-content/uploads/2022/04/hinh-avatar-anh-vo-dien-cute.jpg";
  const { logout, userInfo, userToken, isLoading } = useContext(AuthContext);
  const [info, setInfo] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  });

  const fetchData = async () => {
    const value = await AsyncStorage.getItem("userInfo");
    const parseValue = JSON.parse(value);
    setInfo(parseValue);
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 5000000000000000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigateToSetting = () => {
    navigation.push("SettingsAccountPersonal");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Spinner visible={isLoading} />
      <View style={styles.container}>
        <View style={styles.containerTextHeader}>
          <Text style={styles.textHeader}>Trang cá nhân</Text>
        </View>

        <View style={styles.containerRow}>
          <View style={styles.avatarStyle}>
            <Image
              source={{
                uri: info.avatarUrl ? info.avatarUrl : imageVoDien,
              }}
              style={{ width: 70, height: 70, borderRadius: 100 }}
            />
          </View>
          <View style={styles.column2}>
            <TouchableOpacity onPress={handleNavigateToSetting}>
              <Text style={styles.textName}> {info.name?info.name:"Vui lòng đăng nhập"}</Text>
              <Text style={styles.textName2}> Bạn là thợ chụp ảnh</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerPoBo}>
          <Text style={styles.textPoBo1}>Bạn muốn đặt thợ chụp ảnh POBO</Text>
          <Text style={styles.textPoBo2}>
            Thiết lập và bắt đầu kiếm tiền thật đơn giản.
          </Text>
        </View>
        <View style={styles.containerTextTitles}>
          <Text style={styles.textTitle}>Cài đặt</Text>
        </View>

        <View style={styles.containerColumn}>
          <View style={styles.containerRow}>
            <View style={styles.column1}>
              <Image
                source={Icon.AccountIcon}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View style={styles.column2}>
              <TouchableOpacity onPress={handleNavigateToSetting}>
                <Text style={styles.text}> Tài khoản của tôi</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.column3}>
              <Image
                source={require("../../assets/MoreThanIcon.png")}
                style={{ width: 7, height: 12 }}
              />
            </View>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.column1}>
              <Image source={Icon.PayIcon} style={{ width: 40, height: 40 }} />
            </View>
            <View style={styles.column2}>
              <TouchableOpacity onPress={handleNavigateToSetting}>
                <Text style={styles.text}> Thanh Toán và chi trả</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.column3}>
              <Image
                source={require("../../assets/MoreThanIcon.png")}
                style={{ width: 7, height: 12 }}
              />
            </View>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.column1}>
              <Image source={Icon.TaxIcon} style={{ width: 40, height: 40 }} />
            </View>
            <View style={styles.column2}>
              <TouchableOpacity onPress={handleNavigateToSetting}>
                <Text style={styles.text}> Thuế</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.column3}>
              <Image
                source={require("../../assets/MoreThanIcon.png")}
                style={{ width: 7, height: 12 }}
              />
            </View>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.column1}>
              <Image
                source={Icon.FaceTouchIDIcon}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View style={styles.column2}>
              <Text style={styles.text}> Face ID / Touch ID</Text>
            </View>
            <View style={styles.column3}>
              <Image
                source={require("../../assets/MoreThanIcon.png")}
                style={{ width: 7, height: 12 }}
              />
            </View>
          </View>
        </View>

        <View style={styles.containerTextTitles}>
          <Text style={styles.textTitle}>Khác</Text>
        </View>

        <View style={styles.containerColumn}>
          <View style={styles.containerRow}>
            <View style={styles.column1}>
              <Image
                source={Icon.HelpSupportIcon}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View style={styles.column2}>
              <Text style={styles.text}> Help & Support</Text>
            </View>
            <View style={styles.column3}>
              <Image
                source={require("../../assets/MoreThanIcon.png")}
                style={{ width: 7, height: 12 }}
              />
            </View>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.column1}>
              <Image
                source={Icon.PrivacyPolicyIcon}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View style={styles.column2}>
              <TouchableOpacity onPress={() => console.log("Oh Yeah")}>
                <Text style={styles.text}> Privacy & Policy</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.column3}>
              <Image
                source={require("../../assets/MoreThanIcon.png")}
                style={{ width: 7, height: 12 }}
              />
            </View>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.column1}>
              <Image
                source={Icon.TermConditionIcon}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View style={styles.column2}>
              <Text style={styles.text}> Term & Condition</Text>
            </View>
            <View style={styles.column3}>
              <Image
                source={require("../../assets/MoreThanIcon.png")}
                style={{ width: 7, height: 12 }}
              />
            </View>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.column1}>
              <Image
                source={Icon.AboutPoBoIcon}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View style={styles.column2}>
              <Text style={styles.text}> About Pobo</Text>
            </View>
            <View style={styles.column3}>
              <Image
                source={require("../../assets/MoreThanIcon.png")}
                style={{ width: 7, height: 12 }}
              />
            </View>
          </View>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={ButtonStyle.buttonSignup}
            onPress={() => logout()}
          >
            <Text style={ButtonStyle.buttonSignupText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#F9F9F9",
  },
  containerTextHeader: {
    marginVertical: 20,
    width: 380,
  },
  textHeader: {
    fontSize: SIZES.xxLarge,
    fontWeight: "bold",
  },
  avatarStyle: {
    borderRadius: 100,
    borderWidth: 4,
    borderColor: COLORS.orange50,
    padding: 1,
    marginRight: 10,
  },
  textName: {
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  textName2:{
    fontSize: SIZES.medium,
    
  },
  textPoBo1: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#FFFFFF",
  },
  textPoBo2: {
    fontSize: SIZES.medium,
    color: "#FFFFFF",
    marginLeft: 15,
  },
  containerPoBo: {
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: COLORS.boder40,
    borderRadius: 10,
    width: 380,
    paddingVertical: 40,
    backgroundColor: COLORS.orange50,
  },
  containerColumn: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 30,
    borderRadius: 10,
  },
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // borderWidth: 1,
    // borderColor: COLORS.boder40,
    // borderRadius: 10,
    width: 380,
    marginBottom: 30,
  },
  column1: {
    flex: 1,
    marginLeft: 15,
  },
  column2: {
    flex: 4,
  },
  column3: {
    flex: 0,
    marginRight: 15,
  },
  text: {
    fontSize: SIZES.medium,
  },
  textTitle: {
    fontSize: SIZES.large,
  },
  containerTextTitles: {
    marginVertical: 20,
    width: 380,
  },
  containerButton: {
    marginVertical: 30,
  },
});
