import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { map, catchError, of } from 'rxjs';
import { ClientsEnum } from '../enums/clients-enum';
import { ClientResponse, PetsResponse } from '../interfaces/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  private baseUrl=environment.ApiUrl;

  private header=new HttpHeaders()
  .set('content-type', 'application/json;charset=utf-8')
  .set('Accept','*/*')
  .set('Access-Control-Allow-Origin', '*')
  .set('x-token',localStorage.getItem('x-token')||'');


  constructor(private http:HttpClient) { }

  
  /**
   * Crea un cliente en la base de datos
   * @param body 
   * @returns json
   */
  cretaClient(body:{}){
    const url=`${this.baseUrl}${ClientsEnum.cClient}`;
    return this.http.post<ClientResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }
  
  /**
   * Busca un cliente en la base de datos
   * @param body 
   * @returns json
   */
  findClient(body:{}){
    const url=`${this.baseUrl}${ClientsEnum.fClient}`;
    return this.http.post<ClientResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }
  
  /**
   * Actualiza un cliente en la base de datos
   * @param body 
   * @returns json
   */
  updClient(body:{}){
    const url=`${this.baseUrl}${ClientsEnum.updClient}`;
    return this.http.post<ClientResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }
  
  /**
   * Elimina un cliente en la base de datos
   * @param body 
   * @returns json
   */
  delClient(body:{}){
    const url=`${this.baseUrl}${ClientsEnum.delClient}`;
    return this.http.post<ClientResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }
  
  /**
   * Obtiene cliente de la base de datos a partir de un criterio
   * @param criterio 
   * @returns json
   */
  getClients(criterio:string,tipo:string){
    const url=`${this.baseUrl}${ClientsEnum.getClient}${criterio}/${tipo}`;
    return this.http.get<ClientResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }

  getAllClients(){
    const url=`${this.baseUrl}${ClientsEnum.getAllClients}`;
    return this.http.get<ClientResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }


  /**
   * Crea una mascota en la base de datos
   * @param body 
   * @returns json
   */
  createPet(body:{}){
    const url=`${this.baseUrl}${ClientsEnum.cPet}`;
    return this.http.post<PetsResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }

  /**
   * Consulta una mascota en la base de datos
   * @param body 
   * @returns json
   */
  findPet(body:{}){
    const url=`${this.baseUrl}${ClientsEnum.fPet}`;
    return this.http.post<PetsResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }

  /**
   * Actualiza una mascota en la base de datos
   * @param body 
   * @returns json
   */
  updPet(body:{}) {
    const url=`${this.baseUrl}${ClientsEnum.updPet}`;
    return this.http.post<PetsResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }

  /**
   * Elimina una mascota en la base de datos
   * @param body 
   * @returns json
   */
  delPet(body:{}){
    const url=`${this.baseUrl}${ClientsEnum.delPet}`;
    return this.http.post<PetsResponse>(url,body,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }

  /**
   * Busca una mascota en la base de datos a partir de un criterio
   * @param criterio 
   * @returns json
   */
  getPets(criterio:string, tipo:string) {
    const url=`${this.baseUrl}${ClientsEnum.getPet}${criterio}/${tipo}`;
    return this.http.get<PetsResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }
  

}
