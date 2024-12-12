export interface ITask {
  id: string;
  title: string;
  description: string;
  assignee: string;
  executors: string[];
  status: "TODO" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
}
