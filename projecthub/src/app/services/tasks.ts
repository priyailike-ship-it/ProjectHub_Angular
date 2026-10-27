import { Service,Injectable } from '@angular/core';
import {Task} from '../task.model';

@Injectable({
  providedIn: 'root'
})


export class Tasks {
    private tasks: Task[] = [
    { id: 1, title: 'Design the dashboard', completed: true },
    { id: 2, title: 'Create login page', completed: false },
    { id: 3, title: 'Build task management API', completed: false },
    { id: 4, title: 'Write unit tests', completed: true }
  ];
 getTasks(): Task[] {
    return this.tasks.map(task => ({ ...task }));
  }

  addTask(title: string): void {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTask: Task = {
      id: Math.max(0, ...this.tasks.map(task => task.id)) + 1,
      title: trimmedTitle,
      completed: false
    };

    this.tasks = [...this.tasks, newTask];
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
