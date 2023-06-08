import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import * as ImagePicker from "expo-image-picker";
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import InputTextStyle from "../../styles/InputTextStyle";
import { useContext, useEffect, useState } from "react";
import ButtonStyle from "../../styles/ButtonStyle";
import DropDownPicker from "react-native-dropdown-picker";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDateToAPI, formatDateToYYYYMMDD } from "../../utils/FormatDate";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
// import RNPickerSelect from "react-native-picker-select";
// import { Dropdown } from "react-native-paper";
// import RadioButtonsGroup from "react-native-radio-buttons-group";
const SettingsAccountPersonal = ({ navigation }) => {
  // BẮT ĐẦU khai báo biến Image
  const imageIcon = require("../../assets/logo/logo.png");
  const imageVoDien =
    "http://192.168.1.7:8448/api/image/48A71B21-5855-47F5-B1EA-F27855314F76-1686222292698.png";
  // KẾT THÚC khai báo biến Image

  // BẮT ĐẦU xử lí useEffect
  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("userInfo");
        if (value !== null) {
          const parseValue = JSON.parse(value);
          setName(parseValue.name);
          setEmail(parseValue.email);
          setGenderValue(parseValue.gender);
          setPhone(parseValue.phone);
          setAvatar(parseValue.avatarUrl);
          setDate(formatDateToYYYYMMDD(parseValue.dob));
          // console.log(parseValue)
          // console.log(userInfo)
          // console.log(userInfo.name)
        }
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []); // KẾT THÚC xử lí useEffect

  // BẮT ĐẦU xử lí handle update profile
  const { updateProfile, userToken, isLoading } = useContext(AuthContext);
  const handleUpdateProfile = () => {
    console.log(userToken.accessToken);
    updateProfile(
      name,
      phone,
      email,
      genderValue,
      formatDateToAPI(date),
      avatar,
      userToken.accessToken
    );
    console.log("date: " + typeof date)
    console.log("formatDate: " + formatDateToAPI("2022/12/12"))
  }; // KẾT THÚC xử lí handle update profile

  // BẮT ĐẦU xử lí hình ảnh Upload
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      let localUri = result.assets[0].uri;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      setAvatar(result.assets[0].uri);
      uploadImage(localUri, filename, type);
      console.log(
        "{ \n uri: " +
          localUri +
          ",\n name: " +
          filename +
          ",\n type: " +
          type +
          ", \n }"
      );
    }
  };

  const uploadImage = async (uri, name, type) => {
    try {
      const formData = new FormData();
      formData.append("files", {
        uri,
        type,
        name,       
      });

      const res = await axios.post(
        "http://192.168.1.7:8448/api/image",
        formData,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", res.data["0"]);
      setAvatar(res.data["0"].replace("localhost", "192.168.1.7"));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  } // KẾT THÚC xử lí hình ảnh Upload
  
  // BẮT ĐẦU khai báo biến state cho InputText
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // KẾT THÚC khai báo biến state cho InputText

  // BẮT ĐẦU xử lí giới tính
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: "Nam", value: "MALE" },
    { label: "Nữ", value: "FEMALE" },
    { label: "Không tiện nói", value: "ORTHER" },
  ]);
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data, "data");
  }; // KẾT THÚC xử lí giới tính

  // BẮT ĐẦU xử lí ngày sinh
  const today = new Date();

  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const handleOnPress = () => {
    setOpen(!open);
  };

  const handleChange = (propDate) => {
    setDate(propDate);
    console.log(propDate);
  }; // KẾT THÚC xử lí ngày sinh

  // ----------------------------------------------RETURN-----------------------------------------------------
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      {/* Avatar */}
      <View style={styles.imageStyle}>
        <Image
          source={{ uri: avatar ? avatar : imageVoDien }}
          style={styles.avatar}
        />
      </View>
      <TouchableOpacity onPress={() => pickImage()}>
        <Text>Choose photo</Text>
      </TouchableOpacity>

      <View style={styles.containerInputText}>
        <Text style={InputTextStyle.titleText}>Tên</Text>
        <TextInput
          style={[
            InputTextStyle.inputText,
            { backgroundColor: "white", borderColor: "#FE5D26" },
          ]}
          placeholder="Nhập tên"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text style={InputTextStyle.titleText}>Số điện thoại</Text>
        <TextInput
          style={[
            InputTextStyle.inputText,
            { backgroundColor: "white", borderColor: "#FE5D26" },
          ]}
          placeholder="Nhập số điện thoại"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <Text style={InputTextStyle.titleText}>Email</Text>
        <TextInput
          style={[
            InputTextStyle.inputText,
            { backgroundColor: "white", borderColor: "#FE5D26" },
          ]}
          placeholder="Nhập Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {/* Form giới tính */}
        <Text style={InputTextStyle.titleText}>Giới tính</Text>
        <View style={styles.genderContainer}>
          <Controller
            name="gender"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.dropdownGender}>
                <DropDownPicker
                  style={styles.dropdown}
                  dropDownContainerStyle={{ borderColor: "#FE5D26" }}
                  textStyle={{ marginLeft: 10, fontSize: 16 }}
                  open={genderOpen}
                  value={genderValue} //genderValue
                  items={gender}
                  setOpen={setGenderOpen}
                  setValue={setGenderValue}
                  setItems={setGender}
                  placeholder="Chọn giới tính"
                  placeholderStyle={styles.placeholderStyles}
                  // onOpen={onGenderOpen}
                  onChangeValue={onChange}
                  zIndex={8888}
                  zIndexInverse={9999}
                />
              </View>
            )}
          />
        </View>
        {/* Form ngày sinh */}
        <Text style={InputTextStyle.titleText}>Ngày sinh</Text>
        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.dateTouchable}
            onPress={handleOnPress}
          >
            <Text style={styles.dateText}>
              {date ? date : "Chọn ngày sinh"}
            </Text>
          </TouchableOpacity>

          <Modal visible={open} transparent={true} animationType="slide">
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={date}
                  onDateChange={handleChange}
                />

                <TouchableOpacity onPress={handleOnPress}>
                  <Text>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View style={ButtonStyle.buttonContainer}>
          <TouchableOpacity
            style={ButtonStyle.buttonSignup}
            onPress={handleUpdateProfile}
          >
            <Text style={ButtonStyle.buttonSignupText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerInputText: {
    width: 350,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#CBD4E1",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
    paddingHorizontal: 3,
    paddingVertical: 4,
  },
  //   picker: {
  //     paddingHorizontal: 20,
  //     paddingVertical: 4,
  //     fontSize: 16,
  //   },

  imageStyle: {
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#FE5D26",
    padding: 2,
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  genderContainer: {
    zIndex: 9999,
    borderColor: "#CBD4E1",
    marginBottom: 10,
  },
  placeholderStyles: {
    marginLeft: 10,
    borderColor: "#CBD4E1",
  },
  dropdownGender: {
    // marginBottom: 15,
  },
  dropdown: {
    borderColor: "#FE5D26",
    paddingVertical: 21,
    borderRadius: 10,
    backgroundColor: "white",
  },
  dateContainer: {
    borderColor: "#FE5D26",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    // marginBottom: 10,
  },
  dateTouchable: {
    paddingVertical: 21,
    paddingHorizontal: 20,
    textColor: "#0D0D12",
    borderColor: "#CBD4E1",
    borderRadius: 10,
    backgroundColor: "white",
  },
  dateText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",

    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SettingsAccountPersonal;
