import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useDeviceIdentification = () => {
  const get = async (data, PageIndex, PageSize) => {
    return $jkrequest("/DeviceIdentification/Gets", "get", null, {
      Name: data.Name,
     
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };

  const create = async (data) => {
    return $jkrequest(
      "/DeviceIdentification/Add",
      "post",
      {
        name: data.name,
      },
      null
    );
  };
  const update = async (data , id) => {
    return $jkrequest(
      `/DeviceIdentification/Update/${id}`,
      "put",
      {
        name: data.name,

      },
      null
    );
  };
  const remove = async (id) => {
    return $jkrequest(
      `/DeviceIdentification/Delete/${id}`,
      "delete",
      null,null
    );
  };

  return { get, create , remove  , update};
};
