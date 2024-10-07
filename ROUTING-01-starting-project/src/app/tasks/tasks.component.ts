import {Component, computed, inject, input, signal} from '@angular/core';

import {TaskComponent} from './task/task.component';
import {TasksService} from "./tasks.service";
import {ResolveFn, RouterLink} from "@angular/router";
import {Task} from './task/task.model';

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService.allTasks().filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userTasks = input.required<Task[]>();
  userId = input.required<string>();
  order = input<'asc' | 'desc' | undefined>();

  // private tasksService = inject(TasksService);
  // userId = input.required<string>();
  // order = input<'asc' | 'desc'>();
  // userTasks = computed(() => this.tasksService.allTasks()
  //   .filter(task => task.userId === this.userId())
  //   .sort((a, b) => {
  //     if (this.order() === 'asc') {
  //       return a.id > b.id ? 1 : -1;
  //     } else {
  //       return a.id > b.id ? -1 : 1;
  //     }
  //   })
  // );

}
