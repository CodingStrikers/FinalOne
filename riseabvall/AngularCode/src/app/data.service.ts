import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url:any="http://localhost:3438/";
  constructor(private http:HttpClient) { }

public postregdata(redata:any):Observable<any>{
  return this.http.post(this.url+"registerdata",redata);
}
public logindata(lodata:any):Observable<any>{
  return this.http.post(this.url+"logindata",lodata);
}

public submitdata(subdata:any):Observable<any>{
  return this.http.post(this.url+"qrydata",subdata);
}
}