import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useFeeder = () => {
  const get = async (data, PageIndex, PageSize) => {
    return $jkrequest("/Feeder/Gets", "get", null, {
      Name: data.Name,
      Load: data.Load,
      DistributionStationId: data.DistributionStationId,
      GovernorateId: data.GovernorateId,
      CityId: data.CityId,
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };

  const create = async (data) => {
    return $jkrequest(
      "/DistributionStation/Add",
      "post",
      {
        name: data.name,
        serialNumber: data.serialNumber,
        referenceNumber: data.referenceNumber,
        incomingVoltage: data.incomingVoltage,
        outgoingVoltage: data.outgoingVoltage,
        capacity: data.capacity,
        capacityUnit: data.capacityUnit,
        governorateId: data.governorateId,
        cityId: data.cityId,
        latitud: data.latitud,
        longitud: data.longitud,
      },
      null
    );
  };
  const update = async (data, id) => {
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
    return $jkrequest(`/City/Delete/${id}`, "delete", null, null);
  };

  return { get, create, remove, update };
};
