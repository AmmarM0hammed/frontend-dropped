import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useGovernorate = () => {
  const get = async (data, PageIndex, PageSize) => {
    return $jkrequest("/Governorate/Gets", "get", null, {
      Name: data.Name,
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };
  const create = async (data) => {
    return $jkrequest(
      "/Governorate/Add",
      "post",
      {
        nameAR: data.name,
        nameEN: data.name,
      },
      null
    );
  };
  const update = async (data, id) => {
    return $jkrequest(
      `/Governorate/Update/${id}`,
      "put",
      {
        nameAR: data.name,
        nameEN: data.name,
      },
      null
    );
  };
  const remove = async (id) => {
    return $jkrequest(`/Governorate/Delete/${id}`, "delete", null, null);
  };

  return { get, create, remove, update };


};
