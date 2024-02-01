import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Colors from '../../utils/Colors'
import { Feather } from '@expo/vector-icons'

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const handleLogin = async () => {
        if (!username || !password) {
            ToastAndroid.show('Please enter both username and password')
            return
        }

        axios.post('http://172.20.10.3:8080/api/auth/login', {
            username,
            password,
        })
            .then(async (response) => {
                console.log('token : ', response.data.data.token)
                console.log('username : ', response.data.data.username)

                await AsyncStorage.setItem('token', response.data.data.token)
                await AsyncStorage.setItem('username', response.data.data.username)
                setPassword('')
                setUsername('')
                navigation.navigate('Home')
                ToastAndroid.show('Successfully Login', ToastAndroid.SHORT)
            })
            .catch((error) => {
                // console.error(error)

                if (error.response) {
                    ToastAndroid.show('User not found, please enter again', ToastAndroid.SHORT)
                } else if (error.request) {
                    ToastAndroid.show('No response from server', ToastAndroid.SHORT)

                } else {
                    ToastAndroid.show('Error during request setup', ToastAndroid.SHORT)
                }
            })
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <View style={styles.loginContainer}>
                <View style={styles.titleStyle}>
                    <Text style={{ margin: 5, fontSize: 30, fontWeight: 'bold', color: Colors.WHITE }}>Login</Text>
                </View>
                <Image style={styles.loginImg} source={require('../../../assets/Images/login-image.png')} />
                <View>
                    <TextInput
                        placeholder='username'
                        style={styles.inputStyle}
                        value={username}
                        onChangeText={setUsername}
                    />
                    <View>
                        <TextInput
                            placeholder='password'
                            style={styles.inputStyle}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible}
                        />
                        <TouchableOpacity
                            onPress={handleTogglePasswordVisibility}
                            style={{ position: 'absolute', top: 13, right: 13 }}
                        >
                            <Feather name={!isPasswordVisible ? 'eye-off' : 'eye'} size={24} color='black' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {username == '' || password == '' ? (
                        <TouchableOpacity
                            disabled
                            style={styles.buttonStyle}
                            onPress={handleLogin}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.WHITE }}>Login</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={handleLogin}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.WHITE }}>Login</Text>
                        </TouchableOpacity>
                    )}

                </View>
                <View style={{ margin: 20 }}>
                    <View>
                        <TouchableOpacity style={styles.buttonLoginWithGoogle}>
                            <Image style={styles.imageGoogle} source={require('../../../assets/Images/logo-google.png')} />
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>Login With Google</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.buttonLoginWithFacebook}>
                            <Image style={styles.imageFacebook} source={require('../../../assets/Images/Facebook.png')} />
                            <Text style={{ fontSize: 20, fontWeight: '500', color: Colors.WHITE }}>Login With Facebook</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: Colors.BLACK }}>
                            Don't have an account ?
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    loginContainer: {
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        flex: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height: '100%'
    },
    inputStyle: {
        margin: 5,
        padding: 5,
        backgroundColor: Colors.SECONDARY,
        borderRadius: 10,
        width: 300,
        height: 40,
        textAlign: 'center',
        fontSize: 16,
    },
    buttonStyle: {
        marginTop: 20,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        paddingHorizontal: 40,
        paddingVertical: 5,
    },
    titleStyle: {
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonLoginWithGoogle: {
        marginTop: 20,
        backgroundColor: Colors.WHITE,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.BLACK
    },
    buttonLoginWithFacebook: {
        marginTop: 20,
        backgroundColor: '#1873EA',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageGoogle: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
    imageFacebook: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    loginImg: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    buttonRegister: {
        padding: 5,
        margin: 5,
        color: Colors.BLACK,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }
})