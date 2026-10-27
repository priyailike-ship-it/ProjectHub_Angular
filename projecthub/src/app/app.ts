import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import{Task} from './task.model';
import{TaskList} from './components/task-list/task-list';
import {TaskSummary} from './components/task-summary/task-summary';
import {Tasks} from './services/tasks';

@Component({
  imports: [FormsModule,TaskList,TaskSummary],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.scss',
  templateUrl: './app.html',
})

export class App {
  title = 'ProjectHub';
  
     newTaskTitle = '';
  tasks: Task[] = [];

  constructor(private taskService: Tasks) {
    this.refreshTasks();
  }

 get totalTasks(): number {
    return this.tasks.length;
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get pendingTasks(): number {
    return this.totalTasks - this.completedTasks;
  }

  refreshTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();

    if (!title) {
      return;
    }

    this.taskService.addTask(title);
    this.newTaskTitle = '';
    this.refreshTasks();
  }

  toggleTask(taskId: number): void {
    this.taskService.toggleTask(taskId);
    this.refreshTasks();
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.refreshTasks();
  }
}
