import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './App/screens/profile/ProfileScreen';
import TabNavigations from './App/navigations/TabNavigations';
import LoginScreen from './App/screens/login/LoginScreen';
import RegisterScreen from './App/screens/register/RegisterScreen';
import ProductDetailScreen from './App/screens/home/ProductDetail';
import RecomendasiProduct from './App/screens/home/RecomendasiProduct';

const Stack = createStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabNavigations} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="RecomendProduct" component={RecomendasiProduct} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

