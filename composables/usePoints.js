import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const usePoints = () => {
  const get = async () => {
    return $jkrequest("/maps", "get", null,null);
  };
  const deletePoint = async (id) => {
    return $jkrequest(`/maps/${id}`, "delete", null,null);
  };
  const addPoint = async (data) => {
    return $jkrequest(`/maps`, "post", data,null);
  };

  return { get , deletePoint , addPoint };
};
