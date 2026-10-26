import { Component ,  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges} from '@angular/core';
import { Task } from '../../task.model';
import { TaskItem } from '../task-item/task-item';
type TaskFilter = 'all' | 'pending' | 'completed';
@Component({
  imports: [TaskItem],
  selector: 'app-task-list',
  styleUrl: './task-list.scss',
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit, OnChanges, OnDestroy {

  @Input() tasks: Task[] = [];

  @Output() taskToggled = new EventEmitter<number>();
  @Output() taskDeleted = new EventEmitter<number>();

  currentFilter: TaskFilter = 'all';

  get filteredTasks(): Task[] {
    if (this.currentFilter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    }

    if (this.currentFilter === 'completed') {
      return this.tasks.filter(task => task.completed);
    }

    return this.tasks;
  }

  setFilter(filter: TaskFilter): void {
    this.currentFilter = filter;
  }

  onTaskToggled(taskId: number): void {
    this.taskToggled.emit(taskId);
  }

  onTaskDeleted(taskId: number): void {
    this.taskDeleted.emit(taskId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      console.log(
        'TaskList received updated tasks:',
        this.tasks.length
      );
    }
  }

  ngOnInit(): void {
    console.log('TaskList initialized');
  }

  ngOnDestroy(): void {
    console.log('TaskList destroyed');
  }
}
