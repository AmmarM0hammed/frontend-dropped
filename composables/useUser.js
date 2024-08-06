import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useUser = () => {
  const get = async (data) => {
    return $jkrequest(
      "/User","get",null,{
        UserName : data.UserName,
        FullName : data.FullName,
        Role : data.Role,
        GovernorateId : data.GovernorateId,
        CompanyId : data.CompanyId,
        PageNumber : data.PageNumber,
        PageSize : data.PageSize,
      }
      
    );
  };
 
  const create = async (data) => {
    return $jkrequest(
      "/User","post",data,null);
  };
  const update = async (data,id) => {
    return $jkrequest(
      `/User/update/${id}`,"post",data,null);
  };

  return { get , create,update };
};
