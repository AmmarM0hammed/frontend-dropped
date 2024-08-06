import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useElectricityServicePrice = () => {
  const get = async (data, PageIndex, PageSize) => {
    return $jkrequest("/ElectricityServicePrice/Gets", "get", null, {
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };

  const create = async (data) => {
    return $jkrequest(
      "/ElectricityServicePrice/Add",
      "post",
      {
        classify: data.classify,
        price: data.price,
        forKWH: data.forKWH,
        isActive: data.isActive,
        governorateId: data.governorateId,
      
      },
      null
    );
  };
  const update = async (data, id) => {
    return $jkrequest(
      `/ElectricityServicePrice/Update/${id}`,
      "put",
      {
        classify: data.classify,
        price: data.price,
        forKWH: data.forKWH,
        isActive: data.isActive,
        governorateId: data.governorateId,
      },
      null
    );
  };
  const remove = async (id) => {
    return $jkrequest(`/ElectricityServicePrice/Delete/${id}`, "delete", null, null);
  };

  return { get, create, remove, update };
};
