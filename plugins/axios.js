import axios from "axios"
export default defineNuxtPlugin( () =>{

    axios.defaults.baseURL = "https://amiv2-api.tatweer-dev.com/api/";

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