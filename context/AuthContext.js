import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { saveDataToStorage } from "./AsyncStorage";
import { IPv4 } from "../utils/config";
import ApiService from "./ApiService";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState({});
  const [userTokenRegister, setUserTokenRegister] = useState({});
  const [bookingList, setBookingList] = useState([]);
  const [countAllBooking, setCountAllBooking] = useState('')
  const [bookingData, setBookingData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [packageShooting, setPackageShooting] = useState({})


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoggedIn();
  }, []);
  const checkLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      // Kiểm tra xem userToken có tồn tại hay không
      if (userToken !== null) {
        // Đã đăng nhập trước đó, thực hiện các thao tác tiếp theo
        console.log(userToken);
        setIsLoggedIn(true);
      } else {
        // Chưa đăng nhập
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log("Error retrieving userToken from AsyncStorage:", error);
    }
  };

  const getUserInfo = async () => {
    // setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const res = await axios.get(`http://${IPv4}:8448/api/v1/auth/photographer/info`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(userToken).accessToken}`,
        },
      });

      console.log("Thông tin user: " + JSON.stringify(res.data));
      setUserInfo(res.data);
      saveDataToStorage("userInfo", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (name, username, email, password) => {
    // console.log(name + username + email + password)
    setIsLoading(true);
    await axios
      .post(`http://${IPv4}:8448/api/v1/auth/photographer/register`, {
        name,
        username,
        email,
        password,
      })
      .then((response) => {
        let userTokenRegister = response.data;
        setUserTokenRegister(userTokenRegister);
        saveDataToStorage(
          "userTokenRegister",
          JSON.stringify(userTokenRegister)
        );
        setIsLoading(false);
        console.log(userTokenRegister);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const login = async (username, password) => {
    setIsLoading(true);
    await axios
      .post(`http://${IPv4}:8448/api/v1/auth/photographer/login`, {
        username,
        password,
      })
      .then((res) => {
        console.log("DUYDEPTRAI: " + JSON.stringify(res.data));
        const userToken = res.data;
        setUserToken(userToken);
        saveDataToStorage("userToken", JSON.stringify(userToken));
        setIsLoggedIn(true);
        getUserInfo();
        setIsLoading(false);
        // console.log(userToken);

        // setIsLogin(true);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        // setIsLogin(false);
      });
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userTokenRegister");
      await AsyncStorage.removeItem("userInfo");
      setIsLoggedIn(false);
      setUserToken({});
      setUserInfo({});
      setUserTokenRegister({});
      setIsLoading(false);
      console.log("Bạn vừa đăng xuất!");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const updateProfile = async (name, phone, email, gender, dob, avatarUrl, userToken) => {
    setIsLoading(true);
    await axios
      .put(`http://${IPv4}:8448/api/v1/photographer/profile`, {
        name,
        phone,
        email,
        gender,
        dob,
        avatarUrl,
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })
      .then((response) => {
        setIsLoading(false);
        saveDataToStorage(
          "userInfo",
          JSON.stringify(response.data)
        );
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        // setIsLogin(false);
      });
  }
  
  const getUserById = async (id) => {
    // const userToken = await AsyncStorage.getItem("userToken");
    try {
      const res = await ApiService.getUserById(id);
      console.log("THÔNG TIN USER: " + JSON.stringify(res.data))
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }

  const getListBooking = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(userToken).accessToken}`,
      },
      params: {
        hl: "en",
        select: '["$all"]',
        where: "{}",
        limit: "unlimited",
        page: 1,
        order: "[]",
      },
    };
    try {
      const res = await axios.get(
        `http://${IPv4}:8448/api/v1/photographer/booking`,
        config
      );
      // console.log("AccessToken: " + accessToken);
      console.log("List Booking: " + JSON.stringify(res.data.row));

      const data = await Promise.all(
        res.data.row.map(async (booking) => {
          const userData = await getUserById(
            booking.userId
          );
          return {
            ...booking,
            userData,
          };
        })
      );
      // console.log("List Booking: " + data);
      // setBookingList(res.data.row)
      // setBookingData(data);
      setCountAllBooking(res.data.count)
      console.log("[COUNT] " + res.data.count)
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPackageShootingById = async (id) => {
    setIsLoading(true);
    try {
      const res = await ApiService.getPackageShootingById(id);
      console.log("Dữ liệu package by id: \n" + JSON.stringify(res.data));

      setIsLoading(false);
      setPackageShooting(res.data)
      console.log("Dữ liệu CÓ PHOTOGRAPHER: \n" + JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  
  const getListCategory = async () => {
    setIsLoading(true);
    try {
      const res = await ApiService.getListCategory();
      console.log(JSON.stringify(res.data.row)+ "LIST CATEGORY");
      setIsLoading(false);
      return res.data.row;
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    }
  }

  const createPackageShooting = async (title, description, duration, numberPeople, totalPrice, categoryIds, equipment, images) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const res = await ApiService.createPackageShooting(title, description, duration, numberPeople, totalPrice, categoryIds, equipment, images, JSON.parse(userToken).accessToken);
      console.log("Tạo Package Shooting!")
      return res.data;
    } catch (error) {
      console.log(error)
    }
  }

  const updateBookingStatus = async (id, bookingStatus) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const res = await ApiService.updateBookingStatus(id, bookingStatus, JSON.parse(userToken).accessToken);
      console.log(JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        userTokenRegister,
        bookingList,
        // photographerList,
        // bookingListByStatus,
        bookingData,
        countAllBooking,
        packageShooting,
        register,
        login,
        logout,
        getUserInfo,
        updateProfile,
        getListBooking,
        getPackageShootingById,
        getListCategory,
        createPackageShooting,
        getUserById,
        updateBookingStatus,
        // getListBookingByStatus,
        // getAllPhotographer,
        // getPhotographerById,
        // createBookingById,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
