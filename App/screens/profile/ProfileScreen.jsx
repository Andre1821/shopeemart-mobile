import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState('')

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('username')
    navigation.navigate("Login")
  }

  return (
    <View style={{ backgroundColor: Colors.PRIMARY, height: '100%' }}>
      <View>
        <Text>ProfileScreen</Text>
      </View>
      <View>
        <Header />
      </View>
      <View style={{ paddingTop: 60 }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleLogout}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
      marginTop: 20,
      backgroundColor: '#1873EA',
      borderRadius: 10,
      paddingHorizontal: 40,
      paddingVertical: 5,
  },
  text: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: Colors.WHITE
  }
})