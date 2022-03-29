<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }">
    <form
      @submit.prevent="handleSubmit(onSubmitForm)"
      class="flex flex-col items-center justify-evenly h-auto w-full mb-32 lg:mb-2"
    >
      <h1 class="text-2xl text-center font-bold my-4">
        {{ $t("createForm.title") }}
      </h1>

      <div class="my-container font-semibold">
        <!-- image -->
        <div class="w-full flex flex-col items-center gap-4 mb-2">
          <div class="h-40 w-1/3 bg-gray-200 flex justify-center items-center">
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
          <div>
            <button class="my-btn mr-4" @click="$refs.imageSelector.click()">
              {{ $t("createForm.image") }}
            </button>

            <font-awesome-icon
              icon="check"
              class="text-green-400"
              v-if="propertyImageState === 100"
            />
            <font-awesome-icon
              icon="spinner"
              class="animate-spin"
              v-if="propertyImageState > 0 && propertyImageState !== 100"
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
          <label class="text-lg" for="zona">{{ $t("createForm.zona") }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <select class="bg-gray-200 px-12 w-full" name="zona" v-model="zone">
              <option selected value="">{{ $t("createForm.zona") }}</option>
              <option
                v-for="item in zonesList"
                :value="item"
                :key="item.data.id"
              >
                {{ item.data.zone }}
              </option>
            </select>
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <div class="flex items-center justify-between mb-2">
          <label class="text-lg" for="num_de_habitaciones">{{
            $t("createForm.habitaciones")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <input
              class="bg-gray-200 w-full my-input"
              type="number"
              name="num_de_habitaciones"
              v-model="rooms"
            />
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>
        <div class="flex items-center justify-between">
          <label class="text-lg" for="num_de_baños">{{
            $t("createForm.banios")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <input
              class="bg-gray-200 w-full my-input"
              type="number"
              name="num_de_baños"
              v-model="bathrooms"
            />
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <div class="flex items-center justify-between my-4">
          <label class="text-lg" for="estado_de_pintura">{{
            $t("createForm.pintura")
          }}</label>
          <div class="flex gap-4">
            <div class="flex flex-col items-center">
              <input
                class="w-6 h-6"
                type="radio"
                v-model="painting"
                value="1"
              />
              <label>{{ $t("createForm.options.reallyBad") }}</label>
            </div>

            <div class="flex flex-col items-center">
              <input
                class="w-6 h-6"
                type="radio"
                v-model="painting"
                value="2"
              />
              <label>{{ $t("createForm.options.bad") }}</label>
            </div>

            <div class="flex flex-col items-center">
              <input
                class="w-6 h-6"
                type="radio"
                v-model="painting"
                value="3"
                checked
              />
              <label>{{ $t("createForm.options.regular") }}</label>
            </div>

            <div class="flex flex-col items-center">
              <input
                class="w-6 h-6"
                type="radio"
                v-model="painting"
                value="4"
              />
              <label>{{ $t("createForm.options.good") }}</label>
            </div>

            <div class="flex flex-col items-center">
              <input
                class="w-6 h-6"
                type="radio"
                v-model="painting"
                value="5"
              />
              <label>{{ $t("createForm.options.reallyGood") }}</label>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between my-4">
          <label class="text-lg" for="estado_de_suelo">{{
            $t("createForm.suelo")
          }}</label>
          <div class="flex gap-4">
            <div class="flex flex-col items-center">
              <input class="w-6 h-6" type="radio" v-model="floor" value="1" />
              <label>{{ $t("createForm.options.reallyBad") }}</label>
            </div>

            <div class="flex flex-col items-center">
              <input class="w-6 h-6" type="radio" v-model="floor" value="2" />
              <label>{{ $t("createForm.options.bad") }}</label>
            </div>

            <div class="flex flex-col items-center">
              <input
                class="w-6 h-6"
                type="radio"
                v-model="floor"
                value="3"
                checked
              />
              <label>{{ $t("createForm.options.regular") }}</label>
            </div>

            <div class="flex flex-col items-center">
              <input class="w-6 h-6" type="radio" v-model="floor" value="4" />
              <label>{{ $t("createForm.options.good") }}</label>
            </div>

            <div class="flex flex-col items-center">
              <input class="w-6 h-6" type="radio" v-model="floor" value="5" />
              <label>{{ $t("createForm.options.reallyGood") }}</label>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between my-1">
          <label class="text-lg" for="valor_de_arriendo">{{
            $t("createForm.arriendo")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <input
              class="bg-gray-200 my-input w-full"
              type="number"
              name="valor_de_arriendo"
              v-model="value"
            />
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>

        <div class="flex items-center justify-between my-2">
          <label class="text-lg" for="valor_de_arriendo">{{
            $t("createForm.time")
          }}</label>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="w-1/5"
          >
            <input
              class="bg-gray-200 my-input w-full"
              type="number"
              name="time"
              v-model="time"
            />
            <span class="my-error relative top-0 left-0 block">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </div>
      </div>

      <button
        class="w-60 h-10 bg-blue-800 rounded-lg text-white text-lg font-bold my-4"
        :class="invalid ? 'bg-blue-800 bg-opacity-70' : 'bg-blue-800'"
      >
        {{ $t("createForm.submit") }}
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationObserver,
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
      painting: "3",
      floor: "3",
      value: "",
      zone: "",
      time: "",
      image: null,

      localImage: null,
      file: null,
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
        };
        const calculatorData = {
          expectedValue: this.value,
          time: this.time,
        };
        try {
          await this.createNewProperty({ propertyData, calculatorData });
          this.$router.push({ name: "result" });
        } catch (error) {
          alert("error " + error.response.data);
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

      this.uploadfile({ user: this.user.user.email, file: this.file });
    },
  },
  computed: {
    ...mapGetters("propertiesStore", [
      "zonesList",
      "propertyImage",
      "propertyImageState",
    ]),
    ...mapGetters("authStore", ["user"]),
  },
  mounted() {
    // if (this.zonesList.length < 1) {
    this.loadZones();
    // }
  },
};
</script>

<style></style>
