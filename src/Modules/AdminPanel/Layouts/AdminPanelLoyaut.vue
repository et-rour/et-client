<template>
  <div class="w-full mb-10">
    <div class="w-full h-screen flex flex-col md:flex-row">
      <ul
        class="flex flex-col md:h-full md:w-40 gap-2 bg-my-blue-primary text-white text-center md:text-left px-2 py-4"
      >
        <li>
          <router-link :to="{ name: 'admin-users', hash: '#details' }">{{
            $t("adminPanel.navbar.users")
          }}</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'admin-zones', hash: '#details' }">{{
            $t("adminPanel.navbar.zones")
          }}</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'admin-locations', hash: '#details' }">{{
            $t("adminPanel.navbar.locations")
          }}</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'admin-reviews', hash: '#details' }">{{
            $t("adminPanel.navbar.review")
          }}</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'admin-reservations', hash: '#details' }">{{
            $t("adminPanel.navbar.reservation")
          }}</router-link>
        </li>
      </ul>
      <div class="flex-grow">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
