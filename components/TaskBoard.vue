<template>
  <div class="min-h-screen p-6">
    <div class="flex items-start gap-4 overflow-x-auto">
      <TaskColumn
        title="TODO"
        :tasks="todoTasks"
        status="TODO"
        @editTask="editTask"
      />

      <TaskColumn
        title="In Progress"
        :tasks="inProgressTasks"
        status="In Progress"
        @editTask="editTask"
      />

      <TaskColumn
        title="Done"
        :tasks="doneTasks"
        status="Done"
        @editTask="editTask"
      />
    </div>

    <TaskModal
      v-if="selectedTask"
      :task="selectedTask"
      @editTask="editTask"
      @close="selectedTask = null"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useTasksStore } from "@/store/tasks";
import TaskColumn from "./TaskColumn.vue";
import TaskModal from "./TaskModal.vue";
import type { ITask } from "@/types/task";

export default defineComponent({
  components: { TaskColumn, TaskModal },
  setup() {
    const tasksStore = useTasksStore();

    const selectedTask = ref<ITask | null>(null);

    const todoTasks = computed<ITask[]>(() => tasksStore.todoTasks);
    const inProgressTasks = computed<ITask[]>(() => tasksStore.inProgressTasks);
    const doneTasks = computed<ITask[]>(() => tasksStore.doneTasks);

    const editTask = (task: ITask) => {
      selectedTask.value = { ...task };
    };

    return {
      todoTasks,
      inProgressTasks,
      doneTasks,
      selectedTask,
      editTask,
    };
  },
});
</script>
