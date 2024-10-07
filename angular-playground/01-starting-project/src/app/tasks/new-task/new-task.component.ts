import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NewTaskData} from "../task/task.model";
import {TasksService} from "../tasks.service";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Input({required: true}) userId!: string;
  @Output() close = new EventEmitter<void>();
  // @Output() add = new EventEmitter<NewTaskData>();
  title = '';
  summary = '';
  dueDate = '2024-01-01';
  // title = signal('');
  // summary = signal('');
  // dueDate = signal('2024-01-01');

  constructor(private tasksService: TasksService) {
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.tasksService.addTask({title: this.title, summary: this.summary, dueDate: this.dueDate}, this.userId);
    this.close.emit();
    // this.add.emit({
    //   title: this.title,
    //   summary: this.summary,
    //   dueDate: this.dueDate
    // });
  }
}
