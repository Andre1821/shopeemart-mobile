import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons'
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import Colors from '../utils/Colors';
import ProductScreen from '../screens/product/ProductScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigations() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.PRIMARY
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: ({ color }) => {
                        <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Home</Text>
                    },
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="Product" component={ProductScreen}
                options={{
                    tabBarLabel: ({ color }) => {
                        <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Product</Text>
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="list" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarLabel: ({ color }) => {
                        <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Profile</Text>
                    },
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}