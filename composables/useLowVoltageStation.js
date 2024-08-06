import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useLowVoltageStation = () => {
  const get = async (data,cityID, PageIndex, PageSize) => {
    return $jkrequest("/LowVoltageStation/Gets", "get", null, {
      Name: data.Name,
      CityId: cityID,
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };

  const create = async (data) => {
    return $jkrequest(
      "/LowVoltageStation/Add",
      "post",
      {
        name: data.name,
        serialNumber: data.serialNumber,
        referenceNumber: data.referenceNumber,
        incomingVoltage: data.incomingVoltage,
        outgoingVoltage: data.outgoingVoltage,
        capacity: data.capacity,
        capacityUnit: data.capacityUnit,
        transformerType: data.transformerType,
        connactionType: data.connactionType,
        feederId: data.feederId,
        governorateId: data.governorateId,
        cityId: data.cityId,
        dataCollectionUnitId: data.dataCollectionUnitId,
      },
      null
    );
  };
  const update = async ( id , data ) => {
    return $jkrequest(
      `/LowVoltageStation/Update/${id}`,
      "put",
      {
        
          name: data.name,
          serialNumber: data.serialNumber,
          referenceNumber: data.referenceNumber,
          incomingVoltage: data.incomingVoltage,
          outgoingVoltage: data.outgoingVoltage,
          capacity: data.capacity,
          capacityUnit: data.capacityUnit,
          transformerType: data.transformerType,
          connactionType: data.connactionType,
          feederId: data.feederId,
          governorateId: data.governorateId,
          cityId: data.cityId,
          dataCollectionUnitId: data.dataCollectionUnitId,
        
      },
      null
    );
  };
  const remove = async (id) => {
    return $jkrequest(
      `/LowVoltageStation/Delete/${id}`,
      "delete",
      null,null
    );
  };

  return { get, create , remove  , update};
};
