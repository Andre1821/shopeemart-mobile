import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Colors from '../../utils/Colors'

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [seePassword, setSeePassword] = useState(true)


    const validationPassword = value => {
        // const nonWhiteSpace = /^\S*$/
        // if (!nonWhiteSpace.test(value)) {
        //     return 'Password must not contain Whitespaces!'
        // }

        // const containUpperCase = /^(?=.*[A-Z]).*$/
        // if (!containUpperCase.test(value)) {
        //     return 'Password must have at least one Uppercase Character!'
        // }

        // const containLowerCase = /^(?=.*[a-z]).*$/
        // if (!containLowerCase.test(value)) {
        //     return 'Password must have at least one Lowercase Character!'
        // }

        // const containNumber = /^(?=.*[0-9]).*$/
        // if (!containNumber.test(value)) {
        //     return 'Password must have at least one digit of number!'
        // }

        // const validLength = /^.{8,16}$/
        // if (!validLength.test(value)) {
        //     return 'Password must be minimun 8 characters'
        // }

        return null
    }

    const handleLogin = async () => {
        // console.log(username, password);
        axios.post('http://10.10.100.152:8080/api/auth/login', {
            username,
            password,
        })
            .then(async (response) => {
                console.log('token : ', response.data.data.token)
                console.log('username : ', response.data.data.username)

                await AsyncStorage.setItem('token', response.data.data.token)
                await AsyncStorage.setItem('username', response.data.data.username)
                navigation.navigate('Home')
            })
            .catch((error) => {
                console.error(error)
            })
    }
    return (
        <ScrollView>
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
                    <TextInput
                        placeholder='password'
                        style={styles.inputStyle}
                        value={password}
                        onChangeText={setPassword}
                    />
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
                            <Text style={styles.buttonRegister}>Register</Text>
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
    },
    inputStyle: {
        margin: 5,
        padding: 5,
        backgroundColor: '#ffd1b3',
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