import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { withEnabledBlockingInitialNavigation } from '@angular/router';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'employee-management-app';
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'action'];
  dataSource!: MatTableDataSource<any>; //><UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService: EmployeeService) { }
  ngOnInit(): void {
    console.log('inside ngOnInit of AppComponent');
    this.getEmployeeList();
  }
  openAddEditEmpForm() {
    console.log('inside openAddEditEmpForm : Before');
    //this._dialog.open(EmpAddEditComponent);  
    const dialogRef = this._dialog.open(EmpAddEditComponent);  
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    });
    console.log('inside openAddEditEmpForm : After');
  }

  getEmployeeList() {
    //it will return observable so subscriebe it
    this._empService.getEmployee().subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //delete
  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('Data deleted for ID :' + res.id);
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  //editEmployee
  editEmployee(data:any) {
    console.log('inside editEmployee : Before');
    //this._dialog.open(EmpAddEditComponent);  
    const dialogRef = this._dialog.open(EmpAddEditComponent,{
      data,
    });  
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    });
    console.log('inside openAddEditEmpForm : After');
  }


}
