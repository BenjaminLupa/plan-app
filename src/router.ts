import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import NewPost from "./views/NewPost.vue";
import ShowPost from "./views/ShowPost.vue";
import EditPost from "./views/EditPost.vue";
import { useUsers } from "./stores/users";

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/posts/new",
    component: NewPost,
    beforeEnter: () => {
      const usersStore = useUsers();

      if (!usersStore.currentUserId) {
        return {
          path: "/",
        };
      }
    },
  },
  {
    path: "/posts/:id",
    component: ShowPost,
  },
  {
    path: "/posts/:id/edit",
    component: EditPost,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
