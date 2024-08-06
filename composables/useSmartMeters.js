import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const useSmartMeters = () => {
  const get = async (data,cityID, PageIndex, PageSize) => {
    return $jkrequest("/SmartMeter/Gets", "get", null, {
      Name: data.Name,
      CityId: cityID,
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };
  const getByID = async (id) => {
    return $jkrequest(`/SmartMeter/Get/${id}`, "get", null, null);
  };

 
  const create = async (data) => {
    return $jkrequest(
      "/SmartMeter/Add",
      "post",
      {
        name: data.name,
        serialNumber: data.serialNumber,
        referenceNumber: data.referenceNumber,
        deviceModelId: data.deviceModelId,
        deviceStatus: data.deviceStatus,
        classify: data.classify,
        deviceType: data.deviceType,
        originId: data.originId,
        deviceIdentificationId: data.deviceIdentificationId,
        connactionType: data.connactionType,
        customerId: data.customerId,
        dataCollectionUnitId: data.dataCollectionUnitId,
        lowVoltageStationId: data.lowVoltageStationId,
        mahalla: data.mahalla,
        street: data.street,
        house: data.house,
        governorateId: data.governorateId,
        cityId: data.cityId,
        dataCollectionUnitId: data.dataCollectionUnitId,
      },
      null
    );
  };
  const update = async ( id , data ) => {
    return $jkrequest(
      `/SmartMeter/Update/${id}`,
      "put",
      {
        
        name: data.name,
        serialNumber: data.serialNumber,
        referenceNumber: data.referenceNumber,
        deviceModelId: data.deviceModelId,
        deviceStatus: data.deviceStatus,
        classify: data.classify,
        deviceType: data.deviceType,
        originId: data.originId,
        deviceIdentificationId: data.deviceIdentificationId,
        connactionType: data.connactionType,
        customerId: data.customerId,
        dataCollectionUnitId: data.dataCollectionUnitId,
        lowVoltageStationId: data.lowVoltageStationId,
        mahalla: data.mahalla,
        street: data.street,
        house: data.house,
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

  return { get, create , remove  , update , getByID};
};
