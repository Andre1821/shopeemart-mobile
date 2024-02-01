import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import Colors from '../../utils/Colors'
import { Feather } from '@expo/vector-icons'

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [mobilePhone, setMobilePhone] = useState('')
    const [email, setEmail] = useState('')

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [mobilePhoneError, setMobilePhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const validateInputs = () => {

        setUsernameError('');
        setPasswordError('');
        setNameError('');
        setAddressError('');
        setMobilePhoneError('');
        setEmailError('');

        let isValid = true;

        if (!username.trim()) {
            setUsernameError('Username is required');
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            setPasswordError('Password must be at least 6 characters and contain both letters and numbers');
            isValid = false;
        }

        if (!name.trim()) {
            setNameError('Name is required');
            isValid = false;
        }

        if (!address.trim()) {
            setAddressError('Address is required');
            isValid = false;
        }

        if (!mobilePhone.trim() || isNaN(mobilePhone) || mobilePhone.length < 11 || mobilePhone.length > 13) {
            setMobilePhoneError('Mobile Phone must be a numeric value with 11-13 digits');
            isValid = false;
        }

        if (!email.trim() || !/^[a-zA-Z0-9._-]+@gmail\.com$/.test(email)) {
            setEmailError('Email must be a valid Gmail address');
            isValid = false;
        }

        return isValid;
    };


    const handleSubmit = () => {
        if (validateInputs()) {
            axios.post('http://172.20.10.3:8080/api/auth/register/customer', {
                username,
                password,
                name,
                address,
                mobilePhone,
                email,
            })
                .then(() => {
                    navigation.navigate('Login')
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>
                    Register Now
                </Text>
                <View>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder='Username'
                    />
                    {usernameError ? <Text style={{ color: 'red' }}>{usernameError}</Text> : null}
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Password'
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                        onPress={handleTogglePasswordVisibility}
                        style={{ position: 'absolute', top: 33, right: 13 }}
                    >
                        <Feather name={!isPasswordVisible ? 'eye-off' : 'eye'} size={24} color='black' />
                    </TouchableOpacity>
                    {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder='Name'
                    />
                    {nameError ? <Text style={{ color: 'red' }}>{nameError}</Text> : null}
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder='Address'
                    />
                    {addressError ? <Text style={{ color: 'red' }}>{addressError}</Text> : null}
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        value={mobilePhone}
                        onChangeText={setMobilePhone}
                        placeholder='Mobile Phone'
                    />
                    {mobilePhoneError ? <Text style={{ color: 'red' }}>{mobilePhoneError}</Text> : null}
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder='Email'
                    />
                    {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.buttonStyle}
                    >
                        <Text style={styles.textButton}>Sumbit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={styles.buttonStyle}
                    >
                        <Text style={styles.textButton}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 80,
    },
    scroll: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        marginTop: 25,
        padding: 5,
        backgroundColor: Colors.SECONDARY,
        borderRadius: 10,
        width: 360,
        height: 40,
        textAlign: 'center',
        fontSize: 16,
    },
    buttonStyle: {
        marginTop: 30,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        alignItems: 'center',
        width: 100,
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.WHITE,
    }
})