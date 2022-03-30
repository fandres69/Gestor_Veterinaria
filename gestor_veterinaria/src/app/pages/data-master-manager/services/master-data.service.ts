import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasterDataEnum } from '../enums/master-data-enum';
import { environment } from '../../../../environments/environment.prod';
import { CiudadResponse } from '../interfaces/data-master-interface';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  private baseUrl=environment.ApiUrl;

  private header=new HttpHeaders()
  .set('content-type', 'application/json;charset=utf-8')
  .set('Accept','*/*')
  .set('Access-Control-Allow-Origin', '*')
  .set('x-token',localStorage.getItem('x-token')||'');

  constructor(private http:HttpClient) { }

  /**
   * Crea una ciudad en la Db 
   * @param body datos para creación nueva ciudad
   * @returns response Api backend
   */

  CreateCiudad(body:{}){

    const url=`${this.baseUrl}${MasterDataEnum.createCiudad}`;
    return this.http.post<CiudadResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  /**
   * Función que realiza búsquedas de ciudades por sentencia Like
   * @param criterio búsqueda por letras contenidas en una ciudad
   * @returns array de ciudades
   */
  searchCiudades(criterio:string){

    const url=`${this.baseUrl}${MasterDataEnum.searchCiudad}/${criterio}`;

    return this.http.get<CiudadResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }


  /**
   * Elimina una ciudad de la DB
   * @param body argumentos eliminación (Codigo ciudad)
   * @returns response  
   */
  delCiudad(body:{}){
    const url=`${this.baseUrl}${MasterDataEnum.delCiudad}`;
    return this.http.post<CiudadResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }


  updCiudad(body:{}){
    const url=`${this.baseUrl}${MasterDataEnum.UpdCiudad}`;
    return this.http.post<CiudadResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }
}
