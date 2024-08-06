import { defineStore } from 'pinia'

export const useSmartMetersStore = defineStore('useSmartMetersStore', {
 state : ()=>{
    return{
       data:[]

    }
 },

 persist :true
})