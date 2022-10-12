<template>
  <div class="w-full">
    <div class="w-full h-screen flex flex-col md:flex-row">
      <ul
        class="flex flex-col md:h-full md:w-40 bg-my-blue-primary border-t-2 border-black text-white text-center md:text-left flex-shrink-0"
      >
        <span class="text-center py-2">ADMIN MENU</span>
        <router-link :to="{ name: 'admin-users', hash: '#sidebar' }">
          <li
            class="px-2 py-1"
            :class="selected === 1 ? 'active-link' : null"
            @click="switchMenu(1)"
          >
            {{ $t("adminPanel.navbar.users") }}
          </li>
        </router-link>
        <router-link :to="{ name: 'admin-zones', hash: '#sidebar' }">
          <li
            class="px-2 py-1"
            :class="selected === 2 ? 'active-link' : null"
            @click="switchMenu(2)"
          >
            {{ $t("adminPanel.navbar.zones") }}
          </li>
        </router-link>
        <router-link :to="{ name: 'admin-locations', hash: '#sidebar' }">
          <li
            class="px-2 py-1"
            :class="selected === 3 ? 'active-link' : null"
            @click="switchMenu(3)"
          >
            {{ $t("adminPanel.navbar.locations") }}
          </li>
        </router-link>
        <router-link :to="{ name: 'admin-reviews', hash: '#sidebar' }">
          <li
            class="px-2 py-1"
            :class="selected === 4 ? 'active-link' : null"
            @click="switchMenu(4)"
          >
            {{ $t("adminPanel.navbar.review") }}
          </li>
        </router-link>
        <router-link :to="{ name: 'admin-publications', hash: '#sidebar' }">
          <li
            class="px-2 py-1"
            :class="selected === 5 ? 'active-link' : null"
            @click="switchMenu(5)"
          >
            {{ $t("adminPanel.navbar.publications") }}
          </li>
        </router-link>
        <router-link :to="{ name: 'admin-reservations', hash: '#sidebar' }">
          <li
            class="px-2 py-1"
            :class="selected === 6 ? 'active-link' : null"
            @click="switchMenu(6)"
          >
            {{ $t("adminPanel.navbar.reservation") }}
          </li>
        </router-link>
        <router-link :to="{ name: 'admin-payments-detail', hash: '#sidebar' }">
          <li
            class="px-2 py-1"
            :class="selected === 7 ? 'active-link' : null"
            @click="switchMenu(7)"
          >
            {{ $t("adminPanel.navbar.payments") }}
          </li>
        </router-link>
        <router-link :to="{ name: 'admin-trash-bin', hash: '#sidebar' }">
          <li
            class="px-2 py-1"
            :class="selected === 8 ? 'active-link' : null"
            @click="switchMenu(8)"
          >
            {{ $t("adminPanel.navbar.trashbin") }}
          </li>
        </router-link>
      </ul>
      <div class="flex-grow">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    switchMenu(arg) {
      this.selected = arg;
    },
  },
};
</script>

<style>
.active-class-admin {
  background: rgb(206, 206, 206);
  position: relative;
}
.active-class-admin::after {
  content: ">";
  position: absolute;
  top: 30%;
  right: 10px;
  font-weight: 800;
}
</style>

<style scoped>
li:hover,
.active-link {
  background-color: white !important;
  color: #2323d5 !important;
}
</style>
