import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useCity = () => {
  const get = async (data, PageIndex, PageSize) => {
    return $jkrequest("/City/Gets", "get", null, {
      Name: data.Name,
      GovernorateId: data.GovernorateId,
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };

  const create = async (data) => {
    return $jkrequest(
      "/City/Add",
      "post",
      {
        nameAR: data.name,
        nameEN: data.name,
        governorateId: data.governorateId,
      },
      null
    );
  };
  const update = async (data , id) => {
    return $jkrequest(
      `/City/Update/${id}`,
      "put",
      {
        nameAR: data.name,
        nameEN: data.name,
        governorateId: data.governorateId,
      },
      null
    );
  };
  const remove = async (id) => {
    return $jkrequest(
      `/City/Delete/${id}`,
      "delete",
      null,null
    );
  };

  return { get, create , remove  , update};
};
