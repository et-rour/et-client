<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }">
    <form
      @submit.prevent="handleSubmit(onSubmitForm)"
      class="flex flex-col items-center justify-evenly h-auto w-full mb-32 lg:mb-2"
    >
      <div class="my-container font-semibold">
        <!-- image -->
        <div class="flex w-full justify-between">
          <h1 class="w-auto">
            {{ $t("createForm.title") }}
          </h1>
          <div class="w-3/4 flex flex-col items-end gap-4">
            <div
              class="h-40 w-1/3 bg-gray-200 flex justify-center items-center"
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
            />
            <div
              class="my-btn text-center mb-2 cursor-pointer"
              @click="$refs.imageSelector.click()"
            >
              {{ $t("createForm.image") }}
            </div>
            <ProgesBarVue
              :value="propertyImageState"
              :imageUrl="propertyImage"
              class=""
            />
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
        <div class="flex items-center justify-between mb-2">
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
        </div>

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
              <option disabled selected value="">
                {{ $t("createForm.opcionDefault") }}
              </option>
              <!-- <option selected value="">Ciudad</option> -->
              <option
                v-for="(item, index) in [
                  { label: $t('createForm.propiedadEntera'), value: 'entire' },
                  { label: $t('createForm.propiedadParcial'), value: 'room' },
                ]"
                :value="item.value"
                :key="index + index + 'type'"
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
            <select
              class="bg-gray-200 px-12 w-full"
              name="tiempo"
              v-model="rooms"
            >
              <option disabled selected value="">
                {{ $t("createForm.opcionDefault") }}
              </option>
              <option
                v-for="(item, index) in roomsOptions"
                :value="item.value"
                :key="index + item.value + 'room'"
              >
                {{ item.name }}
              </option>
            </select>
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
                v-for="(item, index) in garageOptions"
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
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|min_value:1"
            >
              <input
                class="bg-gray-200 my-input w-full"
                type="number"
                name="valor_de_arriendo"
                min="0"
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
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|min_value:1"
            >
              <input
                class="bg-gray-200 my-input w-full"
                type="number"
                name="valor_de_arriendo"
                min="0"
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
                v-for="(item, index) in timeOptions"
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
          <label class="text-lg" for="zona">{{ $t("createForm.timeUse") }}</label>
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
                v-for="(item, index) in timeOptions"
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
            rules="required|min_value:1"
            class="w-1/5"
          >
            <input
              class="bg-gray-200 my-input w-full"
              type="number"
              name="metros"
              min="1"
              v-model="meters"
            />
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
    <ModelUploadImagesComponet
      :showUploadImagesModal="showUploadImagesModal"
      :idLocation="idLocation"
      @toogle="toogleShowUploadImagesModal"
      :buttonText="buttonText"
    />
  </ValidationObserver>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ValidationObserver } from "vee-validate";
import ProgesBarVue from "@/components/ProgesBarImage.vue";
import { CustomErrorToast } from "@/sweetAlert";
import MapCoordsVue from "../../../components/MapCoords.vue";
import ModelUploadImagesComponet from "../../../components/ModelUploadImages.vue";
export default {
  components: {
    ValidationObserver,
    ProgesBarVue,
    MapCoordsVue,
    ModelUploadImagesComponet,
  },
  data() {
    return {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      description: "",
      rooms: "",
      bathrooms: "",
      painting: 3,
      floor: 3,
      valueMin: "",
      valueMax: "",
      zone: "",
      ciudad: "",
      time: "",
      timeUse: "",
      garage: "",
      tipoPropiedad: "",
      lat: undefined,
      lng: undefined,
      meters: "",
      image: null,
      localImage: null,
      file: null,
      stateOptions: [
        { name: "Muy malo", value: 1 },
        { name: "Malo", value: 2 },
        { name: "Regular", value: 3 },
        { name: "Bueno", value: 4 },
        { name: "Excelente", value: 5 },
      ],
      garageOptions: [
        { name: "0", value: 1 },
        { name: "1", value: 2 },
        { name: "2", value: 3 },
        { name: "3", value: 4 },
        { name: "4", value: 5 },
        { name: "5 o más", value: 6 },
      ],
      roomsOptions: [
        { name: "1", value: 1 },
        { name: "2", value: 2 },
        { name: "3", value: 3 },
        { name: "4", value: 4 },
        { name: "5 o más", value: 5 },
      ],
      timeOptions: [
        { name: "1 a 3 meses", value: 1 },
        { name: "4 a 6 meses", value: 2 },
        { name: "7 a 9 meses", value: 3 },
        { name: "10 a 12 meses", value: 4 },
        { name: "13 a 18 meses", value: 5 },
        { name: "19 a 24 meses", value: 6 },
        { name: "Más de 24 meses", value: 7 },
      ],

      // uploadImages
      showUploadImagesModal: false,
      idLocation: null,
      uploadImagesCompleted: false,
    };
  },
  methods: {
    ...mapActions("propertiesStore", [
      "loadZones",
      "createNewProperty",
      "uploadfile",
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
        address: this.address,
        zone: this.zone,
        rooms: this.rooms,
        bathrooms: this.bathrooms,
        painting: this.painting,
        floor: this.floor,
        imageUrl: this.propertyImage,
        user: this.user.user.id,
        garage: this.garage,
        propertyType: this.tipoPropiedad,
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
      try {
        const { id } = await this.createNewProperty({
          propertyData,
          calculatorData,
        });
        this.idLocation = id;
        this.showUploadImagesModal = true;
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
    setNewCoords(event) {
      const { lat, lng } = event;
      this.lat = lat.toFixed(5);
      this.lng = lng.toFixed(5);
    },
    toogleShowUploadImagesModal() {
      this.showUploadImagesModal = !this.showUploadImagesModal;
      if (!this.showUploadImagesModal) {
        this.uploadImagesCompleted = true;
      }
    },
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
    buttonText() {
      return this.$t("adminPanel.locations.imagesList.buttonText");
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
    uploadImagesCompleted(val) {
      if (val === true) {
        this.$router.push({ name: "result" });
      }
    },
  },
  metaInfo: {
    title: "Cargar Propiedad",
  },
};
</script>
