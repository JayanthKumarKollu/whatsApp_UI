import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { canActiveGuardGuard } from './guards/can-active-guard.guard';

export const routes: Routes = [{
    path:"",component:LoginComponent
},{
    path:"chat",component:ChatComponent,canActivate:[canActiveGuardGuard]
},{path:"login",component:LoginComponent}];
