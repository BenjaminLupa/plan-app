import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Forminput from "./Forminput.vue";
import { computed, defineComponent, ref } from "vue";

describe("FormInput", () => {
  it("tests validation", async () => {
    const Parent = defineComponent({
      components: { Forminput },
      template: `
        <Forminput
        name= "foo"
        type="input"
        :status="status"
        v-model="formValue"
        />
        `,
      setup() {
        const formValue = ref("foo");
        const status = computed(() => {
          if (formValue.value.length > 5) {
            return {
              valid: true,
            };
          } else {
            return {
              valid: false,
              message: "error",
            };
          }
        });

        return {
          formValue,
          status,
        };
      },
    });

    const wrapper = mount(Parent);

    expect(wrapper.find(".is-danger").text()).toBe("error");

    await wrapper.find("input").setValue("foobar");

    expect(wrapper.find(".is-danger").exists()).toBe(false);
  });

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
