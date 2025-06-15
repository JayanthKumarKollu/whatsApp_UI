import { Component, inject } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketServService } from '../../services/socket-serv.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
login:boolean=false;
userName="";
userPass="";
userEmail='';
loggedUserData:any;
private logServ=inject(LoginServiceService);
private route = inject(Router);
private socketSer = inject(SocketServService)
togglelogin(){
  this.login = this.login? false:true
}
addUser(){
 let data={
    userName:this.userName,
    password:this.userPass,
    email:this.userEmail
  }
this.logServ.registerUser(data).subscribe((res)=>{
  if(res){
    this.userEmail="";
    this.userName='';
    this.userPass="";
    this.login = this.login? false:true
  }
})
}
authenticate(){
  let data={
    userName:this.userName,
    password:this.userPass,
  }
this.logServ.logUser(data).subscribe((res:any)=>{
 this.loggedUserData=res.user;
 this.socketSer.setAuthToken(res.token);
 this.socketSer.setuserId(res.user._id)
//  localStorage.setItem("token",res.token);
//  localStorage.setItem("id",res.user._id)
 this.route.navigate(["chat"])
})
}
}
