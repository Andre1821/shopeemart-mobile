import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'
import { ScrollView } from 'react-native-gesture-handler'
import Slider from './Slider'
import RecomendasiProduct from './RecomendasiProduct'
import FlashSaleScreen from './FlashSaleScreen'

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView>
      <View>
        <Header />
      </View>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Slider />
        </View>
        <View style={styles.subContainer}>
          <RecomendasiProduct navigation={navigation}/>
        </View>
        <View style={styles.subContainer}>
          <FlashSaleScreen navigation={navigation}/>
        </View>
      </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5
  },
  subContainer: {
    marginVertical: 5,
  }
})