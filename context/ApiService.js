import axios from "axios";
import { IPv4 } from "../utils/config";

class ApiService {
  

  sendOtp(username) {
    return axios.post(`http://${IPv4}:8448/api/v1/auth/photographer/forgot_password`, {
      username,
    });
  }
  verifyOtp(username, otp, newPassword) {
    return axios.post(`http://${IPv4}:8448/api/v1/auth/photographer/otp_reset_password`, {
      username,
      otp,
      newPassword,
    });
  }
  getAllListPackageShooting() {
    const params = {
      hl: "en",
      select: '["$all"]',
      where: "{}",
      limit: "unlimited",
      page: 1,
      order: "[]",
    }
    return axios.get(`http://${IPv4}:8448/api/v1/package-shooting`, {params})
  }
  getAllListPackageShootingByPhotographerId(photographerId){
    const params = {
      hl: "en",
      select: '["$all"]',
      where: `{"photographerId": "${photographerId}"}`,
      limit: "unlimited",
      page: 1,
      order: "[]",
    }
    return axios.get(`http://${IPv4}:8448/api/v1/package-shooting`, {params})
  }
  getPackageShootingById(id) {
    const params = {
      hl: "en",
      select: '["$all"]',
      where: "{}",
      limit: "unlimited",
      page: 1,
      order: "[]",
    }
    return axios.get(`http://${IPv4}:8448/api/v1/package-shooting/${id}`, {params})
  }
  buyCoinRequest(amount, platform, accessToken) {
    return axios.post(`http://${IPv4}:8448/api/v1/deposit/photographer`, {
      amount,
      platform
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }
  getListCategory(){
    const params = {
      hl: "en",
      select: '["$all"]',
      where: "{}",
      limit: "unlimited",
      page: 1,
      order: "[]",
    }
    return axios.get(`http://${IPv4}:8448/api/v1/category`, {params});
  }
  createPackageShooting(title, description, duration, numberPeople, totalPrice, categoryIds, equipment, images, accessToken) {
    return axios.post(`http://${IPv4}:8448/api/v1/package-shooting`, {
      title,
      description,
      duration,
      numberPeople,
      totalPrice,
      categoryIds,
      equipment,
      images,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    } )
  }
  getUserById(id){
    return axios.get(`http://${IPv4}:8448/api/v1/user/${id}`)
  }
  updateBookingStatus(id, bookingStatus, accessToken){
    return axios.patch(`http://${IPv4}:8448/api/v1/booking/${id}`, {bookingStatus}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
  }
}
export default new ApiService();