<template>
  <div class="w-48 flex flex-col items-center">
    <div class="relative">
      <img
        v-if="person.image"
        :src="person.image"
        alt="user-circle"
        class="w-24 h-24 object-cover rounded-full"
      />
      <img
        v-else
        src="@/assets/icons/circle-user.png"
        alt="user-circle"
        class="w-24 h-24 object-cover"
      />
      <a
        :href="`mailto:${person.email}?subject=Espacio temporal - Mas información&body=Hola, ${person.name} me encantaria una charla con tigo.`"
        v-if="person.isEmailVisible"
      >
        <font-awesome-icon
          icon="fa-regular fa-envelope"
          class="absolute bottom-0 right-0 bg-my-green-primary p-2 rounded-full text-white"
        />
      </a>
      <div
        class="absolute bottom-0 left-0 bg-my-blue-primary rounded-full text-white w-8 h-8 text-xs flex justify-center items-center"
        @click="isEditing = !isEditing"
      >
        <font-awesome-icon :icon="!isEditing ? 'pen' : 'times'" class="" />
      </div>
    </div>

    <div class="px-4 text-center w-full">
      <p class="font-bold mt-2 truncate overflow-ellipsis">
        {{ person.name }}
      </p>
      <p>{{ person.position }}</p>
    </div>

    <div
      class="px-4 flex flex-col gap-2 py-3 border shadow-xl"
      v-if="isEditing"
    >
      <input
        type="text"
        :placeholder="$t('about-us.name')"
        class="my-input border w-full"
        v-model="editingPerson.name"
      />
      <input
        type="text"
        :placeholder="$t('about-us.email')"
        class="my-input border w-full"
        v-model="editingPerson.email"
      />
      <input
        type="text"
        :placeholder="$t('about-us.position')"
        class="my-input border w-full"
        v-model="editingPerson.position"
      />
      <div class="flex justify-between">
        <label for="showEmail">{{ $t("about-us.showPersonalMember") }}</label>
        <input type="checkbox" v-model="editingPerson.isVisible" />
      </div>
      <div class="flex justify-between">
        <label for="showEmail">{{ $t("about-us.showEmail") }}</label>
        <input type="checkbox" v-model="editingPerson.isEmailVisible" />
      </div>
      <button
        class="my-btn w-auto py-2"
        @click="updatePersonalMemberHandler"
        :disabled="isSaving"
        :class="isSaving ? 'bg-gray-500' : ''"
      >
        {{ $t("general.update") }}
      </button>
    </div>
  </div>
</template>

<script>
import { CustomErrorToast, CustomToast } from "@/sweetAlert";
import { mapActions } from "vuex";

export default {
  props: {
    person: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      isEditing: false,
      isSaving: false,
      editingPerson: {},
    };
  },
  methods: {
    ...mapActions(["updatePersonalMember"]),
    async updatePersonalMemberHandler() {
      this.isSaving = true;
      try {
        await this.updatePersonalMember({
          personalMemberInfo: this.editingPerson,
          id: this.person.id,
        });

        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
      this.isSaving = false;
      this.isEditing = false;
    },
  },
  mounted() {
    this.editingPerson = {
      name: this.person.name,
      email: this.person.email,
      image: this.person.image,
      position: this.person.position,
      isVisible: this.person.isVisible,
      isEmailVisible: this.person.isEmailVisible,
    };
  },
};
</script>

<style></style>
