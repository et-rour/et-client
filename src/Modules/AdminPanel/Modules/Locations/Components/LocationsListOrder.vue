<template>
  <div class="flex flex-col items-end">
    <button
      class="my-btn rounded-lg w-auto px-4 mr-2 my-2"
      @click="onClickChangeOrder">
      <font-awesome-icon icon="fa-solid fa-floppy-disk" />
    </button>
    <draggable
      :list="list"
      class="list-group w-full"
      :move="checkMove"
      @start="dragging = true"
      @end="onEnd">
      <div
        v-for="element in list"
        :key="`location_order_${element.id}`"
        class="list-group-item cursor-pointer border py-2 px-1"
        :class="!element.isActive && 'bg-red-100'">
        <font-awesome-icon icon="fa-solid fa-bars" class="mr-2" />
        {{ element.order }}.- {{ element.name }}
      </div>
    </draggable>

    <!-- <DebugModal>
      <pre class="bg-blue-300">{{
        JSON.stringify(alteredList, null, "\t")
      }}</pre>
      <pre>{{ JSON.stringify(list, null, "\t") }}</pre>
    </DebugModal> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
// import DebugModal from "../../../../../components/DebugModal.vue";
import { PUT_ADMIN_LOCATIONS_ORDER } from "@/Services/Admin/admin_location_services";
import { CustomErrorToast, CustomToast } from "../../../../../sweetAlert";
export default {
  components: {
    draggable,
    // DebugModal,
  },
  props: {
    locationsList: {
      type: Array,
    },
  },
  data() {
    return {
      list: [],
      dragging: false,
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
    alteredList() {
      return this.list.filter(
        (element) => element.firstOrder !== element.order
      );
    },
  },
  methods: {
    loadSimpleLocationsList() {
      this.list = this.locationsList.map((location) => ({
        id: location.id,
        name: location.name,
        order: location.order,
        isActive: location.isActive,
        firstOrder: location.order,
      }));
    },
    checkMove(e) {
      e.draggedContext.element.order = e.draggedContext.futureIndex;
    },
    onEnd() {
      this.dragging = false;
      this.list = this.list.map((element, index) => ({
        ...element,
        order: index + 1,
      }));
    },
    async onClickChangeOrder() {
      try {
        await PUT_ADMIN_LOCATIONS_ORDER({ locationsList: this.alteredList });

        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
      } catch (error) {
        CustomErrorToast.fire({ text: error.response.data.message || error });
      }
    },
  },
  mounted() {
    this.loadSimpleLocationsList();
  },
};
</script>
