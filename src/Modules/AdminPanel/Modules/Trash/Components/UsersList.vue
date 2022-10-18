<template>
  <ul class="flex flex-col h-40 md:h-auto relative">
    <router-link
      v-for="user in usersList"
      :key="user.id"
      active-class="active-class-admin"
      :to="{
        name: 'admin-trash-user',
        params: { id: user.id },
        hash: `${user.id}`,
      }"
    >
      <a>
        <div
          class="cursor-pointer p-1 hover:bg-my-blue-primary hover:text-white"
        >
          <div class="flex row items-center">
            <font-awesome-icon icon="fa-regular fa-user" id="trashUserIcon" />
            <div class="column ml-2">
              <span class="block"><b>{{user.lastName}}, {{user.firstName}}</b></span>
              <span>{{ user.email }}</span>
            </div>
          </div>
        </div>
      </a>
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
