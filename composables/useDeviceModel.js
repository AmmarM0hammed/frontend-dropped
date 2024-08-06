import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useDeviceModel = () => {
  const get = async (data, PageIndex, PageSize) => {
    return $jkrequest("/DeviceModel/Gets", "get", null, {
      Name: data.Name,
     
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };

  const create = async (data) => {
    return $jkrequest(
      "/DeviceModel/Add",
      "post",
      {
        name: data.name,
      },
      null
    );
  };
  const update = async (data , id) => {
    return $jkrequest(
      `/DeviceModel/Update/${id}`,
      "put",
      {
        name: data.name,

      },
      null
    );
  };
  const remove = async (id) => {
    return $jkrequest(
      `/DeviceModel/Delete/${id}`,
      "delete",
      null,null
    );
  };

  return { get, create , remove  , update};
};
