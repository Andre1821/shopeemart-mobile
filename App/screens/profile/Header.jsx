import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../utils/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Header = () => {
    // const { user, isLoading } = useUser();
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
                    {/* <Image
                        source={{ uri: user?.imageUrl }}
                        style={styles.userImage}
                    /> */}
                    <View>
                        <Text >Welcome</Text>
                        <Text >{username}</Text>
                    </View>
                    {/* <FontAwesome6 name="bookmark" size={24} color={Colors.WHITE} /> */}
                </View>
            </View>

            {/* <View style={styles.searchBarContainer}>
                <TextInput placeholder="Search" style={styles.textInput} />
                <FontAwesome5 name="search" size={24} color={Colors.PRIMARY} style={styles.searchBtn} />
            </View> */}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 99
    },
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,

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