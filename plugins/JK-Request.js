import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

export default defineNuxtPlugin( () =>{

    const Request = async(url, method, data = null, params = {})=>{
            return new Promise(async (resolve) => {
              resolve({ pending: true, response: null, error: null });
            })
            .then(async () => {
              return new Promise(async (resolve) => {
               
                  try {
                    const response = await $axios({
                      method,
                      url,
                      data,
                      params,
                    });
          
                    resolve({ pending: false, response: response.data, error: null, refresh: () => Request(url, method, data, params) });
                  } catch (error) {
                    resolve({ pending: false, response: null, error: error, refresh: () => Request(url, method, data, params) });
                  }


  
              });
            });
    }


    
    return {
        provide:{
        request:Request
    }}
});
   
