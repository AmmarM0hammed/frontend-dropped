
export const useEnum = () => {
 
    const Role = ()=>{
        return {
            SuperAdmin: 0,
            City: 1,
            Company: 2,
            User: 3,
          };
    }


    return {Role}
};
