import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoItemModel } from '../models/todoItem.model';
import { AddTodo, DeleteTodo, TodoState, ToggleTodo } from '../state/todo.state';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    standalone: true,
    imports: [CommonModule, InputTextModule, FormsModule, ButtonModule, BreadcrumbComponent]
})
export class TodoComponent {
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

    toggleTodo(id: number) {
        this.store.dispatch(new ToggleTodo(id));
    }

    removeTodo(id: number) {
        this.store.dispatch(new DeleteTodo(id));
    }

}
