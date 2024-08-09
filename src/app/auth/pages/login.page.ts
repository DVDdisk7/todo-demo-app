import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login } from '../state/auth.state';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    standalone: true,
    imports: [FormsModule, CommonModule]
})
export class LoginPage {
    username: string = "";
    password: string = "";
    credentials: UserModel = { username: "", password: "" };
    errorMessage: string | null = null;

    constructor(private store: Store, private router: Router) { }

    onSubmit() {
        console.log('submitting login form');
        this.credentials = { username: this.username, password: this.password };
        this.store.dispatch(new Login(this.credentials)).subscribe({
            next: () => {
                console.log('login successful');
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.error('login failed', err);
                this.errorMessage = 'Invalid username or password';
            }
        });
    }
}