import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Employee } from '../../models/Employee';
import { EmployeeService } from '../../service/employee.service';
import { MatButtonModule } from "@angular/material/button";
import {   MatDialog, MatDialogModule } from "@angular/material/dialog"
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
@Component({
  selector: 'app-list-employee',
  standalone:true,
  imports: [MatTableModule,MatButtonModule, MatDialogModule],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})
export class ListEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'doj', 'role', 'salary','actions'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  constructor(
    private employeeService: EmployeeService,
    private dialog:MatDialog
  ) 
  { }


  ngOnInit(): void {
    this.employeeService.GetAll().subscribe(
      (employees: Employee[]) => {
        this.dataSource.data = employees
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    )
  }

  updateEmployee(employee: Employee): void {
     this.dialog.open(UpdateEmployeeComponent,{
      width:'50%',
      exitAnimationDuration:"1000ms",
      enterAnimationDuration:"1000ms",
      data:employee
     })
  }
 
  deleteEmployee(employee: Employee): void {
    this.employeeService.Delete(employee.id).subscribe({
      next: () => {
        alert("Employee deleted successfully");
      },
      error: (err) => {
        console.log('Error deleting employee:', err);
        alert("Error: Employee could not be deleted");
      }
    });
  }
  
  

}
