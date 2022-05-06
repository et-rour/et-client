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
            <button class="my-btn" @click="$refs.imageSelector.click()">
              {{ $t("createForm.image") }}
            </button>
            <ProgesBarVue
              :value="propertyImageState"
              :imageUrl="propertyImage"
              class=""
            />
          </div>
        </div>

        <div class="flex items-center justify-between mb-2">
          <label class="text-lg" for="nombre">{{
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

        <div class="flex items-start justify-between mb-2">
          <label class="text-lg" for="direccion">{{
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

        <div class="flex items-center justify-between mb-4">
          <!-- <label class="text-lg" for="zona">{{ $t("createForm.ciudad") }}</label> -->
          <label class="text-lg" for="zona">Tipo de propiedad</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select class="bg-gray-200 px-12 w-full" name="ciudad" v-model="tipoPropiedad" >
              <option disabled selected value="">{{ $t("createForm.opcionDefault") }}</option>
              <!-- <option selected value="">Ciudad</option> -->
              <option
                v-for="(item, index) in [{label: $t('createForm.propiedadEntera'), value: 'entire'}, {label: $t('createForm.propiedadParcial'), value: 'room'}]"
                :value="item.value"
                :key="index+index+'type'"
              >
                {{ item.label }}
              </option>
            </select>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <div class="flex items-center justify-between mb-4">
          <!-- <label class="text-lg" for="zona">{{ $t("createForm.ciudad") }}</label> -->
          <label class="text-lg" for="zona">Ciudad</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select class="bg-gray-200 px-12 w-full" name="ciudad" v-model="ciudad" >
              <option disabled selected value="">{{ $t("createForm.ciudad") }}</option>
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
              <option disabled selected value="">{{ $t("createForm.zona") }}</option>
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
              <option selected value="">
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

        <div class="flex items-center justify-between mb-4">
          <!-- <label class="text-lg" for="zona">{{ $t("createForm.ciudad") }}</label> -->
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
              <option selected value="">
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

        <div class="flex items-center justify-between mb-4">
          <!-- <label class="text-lg" for="zona">{{ $t("createForm.ciudad") }}</label> -->
          <label class="text-lg" for="zona">{{
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
              <option selected value="">
                {{ $t("createForm.opcionDefault") }}
              </option>
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

        <div class="flex items-center justify-between mb-4">
          <!-- <label class="text-lg" for="zona">{{ $t("createForm.ciudad") }}</label> -->
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
              <option selected value="">
                {{ $t("createForm.opcionDefault") }}
              </option>
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

        <div class="flex items-center justify-between my-1">
          <label class="text-lg" for="valor_de_arriendo">{{
            $t("createForm.arriendo")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min_value:1"
            class="w-1/5"
          >
            <input
              class="bg-gray-200 my-input w-full"
              type="number"
              name="valor_de_arriendo"
              min="0"
              v-model="value"
            />
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <div class="flex items-center justify-between mb-4">
          <!-- <label class="text-lg" for="zona">{{ $t("createForm.ciudad") }}</label> -->
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
              <option selected value="">
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

        <div class="flex items-center justify-between mb-4">
          <!-- <label class="text-lg" for="zona">{{ $t("createForm.ciudad") }}</label> -->
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
              <option selected value="">
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
import { CustomErrorToast } from "@/sweetAlert";
export default {
  components: {
    ValidationObserver,
    ProgesBarVue,
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
      painting: "",
      floor: "",
      value: "",
      zone: "",
      ciudad: "",
      time: "",
      garage: "",
      tipoPropiedad: "",
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
      } else {
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
          description: this.description
        };
        const calculatorData = {
          expectedValue: this.value,
          time: this.time,
        };
        try {
          await this.createNewProperty({ propertyData, calculatorData });
          this.$router.push({ name: "result" });
        } catch (error) {
          CustomErrorToast.fire({
            text: error.response.data.message,
          });
        }
      }
      // this.createNewProperty()
    },
    async onSelectedImage(event) {
      // await this.loginInfirebaseStorage(this.user.firebaseToken);
      const image = event.target.files[0];
      if (!image) {
        // this.localImage = null
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
  },
  computed: {
    ...mapGetters("propertiesStore", [
      "zonesList",
      "propertyImage",
      "propertyImageState",
    ]),
    ...mapGetters("authStore", ["user"]),
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
  },
  async mounted() {
    try {
      await this.loadZones();
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message,
      });
    }
  },
  watch: {
    ciudad(value) {
      if (value === "Ciudad" || value === "") {
        this.zone = "";
      }
    },
  },
};
</script>
