import { mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter, Router } from "vue-router";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { routes } from "../router";
import PostWriter from "./PostWriter.vue";
import { useUsers } from "../stores/users";

describe("UserForm", () => {
  let pinia: Pinia;
  let router: Router;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    const users = useUsers();
    users.currentUserId = "1";
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
  });
  it("writes a post using markdown", () => {
    return new Promise<void>(async (resolve) => {
      const wrapper = mount(PostWriter, {
        global: {
          plugins: [pinia, router],
        },
        props: {
          post: {
            id: "1",
            title: "",
            authorId: "1",
            created: "",
            markdown: "",
            html: "",
          },
        },
      });
      wrapper.find<HTMLDivElement>("#contenteditable").element.innerText =
        "# Title";

      await wrapper.find("#contenteditable").trigger("input");

      setTimeout(async () => {
        await wrapper.find("#submit").trigger("click");
        console.log(wrapper.html());
        expect(wrapper.emitted().submit[0]).toMatchInlineSnapshot(`
          [
            {
              "authorId": "1",
              "created": "",
              "html": "<h1 id=\\"title\\">Title</h1>
          ",
              "id": "1",
              "markdown": "# Title",
              "title": "",
            },
          ]
        `);

        resolve();
      }, 300);
    });
  });
});
