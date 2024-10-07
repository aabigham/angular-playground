import {Component} from '@angular/core';
import {NewTicketComponent} from "./new-ticket/new-ticket.component";
import {Ticket} from "./ticket.model";
import {TicketComponent} from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    NewTicketComponent,
    TicketComponent
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  onAddTicket(newTicket: { title: string; text: string }) {
    const ticket: Ticket = {
      id: Math.random().toString(),
      title: newTicket.title,
      request: newTicket.text,
      status: 'open'
    };
    this.tickets.push(ticket);
  }

  onCloseTicket(id: string) {
    this.tickets = this.tickets.map(ticket => {
      return ticket.id === id ? {...ticket, status: 'closed'} : ticket;
    });
  }
}
