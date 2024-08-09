import { UserModel } from "../models/user.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const API_url = "https://dummyjson.com/auth/login"

@Injectable()

export class AuthService {
    constructor(private http: HttpClient) {}

    login(user: UserModel): Observable<any> {
        return this.http.post(API_url, user);
    }
}