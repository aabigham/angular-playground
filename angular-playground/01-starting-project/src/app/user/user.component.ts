import {Component, computed, EventEmitter, input, Input, output, Output} from '@angular/core';
import {User} from "./user.model";
import {CardComponent} from "../shared/card/card.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // Decorators
  // @Input({required: true}) id!: string;
  // @Input({required: true}) name!: string;
  // @Input({required: true}) avatar!: string;
  @Input({required: true}) user!: User;
  @Input({required: true}) selected!: boolean;
  @Output() clicked = new EventEmitter<string>();

  // Signals
  // id = input.required<string>();
  // avatar = input.required<string>();
  // name = input.required<string>();
  // select = output<string>();

  get avatarPath(): string {
    return 'assets/users/' + this.user.avatar;
  }

  onSelectUser() {
    this.clicked.emit(this.user.id);
  }
}
