import axios from "axios"
export default defineNuxtPlugin( () =>{

    axios.defaults.baseURL = "http://185.218.125.120:6901/api/";

    axios.interceptors.request.use((config) =>{
        const userStore = useUserStore();
        config.headers['Authorization']=  `Bearer ${userStore.user.token}`
        return config
    });
    return {
        provide:{
            axios:axios
        }
    }
});