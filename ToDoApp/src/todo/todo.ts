import { Component, OnInit } from '@angular/core';
import { ToDo } from '../models/todo';
import { ToDoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-todo',
  templateUrl: './todo.html',
  styleUrls: ['./todo.css'],
  imports: [CommonModule, FormsModule],
})
export class ToDoComponent implements OnInit {
  items: ToDo[] = [];
  newName: string = '';

  constructor(private toDoService: ToDoService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.toDoService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  addItem(): void {
    if (!this.newName.trim()) return;

    const newItem: Partial<ToDo> = {
      name: this.newName
    };

    this.toDoService.addItem(newItem).subscribe(() => {
      this.newName = '';
      this.loadItems();
    });
  }

  deleteItem(id: number): void {
    this.toDoService.deleteItem(id).subscribe(() => {
      this.loadItems();
    });
  }
}
