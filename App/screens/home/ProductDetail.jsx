import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../utils/Colors';

const ProductDetailScreen = ({ navigation }) => {
    const [productDetail, setProductDetail] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                // Ambil data produk dari AsyncStorage
                const productData = await AsyncStorage.getItem('product-detail');

                // Konversi string JSON menjadi objek JavaScript
                const parsedProductData = JSON.parse(productData);

                // Simpan detail produk ke dalam state
                setProductDetail(parsedProductData);
            } catch (error) {
                console.error('Error fetching product detail:', error);
            }
        };

        fetchProductDetail();
    }, []);

    if (!productDetail) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 30 }}>
                <Image style={styles.img} source={require('../../../assets/Images/pulse.jpeg')} />
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.nameProduct}>{productDetail.productName}</Text>
                    <Text>Price: {productDetail.price}</Text>
                    <Text>Description: {productDetail.description}</Text>
                    <Text>Sisa: {productDetail.stock}</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.btn}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
    },
    img: {
        width: 395,
        height: 320,
    },
    btn: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.WHITE,
    },
    buttonStyle: {
        marginTop: 20,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 5,
    },
    nameProduct: {
        fontSize: 20,
        fontWeight: '700',

    },
});

export default ProductDetailScreen;
