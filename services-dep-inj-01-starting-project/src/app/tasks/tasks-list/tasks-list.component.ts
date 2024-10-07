import {Component, computed, inject, signal} from '@angular/core';

import {TaskItemComponent} from './task-item/task-item.component';
import {filter} from "rxjs";
import {TasksService} from "../tasks.service";
import {TASK_STATUS_OPTIONS} from "../task.model";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private taskService = inject(TasksService);
  taskStatusOptions = TASK_STATUS_OPTIONS;

  selectedFilter = signal<string>('all');
  tasks = computed(() => {
    let allTasks = this.taskService.allTasks();
    switch (this.selectedFilter()) {
      case 'open':
        return allTasks.filter(task => task.status === 'OPEN');
      case 'in-progress':
        return allTasks.filter(task => task.status === 'IN_PROGRESS');
      case 'done':
        return allTasks.filter(task => task.status === 'DONE');
      default:
        return allTasks;
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
