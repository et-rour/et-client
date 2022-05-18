<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }">
    <form @submit.prevent="handleSubmit(onSubmitRegister)">
      <ValidationProvider
        v-slot="{ errors }"
        rules="required|email"
        class="relative"
      >
        <input
          v-model="registerEmail"
          type="text"
          :placeholder="$t('login.emailRegister')"
          class="my-input border border-gray-400 w-full py-3 rounded-t-md rounded-b-none border-b-0 mt-5"
        />
        <span class="my-error">{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider
        class="relative"
      >
        <input
          v-model="registerPhone"
          type="number"
          :placeholder="$t('login.phone')"
          class="my-input border border-gray-400 w-full py-3 border-b rounded-t-none rounded-b-none"
        />
      </ValidationProvider>

      <div class="w-full flex justify-between">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="relative flex-grow"
        >
          <input
            v-model="firstName"
            type="text"
            :placeholder="$t('login.firstName')"
            class="my-input border border-gray-400 w-full py-3 border-b rounded-t-none rounded-b-none"
          />
          <span class="my-error">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="relative flex-grow"
        >
          <input
            v-model="lastName"
            type="text"
            :placeholder="$t('login.lastName')"
            class="my-input border border-gray-400 w-full py-3 border-b rounded-t-none rounded-b-none"
          />
          <span class="my-error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <ValidationProvider v-slot="{ errors }" rules="required" class="relative">
        <input
          v-model="registerPassword"
          type="password"
          :placeholder="$t('login.passwordRegister')"
          class="my-input border border-gray-400 w-full py-3 rounded-b-md border-t-0 rounded-t-none"
        />
        <span class="my-error">{{ errors[0] }}</span>
      </ValidationProvider>

      <div>
        <p class="my-2">{{ $t("login.country") }}</p>
        <div class="grid grid-cols-3 gap-5">
        <ValidationProvider class="relative" rules="required">
          <select
            name="day"
            class="border text-center py-2 w-full"
            v-model="registerCountry" 
          >
            <option disabled selected value="">{{ $t("login.countryPlaceholder") }}</option>
            <option value="Chile">Chile</option>
            <option value="Perú">Perú</option>
          </select>
        </ValidationProvider>
        <div></div>
        <div></div>
        </div>
      </div>

      <div>
        <p class="my-2">{{ $t("login.birth") }}</p>
        <div class="grid grid-cols-3 gap-5">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <select
              name="day"
              class="border text-center py-2 w-full"
              v-model="day"
            >
              <option selected value="">{{ $t("login.day") }}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
            <span class="my-error relative top-0 left-0">{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" rules="required">
            <select
              name="month"
              class="border text-center py-2 w-full"
              v-model="month"
            >
              <option value="" selected>{{ $t("login.month") }}</option>
              <option value="01">enero</option>
              <option value="02">febrero</option>
              <option value="03">marzo</option>
              <option value="04">abril</option>
              <option value="05">Mayo</option>
              <option value="06">junio</option>
              <option value="07">mes de julio</option>
              <option value="08">agosto</option>
              <option value="09">septiembre</option>
              <option value="10">octubre</option>
              <option value="11">noviembre</option>
              <option value="12">diciembre</option>
            </select>
            <span class="my-error relative top-0 left-0">{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" rules="required">
            <select
              name="Año"
              class="border text-center py-2 w-full"
              v-model="year"
            >
              <option value="" selected>{{ $t("login.year") }}</option>
              <option value="1940">1940</option>
              <option value="1941">1941</option>
              <option value="1942">1942</option>
              <option value="1943">1943</option>
              <option value="1944">1944</option>
              <option value="1945">1945</option>
              <option value="1946">1946</option>
              <option value="1947">1947</option>
              <option value="1948">1948</option>
              <option value="1949">1949</option>
              <option value="1950">1950</option>
              <option value="1951">1951</option>
              <option value="1952">1952</option>
              <option value="1953">1953</option>
              <option value="1954">1954</option>
              <option value="1955">1955</option>
              <option value="1956">1956</option>
              <option value="1957">1957</option>
              <option value="1958">1958</option>
              <option value="1959">1959</option>
              <option value="1960">1960</option>
              <option value="1961">1961</option>
              <option value="1962">1962</option>
              <option value="1963">1963</option>
              <option value="1964">1964</option>
              <option value="1965">1965</option>
              <option value="1966">1966</option>
              <option value="1967">1967</option>
              <option value="1968">1968</option>
              <option value="1969">1969</option>
              <option value="1970">1970</option>
              <option value="1971">1971</option>
              <option value="1972">1972</option>
              <option value="1973">1973</option>
              <option value="1974">1974</option>
              <option value="1975">1975</option>
              <option value="1976">1976</option>
              <option value="1977">1977</option>
              <option value="1978">1978</option>
              <option value="1979">1979</option>
              <option value="1980">1980</option>
              <option value="1981">1981</option>
              <option value="1982">1982</option>
              <option value="1983">1983</option>
              <option value="1984">1984</option>
              <option value="1985">1985</option>
              <option value="1986">1986</option>
              <option value="1987">1987</option>
              <option value="1988">1988</option>
              <option value="1989">1989</option>
              <option value="1990">1990</option>
              <option value="1991">1991</option>
              <option value="1992">1992</option>
              <option value="1993">1993</option>
              <option value="1994">1994</option>
              <option value="1995">1995</option>
              <option value="1996">1996</option>
              <option value="1997">1997</option>
              <option value="1998">1998</option>
              <option value="1999">1999</option>
              <option value="2000">2000</option>
              <option value="2001">2001</option>
              <option value="2002">2002</option>
              <option value="2003">2003</option>
              <option value="2004">2004</option>
              <option value="2005">2005</option>
              <option value="2006">2006</option>
              <option value="2007">2007</option>
              <option value="2008">2008</option>
              <option value="2009">2009</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </select>
            <span class="my-error relative top-0 left-0">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="flex justify-end items-center w-full mt-2">
        <input
          type="checkbox"
          class="checkbox mr-2 p-6 bg-black"
          v-model="isOwner"
        />
        <label for="checkbox"> {{ $t("login.isOwner") }}</label>
      </div>

      <button
        class="my-btn w-full py-4 my-4 bg-my-blue-primary"
        type="submit"
        :class="
          invalid ? 'bg-my-blue-primary bg-opacity-70' : 'bg-my-blue-primary'
        "
      >
        {{ $t("login.register") }}
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions } from "vuex";
import { CustomErrorToast } from "@/sweetAlert";
export default {
  data() {
    return {
      registerEmail: "",
      registerPhone: "",
      registerCountry: "",
      firstName: "",
      lastName: "",
      registerPassword: "",
      day: "",
      month: "",
      year: "",
      isOwner: false,
    };
  },
  components: {
    ValidationObserver,
  },
  methods: {
    ...mapActions("authStore", ["register"]),
    async onSubmitRegister() {
      const userData = {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.registerEmail,
        password: this.registerPassword,
        country: this.registerCountry,
        isOwner: this.isOwner,
        phone: (this.registerPhone).toString(),
      };
      try {
        this.register(userData);
      } catch (error) {
        console.log(error)
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
  },
};
</script>
