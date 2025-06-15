import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  baseUrl=environment.baseUrl;
  private http = inject(HttpClient)
  constructor() { }

  registerUser(data:any){
    return this.http.post(`${this.baseUrl}/signup/`,data)
  }
  logUser(data:any){
    return this.http.post(`${this.baseUrl}/signup/login`,data)
  }
  getAllUsersList(data:any){
    console.log("service",data)
    return this.http.get<any[]>(`${this.baseUrl}/signup/${data.id}`)
  }
}
