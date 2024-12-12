<template>
  <div class="w-64 bg-white p-3 rounded-lg shadow-md flex flex-col gap-2">
    <h2 class="font-bold text-lg mb-2">{{ title }}</h2>
    <draggable
      v-model="tasks"
      itemKey="id"
      group="tasks"
      @end="onDragEnd"
      class="flex flex-col gap-2"
    >
      <template #item="{ element }">
        <div
          class="p-2 bg-white rounded-md shadow-sm border-gray-400 border-2 flex items-center justify-between cursor-pointer"
        >
          <div @click="editTask(element)">
            {{ element.title }}
          </div>
          <button @click.stop="deleteTask(element.id)" title="Delete task">
            ✖
          </button>
        </div>
      </template>
    </draggable>
    <AddTask :status="status" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useTasksStore } from "@/store/tasks";
import draggable from "vuedraggable";
import type { ITask } from "@/types/task";
import AddTask from "./AddTask.vue";

export default defineComponent({
  components: { draggable, AddTask },
  props: {
    title: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array as () => ITask[],
      required: true,
    },
    status: {
      type: String as () => ITask["status"],
      required: true,
    },
  },
  emits: ["editTask"],
  setup(props, { emit }) {
    const tasksStore = useTasksStore();

    const tasks = computed<ITask[]>({
      get: () => props.tasks,
      set: (newTasks) =>
        newTasks.forEach((task) => {
          tasksStore.updateTaskStatus(task.id, props.status);
        }),
    });

    const onDragEnd = () => {
      tasks.value.forEach((task) => {
        tasksStore.updateTaskStatus(task.id, props.status);
      });
    };

    const deleteTask = (taskId: string) => {
      tasksStore.deleteTask(taskId);
    };

    const editTask = (task: ITask) => emit("editTask", task);

    return {
      tasks,
      onDragEnd,
      deleteTask,
      editTask,
    };
  },
});
</script>
