import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../utils/GlobalApi'

const Slider = () => {
    const [slider, setSlider] = useState([])

    useEffect(() => {
        getSlider()
    }, [])

    const getSlider = () => {
        GlobalApi.getSlider().then(resp => {
            setSlider(resp.sliders)
        })
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={slider}
                renderItem = {({ item, index }) => (
                    <View style={{ marginRight: 20 }}>
                        <Image source={{ uri: item.image?.url }} style={styles.sliderImage} />
                    </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 0,
    },
    sliderImage: {
        width: 380,
        height: 150,
        borderRadius: 10,
    }
})