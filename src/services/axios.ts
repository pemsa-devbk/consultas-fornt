import axios from 'axios';

export const url = 'http://192.168.1.93:3000';
export const appInstance = axios.create({
    baseURL: url
});

appInstance.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

function refreshAccessToken (){
    const token = localStorage.getItem('RF-token') || '';
    return axios.get(`${url}/auth/check-auth`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

// TODO Revisar implementación funcionalidad 
appInstance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== "auth") {
        originalRequest._retry = true;
        const access_token = await refreshAccessToken();        
        localStorage.setItem('token', access_token.data.token);
        localStorage.setItem('RF-token', access_token.data.refreshToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token.data.token;
        return appInstance(originalRequest);
    }
    return Promise.reject(error);
});