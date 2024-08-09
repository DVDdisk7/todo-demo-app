import { AuthService } from '../services/auth.service';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

export class AuthStateModel {
    token: string | null | undefined;
    username: string | null | undefined;
}

// Actie om in te loggen
export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { username: string, password: string }) { }
}

// Actie om uit te loggen
export class Logout {
    static readonly type = '[Auth] Logout';
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: null,
        username: null
    }
})
@Injectable()
export class AuthState {

    @Selector()
    static token(state: AuthStateModel) { return state.token; }

    @Selector()
    static isLoggedIn(state: AuthStateModel) { return !!state.token; }

    constructor(private loginService: AuthService) { }

    @Action(Login)
    login({ patchState }: StateContext<AuthStateModel>, { payload }: Login) {
        console.log('login action');
        return this.loginService.login(payload).pipe(tap((result: {
            token: string
        }) => {
            patchState({
                token: result.token, username: payload.username
            });
        },
            catchError((err) => {
                return throwError(`Invalid username or password`);
            })
        ));
    }

    @Action(Logout)
    logout({ setState, getState }: StateContext<AuthStateModel>) {
        const { token } = getState();
        setState(
            {
                username: null,
                token: null
            }
        );
    } 
}