import {Component, Input} from '@angular/core';
import {TaskComponent} from "./task/task.component";
import {NewTaskComponent} from "./new-task/new-task.component";
import {DUMMY_TASKS} from "./dummy-tasks";
import {NewTaskData, Task} from "./task/task.model";
import {TasksService} from "./tasks.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskComponent,
    NewTaskComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({required: true}) userId!: string;
  @Input({required: true}) name?: string; // string | undefined; other way of doing it
  showAddTaskDialog = false;

  constructor(private tasksService: TasksService) {
  }

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  onStartAddTask() {
    this.showAddTaskDialog = true;
  }

  onCloseAddTask() {
    this.showAddTaskDialog = false;
  }

}
