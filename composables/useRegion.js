import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useRegion = () => {
  const get = async (data) => {
    return $jkrequest(
      "/DeviceProfile/Get","get",null,{
        name : data.name,
        cityId : data.cityId,
        PageNumber : data.PageNumber,
        PageSize : data.PageSize,
      }
      
    );
  };
  const getCity = async (data) => {
    return $jkrequest(
      "/City/Get","get",null,null
      
    );
  };
  const add = async (data) => {
    return $jkrequest(
      "/City/Add","post",data,null
      
    );
  };

  return { get , getCity , add };
};
