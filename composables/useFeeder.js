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
      "/Feeder/Add",
      "post",
      {
        name: data.name,
        load: data.load,
        distributionStationId: data.distributionStationId,
        governorateId:data.governorateId,
        cityId: data.cityId,
      },
      null
    );
  };
  const update = async ( id,data) => {
    return $jkrequest(
      `/Feeder/Update/${id}`,
      "put",
      {
        name: data.name,
        load: data.load,
        distributionStationId: data.distributionStationId,
        governorateId:data.governorateId,
        cityId: data.cityId,
      },
      null
    );
  };
  const remove = async (id) => {
    return $jkrequest(`/Feeder/Delete/${id}`, "delete", null, null);
  };

  return { get, create, remove, update };
};
