<script setup lang="ts">
import { computed, ref } from "vue";
import Forminput from "./Forminput.vue";
import { validate, length, required } from "../validation";
import { NewUser } from "../users";

defineProps<{
  error?: string;
}>();

const emit = defineEmits<{
  (event: "submit", payload: NewUser): void;
}>();

const username = ref("");
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 5, max: 10 })]);
});

const password = ref("");
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 5, max: 15 })]);
});

const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

async function handleSubmit() {
  if (isInvalid.value) {
    return;
  }
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  };

  try {
    emit("submit", newUser);
  } catch (e) {}
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <Forminput
      data-testid="username"
      name="Username"
      v-model="username"
      :status="usernameStatus"
      type="text"
    />
    <Forminput
      data-testid="password"
      name="Password"
      v-model="password"
      type="password"
      :status="passwordStatus"
    />
    <div class="is-danger help" v-if="error">
      {{ error }}
    </div>
    <button :disabled="isInvalid" class="button">Submit</button>
  </form>
</template>

<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
