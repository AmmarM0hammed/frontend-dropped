
export default defineNuxtRouteMiddleware((to, _) => {
        
    const useUser = useUserStore();
    
    if(useUser.user.token == '' && to.fullPath !== '/auth/login')
          return navigateTo("auth/login")
    




})