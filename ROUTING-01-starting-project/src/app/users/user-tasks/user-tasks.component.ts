import {Component, inject, input} from '@angular/core';
import {UsersService} from "../users.service";
import {ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot} from "@angular/router";

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  return usersService.users
    .find(u => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activatedRoute, routerState) + '\'s Tasks';
};

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export class UserTasksComponent {
  userNameResolve = input.required<string>()

  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: data => console.log(data),
  //   });
  // }

  /** signals method **/
  // private usersService = inject(UsersService);
  // userId = input.required<string>();
  // message = input.required<string>()
  // userName = computed(() =>
  //   this.usersService.users.find(u => u.id === this.userId())?.name);

  /** observer method **/
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // userName = '';
  //
  // ngOnInit() {
  //   console.log(this.activatedRoute);
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (params) => {
  //       this.userName = this.usersService.users
  //         .find(u => u.id === params.get('userId'))?.name || '';
  //     }
  //   });
  //
  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }
}
