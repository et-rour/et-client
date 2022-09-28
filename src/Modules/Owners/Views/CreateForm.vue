<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }">
    <form
      @submit.prevent="handleSubmit(onSubmitForm)"
      class="flex flex-col items-center justify-evenly h-auto w-full mb-32 lg:mb-2"
    >
      <div class="my-container font-semibold">
        <!-- image -->
        <div class="flex flex-col md:flex-row justify-between">
          <h1 class="text-center">
            {{ $t("createForm.title") }}
          </h1>
          <div class="w-full md:w-80 flex flex-col items-end gap-4">
            <div
              class="h-40 w-full bg-gray-200 flex justify-center items-center"
            >
              <img
                v-if="localImage"
                class="h-full object-contain"
                :src="localImage"
                alt="Local image"
              />
            </div>
            <input
              type="file"
              @change="onSelectedImage"
              ref="imageSelector"
              class="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <div
              class="my-btn text-center mb-2 cursor-pointer px-4 w-72"
              @click="$refs.imageSelector.click()"
            >
              {{ $t("createForm.image") }}
            </div>
            <ProgesBarVue
              :id="`coverImage`"
              :value="propertyImageState"
              :imageUrl="propertyImage"
            />
          </div>
        </div>

        <!-- images -->
        <div class="flex justify-between mb-4">
          <label class="text-lg" for="name">{{
            $t("createForm.imagesDesc")
          }}</label>

          <div class="text-right flex flex-col">
            <input
              type="file"
              name="images"
              multiple
              id="images"
              class="hidden"
              ref="imagesSelector"
              @change="onSelectedImages"
              accept="image/png, image/gif, image/jpeg"
            />
            <div
              class="my-btn text-center mb-2 cursor-pointer self-end w-72"
              @click="$refs.imagesSelector.click()"
            >
              {{ $t("createForm.images") }}
            </div>
            <p
              v-for="(image, index) in images"
              class="text-sm text-gray-400"
              :key="`local_image_array_${index}_${image.name}`"
            >
              {{ image.name }}
            </p>
          </div>
        </div>

        <!-- name -->
        <div class="flex items-center justify-between mb-2">
          <label class="text-lg" for="name">{{
            $t("createForm.nombre")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-3/4"
          >
            <input
              class="bg-gray-200 my-input w-full"
              type="text"
              v-model="name"
            />
            <span class="my-error relative top-0 left-0">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <!-- email -->
        <div class="flex items-center justify-between mb-2">
          <label class="text-lg" for="email">{{
            $t("createForm.email")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|email"
            class="w-3/4"
          >
            <input
              class="bg-gray-200 w-full my-input"
              type="text"
              name="email"
              v-model="email"
            />
            <span class="my-error relative top-0 left-0">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <!-- telefono -->
        <div class="flex items-center justify-between mb-2">
          <label class="text-lg" for="telefono">{{
            $t("createForm.telefono")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-3/4"
          >
            <input
              class="bg-gray-200 w-full my-input"
              type="text"
              v-model="phoneNumber"
            /><span class="my-error relative top-0 left-0">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <hr class="solid my-4" />

        <!-- direccion -->
        <!-- <div class="flex items-center justify-between mb-2">
          <label class="text-lg" for="direccion">{{
            $t("createForm.dirección")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-3/4"
          >
            <input
              class="bg-gray-200 w-full my-input"
              type="text"
              v-model="address"
            />
            <span class="my-error relative top-0 left-0">{{ errors[0] }}</span>
          </ValidationProvider>
        </div> -->

        <!-- description -->
        <div class="flex items-start justify-between mb-2">
          <label class="text-lg" for="description">{{
            $t("createForm.descripción")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-3/4"
          >
            <textarea
              name="descripcion"
              class="bg-gray-200 w-full my-input"
              rows="10"
              v-model="description"
            ></textarea>
            <span class="my-error relative top-0 left-0">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <!-- type -->
        <div class="flex items-center justify-between mb-4">
          <label class="text-lg" for="type">{{ $t("createForm.type") }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select
              class="bg-gray-200 px-12 w-full"
              name="ciudad"
              v-model="tipoPropiedad"
            >
              <option
                v-for="(item, index) in typeOptions"
                :value="item.value"
                :key="`${index}_option`"
              >
                {{ item.label }}
              </option>
            </select>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <!-- city -->
        <div class="flex items-center justify-between mb-4">
          <label class="text-lg" for="useType">{{ $t("createForm.useType") }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select
              class="bg-gray-200 px-12 w-full"
              name="landUse"
              v-model="landUse"
            >
              <option :value="'commercial'">{{ $t("createForm.useType2") }}</option>
              <option :value="'housing'">{{ $t("createForm.useType1") }}</option>
            </select>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <!-- city -->
        <div class="flex items-center justify-between mb-4">
          <label class="text-lg" for="city">{{ $t("createForm.city") }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select
              class="bg-gray-200 px-12 w-full"
              name="ciudad"
              v-model="ciudad"
            >
              <option disabled selected value="">
                {{ $t("createForm.ciudad") }}
              </option>
              <!-- <option selected value="">Ciudad</option> -->
              <option
                v-for="(item, index) in filteredCities"
                :value="item"
                :key="index + index + 'city'"
              >
                {{ item }}
              </option>
            </select>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <!-- zone -->
        <div
          class="flex items-center justify-between mb-4"
          :class="ciudad === 'Ciudad' || ciudad === '' ? 'hidden' : null"
        >
          <label class="text-lg" for="zona">{{ $t("createForm.zona") }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select
              class="bg-gray-200 px-12 w-full"
              name="zona"
              v-model="zone"
              :disabled="ciudad === 'Ciudad' || ciudad === ''"
            >
              <option disabled selected value="">
                {{ $t("createForm.zona") }}
              </option>
              <option
                v-for="(item, index) in filteredZones"
                :value="item.id"
                :key="index + index + 'zone'"
              >
                {{ item.zone }}
              </option>
            </select>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <!-- num_de_habitaciones -->
        <div class="flex items-center justify-between mb-4">
          <!-- <label class="text-lg" for="zona">{{ $t("createForm.ciudad") }}</label> -->
          <label class="text-lg" for="num_de_habitaciones">{{
            $t("createForm.habitaciones")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <div class="flex row justify-between items-center">
              <button @click="changeRooms('minus')" class="bg-my-blue-primary rounded-full w-6 h-6 mx-2 text-white">-</button>
              <InputNumber
                  disabled
                  class="bg-gray-200 my-input w-full text-center"
                  v-model="rooms"
                />
              <button @click="changeRooms('add')" class="bg-my-blue-primary rounded-full w-6 h-6 mx-2 text-white">+</button>
            </div>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <!-- num_de_baños -->
        <div class="flex items-center justify-between mb-4">
          <label class="text-lg" for="num_de_baños">{{
            $t("createForm.banios")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select
              class="bg-gray-200 px-12 w-full"
              name="bathrooms"
              v-model="bathrooms"
            >
              <option disabled selected value="">
                {{ $t("createForm.opcionDefault") }}
              </option>
              <option
                v-for="(item, index) in bathroomsOptions"
                :value="item.value"
                :key="index + item.value + 'garage'"
              >
                {{ item.name }}
              </option>
            </select>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <!-- pintura -->
        <div class="flex items-center justify-between mb-4">
          <label class="text-lg" for="pintura">{{
            $t("createForm.pintura")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select
              class="bg-gray-200 px-12 w-full"
              name="pintura"
              v-model="painting"
            >
              <!-- <option disabled selected value="">
                {{ $t("createForm.opcionDefault") }}
              </option> -->
              <option
                v-for="(item, index) in stateOptions"
                :value="item.value"
                :key="index + item.value + 'painting'"
              >
                {{ item.name }}
              </option>
            </select>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <!-- suelo -->
        <div class="flex items-center justify-between mb-4">
          <label class="text-lg" for="zona">{{ $t("createForm.suelo") }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select
              class="bg-gray-200 px-12 w-full"
              name="suelo"
              v-model="floor"
            >
              <!-- <option disabled selected value="">
                {{ $t("createForm.opcionDefault") }}
              </option> -->
              <option
                v-for="(item, index) in stateOptions"
                :value="item.value"
                :key="index + item + 'ground'"
              >
                {{ item.name }}
              </option>
            </select>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <!-- valor_de_arriendo -->
        <div class="flex items-center justify-between my-1">
          <label class="text-lg" for="valor_de_arriendo"
            >{{ $t("createForm.arriendo") }} ({{ currency }})</label
          >
          <div
            class="flex flex-col md:flex-row items-center justify-between w-1/5 relative"
          >
            <ValidationProvider v-slot="{ errors }" rules="required">
              <InputNumber
                class="bg-gray-200 my-input w-full"
                v-model="valueMin"
              />

              <div
                class="my-error absolute w-10 h-10 top-0 -left-10 flex justify-center items-center"
                v-if="errors[0]"
              >
                <abbr :title="errors[0]">
                  <font-awesome-icon icon="circle-info"></font-awesome-icon>
                </abbr>
              </div>
            </ValidationProvider>
            <p class="mx-1">a</p>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <InputNumber
                class="bg-gray-200 my-input w-full"
                v-model="valueMax"
              />

              <div
                class="my-error absolute w-10 h-10 top-0 left-full flex justify-center items-center"
                v-if="errors[0]"
              >
                <abbr :title="errors[0]">
                  <font-awesome-icon icon="circle-info"></font-awesome-icon>
                </abbr>
              </div>
            </ValidationProvider>
          </div>
        </div>

        <!-- time -->
        <div class="flex items-center justify-between mb-4">
          <label class="text-lg" for="zona">{{ $t("createForm.time") }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select
              class="bg-gray-200 px-12 w-full"
              name="tiempo"
              v-model="time"
            >
              <option disabled selected value="">
                {{ $t("createForm.opcionDefault") }}
              </option>
              <option
                v-for="(item, index) in timeAvalibleOptions"
                :value="item.value"
                :key="index + item.name + 'time'"
              >
                {{ item.name }}
              </option>
            </select>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <!-- time without use-->
        <div class="flex items-center justify-between mb-4">
          <label class="text-lg" for="zona">{{
            $t("createForm.timeUse")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select
              class="bg-gray-200 px-12 w-full"
              name="tiempoUso"
              v-model="timeUse"
            >
              <option disabled selected value="">
                {{ $t("createForm.opcionDefault") }}
              </option>
              <option
                v-for="(item, index) in timeUnusedOptions"
                :value="item.value"
                :key="index + item.name + 'time'"
              >
                {{ item.name }}
              </option>
            </select>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <!-- garage -->
        <div class="flex items-center justify-between mb-4">
          <label class="text-lg" for="zona">{{
            $t("createForm.garage")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select
              class="bg-gray-200 px-12 w-full"
              name="garage"
              v-model="garage"
            >
              <option disabled selected value="">
                {{ $t("createForm.opcionDefault") }}
              </option>
              <option
                v-for="(item, index) in garageOptions"
                :value="item.value"
                :key="index + item.value"
              >
                {{ item.name }}
              </option>
            </select>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <!-- metros_cuadrados -->
        <div class="flex items-center justify-between my-1">
          <label class="text-lg" for="metros">{{
            $t("createForm.metros")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <InputNumber class="bg-gray-200 my-input w-full" v-model="meters" />
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <!-- map -->
        <MapCoordsVue
          :lat="lat"
          :long="lng"
          @result-click="setNewCoords"
          :showMap="false"
        ></MapCoordsVue>

        <!-- VALIDATE COORDS -->
        <ValidationObserver>
          <ValidationProvider
            v-slot="{ errors }"
            rules="both:@longitud"
            class="w-full"
            name="latitude"
          >
            <input
              class="bg-gray-200 my-input hidden w-full"
              type="text"
              v-model="lat"
            />
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>

          <ValidationProvider class="w-full" name="longitud">
            <input
              class="bg-gray-200 my-input hidden w-full"
              type="text"
              v-model="lng"
            />
          </ValidationProvider>
        </ValidationObserver>

        <!-- <p>lat:{{ lat }} long:{{ lng }}</p> -->
      </div>

      <button
        class="w-60 h-10 bg-my-blue-primary rounded-lg text-white text-lg font-bold my-4"
        :class="invalid ? ' bg-opacity-70' : ''"
      >
        {{ $t("createForm.submit") }}
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ValidationObserver } from "vee-validate";
import ProgesBarVue from "@/components/ProgesBarImage.vue";
import { CustomErrorToast, CustomConfirmWarningDialog } from "@/sweetAlert";
import MapCoordsVue from "../../../components/MapCoords.vue";
import createPropertyOptions from "@/utils/createFormOptions.js";
import InputNumber from "../../../components/InputNumberMask.vue";
import Swal from "sweetalert2";

export default {
  components: {
    ValidationObserver,
    ProgesBarVue,
    MapCoordsVue,
    InputNumber,
  },
  data() {
    return {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      description: "",
      rooms: 0,
      bathrooms: "",
      painting: 3,
      floor: 3,
      valueMin: "",
      valueMax: "",
      landUse: "commercial",
      zone: "",
      ciudad: "",
      time: "",
      timeUse: "",
      garage: "",
      tipoPropiedad: "house",
      lat: undefined,
      lng: undefined,
      meters: "",
      image: null,
      localImage: null,
      file: null,
      typeOptions: createPropertyOptions.type,
      roomsOptions: createPropertyOptions.rooms,
      bathroomsOptions: createPropertyOptions.bathrooms,
      stateOptions: createPropertyOptions.state,
      garageOptions: createPropertyOptions.garage,
      timeAvalibleOptions: createPropertyOptions.timeAvalible,
      timeUnusedOptions: createPropertyOptions.timeUnused,

      // uploadImages
      images: [],
    };
  },
  methods: {
    ...mapActions("propertiesStore", [
      "loadZones",
      "createNewProperty",
      "uploadfile",
      "uploadPropertyArrayImages",
    ]),
    ...mapActions("authStore", ["loginInfirebaseStorage"]),
    ...mapMutations("authStore", ["changeShowLoginModal"]),
    async onSubmitForm() {
      if (!this.user.user) {
        this.changeShowLoginModal(open);
        return;
      }
      const propertyData = {
        name: this.name,
        address: "",
        zone: this.zone,
        rooms: this.rooms,
        bathrooms: this.bathrooms,
        painting: this.painting,
        floor: this.floor,
        imageUrl: this.propertyImage,
        user: this.user.user.id,
        garage: this.garage,
        propertyType: this.tipoPropiedad,
        landUse: this.landUse,
        email: this.email,
        phone: this.phoneNumber,
        description: this.description,
        lat: this.lat,
        lng: this.lng,
        meters: this.meters,
      };
      const calculatorData = {
        expectedValue: (parseInt(this.valueMin) + parseInt(this.valueMax)) / 2,
        time: this.time,
        timeUse: this.timeUse,
        currencyData: this.country,
      };
      new Swal({
        title: this.$t("sweetAlertMessages.saving", {
          object: this.$t("general.property"),
        }),
        allowOutsideClick: false,
      });

      Swal.showLoading();
      try {
        const { id } = await this.createNewProperty({
          propertyData,
          calculatorData,
        });
        this.idLocation = id;

        if (this.images.length > 0) {
          new Swal({
            title: this.$t("sweetAlertMessages.saving", {
              object: this.$t("general.image", 2, {
                count: this.images.length,
              }),
            }),
            allowOutsideClick: false,
          });
          Swal.showLoading();

          await this.uploadPropertyArrayImages({
            id,
            images: [...this.images],
          });
        }
        Swal.close();

        this.$router.push({ name: "result" });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
    async onSelectedImage(event) {
      const image = event.target.files[0];
      if (!image) {
        this.file = null;
        return;
      }
      this.file = image;
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(image);
      try {
        await this.uploadfile({ user: this.user.user.email, file: this.file });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
    async onSelectedImages(event) {
      const images = [...event.target.files];

      if (images.length > 5) {
        await CustomConfirmWarningDialog.fire({
          text: this.$t("createForm.imagesLimit"),
        });
        return;
      }

      const newImages = [];
      images.forEach(async (image) => {
        if (image.size > 1048576) {
          await CustomConfirmWarningDialog.fire({
            text: this.$t("createForm.imagesLimitSize", { file: image.name }),
          });
        }
        newImages.push(image);
      });
      this.images = newImages;
    },
    setNewCoords(event) {
      const { lat, lng } = event;
      this.lat = lat.toFixed(5);
      this.lng = lng.toFixed(5);
    },
    removeLetters(e) {
      const value = e.target.value;
      const regExOnlyNumbers = new RegExp("^[,0-9]+$");

      if (!value.match(regExOnlyNumbers)) {
        console.log(
          "%cerror CreateForm.vue line:735 ",
          "color: red; display: block; width: 100%;"
        );
        return;
      }
      const newValue = value
        .replaceAll(",", "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.meters = newValue;
    },
    changeRooms(type) {
      if (type === 'add' && this.rooms < 40) this.rooms = this.rooms + 1;
      if (type === 'minus' && this.rooms > 0) this.rooms = this.rooms - 1;
    }
  },
  computed: {
    ...mapGetters("propertiesStore", [
      "zonesList",
      "propertyImage",
      "propertyImageState",
    ]),
    ...mapGetters("authStore", ["user", "siteCountry"]),
    ...mapGetters("postsStore", ["currencies"]),
    filteredCities() {
      if (this.zonesList.length) {
        let mappedZones = this.zonesList.map((element) => {
          return element.city;
        });
        return mappedZones.filter(
          (element, index) => mappedZones.indexOf(element) === index
        );
      } else {
        return [];
      }
    },
    filteredZones() {
      if (this.zonesList.length) {
        return this.zonesList.filter((element) => element.city === this.ciudad);
      } else {
        return [];
      }
    },
    userData() {
      return {
        name: this.user.user.firstName + " " + this.user.user.lastName,
        email: this.user.user.email,
        phone: this.user.user.phone,
      };
    },
    currency() {
      if (!this.zone) {
        if (this.siteCountry === "Chile") return "pesos chilenos";
        return "soles";
      } else {
        const res = this.zonesList.filter((el) => el.id === this.zone);
        if (res[0].country === "Chile") return "pesos chilenos";
        return "soles";
      }
    },
    country() {
      if (!this.zone) {
        if (this.siteCountry === "Chile") return "Chile";
        return "Perú";
      } else {
        const res = this.zonesList.filter((el) => el.id === this.zone);
        if (res[0].country === "Chile") return "Chile";
        return "Perú";
      }
    },
  },
  async mounted() {
    try {
      await this.loadZones();
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message,
      });
    }
    this.name = this.userData.name;
    this.email = this.userData.email;
    this.phoneNumber = this.userData.phone;
  },
  watch: {
    ciudad(value) {
      if (value === "Ciudad" || value === "") {
        this.zone = "";
      }
    },
  },
  metaInfo: {
    title: "Cargar Propiedad",
  },
};
</script>

<style scooped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
