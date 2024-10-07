export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export const TASK_STATUS_OPTIONS: {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatus,
  text: string,
}[] = [
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open'
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In Progress'
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Completed'
  },
];
