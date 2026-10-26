import { Component,Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-task-summary',
  standalone: true,
  styleUrl: './task-summary.scss',
  templateUrl: './task-summary.html',
})
export class TaskSummary {
  @Input() totalTasks =0;
  @Input() completedTasks =0;
  @Input() pendingTasks =0;
}
