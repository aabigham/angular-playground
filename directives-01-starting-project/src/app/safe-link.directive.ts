import {Directive, ElementRef, input, Input} from '@angular/core';
import {LogDirective} from "./log.directive";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)'
  },
  hostDirectives: [LogDirective]
})
export class SafeLinkDirective {
  @Input({alias: 'appSafeLink'}) queryParam = 'myapp';

  constructor(private hostElement: ElementRef<HTMLAnchorElement>) {
  }

  onClick(event: MouseEvent) {
    const confirm = window.confirm('Do you really want to leave the page?');
    if (confirm) {
      // const target = event.target as HTMLAnchorElement; // target is the <a> markup
      // target.href = target.href + '?from=' + this.queryParam;
      const href = this.hostElement.nativeElement.href; // nativeElement is the <a> markup
      this.hostElement.nativeElement.href = href + '?from=' + this.queryParam;
      return;
    }
    event.preventDefault();
  }
}
