import {CanMatchFn, RedirectCommand, Router, Routes} from "@angular/router";
import {NoTaskComponent} from "./tasks/no-task/no-task.component";
import {resolveTitle, resolveUserName, UserTasksComponent} from "./users/user-tasks/user-tasks.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {resolveUserTasks, TasksComponent} from "./tasks/tasks.component";
import {NewTaskComponent} from "./tasks/new-task/new-task.component";
import {inject} from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const canAccess = Math.random() < 0.5;
  return canAccess ? true : new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No task selected'
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
      },
    ],
    canMatch: [dummyCanMatch],
    data: {message: 'Hello!'},
    resolve: {userNameResolve: resolveUserName},
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
