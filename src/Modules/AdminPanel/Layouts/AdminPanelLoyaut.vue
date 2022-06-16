<template>
  <div class="w-full">
    <div class="w-full h-screen flex flex-col md:flex-row">
      <ul
        class="flex flex-col md:h-full md:w-40 bg-my-blue-primary border-t-2 border-black text-white text-center md:text-left"
      >
        <span class="text-center py-2">ADMIN MENU</span>
        <router-link :to="{ name: 'admin-users', hash: '#details' }">
          <li class="px-2 py-1" :class="selected === 1 ? 'active-link' : null" @click="switchMenu(1)">{{$t("adminPanel.navbar.users")}}</li>
        </router-link>
        <router-link :to="{ name: 'admin-zones', hash: '#details' }">
          <li class="px-2 py-1" :class="selected === 2 ? 'active-link' : null" @click="switchMenu(2)">{{$t("adminPanel.navbar.zones")}}</li>
        </router-link>
        <router-link :to="{ name: 'admin-locations', hash: '#details' }">
          <li class="px-2 py-1" :class="selected === 3 ? 'active-link' : null" @click="switchMenu(3)">{{$t("adminPanel.navbar.locations")}}</li>
        </router-link>
        <router-link :to="{ name: 'admin-reviews', hash: '#details' }">
          <li class="px-2 py-1" :class="selected === 4 ? 'active-link' : null" @click="switchMenu(4)">{{$t("adminPanel.navbar.review")}}</li>
        </router-link>
        <router-link :to="{ name: 'admin-publications', hash: '#details' }">
          <li class="px-2 py-1" :class="selected === 5 ? 'active-link' : null" @click="switchMenu(5)">{{$t("adminPanel.navbar.publications")}}</li>
        </router-link> 
        <router-link :to="{ name: 'admin-reservations', hash: '#details' }">
          <li class="px-2 py-1" :class="selected === 6 ? 'active-link' : null" @click="switchMenu(6)">{{$t("adminPanel.navbar.reservation")}}</li>
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
    }
  },
  methods: {
    switchMenu(arg) {
      this.selected = arg;
    }
  }
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
