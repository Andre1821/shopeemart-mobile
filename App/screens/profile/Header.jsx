import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../utils/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Header = () => {
    const [username, setUsername] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('username')
        .then((user) => {
            setUsername(user)
        })
        .catch((error) => {
            console.error(error)
        })
    })
    

    return username && (
        <View style={styles.container}>
            <View style={styles.profileMainContainer}>
                <View style={styles.profileConntainer}>
                    <Image style={styles.image} source={require('../../../assets/favicon.png')}/>
                    <View>
                        <Text >Welcome</Text>
                        <Text >{username}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius: 99,
        marginRight:10,
        backgroundColor: Colors.WHITE,
    },
    container: {
        padding: 20,
        paddingTop: 70,
        backgroundColor: Colors.PRIMARY,

    },
    profileConntainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
        marginTop: 20
    },
    textInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        width: '86%',
        fontSize: 16,
    },
    searchBtn: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: Colors.WHITE
    }
})