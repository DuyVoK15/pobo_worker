import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ButtonContinue, ButtonSelectCategory } from "../../styles/ButtonStyle";
import axios from "axios";
import { IPv4 } from "../../utils/config";
import Spinner from "react-native-loading-spinner-overlay";
import ConfirmationModal from "../../utils/ConfirmationModal";
import { AuthContext } from "../../context/AuthContext";
const PackageShootingCreateNext = ({ navigation, route }) => {
  const { data } = route.params;
  const [images, setImages] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (result.canceled) {
      // setIsLoading(true);
    }

    try {
      if (!result.canceled) {
        let localUris = result.assets.map((asset) => asset.uri);
        let filenames = localUris.map((uri) => uri.split("/").pop());
        let types = localUris.map((uri) => {
          let match = /\.(\w+)$/.exec(uri);
          return match ? `image/${match[1]}` : `image`;
        });
        uploadImages(localUris, filenames, types);
        setImages(localUris);
        setIsLoading(false);
        for (let i = 0; i < localUris.length; i++) {
          console.log(
            "{ \n uri: " +
              localUris[i] +
              ",\n name: " +
              filenames[i] +
              ",\n type: " +
              types[i] +
              ", \n }"
          );
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const uploadImages = async (localUris, filenames, types) => {
    try {
      for (let i = 0; i < localUris.length; i++) {
        const uri = localUris[i];
        const name = filenames[i];
        const type = types[i];

        const formData = new FormData();
        formData.append("files", {
          uri,
          type,
          name,
        });

        const res = await axios.post(
          `http://${IPv4}:8448/api/image`,
          formData,
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Upload successful:", res.data["0"]);
        // setAvatar(res.data["0"].replace("localhost", `${IPv4}`));
        setImagesUrl((prevImagesUrl) => [...prevImagesUrl, res.data["0"].replace("localhost", `${IPv4}`)]);
        
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  } // KẾT THÚC xử lí hình ảnh Upload
  useEffect(() => {
    // setImages(...images, ["", "", "", "", "", "", ""]);
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
    // console.log(JSON.stringify(data));
  });

  const {createPackageShooting} = useContext(AuthContext);
  const handleCreatePackageShooting = async () => {
    let newData;
    if(data) {
        newData = {
            ...data,
            imagesUrl
        }
    }
    const dataaa = await createPackageShooting(newData.title, newData.description, parseInt(newData.duration), parseInt(newData.numberPeople), parseInt(newData.totalPrice), newData.categoryIds, newData.equipment, newData.imagesUrl)
    console.log(JSON.stringify(newData)+ "OMYGOD")
    if(dataaa) {
        console.log("Tạo Thành công")
        navigation.replace("PackageShootingSuccess")
    } else {
        console.log("Tạo thất bại")
    }
  }

  return (
    <View style={styles.container}>
      <Spinner visible={false} />
      {/* <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      /> */}
      <TouchableOpacity
        style={ButtonSelectCategory.buttonSelect}
        onPress={() => pickImage()}
      >
        <Text style={ButtonSelectCategory.buttonSelectText}>Chọn ảnh</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{
              uri,
            }}
            style={styles.image}
          />
        ))}
      </View>
      <View style={ButtonContinue.buttonContainer}>
        <TouchableOpacity
          style={ButtonContinue.buttonContinue}
          onPress={() => setShowConfirmation(true)}
        >
          <Text style={ButtonContinue.buttonContinueText}>Tạo gói chụp</Text>
        </TouchableOpacity>
        <ConfirmationModal
          visible={showConfirmation}
          onConfirm={() => {
            setShowConfirmation(false);
            handleCreatePackageShooting();
          }}
          onCancel={() => setShowConfirmation(false)}
          text={"Bạn có chắc chắn muốn tạo gói chụp?"}
        />
      </View>
    </View>
  );
};

export default PackageShootingCreateNext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    resizeMode: "cover",
    borderWidth: 1,
    // borderStyle: "dotted",
    borderColor: "#000",
  },
});
