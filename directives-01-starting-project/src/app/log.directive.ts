import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onClick()',
  }
})
export class LogDirective {

  constructor(private hostElement: ElementRef<HTMLElement>) {
  }

  onClick() {
    console.log('Clicked LOG DIRECTIVE');
    console.log(this.hostElement.nativeElement);
  }
}
