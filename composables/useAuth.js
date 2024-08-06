import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useAuth = () => {
  const login = async (data) => {
    return $jkrequest(
      "/login","post",
      {
        userName: data.username,
        password: data.password,
      },
      null
    );
  };

  return { login };
};
