import { Injectable } from "@angular/core";
import { TodoItemModel } from "../models/todoItem.model";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { CategoryModel } from "../models/category.model";

export interface TodoStateModel {
    todos: TodoItemModel[];
    categories: CategoryModel[]; 
}

// Actie om een todo toe te voegen
export class AddTodo {
    static readonly type = "[Todo] Add";
    constructor(public title: string) {}
}

// Actie om een todo te wijzigen
export class ToggleTodo {
    static readonly type = "[Todo] Toggle";
    constructor(public id: number) {}
}

// Actie om een todo te verwijderen
export class DeleteTodo {
    static readonly type = "[Todo] Delete";
    constructor(public id: number) {}
}

// Actie om een categorie te selecteren
export class SelectCategory {
    static readonly type = "[Todo] Select Category";
    constructor(public name: string) {}
}

@State<TodoStateModel>({
    name: "todos",
    defaults: {
        todos: [
            {
                id: 1,
                title: "Todo 1",
                date: new Date(),
                completed: false
            },
            {
                id: 2,
                title: "Todo 2",
                date: new Date(),
                completed: false
            },
            {
                id: 3,
                title: "Todo 3",
                date: new Date(),
                completed: false
            }   
        ],
        categories: [
            {
                name: "All",
                selected: true
            },
            {
                name: "Completed",
                selected: false
            },
            {
                name: "Incomplete",
                selected: false
            }
        ]
    }
})
@Injectable()
export class TodoState {
    
    @Selector()
    static getTodos(state: TodoStateModel) {
        return state.todos;
    }

    @Selector()
    static getCompletedTodos(state: TodoStateModel) {
        return state.todos.filter(todo => todo.completed);
    }

    @Selector()
    static getIncompleteTodos(state: TodoStateModel) {
        return state.todos.filter(todo => !todo.completed);
    }

    @Selector()
    static getCategories(state: TodoStateModel) {
        return state.categories;
    }

    @Selector()
    static getSelectedCategory(state: TodoStateModel) {
        return state.categories.find(category => category.selected);
    }

    @Selector()
    static getSelectedTodos(state: TodoStateModel) {
        const selectedCategory = state.categories.find(category => category.selected);
        if (selectedCategory) {
            switch (selectedCategory.name) {
                case "Completed":
                    return state.todos.filter(todo => todo.completed);
                case "Incomplete":
                    return state.todos.filter(todo => !todo.completed);
                default:
                    return state.todos;
            }
        }
        return state.todos;
    }

    // Actie om een todo toe te voegen
    // State wordt opgevraagd, voegt een nieuwe todo toe aan de todos van de state
    @Action(AddTodo)
    addTodo(ctx: StateContext<TodoStateModel>, action: AddTodo) {
        if (action.title === "") {
            return;
        }
        const state = ctx.getState();
        ctx.setState({
            todos: [
                ...state.todos,
                {
                    id: state.todos.length + 1,
                    title: action.title,
                    date: new Date(),
                    completed: false
                }
            ],
            categories: [...state.categories]
        });
    }

    // Actie om een todo te togglen
    // State wordt opgevraagd, zoekt in de todos van de state naar het item met dezelfde id en wijzigt de completed status
    @Action(ToggleTodo)
    toggleTodo(ctx: StateContext<TodoStateModel>, action: ToggleTodo) {
        if (action.id === null) {
            return;
        }
        const state = ctx.getState();
        ctx.setState({
            todos: state.todos.map(todo =>
                todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
            ),
            categories: [...state.categories]
        });
    }

    // Actie om een todo te verwijderen
    // State wordt opgevraagd, filtert het todo item met de id die overeenkomt met de id van de actie er uit en zet de rest terug in de state
    @Action(DeleteTodo)
    deleteTodo(ctx: StateContext<TodoStateModel>, action: DeleteTodo) {
        if (action.id === null) {
            return;
        }
        const state = ctx.getState();
        ctx.setState({
            todos: state.todos.filter(todo => todo.id !== action.id),
            categories: [...state.categories]
        });
    }

    // Actie om een categorie te selecteren
    // State wordt opgevraagd, zet de geselecteerde categorie op true en de rest op false
    @Action(SelectCategory)
    selectCategory(ctx: StateContext<TodoStateModel>, action: SelectCategory) {
        const state = ctx.getState();
        ctx.setState({
            todos: [...state.todos],
            categories: state.categories.map(category => ({
                ...category,
                selected: category.name === action.name
            }))
        });
    }
}

