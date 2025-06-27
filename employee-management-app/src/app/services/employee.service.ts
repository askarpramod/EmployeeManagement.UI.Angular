import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  addEmployee(data: any) {
    return this._http.post('http://localhost:3000/employees', data); //This will return observable     
  }
  updateEmployee(id: number, data: any) {
    return this._http.put(`http://localhost:3000/employees/${id}`, data); //This will return observable     
  }
  getEmployee() {
    return this._http.get('http://localhost:3000/employees'); //This will return observable     
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }

  // editEmployee(id: number): Observable<any> {
  //  // return this._http.post(`http://localhost:3000/employees/${id}`);   
  // }
}
