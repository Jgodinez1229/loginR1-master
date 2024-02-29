import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:3002/users/";
  
  constructor(private http: HttpClient) {}
   
  registerUser(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}register`, usuario);
  }

  loginUser(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}login`, usuario);
  }

  getUserByEmail(correo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?email=${correo}`);
  }
}

