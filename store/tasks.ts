import { defineStore } from "pinia";
import type { ITask } from "@/types/task";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [
      {
        id: "1",
        title: "Update Login Page Design",
        description: "Develop a new design for the user login page.",
        assignee: "Alex",
        executors: ["Maria", "John"],
        status: "TODO",
        priority: "High",
      },
      {
        id: "2",
        title: "Create File Upload API",
        description: "Develop a backend API for file uploads.",
        assignee: "John",
        executors: ["Alex"],
        status: "In Progress",
        priority: "Medium",
      },
      {
        id: "3",
        title: "Write Test Scenarios",
        description:
          "Create test scenarios for validating the login functionality.",
        assignee: "Maria",
        executors: ["Oliver"],
        status: "TODO",
        priority: "Low",
      },
      {
        id: "4",
        title: "Test Firebase Integration",
        description: "Test Firebase Authentication integration.",
        assignee: "Kate",
        executors: ["Maria"],
        status: "Done",
        priority: "High",
      },
      {
        id: "5",
        title: "Implement Push Notifications",
        description: "Add push notification functionality to the mobile app.",
        assignee: "Dmitry",
        executors: ["Kate", "Oliver"],
        status: "TODO",
        priority: "High",
      },
      {
        id: "6",
        title: "Optimize Database Queries",
        description: "Review database indexes and optimize queries.",
        assignee: "Maria",
        executors: ["John", "Dmitry"],
        status: "In Progress",
        priority: "Medium",
      },
      {
        id: "7",
        title: "Add API Documentation",
        description: "Document all available API endpoints in Swagger.",
        assignee: "Alex",
        executors: ["Maria"],
        status: "Done",
        priority: "Low",
      },
      {
        id: "8",
        title: "Conduct Code Review",
        description:
          "Review the code of the latest release for potential issues.",
        assignee: "Kate",
        executors: ["Oliver"],
        status: "TODO",
        priority: "Medium",
      },
      {
        id: "9",
        title: "Fix Registration Form Bug",
        description: "Resolve the password validation issue.",
        assignee: "John",
        executors: ["Kate"],
        status: "In Progress",
        priority: "High",
      },
      {
        id: "10",
        title: "Set Up Analytics",
        description: "Integrate Google Analytics into the web application.",
        assignee: "Maria",
        executors: ["Dmitry"],
        status: "Done",
        priority: "Medium",
      },
      {
        id: "11",
        title: "Update Authentication Logic",
        description: "Add support for login via Google and Facebook.",
        assignee: "Alex",
        executors: ["Oliver"],
        status: "TODO",
        priority: "High",
      },
      {
        id: "12",
        title: "Add Multilingual Support",
        description: "Integrate the i18n library for translations.",
        assignee: "John",
        executors: ["Maria", "Alex"],
        status: "In Progress",
        priority: "Medium",
      },
      {
        id: "13",
        title: "Test Mobile Version",
        description: "Verify the site's responsiveness on mobile devices.",
        assignee: "Kate",
        executors: ["Dmitry"],
        status: "TODO",
        priority: "Low",
      },
      {
        id: "14",
        title: "Fix Profile Page Bugs",
        description: "Resolve display issues on the user profile page.",
        assignee: "Oliver",
        executors: ["Alex"],
        status: "In Progress",
        priority: "High",
      },
      {
        id: "15",
        title: "Optimize Page Load Speed",
        description: "Reduce the load time of the homepage.",
        assignee: "Dmitry",
        executors: ["Kate"],
        status: "Done",
        priority: "High",
      },
      {
        id: "16",
        title: "Add Theme Settings",
        description: "Implement light and dark mode theme options.",
        assignee: "Maria",
        executors: ["Oliver"],
        status: "TODO",
        priority: "Medium",
      },
      {
        id: "17",
        title: "Develop FAQ Page",
        description: "Add a Frequently Asked Questions section to the website.",
        assignee: "Kate",
        executors: ["Alex"],
        status: "In Progress",
        priority: "Low",
      },
      {
        id: "18",
        title: "Add Password Recovery",
        description: "Implement a password recovery feature.",
        assignee: "Oliver",
        executors: ["Maria"],
        status: "Done",
        priority: "Medium",
      },
      {
        id: "19",
        title: "Fix Avatar Upload Bug",
        description: "Ensure proper handling of different file formats.",
        assignee: "John",
        executors: ["Kate"],
        status: "TODO",
        priority: "High",
      },
      {
        id: "20",
        title: "Test Contact Page",
        description: "Validate the functionality of the contact form.",
        assignee: "Dmitry",
        executors: ["Maria"],
        status: "In Progress",
        priority: "Medium",
      },
    ] as ITask[],
  }),

  getters: {
    todoTasks: (state): ITask[] =>
      state.tasks.filter((task) => task.status === "TODO"),
    inProgressTasks: (state): ITask[] =>
      state.tasks.filter((task) => task.status === "In Progress"),
    doneTasks: (state): ITask[] =>
      state.tasks.filter((task) => task.status === "Done"),
  },

  actions: {
    addTask(title: string, status: ITask["status"]) {
      const newTask: ITask = {
        id: String(Date.now()),
        title,
        description: "",
        assignee: "",
        executors: [],
        status,
        priority: "Low",
      };
      this.tasks.push(newTask);
    },

    updateTask(updatedTask: ITask) {
      const taskIndex = this.tasks.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = updatedTask;
      }
    },

    deleteTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },

    updateTaskStatus(id: string, newStatus: ITask["status"]) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.status = newStatus;
      }
    },
  },
});
