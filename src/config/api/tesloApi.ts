import { API_URL_ANDROID, API_URL_IOS, PROD_URL, STAGE } from "@env";
import axios from "axios";
import { Platform } from "react-native";
import { StorageAdapter } from "../adapters/storage-adapter";

export const API_URL =
(STAGE === 'prod')
? PROD_URL
: Platform.OS === 'ios'
    ? API_URL_IOS
    : API_URL_ANDROID;

const tesloAPi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }

})


//* Interceptors
tesloAPi.interceptors.request.use(
    async (config) => {
        const token = await StorageAdapter.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

console.log('API_URL axios =>', API_URL);
export { tesloAPi}