import moment from "moment";

export const getAllPayments = (state) => {
  return state.payments;
};
export const getAllPaymentsForExcel = (state) => {
  return state.paymentsForExcel;
};
export const getprevHasMore = (state) => {
  return state.prevHasMore;
};
export const getnextHasMore = (state) => {
  return state.nextHasMore;
};

export const getLastPaymentId = (state) => {
  let lastPaymentId = null;
  if (state.payments.length > 0) {
    lastPaymentId = state.payments[state.payments.length - 1].id;
  }
  return lastPaymentId;
};
export const getFirstPaymentId = (state) => {
  let lastPaymentId = null;
  if (state.payments.length > 0) {
    lastPaymentId = state.payments[0].id;
  }
  return lastPaymentId;
};

export const getAllPaymentsTableSctructure = (state) => {
  if (!state.payments) {
    return [];
  }
  const newData = state.payments.map((payment) => {
    const { amount, created, status, charges, currency } = payment;
    console.log(payment);
    return {
      member:
        charges.data.length > 0 ? charges.data[0].billing_details.name : "",
      date: moment.unix(created).format("MMMM Do, h:mm a"),
      paymentType:
        charges.data.length > 0
          ? charges.data[0].payment_method_details.type
          : "",
      paymentDetails:
        charges.data.length > 0 ? charges.data[0].receipt_url : "",
      amount: amount,
      currency: currency,
      status: status,
    };
  });
  return newData;
};
