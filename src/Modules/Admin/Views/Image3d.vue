<template>
  <div class="mb-40">
    <h1 class="my-title my-4">
      {{ $t("admin.image3d.title") }}
      <span v-if="property">{{ property.name }}</span>
    </h1>

    <div class="w-full lg:w-1/2 h-72 mx-auto">
      <div id="viewer" class="w-full h-full"></div>
    </div>

    <ValidationObserver v-slot="{ handleSubmit, invalid }" v-if="property">
      <form @submit.prevent="handleSubmit(onSubmitCreateNewImage3d)">
        <table
          class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"
        >
          <thead class="text-white">
            <tr
              class="bg-red-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
            >
              <th class="p-3 text-left border border-transparent">
                {{ $t("admin.image3d.name") }}
              </th>
              <th class="p-3 text-left h-20">
                {{ $t("admin.image3d.image") }}
              </th>
              <th class="p-3 text-left">{{ $t("admin.image3d.longitude") }}</th>
              <th class="p-3 text-left border border-transparent">
                {{ $t("admin.image3d.latitude") }}
              </th>
              <th class="p-3 text-left" width="110px">
                {{ $t("admin.image3d.options") }}
              </th>
            </tr>

            <tr
              class="bg-red-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
              v-for="image in property.images3D"
              :key="image.id"
            >
              <th class="p-3 text-left border border-transparent">
                {{ $t("admin.image3d.name") }}
              </th>
              <th class="p-3 text-left h-20">
                {{ $t("admin.image3d.image") }}
              </th>
              <th class="p-3 text-left">{{ $t("admin.image3d.longitude") }}</th>
              <th class="p-3 text-left border border-transparent">
                {{ $t("admin.image3d.latitude") }}
              </th>
              <th class="p-3 text-left" width="110px">
                {{ $t("admin.image3d.options") }}
              </th>
            </tr>
          </thead>
          <tbody class="flex-1 sm:flex-none">
            <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
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

                  <div>
                    <button
                      class="my-btn mr-4"
                      @click="$refs.imageSelector.click()"
                    >
                      {{ $t("createForm.image") }}
                    </button>

                    <font-awesome-icon
                      icon="check"
                      class="text-green-400"
                      v-if="propertyImageState3d === 100"
                    />
                    <font-awesome-icon
                      icon="spinner"
                      class="animate-spin"
                      v-if="
                        propertyImageState3d > 0 &&
                        propertyImageState3d !== 100 &&
                        propertyImage3d !== null
                      "
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

            <tr
              class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
              v-for="image in property.images3D"
              :key="image.id"
            >
              <td
                class="border-grey-light border hover:bg-gray-100 p-3 truncate"
              >
                {{ image.name }}
              </td>
              <td
                class="border-grey-light border hover:bg-gray-100 p-3 w-full h-20"
              >
                <img
                  :src="image.image"
                  alt="location image"
                  class="w-full h-full object-cover"
                />
              </td>
              <td class="border-grey-light border hover:bg-gray-100 p-3">
                {{ image.latitude }}
              </td>
              <td class="border-grey-light border hover:bg-gray-100 p-3">
                {{ image.longitude }}
              </td>
              <td
                class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer"
              >
                <font-awesome-icon
                  icon="trash-can"
                  class="text-xl mr-4"
                ></font-awesome-icon>
                <font-awesome-icon
                  icon="floppy-disk"
                  class="text-2xl"
                ></font-awesome-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </ValidationObserver>

    <router-link :to="{ name: 'tenants-detail', params: { id: idProperty } }">{{
      $t("admin.image3d.seeDetails")
    }}</router-link>
  </div>
</template>

<script>
import { Viewer } from "photo-sphere-viewer";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import "photo-sphere-viewer/dist/plugins/markers.css";
import { mapGetters, mapActions } from "vuex";
import { ValidationObserver } from "vee-validate";
export default {
  components: { ValidationObserver },
  props: {
    idProperty: {
      type: Number,
      required: true,
    },
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
    };
  },
  methods: {
    ...mapActions("authStore", ["loginInfirebaseStorage"]),
    ...mapActions("adminStore", ["uploadfile", "createNewImage"]),
    async onSubmitCreateNewImage3d() {
      if (this.propertyImage3d === null) {
        alert(`${this.$t("admin.image3d.validImage")}`);
        return;
      }
      const imageData = {
        name: this.name,
        image: this.propertyImage3d,
        longitude: this.longitude,
        latitude: this.latitude,
        locationId: this.idProperty,
      };
      try {
        await this.createNewImage(imageData);

        this.name = "";
        this.image = "";
        this.longitude = "";
        this.latitude = "";
        this.localImage = null;
        this.showMarker();
      } catch (error) {
        alert(error);
      }
    },
    showMarker() {
      if (this.viewer !== "") {
        return;
      }
      const imageCount = this.property.images3D.length;
      if (imageCount < 1) {
        return;
      }
      this.viewer = new Viewer({
        container: document.querySelector("#viewer"),
        panorama: this.property.images3D[imageCount - 1].image,
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
          this.longitude = data.longitude.toFixed(3);
          this.latitude = data.latitude.toFixed(3);
        }
        markersPlugin.on("select-marker", (e, marker) => {
          alert(`Cursor is over marker ${marker.id}`);
          markersPlugin.removeMarker(marker.id);
        });
      });
    },
    async onSelectedImage(event) {
      // await this.loginInfirebaseStorage(this.user.firebaseToken);
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

      this.uploadfile({ user: this.user.user.email, file: this.file });
    },
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    ...mapGetters("propertiesStore", ["propertiesById"]),
    ...mapGetters("adminStore", ["propertyImage3d", "propertyImageState3d"]),
  },
  mounted() {
    this.property = this.propertiesById(this.idProperty);
    this.showMarker();
  },
};
</script>

<style>
@media (min-width: 640px) {
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
