import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useCustomer = () => {
  const get = async (data, PageIndex, PageSize) => {
    return $jkrequest("/Customer/Gets?name=5", "get", null, {
      FirstName: data.name,
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };

  const create = async (data) => {
    return $jkrequest(
      "/Origin/Add",
      "post",
      {
        name: data.name,
   
      },
      null
    );
  };
  const update = async (data , id) => {
    return $jkrequest(
      `/Origin/Update/${id}`,
      "put",
      {
        name: data.name,
      },
      null
    );
  };
  const remove = async (id) => {
    return $jkrequest(
      `/Origin/Delete/${id}`,
      "delete",
      null,null
    );
  };

  return { get, create , remove  , update};
};
