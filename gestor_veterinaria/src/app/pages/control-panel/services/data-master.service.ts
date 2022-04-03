import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiUrl } from '../../../auth/enums/api-url';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, map, catchError ,of} from 'rxjs';
import { passwordChanged, typeDocumentsRes, userImgResponse } from '../interfaces/datamaster';
import { userSessionFind } from 'src/app/auth/interfaces/usuario';
import { CiudadResponse } from '../../data-master-manager/interfaces/data-master-interface';

@Injectable({
  providedIn: 'root'
})
export class DataMasterService {

  private baseUrl=environment.ApiUrl;
  private allTypeDoc=ApiUrl.AllTypeDoc;
  private UpdUserS=ApiUrl.UpdUserSession;
  private UserImg=ApiUrl.UserFileImg;
  private updUserImg=ApiUrl.UpdateUserImg;
  private updatePass=ApiUrl.updPassword;

  private header=new HttpHeaders().set('content-type', 'application/json;charset=utf-8')
  .set('Accept','*/*').set('x-token',localStorage.getItem('x-token')||'')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) { }

  /**Obtiene los tipos de documentos */
  getTypeDocuments(){
    const url=`${this.baseUrl}${this.allTypeDoc}`;  
    return this.http.post<typeDocumentsRes>(url,'',{headers:this.header}).pipe(      
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }

  /**Actualiza la información de usuario */
  updateUserSession(body:{}){
    const url=`${this.baseUrl}${this.UpdUserS}`;
    return this.http.post<userSessionFind>(url,body,{headers:this.header}).
    pipe(
      tap(resp=>{
        console.log(resp);
      }),
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }

  /**Obtiene el nombre de la imagen de perfil del usuario */
 getUserImage(documento:any){
  const url=`${this.baseUrl}${this.UserImg}${documento}`;
  const body={};
  return this.http.post<userImgResponse>(url,body,{headers:this.header}).
  pipe(
    map(resp=>resp.nombre),
    catchError(err=>of(err))
  )
 }


 saveNewUserImage(file:File, documento:string){
  const url=`${this.baseUrl}${this.updUserImg}${documento}`;
  const body=new FormData();
  body.append('image',file);
  const head=new HttpHeaders()
  .set('Accept', 'application/json')
  .set('x-token', localStorage.getItem('x-token')||'');
 
   return this.http.post<userImgResponse>(url,body,{headers:head}).pipe(
     tap(resp=>{
       console.log(resp);
     })
   )
 }

 updatePassword(body:{}){
   const head=new HttpHeaders().set('content-type', 'application/json;charset=utf-8')
   .set('Accept','*/*').set('x-token',localStorage.getItem('x-token')||'')
   .set('Access-Control-Allow-Origin', '*');
 
  const url=`${this.baseUrl}${this.updatePass}`;


  return this.http.post<passwordChanged>(url,body,{headers:head}).pipe(
    map(resp=>resp),
    catchError(err=>of(err))
  )
  
 }

 getAllCities(){
   const url=`${this.baseUrl}${ApiUrl.AllCities}`;
   return this.http.get<CiudadResponse>(url,{headers:this.header}).pipe(
     map(resp=>resp),
     catchError(err=>of(err))
   )
 }



}
