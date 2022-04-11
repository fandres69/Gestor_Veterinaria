import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductosResponse, StocksResponse, ServiciosResponse, IngresosInvResponse } from '../interfaces/stock-manager';
import { environment } from '../../../../environments/environment.prod';
import { SmEnum } from '../enums/sm-enum';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StManagerService {

  private baseUrl=environment.ApiUrl;
  private header=new HttpHeaders()
  .set('content-type', 'application/json;charset=utf-8')
  .set('Accept','*/*')
  .set('Access-Control-Allow-Origin', '*')
  .set('x-token',localStorage.getItem('x-token')||'');



  constructor(private http:HttpClient) { }

  //#region Productos
  /**
   * Crea un producto en la DB
   * @param body producto a crear
   * @returns json
   */
  cProduct(body:{}){
    const url=`${this.baseUrl}${SmEnum.cProduct}`;
    return this.http.post<ProductosResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  /**
 * Busca un producto en la DB
 * @param body producto a buscar (id)
 * @returns json
 */
    fProduct(body:{}){
    const url=`${this.baseUrl}${SmEnum.fProduct}`;
    return this.http.post<ProductosResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Actualiza un producto en la DB
 * @param body producto a actualizar
 * @returns json
 */
    updProduct(body:{}){
    const url=`${this.baseUrl}${SmEnum.uProduct}`;
    return this.http.post<ProductosResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Actualiza un producto en la DB
 * @param body producto a actualizar
 * @returns json
 */
    delProduct(body:{}){
    const url=`${this.baseUrl}${SmEnum.dProduct}`;
    return this.http.post<ProductosResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Actualiza un producto en la DB
 * @param body producto a actualizar
 * @returns json
 */
    getProducts(criterio:string){
    const url=`${this.baseUrl}${SmEnum.getProduct}${criterio}`;
    return this.http.get<ProductosResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
   * Obtiene el listado de productos
   * @returns json
   */
  getAllProducts(){
    const url=`${this.baseUrl}${SmEnum.getAllProducts}`;
    return this.http.get<ProductosResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }


  getCompleteStock(){
    const url=`${this.baseUrl}${SmEnum.getCompleteStock}`;
    return this.http.get<ProductosResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }
  //#endregion

  //#region Inventarios

  /**
   * Crea un inventario en la DB
   * @param body inventario a crear
   * @returns json
   */
   cInventario(body:{}){
    const url=`${this.baseUrl}${SmEnum.cStock}`;
    return this.http.post<StocksResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Busca un inventario en la DB
 * @param body inventario a buscar (id)
 * @returns json
 */
    fInventario(body:{}){
    const url=`${this.baseUrl}${SmEnum.fStock}`;
    return this.http.post<StocksResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Actualiza un inventario en la DB
 * @param body inventario a actualizar
 * @returns json
 */
    updInventario(body:{}){
    const url=`${this.baseUrl}${SmEnum.uStock}`;
    return this.http.post<StocksResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Elimina un inventario en la DB
 * @param body inventario a Eliminar
 * @returns json
 */
    delInventario(body:{}){
    const url=`${this.baseUrl}${SmEnum.dStock}`;
    return this.http.post<StocksResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Obtiene listado de inventarios en la DB
 * @param criterio
 * @returns json
 */
    getInventario(criterio:string){
    const url=`${this.baseUrl}${SmEnum.getStock}${criterio}`;
    return this.http.get<StocksResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }
  
  getInventarioId(producto:string){
    const url=`${this.baseUrl}${SmEnum.getStockId}${producto}`;
    return this.http.get<StocksResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

//#endregion

  //#region Servicios

  /**
   * Crea un Servicios en la DB
   * @param body Servicios a crear
   * @returns json
   */
   cServicios(body:{}){
    const url=`${this.baseUrl}${SmEnum.cServicio}`;
    return this.http.post<ServiciosResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Busca un Servicios en la DB
 * @param body Servicios a buscar (id)
 * @returns json
 */
    fServicios(body:{}){
    const url=`${this.baseUrl}${SmEnum.fServicio}`;
    return this.http.post<ServiciosResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Actualiza un Servicios en la DB
 * @param body Servicios a actualizar
 * @returns json
 */
    updServicios(body:{}){
    const url=`${this.baseUrl}${SmEnum.uServicio}`;
    return this.http.post<ServiciosResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Actualiza un Servicios en la DB
 * @param body Servicios a actualizar
 * @returns json
 */
    delServicios(body:{}){
    const url=`${this.baseUrl}${SmEnum.dServicio}`;
    return this.http.post<ServiciosResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Actualiza un Servicios en la DB
 * @param body Servicios a actualizar
 * @returns json
 */
    getServicios(criterio:string){
    const url=`${this.baseUrl}${SmEnum.getServicio}${criterio}`;
    return this.http.get<ServiciosResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
   * Consulta el listado de servicios
   * @returns array servicios
   */
  getAllServicios(){
    const url=`${this.baseUrl}${SmEnum.getAllServicio}`;
    return this.http.get<ServiciosResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  


  //#endregion

  //#region Ingresos inventarios
  
 /**
   * Crea un IngresosInv en la DB
   * @param body IngresosInv a crear
   * @returns json
   */
  cIngresosInv(body:{}){
    const url=`${this.baseUrl}${SmEnum.cIngresosInv}`;
    return this.http.post<IngresosInvResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Busca un IngresosInv en la DB
 * @param body IngresosInv a buscar (id)
 * @returns json
 */
    fIngresosInv(body:{}){
    const url=`${this.baseUrl}${SmEnum.fIngresosInv}`;
    return this.http.post<IngresosInvResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Actualiza un IngresosInv en la DB
 * @param body IngresosInv a actualizar
 * @returns json
 */
    updIngresosInv(body:{}){
    const url=`${this.baseUrl}${SmEnum.uIngresosInv}`;
    return this.http.post<IngresosInvResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Actualiza un IngresosInv en la DB
 * @param body IngresosInv a actualizar
 * @returns json
 */
    delIngresosInv(body:{}){
    const url=`${this.baseUrl}${SmEnum.dIngresosInv}`;
    return this.http.post<IngresosInvResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }

  /**
 * Actualiza un IngresosInv en la DB
 * @param body IngresosInv a actualizar
 * @returns json
 */
    getIngresosInv(criterio:string){
    const url=`${this.baseUrl}${SmEnum.getIngresosInv}${criterio}`;
    return this.http.get<IngresosInvResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }


  getAllIngresosInv(){
    const url=`${this.baseUrl}${SmEnum.getAllIngresosInv}`;
    return this.http.get<IngresosInvResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err)
      )
    )
  }


  //#endregion

}
