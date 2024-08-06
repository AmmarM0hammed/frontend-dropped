import JKRequest from "~/plugins/JK-Request";
const $jkrequest = JKRequest().provide.request;

export const usePeakTime = () => {
  const get = async (data, PageIndex, PageSize) => {
    return $jkrequest("/PeakTime/Gets", "get", null, {
      Name: data.name,
      PageIndex: PageIndex,
      PageSize: PageSize,
    });
  };

  const create = async (data) => {
    return $jkrequest(
      "/PeakTime/Add",
      "post",
      {
        name: data.name,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        percentage: data.percentage,
        isActive: data.isActive,
        governorateId: data.governorateId,
        cityId: data.cityId,
      },
      null
    );
  };
  const update = async (data, id) => {
    return $jkrequest(
      `/PeakTime/Update/${id}`,
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
    return $jkrequest(`/PeakTime/Delete/${id}`, "delete", null, null);
  };

  return { get, create, remove, update };
};
