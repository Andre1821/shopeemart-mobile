import { SafeAreaView, StyleSheet } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './App/screens/profile/ProfileScreen';
import TabNavigations from './App/navigations/TabNavigations';
import Colors from './App/utils/Colors';
import LoginScreen from './App/screens/login/LoginScreen';

const Stack = createStackNavigator();

const tokenCache = {
  getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return null;
    }
  },
};

export default function App() {

  return (
    <ClerkProvider publishableKey='pk_test_Y2VudHJhbC1nb2JibGVyLTQ3LmNsZXJrLmFjY291bnRzLmRldiQ' tokenCache={tokenCache}>
      <SafeAreaView style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigations />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen}/>
              <Stack.Screen name="Home" component={TabNavigations}/>
              <Stack.Screen name="Profile" component={ProfileScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
});
