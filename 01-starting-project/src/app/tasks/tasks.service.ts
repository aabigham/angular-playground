import {Injectable} from '@angular/core';
import {NewTaskData, Task} from "./task/task.model";
import {DUMMY_TASKS} from "./dummy-tasks";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private dummyTasks: Task[] = DUMMY_TASKS;

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.dummyTasks = JSON.parse(tasks);
    }
  }

  getUserTasks(userId: string) {
    return this.dummyTasks.filter(task => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    let ids: number[] = DUMMY_TASKS.map(task => parseInt(task.id.substring(1)));
    const maxId = Math.max(...ids);

    this.dummyTasks.push({
      id: `t${maxId + 1}`,
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.dueDate
    })

    this.saveTasks()
  }

  removeTask(taskId: string) {
    this.dummyTasks = this.dummyTasks.filter(task => task.id !== taskId);
    this.saveTasks()
  }

  private saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(this.dummyTasks));
  }

}
