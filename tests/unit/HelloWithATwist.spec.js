import { mount } from "@vue/test-utils";
import HelloWithATwist from "../../src/components/HelloWithATwist.vue";

describe("HelloWithATwist.vue", () => {
  it("Click trigger button", async () => {
    const wrapper = mount(HelloWithATwist);

    expect(wrapper.vm.showHello).toBe(true);
    expect(wrapper.vm.getMessage).toBe("Hello World!");

    const addButton = wrapper.find("button");
    await addButton.trigger("click");

    expect(wrapper.vm.showHello).toBe(false);
    expect(wrapper.vm.getMessage).toBe("You've got this! ✨");

    await addButton.trigger("click");

    expect(wrapper.vm.showHello).toBe(true);
    expect(wrapper.vm.getMessage).toBe("Hello World!");
  });
});
