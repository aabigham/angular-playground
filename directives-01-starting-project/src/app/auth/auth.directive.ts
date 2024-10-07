import {Directive, effect, input, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {Permission} from "./auth.model";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  @Input({required: true, alias: 'appAuth'}) userType!: Permission;

  constructor(private authService: AuthService,
              private templateRef: TemplateRef<any>, //use on ng template (access to the content of it)
              private viewContainerRef: ViewContainerRef) { //access to the place in the DOM where the directive is used
    effect(() => {
      if (this.authService.activePermission() === this.userType) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }

}
