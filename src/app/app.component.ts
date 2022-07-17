import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  public employees: Employee[] = [];
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;

  constructor (private employeeService: EmployeeService) {};



  ngOnInit(): void {
      this.getEmployees();
  }
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
       (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
       },
       (error: HttpErrorResponse) => {
        alert(error.message);
       }
    )
  }
 
  public onAddEmloyee(addForm: NgForm): void {   
      document.getElementById('add-employee-form')?.click();
      this.employeeService.addEmployee(addForm.value).subscribe(
        (response: Employee) => {
          console.log(response);
          this.getEmployees();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      )
  }


  public onUpdateEmloyee(employee: Employee): void {   
    this.employeeService.updateEmployee(employee.id, employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
}

public onDeleteEmloyee(employeeId: number): void {   
  this.employeeService.deleteEmployee(employeeId).subscribe(
    (response: void) => {
      console.log(response);
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
}

public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) != -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) != -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) != -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) != -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
}

  public onOpenModal(mode: string, employee?: Employee): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') { 
      button.setAttribute('data-target', '#addEmployeeModal')
    }
    else if (mode === 'delete') { 
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal')
    }
    else if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal')
    }
    container?.appendChild(button);
    button.click();

  }
}
