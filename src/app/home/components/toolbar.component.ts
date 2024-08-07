import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoItemModel } from '../models/todoItem.model';
import { AddTodo, TodoState } from '../state/todo.state';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    standalone: true,
    imports: [CommonModule, InputTextModule, FormsModule, ButtonModule, ToolbarModule, DropdownModule]
})
export class ToolbarComponent {
    todos$: Observable<TodoItemModel[]>;
    todoInputValue: string = '';
    selectedFilter: string = 'all';
    categories: any[] | undefined;

    constructor(private store: Store) {
        this.todos$ = this.store.select(TodoState.getTodos);
    }

    addTodo(title: string) {
        if (title.trim()) {
            this.store.dispatch(new AddTodo(title));
            this.todoInputValue = '';
        }
    }

}