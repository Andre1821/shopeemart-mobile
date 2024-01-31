import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import Colors from '../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';

export default function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState('')

  const SignOut = () => {
    const { isLoaded, signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
      <View>
        <Button
          title="Sign Out"
          onPress={async () => {
            signOut();
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('username')
            navigation.navigate("Login")
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: Colors.PRIMARY, height: '100%' }}>
      <View>
        <Text>ProfileScreen</Text>
      </View>
      <View>
        <Header/>
      </View>
      <View style={{ paddingTop: 60 }}>
        <SignOut />
      </View>
    </View>
  )
}