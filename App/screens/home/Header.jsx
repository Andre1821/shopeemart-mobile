import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors'
import { Feather } from '@expo/vector-icons';

const Header = () => {
    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Search some product'
                    placeholderTextColor={Colors.SECONDARY}
                />
                <TouchableOpacity
                        // onPress={}
                        style={{ position: 'absolute', top: 3, right: 5 }}
                    >
                        <Feather name="search" size={24} color={Colors.BLACK} />
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PRIMARY,
        paddingTop: 30,
        flex: 1,
        alignItems: 'center',
        height: 70,
        width: '100%',
    },
    input: {
        backgroundColor: Colors.WHITE,
        borderRadius: 4,
        width: 360,
        height: 30,
        fontSize: 16,
        paddingLeft: 10,
    },
})