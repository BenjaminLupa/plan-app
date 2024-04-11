<script setup lang="ts">
import { computed, ref } from "vue";
import Forminput from "./Forminput.vue";
import { validate, length, required } from "../validation";

const username = ref("");
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 5, max: 10 })]);
});

const password = ref("");
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 10, max: 40 })]);
});
</script>

<template>
  <form class="form">
    <Forminput name="Username" v-model="username" :status="usernameStatus" />
    <Forminput name="Password" v-model="password" :status="passwordStatus" />
  </form>
</template>

<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
