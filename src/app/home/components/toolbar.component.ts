import { Component, computed, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { AddTodo, TodoState, SelectCategory } from '../state/todo.state';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryModel } from '../models/category.model';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    standalone: true,
    imports: [CommonModule, InputTextModule, FormsModule, ButtonModule, ToolbarModule, DropdownModule]
})
export class ToolbarComponent {
    todoInputValue: string = '';

    selectedCategory: CategoryModel = { name: 'All', selected: true };
    categories: CategoryModel[] = [];


    constructor(private store: Store) {
        this.store.select(TodoState.getCategories).subscribe(categories => {
            this.categories = categories;
        });

        this.store.select(TodoState.getSelectedCategory).subscribe(category => {
            this.selectedCategory = category || { name: 'All', selected: true };
        });
    }

    changeSelectedCategory() {
        this.store.dispatch(new SelectCategory(this.selectedCategory.name));	
    }

    addTodo(title: string) {
        if (title.trim()) {
            this.store.dispatch(new AddTodo(title));
            this.todoInputValue = '';
        }
    }

}