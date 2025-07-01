import { Injectable } from '@angular/core';
import { concatAll } from 'rxjs';
import {io,Socket} from 'socket.io-client';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketServService {

  socket!:Socket;
  private loggedInUser='';
  private selectedUserToChat="";
  private authToken="";

  constructor() { }

  connect(){
    this.socket=io(environment.baseUrl);
   
  }
  setuserId(id:any){
    this.loggedInUser=id
  }
  setSelecetedUserIdToChat(selectedUser_id:any){
    this.selectedUserToChat=selectedUser_id;
  }
  setAuthToken(data:any){
    this.authToken=data
  }
  getloggedUserId(){
    return this.loggedInUser
  }
  getSelectedUserId(){
    return this.selectedUserToChat;
  }
  getAuthToken(){
    return this.authToken;
  }

  sendMsg(msg:any,userID:any,to:any){
    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString();
     const msgPayload = {
      from:userID,
      to:to,
      message:msg,
      time: timeString,
      timestamp: currentTime
    };
    console.log("payload",msgPayload)
    this.socket.emit("send_msg",msgPayload)
  }
   onMessage(callback: (data: any) => void) {
    this.socket.on('receive_msg', callback);
  }
getUserID(callback:(data:any)=>void){
  this.socket.on("user_id",callback)
}
sendLoggedUserId(data:any){
  this.socket.emit("logged_user",data)
}
getOnlineUsersList(callback:(data:any)=>void){
  this.socket.on("onlin_users_list",callback)
}
emitTyping(data:any){
  console.log("dataaa0",data)
  this.socket.emit("typing...",data)
}
getTypingIndicator(callback:(data:any)=>void){
  this.socket.on("typing...",callback)
}

}
