<script setup lang="ts">
import { DateTime } from "luxon";
import PostWriter from "../components/PostWriter.vue";
import { TimelinePost } from "../posts";
import { useUsers } from "../stores/users";

const usersStore = useUsers();

if (!usersStore.currentUserId) {
  throw Error("User not found");
}

const post: TimelinePost = {
  id: "-1",
  title: "Title",
  authorId: usersStore.currentUserId,
  created: DateTime.now(),
  markdown: "## Title",
  html: "<h2>title</h2>",
};
</script>

<template>
  NewPost
  <PostWriter :post="post" />
</template>
