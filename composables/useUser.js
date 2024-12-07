import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useUser = () => {
  const get = async () => {
    return $jkrequest("/users", "get", null, null);
  };

  const create = async (data) => {
    return $jkrequest("/register", "post", data, null);
  };

  const deleteUser = async (id) => {
    return $jkrequest(`/user/${id}`, "delete", null, null);
  };
  const addPoints = async (data) => {
    return $jkrequest(`/add-points`, "post", data, null);
  };

  return { get, create, deleteUser , addPoints };
};
