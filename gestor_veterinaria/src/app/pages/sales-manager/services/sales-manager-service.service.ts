import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { SalesRoutes } from '../enums/sales-routes';
import { PedidoResponse } from '../interfaces/sales-interfaces';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesManagerServiceService {

  private idPedido:number=0;

  get  IdPedido():number{ return this.idPedido;}  
  Pedido(idPedido:number){ this.idPedido=idPedido;}


  private baseUrl=environment.ApiUrl;
  private header=new HttpHeaders()
  .set('content-type', 'application/json;charset=utf-8')
  .set('Accept','*/*')
  .set('Access-Control-Allow-Origin', '*')
  .set('x-token',localStorage.getItem('x-token')||'');
  
  constructor(private http:HttpClient) { }

  CreateOrder(body:{}){
    const url=`${this.baseUrl}${SalesRoutes.cPedido}`;
    return this.http.post<PedidoResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  
  CreateOrderSquelizer(body:{}){
    const url=`${this.baseUrl}${SalesRoutes.cPedidoSquelize}`;
    return this.http.post<PedidoResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  getAllOrders(){
    const url=`${this.baseUrl}${SalesRoutes.getAllPedidos}`;
    return this.http.get<PedidoResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  updateOrder(body:{}){
    const url=`${this.baseUrl}${SalesRoutes.uPedido}`;
    return this.http.post<PedidoResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  deleteOrder(body:{}){
    const url=`${this.baseUrl}${SalesRoutes.dPedido}`;
    return this.http.post<PedidoResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

}
