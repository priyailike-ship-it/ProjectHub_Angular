import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import{Task} from './task.model';
import{TaskList} from './components/task-list/task-list';
import {TaskSummary} from './components/task-summary/task-summary';
type TaskFilter = 'all' | 'pending' | 'completed';
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
    currentFilter: TaskFilter = 'all';
      tasks: Task[] = [
    { id: 1, title: 'Design the dashboard', completed: true },
    { id: 2, title: 'Create login page', completed: false },
    { id: 3, title: 'Build task management API', completed: false },
    { id: 4, title: 'Write unit tests', completed: true }
  ];
  

 get totalTasks(): number {
    return this.tasks.length;
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get pendingTasks(): number {
    return this.totalTasks - this.completedTasks;
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();

    if (!title) {
      return;
    }

    const newTask: Task = {
      id: Math.max(0, ...this.tasks.map(task => task.id)) + 1,
      title,
      completed: false
    };

    this.tasks = [...this.tasks, newTask];
    this.newTaskTitle = '';
  }

  toggleTask(taskId: number): void {
    this.tasks = this.tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    );
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(
      task => task.id !== taskId
    );
  }
}
