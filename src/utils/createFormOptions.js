import i18n from "@/i18n.js";

export default {
  type: [
    { label: i18n.t("createForm.propiedadEntera"), value: "entire" },
    { label: i18n.t("createForm.propiedadParcial"), value: "room" },
  ],
  rooms: [
    { name: "No aplica", value: -1 },
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: i18n.t("createForm.options.more", { count: 5 }), value: 5 },
  ],
  bathrooms: [
    { name: "No aplica", value: -1 },
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: i18n.t("createForm.options.more", { count: 5 }), value: 5 },
  ],
  state: [
    { name: "Muy malo", value: 1 },
    { name: "Malo", value: 2 },
    { name: "Regular", value: 3 },
    { name: "Bueno", value: 4 },
    { name: "Excelente", value: 5 },
  ],
  garage: [
    { name: "No aplica", value: -1 },
    { name: "0", value: 1 },
    { name: "1", value: 2 },
    { name: "2", value: 3 },
    { name: "3", value: 4 },
    { name: "4", value: 5 },
    { name: i18n.t("createForm.options.more", { count: 5 }), value: 6 },
  ],

  // 6 meses, 1 año, 2 años + de 3 años.
  //montWithCount_more
  // yearWithCount_more
  timeAvalible: [
    { name: i18n.tc("general.month", 6, { count: 6 }), value: 1 },
    { name: i18n.tc("general.year", 1, { count: 1 }), value: 2 },
    { name: i18n.tc("general.year", 2, { count: 2 }), value: 3 },
    { name: `+ ${i18n.tc("general.year", 3, { count: 3 })}`, value: 4 },
  ],
  timeUnused: [
    { name: "No aplica", value: -1 },
    { name: i18n.t("createForm.options.to", { start: 1, end: 3 }), value: 1 },
    { name: i18n.t("createForm.options.to", { start: 4, end: 6 }), value: 2 },
    { name: i18n.t("createForm.options.to", { start: 7, end: 9 }), value: 3 },
    { name: i18n.t("createForm.options.to", { start: 10, end: 12 }), value: 4 },
    { name: i18n.t("createForm.options.to", { start: 13, end: 18 }), value: 5 },
    { name: i18n.t("createForm.options.to", { start: 19, end: 24 }), value: 6 },
    { name: i18n.t("createForm.options.moreThan", { start: 24 }), value: 7 },
  ],
};
