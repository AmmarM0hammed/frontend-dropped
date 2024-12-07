import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useCoupon = () => {
  const get = async () => {
    return $jkrequest("/stores", "get", null,null);
  };
  const deletePoint = async (id) => {
    return $jkrequest(`/stores/${id}`, "delete", null,null);
  };
  const addPoint = async (data) => {
    return $jkrequest(`/stores`, "post", data,null);
  };

  return { get , deletePoint , addPoint };
};
