import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../models/Employee';
import { EmployeeService } from '../../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatIconModule,NgFor],
  providers: [provideNativeDateAdapter()],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {
  updateEmployeeForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public employee: Employee,
    private dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    // Ensure role is set correctly
    this.updateEmployeeForm = new FormGroup({
      name: new FormControl(this.employee?.name ?? '', [Validators.required]),
      doj: new FormControl(this.employee?.doj ?? '', [Validators.required]),
      role: new FormControl(this.employee?.role, [Validators.required]), 
      salary: new FormControl(this.employee?.salary ?? '', [Validators.required]),
    });

    console.log(this.employee?.role)
  }

  onSubmit() {
     if(this.updateEmployeeForm.valid){
      let _data:Employee = {
        id: this.employee.id,
        name: this.updateEmployeeForm.value.name as string,
        doj: new Date(this.updateEmployeeForm.value.doj as Date),
        role: this.updateEmployeeForm.value.role as string,
        salary: this.updateEmployeeForm.value.salary as number
      }

      this.employeeService.Update(_data).subscribe({
        next: (item) => {
          alert("Updated")
          this.close()
        },
        error: (err) => {
          console.error('Error saving employee:', err);
          alert("Error saving employee");
        }
      })
     }
  }

  close() {
    this.dialogRef.close()
  }

}
