import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoItemModel } from '../models/todoItem.model';
import { AddTodo, DeleteTodo, TodoState, ToggleTodo } from '../state/todo.state';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrl: './todo.component.css'
})
export class TodoComponent {
    todos$: Observable<TodoItemModel[]>;

    constructor(private store: Store) {
        this.todos$ = this.store.select(TodoState.getTodos);
    }

    addTodo(title: string) {
        this.store.dispatch(new AddTodo(title));
    }

    toggleTodo(id: number) {
        this.store.dispatch(new ToggleTodo(id));
    }

    removeTodo(id: number) {
        this.store.dispatch(new DeleteTodo(id));
    }

}
