import EspacioAPI from "../../../../Api/index";

export const fetchContractPFD = async (_, { locationId, roomId, range }) => {
  // auth needed
  const res = await EspacioAPI.post(
    `/reservation/getpdf`,
    {
      locationId,
      roomId,
      range,
    },
    { responseType: "arraybuffer" }
  );

  return res;
};
