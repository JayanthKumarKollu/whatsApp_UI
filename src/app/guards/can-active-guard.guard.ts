import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SocketServService } from '../services/socket-serv.service';

export const canActiveGuardGuard: CanActivateFn = (route, state) => {
const socketServ = inject(SocketServService);
const http = inject(Router)

if(socketServ.getAuthToken()){
  return true
}else{
  http.navigate(['/login']);
    return false;


}

};
