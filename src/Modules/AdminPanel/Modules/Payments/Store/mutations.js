export const fetchAllPayments = (state, payments) => {
  state.payments = payments;
};
export const fetchAllPaymentsForExel = (state, paymentsData) => {
  state.paymentsForExcel = paymentsData;
};
export const changePreviusLastIdPayment = (state, previusIdPayment) => {
  state.previusLastIdPayment = previusIdPayment;
};
export const changeprevHasMore = (state, hasMore) => {
  state.prevHasMore = hasMore;
};
export const changenextHasMore = (state, hasMore) => {
  state.nextHasMore = hasMore;
};
