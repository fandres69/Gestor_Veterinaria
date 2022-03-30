import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { ApiUrl } from '../enums/api-url';
import { AuthResponse, TokenValid, userSessionFind, Usuario } from '../interfaces/usuario';
import { catchError, map, of, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl=environment.ApiUrl;
  private _login=ApiUrl.Login;
  private _find=ApiUrl.FindUser;

  private _autResponse!:AuthResponse;

  get userRes(){
    return {...this._autResponse};
  }

  private _userSession!:userSessionFind;

  get userSession(){
    return {...this._userSession};
  }
  constructor(private http: HttpClient) { }

  /**Realiza login en la base de datos */
  login(usuarioN:string, password:string){
    const url=`${this.baseUrl}${this._login}`;
    const body={usuarioN,password};
    console.log(usuarioN, password);
    const header=new HttpHeaders().set('content-type', 'application/json;charset=utf-8')
    .set('Accept','*/*').set('x-token','')
    .set('Access-Control-Allow-Origin', '*');
        return this.http.post<AuthResponse>(url,body,{headers:header})
    .pipe(
      tap(resp=>{
        console.log(resp);
        this._autResponse=resp;      
      }),
      map(resp=>resp.OK),
      catchError(err=>of(err))
    );
  }

  /**Busca la información del usuario logeado en l aplicación */
  findUserSession(documento:number){
    const url=`${this.baseUrl}${this._find}`;
    const body={documento};
    const header=new HttpHeaders().set('content-type', 'application/json;charset=utf-8')
    .set('Accept','*/*')
    .set('Access-Control-Allow-Origin', '*').set('x-token',localStorage.getItem('x-token')||'');    
    console.log(url);
    return this.http.post<userSessionFind>(url,body,{headers:header})
    .pipe(
      tap(resp=>{
        console.log(resp);      
        this._userSession=resp;        
        
      }),
      map(resp=>resp.OK),
      catchError(err=>of(err))
    );
  }

  validToken():Observable<boolean>{

    const url=`${this.baseUrl}${ApiUrl.validToken}`;
    const token=localStorage.getItem('x-token')||'';
    const header=new HttpHeaders().set('content-type', 'application/json;charset=utf-8')
    .set('Accept','*/*')
    .set('Access-Control-Allow-Origin', '*').set('x-token',token);  
   const body={}
    return this.http.post<TokenValid>(url,body,{headers:header}).pipe(
      map(resp=>{
      console.log(resp);
      if(resp.errors){return false}
      else{return true}
    }),catchError(err=>
      {
        console.log(err);
        return of(false)
      }
     ));
  }


}
