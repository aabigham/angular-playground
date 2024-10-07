import {
  AfterContentInit, afterNextRender, afterRender,
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent implements AfterContentInit {
  @Input({required: true}) label!: string;
  @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

  // private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  constructor(private el: ElementRef) {
    afterRender(() => console.log('ControlComponent AFTER RENDER'))
    afterNextRender(() => console.log('ControlComponent AFTER NEXT RENDER'))
  }

  onClick() {
    console.log('Control Clicked');
    console.log(this.el);
    console.log(this.control);
  }

  ngAfterContentInit(): void {
    console.log('ControlComponent AFTER CONTENT INIT');
  }
}
