<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
      <h2 class="font-bold text-xl mb-4">Task Details</h2>
      <label class="block mb-2">
        Title:
        <input
          v-model="editableTask.title"
          class="w-full p-2 border rounded-md"
        />
      </label>
      <label class="block mb-2">
        Description:
        <textarea
          v-model="editableTask.description"
          class="w-full p-2 border rounded-md"
        ></textarea>
      </label>
      <label class="block mb-2">
        Priority:
        <select
          v-model="editableTask.priority"
          class="w-full p-2 border rounded-md"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </label>
      <label class="block mb-2">
        Assignee:
        <input
          v-model="editableTask.assignee"
          class="w-full p-2 border rounded-md"
        />
      </label>
      <label class="block mb-2">
        Executors (comma-separated):
        <input
          v-model="executors"
          placeholder="Add executors separated by commas"
          class="w-full p-2 border rounded-md"
        />
      </label>
      <div class="flex justify-end gap-2 mt-4">
        <button
          @click="cancel"
          class="bg-gray-300 text-gray-700 py-1 px-3 rounded-md cursor-pointer"
        >
          Cancel
        </button>
        <button
          @click="save"
          class="bg-blue-500 text-white py-1 px-3 rounded-md cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useTasksStore } from "@/store/tasks";
import type { ITask } from "@/types/task";

export default defineComponent({
  props: {
    task: {
      type: Object as () => ITask,
      required: true,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const tasksStore = useTasksStore();

    const editableTask = ref({ ...props.task });
    const executors = ref(props.task.executors.join(", "));

    const cancel = () => {
      emit("close");
    };

    const save = () => {
      editableTask.value.executors = executors.value
        .split(",")
        .map((executor) => executor.trim());
      tasksStore.updateTask(editableTask.value);
      cancel();
    };

    watch(
      () => props.task,
      (newTask) => {
        editableTask.value = { ...newTask };
        executors.value = newTask.executors.join(", ");
      }
    );

    return {
      editableTask,
      executors,
      save,
      cancel,
    };
  },
});
</script>
