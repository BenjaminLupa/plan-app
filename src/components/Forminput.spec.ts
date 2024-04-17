import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Forminput from "./Forminput.vue";

describe("FormInput", () => {
  it("render some errors", () => {
    const wrapper = mount(Forminput, {
      props: {
        name: "Foo",
        modelValue: "Bar",
        status: {
          valid: false,
          message: "error",
        },
        type: "input",
      },
    });
    // ...
    console.log(wrapper.html());

    expect(wrapper.find(".is-danger").exists()).toBe(true);
  });
  it("renders no errors", () => {
    const wrapper = mount(Forminput, {
      props: {
        name: "Foo",
        modelValue: "Bar",
        status: {
          valid: true,
          message: "error",
        },
        type: "input",
      },
    });
    // ...

    expect(wrapper.find(".is-danger").exists()).toBe(false);
  });
});
