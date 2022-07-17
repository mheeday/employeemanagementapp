import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    private apiServerurl = environment.apiBaseURL;

    constructor(private http: HttpClient ) {}

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiServerurl}/employee/all`);
    }

    public addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiServerurl}/employee/add`, employee);
    }

    public updateEmployee(employeeId: number, employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiServerurl}/employee/update/${employeeId}`, employee);
    }

    public deleteEmployee(employeeId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerurl}/employee/delete/${employeeId}`);
    }
}