<script setup lang="ts">
import { DateTime } from "luxon";
import PostWriter from "../components/PostWriter.vue";
import { Post, TimelinePost } from "../posts";
import { useUsers } from "../stores/users";
import { useRouter } from "vue-router";
import { usePosts } from "../stores/posts";

const usersStore = useUsers();
const postsStore = usePosts();
const router = useRouter();
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

async function handleSubmit(post: Post) {
  await postsStore.createPost(post);
  router.push("/");
}
</script>

<template>
  NewPost
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
