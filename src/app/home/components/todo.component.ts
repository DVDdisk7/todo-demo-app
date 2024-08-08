import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoItemModel } from '../models/todoItem.model';
import { DeleteTodo, TodoState, ToggleTodo} from '../state/todo.state';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    standalone: true,
    imports: [CommonModule, InputTextModule, FormsModule, ButtonModule, CheckboxModule, MessageModule, ToolbarModule]
})
export class TodoComponent {
    todos$: Observable<TodoItemModel[]> | undefined;
    todoInputValue: string = '';

    constructor(private store: Store) {
        this.todos$ = this.store.select(TodoState.getSelectedTodos);
    }

    toggleTodo(id: number) {
        this.store.dispatch(new ToggleTodo(id));
    }

    removeTodo(id: number) {
        this.store.dispatch(new DeleteTodo(id));
    }
}
