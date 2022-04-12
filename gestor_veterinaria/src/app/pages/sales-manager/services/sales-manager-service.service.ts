import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { SalesRoutes } from '../enums/sales-routes';
import { PedidoResponse, ViewInvResponse, VistaDetalle, DetallePedModel, DetallePedidoResponse, DevolucionesModel, DevolucionesResponse } from '../interfaces/sales-interfaces';
import { map, catchError, of, Subject, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesManagerServiceService {

  private idPedido:number=0;
  private detalleL:VistaDetalle[]=[];
  private detalleL$!:Subject<VistaDetalle[]>;

  get  IdPedido():number{ return this.idPedido;}  
  Pedido(idPedido:number){ this.idPedido=idPedido;}

 


  private baseUrl=environment.ApiUrl;
  private header=new HttpHeaders()
  .set('content-type', 'application/json;charset=utf-8')
  .set('Accept','*/*')
  .set('Access-Control-Allow-Origin', '*')
  .set('x-token',localStorage.getItem('x-token')||'');
  
  constructor(private http:HttpClient) {
    this.detalleL$=new Subject
   }

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

  viewInventario(){
    const url=`${this.baseUrl}${SalesRoutes.getViewInv}`;
    return this.http.get<ViewInvResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  addDetalle(detalle:VistaDetalle){
    this.detalleL.push(detalle);
   this.detalleL$.next(this.detalleL);
  }

  getDetalles():Observable<VistaDetalle[]>{
    return this.detalleL$.asObservable();
  }
  
  clearDetalle(){
    this.detalleL=[];
   this.detalleL$.next(this.detalleL);
  }

  bulkDetalles(detallesL:DetallePedModel[]){
    const url=`${this.baseUrl}${SalesRoutes.bulkDetalles}`;
    const body={detalles:detallesL}
    return this.http.post<DetallePedidoResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  loadDetallesByOrden(pedido:number){
    const url=`${this.baseUrl}${SalesRoutes.getDetailOrder}${pedido}`;

    return this.http.get<DetallePedidoResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  updateDetalle(detalle:DetallePedModel){
    const url=`${this.baseUrl}${SalesRoutes.uDetailOrder}`;   
    return this.http.post<DetallePedidoResponse>(url,detalle,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  delDetalle(detalle:DetallePedModel){
    const url=`${this.baseUrl}${SalesRoutes.dDetailOrder}`;   
    return this.http.post<DetallePedidoResponse>(url,detalle,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }


  //#region  devoluciones

  /**
   * Crea una devolucion en la DB
   * @param body modelo Devoluciones
   * @returns DevolucionesResponse
   */
  createDevolucion(body:DevolucionesModel){
    const url=`${this.baseUrl}${SalesRoutes.cDevolucion}`;   
    return this.http.post<DevolucionesResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  /**
   * obtiene el listado de devoluciones
   * @returns array devoluciones
   */
  getAllDevoluciones(){
    const url=`${this.baseUrl}${SalesRoutes.getAllDevolucion}`;   
    return this.http.get<DevolucionesResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }


  /**Actualiza una devolucion en la DB */
  updateDevolucion(body:DevolucionesModel){
    const url=`${this.baseUrl}${SalesRoutes.uDevolucion}`;   
    return this.http.post<DevolucionesResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  /**Elimina una devolucion de la DB */
  deleteDevolucion(body:DevolucionesModel){
    const url=`${this.baseUrl}${SalesRoutes.dDevolucion}`;   
    return this.http.post<DevolucionesResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  //#endregion

}
