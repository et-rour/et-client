<template>
  <ul class="flex flex-col h-40 md:h-auto relative">
    <router-link
      :to="{
        name: 'admin-users-detail-details',
        params: { id: user.id },
        hash: '#details',
      }"
      active-class="active-class-admin "
      v-for="user in usersList"
      :key="user.id"
    >
      <div class="cursor-pointer p-1 hover:bg-my-blue-primary hover:text-white">
        <span class="block"
          ><b>{{ user.firstName }} {{ user.lastName }}</b></span
        >
        <span>{{ user.email }}</span>
        <!-- <span class="text-xs text-gray-400 block">{{ user.created }}</span> -->
      </div>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: {
    usersList: {
      type: Array,
    },
  },
};
</script>

<style></style>
