import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useBill = () => {
  const get = async (data, PageIndex, PageSize) => {
    return $jkrequest("/Bill/Gets", "get", null, {
      SerialNumber: data.SerialNumber,
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };

  const create = async (data) => {
    return $jkrequest(
      "/Bill/Add",
      "post",
      {
        serialNumber: data.serialNumber,
        from: data.from,
        to: data.to,
      },
      null
    );
  };
  const update = async (data, id) => {
    return $jkrequest(
      `/Bill/Update/${id}`,
      "put",
      {
        serialNumber: data.serialNumber,
        from: data.from,
        to: data.to,
      },
      null
    );
  };
  const remove = async (id) => {
    return $jkrequest(`/Bill/Delete/${id}`, "delete", null, null);
  };

  return { get, create, remove, update };
};
