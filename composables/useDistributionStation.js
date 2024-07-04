import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useDistributionStation = () => {
  const get = async (data, PageIndex, PageSize) => {
    return $jkrequest("/DistributionStation/Gets", "get", null, {
      Name: data.Name,
      SerialNumber: data.SerialNumber,
      ReferenceNumber: data.ReferenceNumber,
      IncomingVoltage: data.IncomingVoltage,
      OutgoingVoltage: data.OutgoingVoltage,
      Capacity: data.Capacity,
      CapacityUnit: data.CapacityUnit,
      CityId: data.CityId,
      GovernorateId: data.GovernorateId,
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
  const update = async ( id , data) => {
    return $jkrequest(
      `/DistributionStation/Update/${id}`,
      "put",
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
  const remove = async (id) => {
    return $jkrequest(`/DistributionStation/Delete/${id}`, "delete", null, null);
  };

  return { get, create, remove, update };
};
