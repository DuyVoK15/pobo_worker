import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { InputTextStyle, TextInputCreate } from "../../styles/InputTextStyle";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import {
  ButtonConfirmCategory,
  ButtonContinue,
  ButtonSelectCategory,
} from "../../styles/ButtonStyle";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from "react-native";
import { COLORS, SIZES } from "../constants";
import { RadioButton } from "react-native-paper";

const PackageShootingCreate = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [numberPeople, setNumberPeople] = useState("");
  const [equipment, setEquipment] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [checked, setChecked] = useState("");
  const { getListCategory } = useContext(AuthContext);

  const fetchData = async () => {
    const data = await getListCategory();
    setListCategory(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let listCategorySelected = new Array(1);
  const handleCreatePackageShooting = () => {
    console.log(
      title +
        "\n" +
        duration +
        "\n" +
        numberPeople +
        "\n" +
        equipment +
        "\n" +
        totalPrice +
        "\n" +
        description +
        "\n" +
        category.name
    );
    listCategorySelected[0] = category.id;

    if (
      title.trim() !== "" &&
      duration.trim()  !== "" &&
      numberPeople.trim()  !== "" &&
      equipment.trim()  !== "" &&
      totalPrice.trim()  !== "" &&
      description.trim()  !== "" &&
      listCategorySelected[0] !== undefined
    ) {
      const data = {
        title,
        description,
        duration,
        numberPeople,
        equipment,
        totalPrice,
        categoryIds: listCategorySelected,
      };
      console.log(data);
      navigation.push("PackageShootingCreateNext", { data: data });
    }
    console.log(listCategorySelected);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.containerText}>
          <Text style={styles.titleText}>Tạo gói chụp mới</Text>
          {/* <Text>Cho khách hàng biết thông tin gói chụp của bạn</Text>
          <Text>Thêm thông tin gói chụp</Text> */}
        </View>

        <View style={styles.containerTextInput}>
          <Text style={TextInputCreate.titleText}>Tiêu đề</Text>
          <TextInput
            style={TextInputCreate.inputText}
            placeholder="Tiêu đề"
            onChangeText={(text) => setTitle(text)}
          />
          <Text style={TextInputCreate.titleText}>Số ngày chụp</Text>
          <TextInput
            style={TextInputCreate.inputText}
            placeholder="Số ngày chụp"
            onChangeText={(text) => setDuration(text)}
          />
          <Text style={TextInputCreate.titleText}>Số người chụp</Text>
          <TextInput
            style={TextInputCreate.inputText}
            placeholder="Số người chụp"
            onChangeText={(text) => setNumberPeople(text)}
          />
          <Text style={TextInputCreate.titleText}>Thiết bị chụp</Text>
          <TextInput
            style={TextInputCreate.inputText}
            placeholder="Thiết bị chụp"
            onChangeText={(text) => setEquipment(text)}
          />
          <Text style={TextInputCreate.titleText}>Giá gói chụp</Text>
          <TextInput
            style={TextInputCreate.inputText}
            placeholder="Giá gói chụp"
            onChangeText={(text) => setTotalPrice(text)}
          />
          <Text style={TextInputCreate.titleText}>Miêu tả</Text>
          <TextInput
            style={TextInputCreate.inputText}
            placeholder="Miêu tả chi tiết"
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View>
          <TouchableOpacity
            style={ButtonSelectCategory.buttonSelect}
            onPress={() => handleOpenModal()}
          >
            <Text style={ButtonSelectCategory.buttonSelectText}>
              {category ? category.name : "Chọn loại gói chụp"}
            </Text>
          </TouchableOpacity>

          <Modal visible={modalVisible} animationType="fade" transparent>
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                {listCategory.map((item) => (
                  <View key={item.id} style={styles.containerRadioButton}>
                    <RadioButton.Item
                      color={COLORS.orange50}
                      labelStyle={styles.labelStyle}
                      value={item.id}
                      label={item.name}
                      status={checked === item.id ? "checked" : "unchecked"}
                      onPress={() => {
                        setCategory(item);
                        setChecked(item.id);
                      }}
                    />
                  </View>
                ))}
                <TouchableOpacity
                  style={ButtonConfirmCategory.buttonConfirm}
                  onPress={handleCloseModal}
                >
                  <Text style={ButtonConfirmCategory.buttonConfirmText}>
                    Xác nhận
                  </Text>
                </TouchableOpacity>
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
        <View style={ButtonContinue.buttonContainer}>
          <TouchableOpacity
            style={ButtonContinue.buttonContinue}
            onPress={() => handleCreatePackageShooting()}
          >
            <Text style={ButtonContinue.buttonContinueText}>Tiếp theo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginBottom: 50}}></View>
    </ScrollView>
  );
};

export default PackageShootingCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  containerText: {
    marginTop: 46,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleText: {
    fontSize: SIZES.xLarge,
    fontWeight: 600
  },
  containerTextInput: {
    marginTop: 30,
    width: 360,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
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
});
