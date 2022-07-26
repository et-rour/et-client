<template>
  <download-excel
    class="my-btn w-auto px-4 flex justify-between items-center"
    :data="getUsersData"
    :fields="json_fields"
    worksheet="Hoja usuarios"
    :name="reportName"
    :footer="footerText"
    :header="headerText"
  >
    {{ $t("adminPanel.users.downloadUserList") }}
    <font-awesome-icon icon="fa-regular fa-file-excel" />
  </download-excel>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  props: {
    usersList: {
      required: true,
    },
    dateRange: {
      type: Object,
    },
  },
  data() {
    return {
      json_fields: {
        id: "id",
        registro: "registro",
        nombre: "nombre",
        email: "email",
        telefono: "telefono",
        whatsapp: "whatsapp",
        "¿Está verificado?": "verificado",
        "¿Está activado?": "activado",
        "¿Es dueño?": "dueño",
        "¿Es cliente?": "cliente",
        "¿Es admin?": "admin",
        "¿Completó una reseña?": "review",
      },
    };
  },
  computed: {
    ...mapGetters("adminPanelStore/users", ["getUserListForExcel"]),
    getUsersData() {
      const dataExcel = this.usersList.map((user) => {
        const {
          id,
          firstName,
          lastName,
          created,
          didReview,
          email,
          isActive,
          isAdmin,
          isClient,
          isOwner,
          isVerified,
          phone,
          whatsapp,
        } = user;
        return {
          id: id,
          registro: moment(created).format("DD/MM/YYYY HH:mm:ss"),
          nombre: `${firstName} ${lastName}`,
          email: email,
          telefono: phone,
          whatsapp: whatsapp ? `"${whatsapp}"` : "",
          verificado: isVerified ? "Si" : "No",
          activado: isActive ? "Si" : "No",
          dueño: isOwner ? "Si" : "No",
          cliente: isClient ? "Si" : "No",
          admin: isAdmin ? "Si" : "No",
          review: didReview ? "Si" : "No",
        };
      });
      return dataExcel;
    },
    reportName() {
      return `reporte_usuarios_${moment().format("DD/MM/YYYY_HH:mm:ss")}.xls`;
    },
    headerText() {
      return `Reporte de usuarios`;
    },
    footerText() {
      const { start, end } = this.dateRange;
      if (start === "" && end === "") return "Sin rango de fechas definido";

      return `De ${start} a ${end}`;
    },
  },
};
</script>

<style></style>
