<template>
  <div class="">
    <div class="w-2/3 mx-auto">
      <p class="my-5">
        {{ $t("admin.image3d.app") }}
      </p>

      <div class="w-full h-72">
        <div id="viewer" class="w-full h-full"></div>
      </div>
    </div>

    <div class="px-2 table-container">
      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(onSubmitCreateNewImage3d)">
          <table
            class="w-full flex flex-row flex-no-wrap lg:bg-white rounded-lg overflow-hidden lg:shadow-lg my-5"
          >
            <thead class="text-white">
              <tr
                class="bg-red-400 flex flex-col flex-no wrap lg:table-row rounded-l-lg lg:rounded-none mb-2 lg:mb-0"
              >
                <th class="p-3 text-left border border-transparent">
                  {{ $t("admin.image3d.name") }}
                </th>
                <th class="p-3 text-left h-20">
                  {{ $t("admin.image3d.image") }}
                </th>
                <th class="p-3 text-left">
                  {{ $t("admin.image3d.longitude") }}
                </th>
                <th class="p-3 text-left border border-transparent">
                  {{ $t("admin.image3d.latitude") }}
                </th>
                <th class="p-3 text-left" width="110px">
                  {{ $t("admin.image3d.options") }}
                </th>
              </tr>

              <tr
                class="bg-red-400 flex flex-col flex-no wrap lg:table-row rounded-l-lg lg:rounded-none mb-2 lg:mb-0"
                v-for="image in images3dList"
                :key="image.id"
              >
                <th class="p-3 text-left border border-transparent">
                  {{ $t("admin.image3d.name") }}
                </th>
                <th class="p-3 text-left h-20">
                  {{ $t("admin.image3d.image") }}
                </th>
                <th class="p-3 text-left">
                  {{ $t("admin.image3d.longitude") }}
                </th>
                <th class="p-3 text-left border border-transparent">
                  {{ $t("admin.image3d.latitude") }}
                </th>
                <th class="p-3 text-left" width="110px">
                  {{ $t("admin.image3d.options") }}
                </th>
              </tr>
            </thead>
            <tbody class="flex-1 lg:flex-none">
              <tr class="flex flex-col flex-no wrap lg:table-row mb-2 lg:mb-0">
                <td
                  class="border-grey-light border hover:bg-gray-100 p-3 truncate"
                >
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    class="flex flex-col"
                  >
                    <input
                      v-model="name"
                      type="text"
                      class="my-input bg-gray-200 w-24 p-0"
                    />
                    <span class="my-error relative top-0 left-0">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </td>
                <td
                  class="border-grey-light border hover:bg-gray-100 p-3 w-full h-20 text-center"
                >
                  <img
                    v-if="localImage"
                    class="h-full w-1/2 object-cover inline-block mr-4 p-0"
                    :src="localImage"
                    alt="Local image"
                  />
                  <div>
                    <input
                      type="file"
                      @change="onSelectedImage"
                      ref="imageSelector"
                      class="hidden"
                    />

                    <div class="flex flex-col justify-center items-center">
                      <button
                        class="my-btn mr-4"
                        @click="$refs.imageSelector.click()"
                      >
                        {{ $t("createForm.image") }}
                      </button>
                      <ProgesBarImageVue
                        id="image3d"
                        :imageUrl="imageUrl"
                        :value="ImageUploadingState"
                        class="w-full h-5"
                        :showImageLink="false"
                      />
                    </div>
                  </div>
                </td>
                <td
                  class="border-grey-light border hover:bg-gray-100 p-3 relative"
                >
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    class=""
                  >
                    <input
                      v-model="latitude"
                      type="text"
                      class="my-input bg-gray-200 w-16 p-0"
                    />
                    <span class="my-error top-0 right-0" v-if="errors[0]">
                      <font-awesome-icon
                        icon="question-circle"
                        class="text-red-600"
                      ></font-awesome-icon>
                    </span>
                  </ValidationProvider>
                </td>
                <td
                  class="border-grey-light border hover:bg-gray-100 p-3 relative"
                >
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    class=""
                  >
                    <input
                      v-model="longitude"
                      type="text"
                      class="my-input bg-gray-200 w-16 p-0"
                    />
                    <span class="my-error top-0 right-0" v-if="errors[0]">
                      <font-awesome-icon
                        icon="question-circle"
                        class="text-red-600"
                      ></font-awesome-icon>
                    </span>
                  </ValidationProvider>
                </td>
                <td
                  class="border-grey-light border hover:bg-gray-100 p-3 hover:font-medium cursor-pointer"
                >
                  <button :disabled="invalid" class="p-0 m-0" type="submit">
                    <font-awesome-icon
                      icon="floppy-disk"
                      class="text-2xl p-0 m-0"
                      :class="
                        !invalid
                          ? 'text-blue-800'
                          : 'text-gray-400 cursor-not-allowed'
                      "
                    ></font-awesome-icon>
                  </button>
                </td>
              </tr>

              <TableRowVue
                v-for="image in images3dList"
                :key="image.id"
                :image3dData="image"
                :editing="editing === image.id"
                :newCoords="newCoords"
                v-on:changeEditingClick="changeEditingId"
              />
            </tbody>
          </table>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { Viewer } from "photo-sphere-viewer";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import "photo-sphere-viewer/dist/plugins/markers.css";
import { mapGetters, mapActions } from "vuex";
import { ValidationObserver } from "vee-validate";
import { CustomErrorToast, CustomToast } from "@/sweetAlert";
import ProgesBarImageVue from "../../../../../components/ProgesBarImage.vue";
import TableRowVue from "../Components/TableRow.vue";
export default {
  components: {
    ValidationObserver,
    ProgesBarImageVue,
    TableRowVue,
  },
  data() {
    return {
      property: null,

      // data
      name: "",
      image: "",
      longitude: "",
      latitude: "",
      locationId: "",

      // image
      localImage: null,
      file: null,

      // viewer-image-3d
      viewer: "",

      // editing row
      editing: null,
      newCoords: {
        latitude: 0.026,
        longitude: 1.653,
      },
    };
  },
  methods: {
    ...mapActions("adminPanelStore/locations", ["postImage3d"]),
    ...mapActions(["uploadImageTofirebase"]),
    async onSubmitCreateNewImage3d() {
      if (this.file === null) {
        alert(`${this.$t("admin.image3d.validImage")}`);
        return;
      }

      try {
        await this.uploadImageTofirebase({
          id: `image3d`,
          user: this.user.user.email,
          file: this.file,
          directory: "images3d",
        });

        const imageData = {
          name: this.name,
          image: this.imageUrl,
          longitude: this.longitude,
          latitude: this.latitude,
          locationId: this.getLocationDetails.id,
        };

        await this.postImage3d({
          imageData,
          idLocation: this.getLocationDetails.id,
        });

        this.name = "";
        this.image = "";
        this.longitude = "";
        this.latitude = "";
        this.localImage = null;
        this.showMarker();
        CustomToast.fire({
          text: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    showMarker() {
      if (this.viewer !== "") {
        return;
      }
      const imageCount = this.images3dList.length;
      if (imageCount < 1) {
        return;
      }
      this.viewer = new Viewer({
        container: document.querySelector("#viewer"),
        panorama: this.images3dList[imageCount - 1].image,
        plugins: [[MarkersPlugin]],
      });
      const markersPlugin = this.viewer.getPlugin(MarkersPlugin);

      this.viewer.on("click", (e, data) => {
        if (!data.rightclick) {
          markersPlugin.clearMarkers();
          markersPlugin.addMarker({
            id: "#" + Math.random(),
            longitude: data.longitude,
            latitude: data.latitude,
            image: "https://photo-sphere-viewer.js.org/assets/pin-red.png",
            width: 32,
            height: 32,
            anchor: "bottom center",
            tooltip: "Generated pin",
            data: {
              generated: true,
            },
          });
          if (!this.editing) {
            this.longitude = data.longitude.toFixed(3);
            this.latitude = data.latitude.toFixed(3);
          } else {
            this.newCoords.longitude = data.longitude.toFixed(3);
            this.newCoords.latitude = data.latitude.toFixed(3);
          }
        }
        markersPlugin.on("select-marker", (e, marker) => {
          alert(`Cursor is over marker ${marker.name}`);
          console.log(marker);
          // markersPlugin.removeMarker(marker.id);
        });
      });
    },
    onSelectedImage(event) {
      const image = event.target.files[0];
      if (!image) {
        this.localImage = null;
        this.file = null;
        return;
      }
      this.file = image;
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(image);
    },
    async changeEditingId(editingRowId) {
      this.editing = editingRowId;
      const markersPlugin = this.viewer.getPlugin(MarkersPlugin);

      markersPlugin.clearMarkers();
      if (!editingRowId) return;
      const image3dData = this.images3dList.find(
        (image) => image.id === editingRowId
      );
      this.newCoords.latitude = image3dData.latitude;
      this.newCoords.longitude = image3dData.longitude;
      console.log("%cImages3d.vue line:333 editingRowId", "color: #007acc;", {
        editingRowId,
        image3dData,
      });

      const idMarker = `#${Math.random()}`;
      markersPlugin.addMarker({
        id: idMarker,
        longitude: image3dData.longitude,
        latitude: image3dData.latitude,
        image: "https://photo-sphere-viewer.js.org/assets/pin-red.png",
        width: 32,
        height: 32,
        anchor: "bottom center",
        tooltip: image3dData.name,
        data: {
          generated: true,
        },
      });

      markersPlugin.gotoMarker(idMarker, 1500);
    },
    rowEditingId(id) {
      return this.editing === id;
    },
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    ...mapGetters(["imageUrl", "ImageUploadingState"]),
    ...mapGetters("adminPanelStore/locations", ["getLocationDetails"]),
    images3dList() {
      return this.getLocationDetails.images3D;
    },
  },
  mounted() {
    this.showMarker();
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

td:not(:last-child) {
  border-bottom: 0;
}

th:not(:last-child) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
</style>
