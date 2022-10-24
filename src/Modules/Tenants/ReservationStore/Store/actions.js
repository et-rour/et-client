import EspacioAPI from "../../../../Api/index";

export const fetchContractPFD = async (_, data) => {
  // auth needed
  const res = await EspacioAPI.post(`/reservation/getpdf`, data, {
    responseType: "arraybuffer",
  });

  return res;
};
