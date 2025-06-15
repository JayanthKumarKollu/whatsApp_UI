import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SocketServService } from '../services/socket-serv.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  const socketServ = inject(SocketServService);
  if(socketServ.getAuthToken()){
    const clonedReq = req.clone({
      setHeaders:{
        Authorization:`Bearer ${socketServ.getAuthToken()}`
      }
    })
    return next(clonedReq)
  }
  return next(req);
};
