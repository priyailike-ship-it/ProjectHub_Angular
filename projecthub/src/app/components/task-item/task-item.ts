import { Component ,Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Task } from '../../task.model';
@Component({
  imports: [],
  selector: 'app-task-item',
  styleUrl: './task-item.scss',
  templateUrl: './task-item.html',
})
export class TaskItem implements OnInit {
  @Input({required: true}) task!: Task;
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskToggled = new EventEmitter<number>();

  ngOnInit(): void {
    console.log('TaskItem initialized with task:', this.task.title);
  }
  OnToggle(): void {
    this.taskToggled.emit(this.task.id);
  }

  OnDelete(): void {
    this.taskDeleted.emit(this.task.id);
  }
}
