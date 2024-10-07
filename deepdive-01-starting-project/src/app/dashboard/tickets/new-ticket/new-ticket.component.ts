import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  viewChild,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ButtonComponent} from "../../../shared/button/button.component";
import {ControlComponent} from "../../../shared/control/control.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    ButtonComponent,
    ControlComponent,
    FormsModule
  ],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  // private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  enteredTitle = '';
  enteredText = '';

  @Output() addTicket = new EventEmitter<{ title: string; text: string; }>();

  onSubmitNewTicket() {
    console.log(this.enteredTitle, this.enteredText);
    //this.form?.nativeElement.reset();
    // this.form().nativeElement.reset();
    this.addTicket.emit({title: this.enteredTitle, text: this.enteredText})

    this.enteredTitle = '';
    this.enteredText = '';
  }

  ngOnInit(): void {
    console.log('NewTicketComponent ON INIT')
    console.log(this.form?.nativeElement);
  }

  ngAfterViewInit(): void {
    console.log('NewTicketComponent AFTER VIEW INIT')
    console.log(this.form?.nativeElement);
  }
}
