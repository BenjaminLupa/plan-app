import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Navbar from "./Navbar.vue";
import { Pinia, createPinia, setActivePinia } from "pinia";
import { Router, createMemoryHistory, createRouter } from "vue-router";
import { routes } from "../router";
import { useUsers } from "../stores/users";

vi.stubGlobal(
  "fetch",
  vi.fn(() => {
    // ...
  })
);

describe("Navbar", () => {
  let pinia: Pinia;
  let router: Router;

  beforeEach(() => {
    const el = document.createElement("div");
    el.id = "modal";
    document.body.appendChild(el);
    pinia = createPinia();
    setActivePinia(pinia);
    router = createRouter({
      history: createMemoryHistory(),
      routes: routes,
    });
  });

  it("renders signin and signup buttons when not authenticate", () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia, router],
      },
    });

    expect(wrapper.find("#sign-up").exists()).toBe(true);
    expect(wrapper.find("#sign-in").exists()).toBe(true);

    console.log(wrapper.html());
  });
  it("renders new post and logout buttons when authenticate", async () => {
    const users = useUsers();
    users.currentUserId = "1";
    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia, router],
      },
    });
    expect(wrapper.find("a").text()).toBe("New Post");
    expect(wrapper.find("button").text()).toBe("Log out");

    await wrapper.find("#logout").trigger("click");
    expect(wrapper.find("#sign-up").exists()).toBe(true);
    expect(wrapper.find("#sign-in").exists()).toBe(true);

    await wrapper.find("#sign-in").trigger("click");
    expect(document.body.querySelector("#signin-form")).toBeTruthy;
    console.log(document.body.outerHTML);
  });
});
