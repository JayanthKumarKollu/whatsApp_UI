import { Component, inject } from '@angular/core';
import { SocketServService } from '../../services/socket-serv.service';
import { BehaviorSubject, combineLatest, map, Observable, timestamp } from 'rxjs';
import {FormsModule } from '@angular/forms'
import { LoginServiceService } from '../../services/login-service.service';
import { CommonModule, } from '@angular/common';
import { ChatServService } from '../../services/chat-serv.service';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent {
  private socketSer = inject(SocketServService);
  private loginServ = inject(LoginServiceService);
  private chatServ = inject(ChatServService)
userID="";
message="";
messagesList:any=[];
typingIndicator="";
userAlreadyAdded:boolean=false;
selected_User_to_Chat:any=[];
loggedUserId=this.socketSer.getloggedUserId();
allusersList$ = this.loginServ.getAllUsersList({id:this.socketSer.getloggedUserId()});
onlineUsers$ = new BehaviorSubject<String[]>([]);
isTyping$= new BehaviorSubject<String>("")
usersList$ = combineLatest([this.allusersList$,this.onlineUsers$,this.isTyping$]).pipe(
  map(([allusers,onlineusers,isTyping])=>{
    return allusers.map((users:any)=>({
      ...users,
      online:onlineusers.includes(users._id),
      typing: isTyping == users._id ? "Typing..." : null

    }))
  })
)

  ngOnInit(){
    this.socketSer.connect();
    this.socketSer.onMessage((data:any)=>{
      console.log("msges sldjfls",data)
      this.messagesList.push(data)

    })
    this.socketSer.getUserID(data=>{
    this.userID=data  ;
     console.log("user id",this.userID,data)
    });
    this.socketSer.sendLoggedUserId(this.socketSer.getloggedUserId());
    this.socketSer.getOnlineUsersList((data:any)=>{
      this.onlineUsers$.next(data)
    });
    this.socketSer.getTypingIndicator((data:any)=>{
      console.log(data);
      this.isTyping$.next(data.from);
      if(data.from == this.selected_User_to_Chat._id){
        this.typingIndicator='Typing...'
      }
            setTimeout(() => {
          this.typingIndicator='';  
          this.isTyping$.next("");        
        }, 2000);
    })

   
  }

sendMsg(){
  console.log("sending data0",this.userID)
 this.socketSer.sendMsg(this.message,this.socketSer.getloggedUserId(),this.selected_User_to_Chat._id);
 this.message='';
}
selectedUser(user:any){
  console.log("selected usr",user)
  this.selected_User_to_Chat=user;
  this.messagesList=[];
  let data={
    from:this.socketSer.getloggedUserId(),
    to:this.selected_User_to_Chat._id

  }
  this.chatServ.getChatHistory(data).subscribe((res:any)=>{
    console.log("chat history",res);
      this.messagesList=res
  })

}
onTyping(){
  console.log("tyuping")
  this.socketSer.emitTyping({from:this.loggedUserId,to:this.selected_User_to_Chat._id})
}

}

