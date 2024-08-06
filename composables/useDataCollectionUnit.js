import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useDataCollectionUnit = () => {
  const get = async (data, CityId, PageIndex, PageSize) => {
    return $jkrequest("/DataCollectionUnit/Gets", "get", null, {
      Name: data.Name,
      CityId: CityId,
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };

  const create = async (data) => {
    return $jkrequest(
      "/DataCollectionUnit/Add",
      "post",
      {
        name: data.name,
        serialNumber: data.serialNumber,
        referenceNumber: data.referenceNumber,
        deviceIdentificationId: data.deviceIdentificationId,
        deviceModelId: data.deviceModelId,
        address: data.address,
        companyId: data.companyId,
        governorateId: data.governorateId,
        cityId: data.cityId,
        originId: data.originId,
      },
      null
    );
  };
  const update = async ( id , data) => {
    return $jkrequest(
      `/DataCollectionUnit/Update/${id}`,
      "put",
      {
        name: data.name,
        serialNumber: data.serialNumber,
        referenceNumber: data.referenceNumber,
        deviceIdentificationId: data.deviceIdentificationId,
        deviceModelId: data.deviceModelId,
        address: data.address,
        companyId: data.companyId,
        governorateId: data.governorateId,
        cityId: data.cityId,
        originId: data.originId,
      },
      null
    );
  };
  const remove = async (id) => {
    return $jkrequest(`/DataCollectionUnit/Delete/${id}`, "delete", null, null);
  };

  return { get, create, remove, update };
};
