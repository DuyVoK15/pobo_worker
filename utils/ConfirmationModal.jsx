import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const ConfirmationModal = ({ visible, onConfirm, onCancel, text }) => {
  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>{text}</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.modalButton} onPress={onConfirm}>
            <Text style={styles.modalButtonText}>Đồng ý</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
            <Text style={styles.modalButtonText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: 'row',
    },
    modalButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#2ecc71',
      marginHorizontal: 10,
      borderRadius: 5,
    },
    modalButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
  });