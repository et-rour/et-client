import EspacioAPI from "@/Api/index.js";

export const fetchNextPayments = async ({ commit }, lastIdPayment) => {
  const res = await EspacioAPI.get(`/admin/stripe/payments`, {
    params: {
      starting_after: lastIdPayment,
    },
  });
  const { data, has_more } = res.data.payments;
  if (lastIdPayment) {
    commit("changeprevHasMore", true);
  }
  commit("changenextHasMore", has_more);
  commit("fetchAllPayments", data);
};

export const fetchPrevPayments = async ({ commit }, lastIdPayment) => {
  const res = await EspacioAPI.get(`/admin/stripe/payments`, {
    params: {
      ending_before: lastIdPayment,
    },
  });
  const { data, has_more } = res.data.payments;
  commit("changenextHasMore", true);
  commit("changeprevHasMore", has_more);

  commit("fetchAllPayments", data);
};

export const fetchAllPayments = async ({ commit }) => {
  const res = await EspacioAPI.get(`/admin/stripe/payments/all`);
  const { payments, created } = res.data;
  commit("fetchAllPaymentsForExel", { payments, created });
};
