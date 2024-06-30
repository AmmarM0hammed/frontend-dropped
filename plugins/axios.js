import axios from "axios"
export default defineNuxtPlugin( () =>{

    axios.defaults.baseURL = "https://amiv2-api.tatweer-dev.com/api/";

    axios.interceptors.request.use((config) =>{
    //     const userStore = useUserStore();
        config.headers['Authorization']=  `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJkMjBjYjQzMC1jN2QwLTQxYjgtOGYyMS1hZDM3OTMzY2I5ZGMiLCJJZCI6ImQyMGNiNDMwLWM3ZDAtNDFiOC04ZjIxLWFkMzc5MzNjYjlkYyIsIlVzZXJOYW1lIjoic3VwZXJBZG1pbiIsIkZ1bGxOYW1lIjoic3VwZXJBZG1pbiIsInJvbGUiOiJTdXBwZXJBZG1pbiIsIm5iZiI6MTcxOTUwNDg4OSwiZXhwIjoxNzIwNzE0NDg5LCJpYXQiOjE3MTk1MDQ4ODl9.q8OR_yQSBNc7IGqbBEsND_wlrU49RG1yvIKLo0HhhpVYWfUmU7IH-UlWMTqVcC28R8MyxuAPBOzYoUXDuhqVgA`
        return config
    });
    return {
        provide:{
            axios:axios
        }
    }
});