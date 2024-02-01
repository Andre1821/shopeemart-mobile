import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from '../../api/Interceptor'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../utils/Colors';

const RecomendasiProduct = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/product');

                const formatedProducts = response.data.map((product) => ({
                    id: product.id,
                    productName: product.productName,
                    price: product.productPrices[0]?.price || 0,
                    description: product.description,
                    stock: product.productPrices[0]?.stock || 0,
                }));

                setProducts(formatedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleDetailProduct(item)}>
            <View style={styles.item}>
                <View style={{ alignItems: 'center' }}>
                    <Image style={styles.img} source={require('../../../assets/Images/pulse.jpeg')} />
                </View>
                <Text>{item.productName}</Text>
                <Text>Price: {item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleDetailProduct = async (product) => {
        await AsyncStorage.setItem('product-detail', JSON.stringify(product))
        navigation.navigate('ProductDetail')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recomended Product For You</Text>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default RecomendasiProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        backgroundColor: Colors.WHITE,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 2,
        width: 170,
        elevation: 3, 
        borderRadius: 8, 
        overflow: 'hidden',
    },
    img: {
        width: 160,
        height: 160,
    }
});