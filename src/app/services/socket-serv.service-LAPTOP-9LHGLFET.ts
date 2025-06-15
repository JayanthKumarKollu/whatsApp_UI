import { Injectable } from '@angular/core';
import { concatAll } from 'rxjs';
import {io,Socket} from 'socket.io-client'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketServService {

  socket!:Socket;
  baseURL=environment.baseUrl;

  constructor() { }

  connect(){
    this.socket=io(this.baseURL);
   
  }

  sendMsg(msg:any,from:any,to:any){
    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString();
     const msgPayload = {
      from:from,
      to:to._id,
      message:msg,
      time: timeString,
      timestamp: currentTime
    };
    this.socket.emit("send_msg",msgPayload)
  }
   onMessage(callback: (data: any) => void) {
    this.socket.on('receive_msg', callback);
  }
  getUserID(callback:(data:any)=>void){
  this.socket.on("user_id",callback)
  }
  sendLoggedUserId(data:any){
    console.log("data in service file",data)
    this.socket.emit("logged_user",data)
  }

}
