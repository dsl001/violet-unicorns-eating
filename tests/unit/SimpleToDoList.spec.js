import { mount } from "@vue/test-utils";
import SimpleToDoList from "../../src/components/SimpleToDoList.vue";

describe("SimpleToDoList.vue", () => {
  it("adds a task to the list", async () => {
    const wrapper = mount(SimpleToDoList);

    // Find the input and set a value
    const input = wrapper.find('input[placeholder="Task to add"]');
    await input.setValue("Buy groceries");

    // Click the add button
    const addButton = wrapper.find("button");
    await addButton.trigger("click");

    // Check if task was added
    expect(wrapper.text()).toContain("Buy groceries");
  });

  it("does not add empty tasks", async () => {
    // Mock window.alert
    window.alert = jest.fn();

    const wrapper = mount(SimpleToDoList);

    const addButton = wrapper.find("button");
    await addButton.trigger("click");

    expect(wrapper.vm.tasks.length).toBe(0);

    // Check if the alert was called
    expect(window.alert).toHaveBeenCalledWith("Task cannot be empty!");
  });

  it("removes a task from the list", async () => {
    const wrapper = mount(SimpleToDoList);

    await wrapper.setData({
      tasks: [{ text: "Do laundry", isComplete: false }],
    });

    const removeButton = wrapper
      .findAll("button")
      .find((btn) => btn.text() === "Remove");
    await removeButton.trigger("click");

    expect(wrapper.text()).not.toContain("Do laundry");
  });
});

describe("Method: addTask", () => {
  it("Add new non-empty task to an empty list", async () => {
    const wrapper = mount(SimpleToDoList);

    // Set the taskToAdd value directly on the component's data
    await wrapper.setData({ taskToAdd: "Buy groceries" });

    // Call the addTask() method
    await wrapper.vm.addTask();

    // Check if the task was added to the tasks array
    expect(wrapper.vm.tasks.length).toBe(1);
    expect(wrapper.vm.tasks[0].text).toBe("Buy groceries");
  });

  it("Add new an empty task to an empty list", async () => {
    // Mock window.alert
    window.alert = jest.fn();

    const wrapper = mount(SimpleToDoList);

    // Set the taskToAdd value directly on the component's data
    await wrapper.setData({ taskToAdd: "" });

    // Call the addTask() method
    await wrapper.vm.addTask();

    // Check if the task was added to the tasks array
    expect(wrapper.vm.tasks.length).toBe(0);

    // Check if the alert was called
    expect(window.alert).toHaveBeenCalledWith("Task cannot be empty!");
  });

  it("Add new an empty untrimmed task to an empty list", async () => {
    // Mock window.alert
    window.alert = jest.fn();

    const wrapper = mount(SimpleToDoList);

    // Set the taskToAdd value directly on the component's data
    await wrapper.setData({ taskToAdd: "    " });

    // Call the addTask() method
    await wrapper.vm.addTask();

    // Check if the task was added to the tasks array
    expect(wrapper.vm.tasks.length).toBe(0);

    // Check if the alert was called
    expect(window.alert).toHaveBeenCalledWith("Task cannot be empty!");
  });

  it("Add new non-empty task to a non-empty list", async () => {
    const wrapper = mount(SimpleToDoList);

    // Add a couple of tasks
    await wrapper.setData({
      tasks: [
        { text: "Do laundry", isComplete: false },
        { text: "Buy groceries", isComplete: false },
      ],
    });

    // Set the taskToAdd value directly on the component's data
    await wrapper.setData({ taskToAdd: "Knit sweater" });

    // Call the addTask() method
    await wrapper.vm.addTask();

    // Check if the task was added to the tasks array
    expect(wrapper.vm.tasks.length).toBe(3);
    expect(wrapper.vm.tasks[2].text).toBe("Knit sweater");
  });

  it("Add new an empty task to a non-empty list", async () => {
    // Mock window.alert
    window.alert = jest.fn();

    const wrapper = mount(SimpleToDoList);

    // Add a couple of tasks
    await wrapper.setData({
      tasks: [
        { text: "Do laundry", isComplete: false },
        { text: "Buy groceries", isComplete: false },
      ],
    });

    // Set the taskToAdd value directly on the component's data
    await wrapper.setData({ taskToAdd: "" });

    // Call the addTask() method
    await wrapper.vm.addTask();

    // Check if the task was added to the tasks array
    expect(wrapper.vm.tasks.length).toBe(2);

    // Check if the alert was called
    expect(window.alert).toHaveBeenCalledWith("Task cannot be empty!");
  });

  it("Add new an empty untrimmed task to a non-empty list", async () => {
    // Mock window.alert
    window.alert = jest.fn();

    const wrapper = mount(SimpleToDoList);

    // Add a couple of tasks
    await wrapper.setData({
      tasks: [
        { text: "Do laundry", isComplete: false },
        { text: "Buy groceries", isComplete: false },
      ],
    });

    // Set the taskToAdd value directly on the component's data
    await wrapper.setData({ taskToAdd: "     " });

    // Call the addTask() method
    await wrapper.vm.addTask();

    // Check if the task was added to the tasks array
    expect(wrapper.vm.tasks.length).toBe(2);

    // Check if the alert was called
    expect(window.alert).toHaveBeenCalledWith("Task cannot be empty!");
  });

  it("Add an existing task to a non-empty list", async () => {
    // Mock window.alert
    window.alert = jest.fn();

    const wrapper = mount(SimpleToDoList);

    // Add a couple of tasks
    await wrapper.setData({
      tasks: [
        { text: "Do laundry", isComplete: false },
        { text: "Buy groceries", isComplete: false },
      ],
    });

    // Set the taskToAdd value directly on the component's data
    await wrapper.setData({ taskToAdd: "Buy groceries" });

    // Call the addTask() method
    await wrapper.vm.addTask();

    // Check if the task was added to the tasks array
    expect(wrapper.vm.tasks.length).toBe(2);

    // Check if the alert was called
    expect(window.alert).toHaveBeenCalledWith("Task already exists!");
  });

  it("Add an existing case-insensitive task to a non-empty list", async () => {
    // Mock window.alert
    window.alert = jest.fn();

    const wrapper = mount(SimpleToDoList);

    // Add a couple of tasks
    await wrapper.setData({
      tasks: [
        { text: "Do laundry", isComplete: false },
        { text: "Buy groceries", isComplete: false },
      ],
    });

    // Set the taskToAdd value directly on the component's data
    await wrapper.setData({ taskToAdd: "Buy Groceries" });

    // Call the addTask() method
    await wrapper.vm.addTask();

    // Check if the task was added to the tasks array
    expect(wrapper.vm.tasks.length).toBe(2);

    // Check if the alert was called
    expect(window.alert).toHaveBeenCalledWith("Task already exists!");
  });
});

describe("Method: removeTask", () => {
  it("remove an existing task from an non-empty list", async () => {
    const wrapper = mount(SimpleToDoList);

    // Add a task to remove
    await wrapper.setData({
      tasks: [{ text: "Do laundry", isComplete: false }],
    });

    // Call removeTask() with index 0 (the first task)
    await wrapper.vm.removeTask(0);

    // Check if the task was removed
    expect(wrapper.vm.tasks.length).toBe(0);
  });

  it("remove an out of index from a non-empty list", async () => {
    const wrapper = mount(SimpleToDoList);

    // Add a couple of tasks
    await wrapper.setData({
      tasks: [
        { text: "Do laundry", isComplete: false },
        { text: "Buy groceries", isComplete: false },
      ],
    });

    // Call removeTask() with index 2 (the first task)
    await wrapper.vm.removeTask(2);

    // Check if the task was removed
    expect(wrapper.vm.tasks.length).toBe(2);
  });

  it("remove a task from an empty list", async () => {
    const wrapper = mount(SimpleToDoList);

    // Call removeTask() with index 2 (the first task)
    await wrapper.vm.removeTask(0);

    // Check if the task was removed
    expect(wrapper.vm.tasks.length).toBe(0);
  });
});

describe("Method: clearAll", () => {
  it("clears all tasks from the list with confirmed yes", async () => {
    // Mock window.confirm to always return true (simulating 'Yes')
    window.confirm = jest.fn(() => true);

    const wrapper = mount(SimpleToDoList);

    // Add a couple of tasks
    await wrapper.setData({
      tasks: [
        { text: "Do laundry", isComplete: false },
        { text: "Buy groceries", isComplete: false },
      ],
    });

    // Call clearAll() method
    await wrapper.vm.clearAll();

    // Check if the tasks array is empty
    expect(wrapper.vm.tasks.length).toBe(0);

    // Ensure window.confirm was called (it should be when calling clearAll)
    expect(window.confirm).toHaveBeenCalledWith("Are you sure?");
  });

  it("does not clear all tasks from the list with confirmed no", async () => {
    // Mock window.confirm to always return true (simulating 'No')
    window.confirm = jest.fn(() => false);

    const wrapper = mount(SimpleToDoList);

    // Add a couple of tasks
    await wrapper.setData({
      tasks: [
        { text: "Do laundry", isComplete: false },
        { text: "Buy groceries", isComplete: false },
      ],
    });

    // Call clearAll() method
    await wrapper.vm.clearAll();

    // Check if the tasks array is empty
    expect(wrapper.vm.tasks.length).toBe(2);

    // Ensure window.confirm was called (it should be when calling clearAll)
    expect(window.confirm).toHaveBeenCalledWith("Are you sure?");
  });
});
