import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

axios.defaults.baseURL = 'http://172.20.10.3:8080/api/auth';

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        return token
    } catch (error) {
        console.error('Error fetching token from AsyncStorage:', error);
        return null;
    }
}

axios.interceptors.request.use(
    async (config) => {
        const token = await getToken() 

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('Response Error:', error.response.data);
        } else if (error.request) {
            console.error('Request Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axios;
