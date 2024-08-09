import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login } from '../state/auth.state';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    standalone: true,
    imports: [FormsModule, CommonModule, MessagesModule, ButtonModule, InputTextModule]
})
export class LoginPage {
    username: string = "";
    password: string = "";
    credentials: UserModel = { username: "", password: "" };
    errorMessage: Message[] = [];

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
                this.errorMessage = [{ severity: 'error', summary: 'Login failed', detail: 'Invalid username or password' }];   
            }
        });
    }
}