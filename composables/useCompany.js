import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useCompany = () => {
  const get = async (data, PageIndex, PageSize) => {
    return $jkrequest("/Company/Gets", "get", null, {
      Name: data.Name,
      GovernorateId: data.GovernorateId,
      CityId: data.CityId,
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };

  const create = async (data) => {
    return $jkrequest(
      "/Company/Add",
      "post",
      {
        name: data.name,
        regeon: data.regeon,
      },
      null
    );
  };
  const update = async (id, data) => {
    return $jkrequest(
      `/Company/Update/${id}`,
      "put",
      {
        name: data.name,
        regeon: data.regeon,
      },
      null
    );
  };
  const remove = async (id) => {
    return $jkrequest(`/Company/Delete/${id}`, "delete", null, null);
  };

  return { get, create, remove, update };
};
