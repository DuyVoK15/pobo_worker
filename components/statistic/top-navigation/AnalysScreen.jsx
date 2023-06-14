import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AnalysScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AnalysScreen</Text>
    </View>
  )
}

export default AnalysScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    }
})