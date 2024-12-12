<template>
  <div>
    <button
      v-if="!isAddingTask"
      @click="isAddingTask = true"
      class="text-blue-500 hover:underline"
    >
      + Add a card
    </button>
    <div v-else class="flex flex-col gap-2">
      <input
        v-model="newTaskTitle"
        placeholder="Enter task title..."
        class="w-full p-2 border rounded-md"
      />
      <div class="flex gap-2">
        <button
          @click="addTask"
          class="bg-blue-500 text-white py-1 px-3 rounded-md"
        >
          Add
        </button>
        <button
          @click="cancel"
          class="bg-gray-300 text-gray-700 py-1 px-3 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTasksStore } from "@/store/tasks";
import type { ITask } from "@/types/task";

export default defineComponent({
  props: {
    status: {
      type: String as () => ITask["status"],
      required: true,
    },
  },
  setup(props) {
    const tasksStore = useTasksStore();

    const isAddingTask = ref(false);
    const newTaskTitle = ref("");

    const addTask = () => {
      if (!newTaskTitle.value.trim()) return;

      tasksStore.addTask(newTaskTitle.value, props.status);
      newTaskTitle.value = "";
      isAddingTask.value = false;
    };

    const cancel = () => {
      newTaskTitle.value = "";
      isAddingTask.value = false;
    };

    return {
      isAddingTask,
      newTaskTitle,
      addTask,
      cancel,
    };
  },
});
</script>
