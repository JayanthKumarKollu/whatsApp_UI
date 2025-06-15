import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatServService {

   baseurl = environment.baseUrl;
   http = inject(HttpClient)

  constructor() { }

  getChatHistory(data:any){
    return this.http.post(`${this.baseurl}/getchat`,data)
  }
}
