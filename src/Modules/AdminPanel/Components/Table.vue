<template>
  <div class="w-full h-full">
    <AgGridVue
      class="ag-theme-alpine h-full"
      :columnDefs="columnDefs"
      :rowData="dataTable"
      rowSelection="single"
      animateRows="true"
      @grid-ready="onGridReady"
    >
    </AgGridVue>

    <div v-if="false">
      <CellLinkLocationComponent />
      <CellLinkRoomComponent />
    </div>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import CellLinkLocationComponent from "./CellLinkLocation.vue";
import CellLinkRoomComponent from "./CellLinkRoom.vue";

export default {
  components: {
    AgGridVue,
    CellLinkLocationComponent,
    CellLinkRoomComponent,
  },
  props: {
    dataTable: {
      required: true,
    },
  },
  data() {
    return {
      columnDefs: null,
      gridApi: null,
      columnApi: null,
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
  beforeMount() {
    this.columnDefs = [
      {
        field: "created",
        filter: "agDateColumnFilter",
        filterParams: filterParams,
        width: 120,
        sortable: true,
        comparator: dateComparator,
        sort: "desc",
      },
      {
        field: "start",
        width: 120,
        sortable: true,
        comparator: dateComparator,
        filter: "agDateColumnFilter",
        filterParams: filterParams,
      },
      {
        field: "end",
        width: 120,
        sortable: true,
        comparator: dateComparator,
        filter: "agDateColumnFilter",
        filterParams: filterParams,
      },
      {
        field: "location",
        width: 90,
        cellRendererSelector: () => {
          const locationDetails = { component: "CellLinkLocationComponent" };
          return locationDetails;
        },
      },
      {
        field: "room",
        width: 90,
        cellRendererSelector: () => {
          const roomDetails = { component: "CellLinkRoomComponent" };
          return roomDetails;
        },
      },
      {
        field: "price",
        sortable: true,
        flex: 1,
        minWidth: 200,
      },
      {
        field: "status",
        sortable: true,
        cellClassRules: {
          "green-label": "x === 'created'",
          "red-label": "x === 'finished'",
          "yellow-label": "x === 'in progres'",
        },
        width: 150,
      },
    ];
  },
};

var filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

const dateComparator = function dateComparator(date1, date2) {
  const date1Number = monthToComparableNumber(date1);
  const date2Number = monthToComparableNumber(date2);
  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }
  return date1Number - date2Number;
};

const monthToComparableNumber = function monthToComparableNumber(date) {
  // eg 29/08/2004 gets converted to 20040829
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }
  const yearNumber = Number.parseInt(date.substring(6, 10));
  const monthNumber = Number.parseInt(date.substring(3, 5));
  const dayNumber = Number.parseInt(date.substring(0, 2));
  return yearNumber * 10000 + monthNumber * 100 + dayNumber;
};
</script>
