import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { DashboardEnum } from '../enums/dashboard';
import { VentasResponse, AnioResponse } from '../interfaces/ventas';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasServiceService {

  private baseUrl=environment.ApiUrl;

  private header=new HttpHeaders()
  .set('content-type', 'application/json;charset=utf-8')
  .set('Accept','*/*')
  .set('Access-Control-Allow-Origin', '*')
  .set('x-token',localStorage.getItem('x-token')||'');


  constructor(private http:HttpClient) { }

  /**
   * Obtiene todas las ventas
   * @returns json
   */
  getAllVentas(){
    const url=`${this.baseUrl}${DashboardEnum.getAllVentas}`;
    return this.http.get<VentasResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  /**
   * Obtiene todas las ventas
   * @returns json
   */
   getAllYears(){
    const url=`${this.baseUrl}${DashboardEnum.getYears}`;
    return this.http.get<AnioResponse>(url,{headers:this.header}).pipe(
      map(resp=>resp),
      catchError(err=>of(err))
    )
  }

  
}
