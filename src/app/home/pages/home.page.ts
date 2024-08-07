import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoItemModel } from '../models/todoItem.model';
import { AddTodo, DeleteTodo, TodoState, ToggleTodo } from '../state/todo.state';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbComponent } from '../../core/components/breadcrumb.component';
import { TodoComponent } from "../components/todo.component";
import { ToolbarComponent } from "../components/toolbar.component";

@Component({
    templateUrl: './home.page.html',
    standalone: true,
    imports: [CommonModule, InputTextModule, FormsModule, ButtonModule, BreadcrumbComponent, TodoComponent, ToolbarComponent]
})
export class HomePage {
    todos$: Observable<TodoItemModel[]>;
    todoInputValue: string = '';


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
