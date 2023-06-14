import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RatingScreen = () => {
  return (
   
    <View style={styles.container}>
      <Text>RatingScreen</Text>
    </View>
    
  )
}

export default RatingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    }
})