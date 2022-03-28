import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiUrl } from '../../../auth/enums/api-url';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, map, catchError ,of} from 'rxjs';
import { typeDocumentsRes } from '../interfaces/datamaster';

@Injectable({
  providedIn: 'root'
})
export class DataMasterService {

  private baseUrl=environment.ApiUrl;
  private allTypeDoc=ApiUrl.AllTypeDoc;

  constructor(private http: HttpClient) { }

  getCiudades(){
    const url=`${this.baseUrl}${this.allTypeDoc}`;
    const header=new HttpHeaders().set('content-type', 'application/json;charset=utf-8')
    .set('Accept','*/*').set('x-token',localStorage.getItem('x-token')||'')
    .set('Access-Control-Allow-Origin', '*');

    return this.http.post<typeDocumentsRes>(url,'',{headers:header}).pipe(      
      map(resp=>resp),
      catchError(err=>of(err))
    );
  }


}
