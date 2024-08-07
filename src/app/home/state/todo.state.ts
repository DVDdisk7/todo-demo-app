import { Injectable } from "@angular/core";
import { TodoStateModel } from "../models/todoState.model";
import { State, Action, StateContext, Selector } from "@ngxs/store";

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
                completed: true
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
            ]
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
            )
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
            todos: state.todos.filter(todo => todo.id !== action.id)
        });
    }
}

