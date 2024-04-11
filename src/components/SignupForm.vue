<script setup lang="ts">
import { computed, ref } from "vue";
import Forminput from "./Forminput.vue";
import { validate, length, required } from "../validation";
import { NewUser } from "../users";

const username = ref("");
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 5, max: 10 })]);
});

const password = ref("");
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 10, max: 40 })]);
});

const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

function handleSubmit() {
  if (isInvalid.value) {
    return;
  }
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  };
  console.log(newUser);
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <Forminput name="Username" v-model="username" :status="usernameStatus" />
    <Forminput name="Password" v-model="password" :status="passwordStatus" />
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
