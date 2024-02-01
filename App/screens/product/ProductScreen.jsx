import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from '../../api/Interceptor'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../utils/Colors';
import Header from '../home/Header';

const ProductScreen = ({ navigation }) => {
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
        <Image style={styles.img} source={require('../../../assets/Images/pulse.jpeg')} />
        <View style={{ marginTop: 5, alignItems: 'center' }}>
          <Text>{item.productName}</Text>
          <Text>Price: {item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleDetailProduct = async (product) => {
    await AsyncStorage.setItem('product-detail', JSON.stringify(product))
    navigation.navigate('ProductDetail')
  }

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        style={{ marginTop: 40 }}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>

  );
};

export default ProductScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
    color: Colors.WHITE
  },
  item: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    width: 190,
    height: 270,
    elevation: 3,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    margin: 4,
  },
  img: {
    width: 170,
    height: 200,
  },
  titleStyle: {
    backgroundColor: Colors.PRIMARY,
    paddingTop: 30,
    flex: 1,
    alignItems: 'center',
    height: 300,
    width: '100%',
  },
});