import axios from "axios";

const constanturl = "http://10.255.135.117:4500/api/admin/";

const client = axios.create({
    baseURL: constanturl,
});

// Request interceptor
client.interceptors.request.use(
    (config) => {
        // Modify the config object before sending the request
        // console.log('Request interceptor');
        // console.log('Request config:', config);
        return config;
    },
    // (error) => {
    //   window.location.href = '/error_404';
    //   return Promise.reject(error);
    // }
);
client.interceptors.response.use(
    (response) => {
        // Handle the response data
        // console.log('Response interceptor');
        // console.log('Response data:', response.data);
        return response;
    },
    // (error) => {
    //   window.location.href = '/error_404';
    //   return Promise.reject(error);
    // }
);
export default class ApiService {


    static async getData(url) {
        try {
            const response = await client.get(constanturl + url)
            // const dataa = response.data;
            return response.data;
            // console.log(dataa)
        } catch (error) {
            console.log(error);

        }
    }

    static async postData(url, data) {
        try {
            const response = await client.post(constanturl + url, data)
            return response.data
        } catch (error) {
            console.log(error);

        }
    }

    static async postFile(url, formData) {
        try {
            const response = await client.post(constanturl + url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }



}