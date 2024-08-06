import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
 state : ()=>{
    return{
        user:{
            fullname:'',
            username:'',
            role:'',
            token:'',
            id:'',
        },

    }
 },





 persist :true
})